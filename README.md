# PathPal

Turn a walk or run into a neighborhood adventure, with clues along the way and a local pop-up at the finish.

React Native + Expo + TypeScript prototype for iOS, Android, and web. No API keys required.

## Run

Use Node 22.13+ (Node 24 LTS recommended).

```sh
npm ci
npm start
```

Install Expo Go compatible with Expo SDK 57 on your phone. Connect your phone and laptop to the same Wi-Fi, then scan the terminal QR code (Camera on iOS; Expo Go on Android). If the installed Expo Go version differs, use a matching development build or follow https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/.

```sh
npm run web       # browser demo
npm run ios       # requires macOS and an installed iOS simulator
npm run android   # requires an Android emulator or connected device
npm run typecheck
npm test
npx expo export --platform all
```

## Demo walkthrough

1. On Explore, use the default request and choose **Find my adventure**.
2. Review the illustrative route, planned distance, preferences, and destination.
3. Start the adventure. Simulate arrival at each stop and answer `bird`, `rain`, and `coffee` (hints are available).
4. Finish at **Sunset Sessions**, a fictional music pop-up hosted by a sample local café.
5. Try `A 20 minute run for art without clues` to see activity, time, destination, and hunt change.
6. Open **Host a pop-up**, add an event, and return to Explore. Choose its category and create from preferences; your event becomes the destination.

Preferences and sample hosted events persist locally via AsyncStorage. No account is required. The prompt field controls the request-based button; chips and switches control **Create from my preferences**.

## Prototype boundaries

- The request interpreter is deterministic and recognizes a limited vocabulary. This prototype does **not** call an AI model. `src/planner.ts` is the seam for a future structured AI interpretation service.
- Routes are curated, illustrative sketches, not geographic routes. Distance, duration, and road crossing counts are simulated. They are not suitable for navigation or safety decisions.
- No GPS, live traffic, sidewalk, lighting, crime, weather, accessibility, or hazard data is connected. The app does not guarantee safety.
- Arrivals and hunt completion are simulated; no movement is tracked.
- Businesses and starter events are fictional. Hosting saves an event on the current device only. No public publishing, real reservations, rewards, payments, or business verification.
- Event times are display text, not parsed or checked against arrival time.
- Native production binaries, App Store / Play Store submission, and physical-device QA are outside this initial prototype.

## Next steps

Connect a pedestrian routing provider and real map, add location permission and arrival detection, introduce an AI service behind a server endpoint (never embed secret API keys in the client), and validate event opening hours before suggesting a destination. Keep sponsor detours optional and separate route quality signals from safety guarantees.
