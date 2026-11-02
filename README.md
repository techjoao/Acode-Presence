# Acode Presence

Personalize the activity you want to display while working in Acode.

## Current milestone: plugin foundation

- Acode plugin lifecycle registration
- Command to open the Acode Presence panel
- Editable activity fields with a live local preview
- Modular source structure

## Planned

- Persist user preferences
- Detect the active file and programming language
- Add a Discord connection adapter when a supported Android integration path is confirmed

**Important:** this version only previews activity data inside Acode. It does not connect to Discord or publish Rich Presence yet.

## Development

```sh
npm install
npm run dev
```

See the development server output for the URL to install the generated `plugin.zip` in Acode.
