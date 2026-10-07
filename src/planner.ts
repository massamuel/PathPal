export type Preferences = { mode: 'walk' | 'run'; minutes: number; quiet: boolean; hunt: boolean; interest: 'music' | 'art' | 'coffee' };
export type LocalEvent = { id: string; title: string; business: string; venue: string; time: string; category: 'music' | 'art' | 'coffee' };
export type Stop = { name: string; clue: string; answer: string; hint: string; x: number; y: number };
export type Plan = { title: string; distance: number; minutes: number; crossings: number; stops: Stop[]; event: LocalEvent; reasons: string[]; preferences: Preferences };
export const events: LocalEvent[] = [
  { id: 'music', title: 'Sunset Sessions', business: 'Little Harbor Coffee', venue: 'Harbor Courtyard', time: 'Demo • 4–7 PM', category: 'music' },
  { id: 'art', title: 'Color on the Block', business: 'Palette Studio', venue: 'Artists Courtyard', time: 'Demo • 3–6 PM', category: 'art' },
  { id: 'coffee', title: 'Coffee & Acoustic', business: 'Little Harbor Coffee', venue: 'Café Terrace', time: 'Demo • 2–6 PM', category: 'coffee' },
];
export const defaults: Preferences = { mode: 'walk', minutes: 30, quiet: true, hunt: true, interest: 'music' };
export function interpretRequest(text: string, base: Preferences): Preferences {
  const q = text.toLowerCase(); const p = { ...base };
  const duration = q.match(/(\d+)\s*(?:minutes?|mins?\b)/); const hour = q.match(/(\d+(?:\.\d+)?)\s*hours?\b/);
  if (duration) p.minutes = Math.max(15, Math.min(60, Number(duration[1])));
  else if (hour) p.minutes = Math.max(15, Math.min(60, Number(hour[1]) * 60));
  if (/\b(run|running|jog)\b/.test(q)) p.mode = 'run'; else if (/\b(walk|walking|stroll)\b/.test(q)) p.mode = 'walk';
  if (/\b(coffee|cafe|café)\b/.test(q)) p.interest = 'coffee'; else if (/\b(art|murals?|gallery)\b/.test(q)) p.interest = 'art'; else if (/\b(music|festival|live|concert)\b/.test(q)) p.interest = 'music';
  if (/\b(quiet|traffic|crossings|sidewalks)\b/.test(q)) p.quiet = true;
  if (/\b(no|without|skip)\s+(?:the\s+)?(?:clues|hunt|scavenger hunt)\b/.test(q)) p.hunt = false;
  else if (/\b(hunt|clues|scavenger)\b/.test(q)) p.hunt = true;
  return p;
}
const stops: Stop[] = [
  { name: 'The neighborhood mural', clue: 'On a wall, I spread my wings. Find the painted bird. What animal do you see?', answer: 'bird', hint: 'It has feathers and a beak. Demo answer: bird.', x: 95, y: 230 },
  { name: 'Pocket garden', clue: 'A tiny green escape between the streets. What do the flowers need from the sky to grow?', answer: 'rain', hint: 'Water falling from clouds. Demo answer: rain.', x: 205, y: 150 },
  { name: 'Little Harbor Coffee', clue: 'Follow the aroma to our local stop. What warm drink gives this business its name?', answer: 'coffee', hint: 'A drink made from roasted beans. Demo answer: coffee.', x: 285, y: 90 },
];
export function makePlan(p: Preferences, available: LocalEvent[]): Plan {
  const event = available.find(e => e.category === p.interest) ?? events[0];
  const selected = p.minutes < 25 ? [stops[2]] : p.minutes < 40 ? stops : [{ name: 'Park entrance', clue: 'Where paths meet trees, find the green escape. What is this place called?', answer: 'park', hint: 'A public green space. Demo answer: park.', x: 60, y: 265 }, ...stops];
  const movingMinutes = Math.max(8, p.minutes - (p.hunt ? selected.length * 3 : 0));
  return { title: p.quiet ? 'The scenic way to something good' : 'A little adventure, your way', distance: Number((movingMinutes * (p.mode === 'run' ? 0.14 : 0.075)).toFixed(1)), minutes: p.minutes, crossings: p.quiet ? 2 : 5, stops: p.hunt ? selected : [], event, preferences: p, reasons: [p.quiet ? 'Curated demo option with fewer major-road crossings' : 'Curated demo option through the neighborhood center', `${p.mode === 'run' ? 'Running' : 'Walking'} distance adjusted to your ${p.minutes}-minute budget${p.hunt ? ', including clue stops' : ''}`, `Ends at ${event.title}, matched to your ${p.interest} interest`] };
}
export function answerMatches(input: string, expected: string) { return input.trim().toLowerCase().replace(/[.!?]+$/, '') === expected; }
