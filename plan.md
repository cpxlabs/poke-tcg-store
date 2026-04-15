# Poke TCG Store — Project Plan

## Current State

The app shows a single **Deck Detail** screen (`DeckDetailScreen`) built with Material Design 3 tokens and NativeWind v4. A drawer navigator wraps the stack, providing a side menu with theme toggle (dark/light) and language switcher (EN/PT-BR).

### Implemented

- `DeckDetailScreen` — hero header, bento card grid, search + filter chips, market insight card, bottom tab bar
- Drawer side menu (`DrawerContent`) — theme toggle, language switcher
- `ThemeProvider` — dark/light mode with AsyncStorage persistence
- `LanguageProvider` — EN & PT-BR with device language auto-detection
- Material Design 3 color tokens under `m3` namespace in Tailwind config
- Deck-specific components: `PokemonCardItem`, `FeatureCard`, `AddCardSlot`, `MarketInsightCard`, `BottomTabBar`
- i18n keys: `deck.*`, `sidemenu.*`, `tabs.*`

## Next Steps

- Connect real Pokémon TCG API data
- Implement scan card feature (camera + barcode)
- Add collection persistence (AsyncStorage or remote DB)
- Build remaining tab screens (Home, Scan, Profile)
