# The Harvest

**A Bible app centered on Jesus.**
Jesus. The Word. The Spirit. The Way. The Life.
*Grow closer. Walk in love. Live His plan.*

Native iOS · SwiftUI · renaissance-meets-modern. Sacred. Intentional. Beautiful.

---

## What's inside

| Experience | What it does |
|---|---|
| **Home** | Time-of-day greeting ("Good Morning, Beloved"), script-accent devotion, Verse of the Day in a renaissance arch, Continue Reading, today's plan progress |
| **Bible** | Full offline Bible — **KJV + World English Bible** bundled (all 66 books, 31,100+ verses, public domain). Book/chapter picker, reference + full-text search, verse selection with a 6-ink highlight palette where every color carries a meaning (Gold = Jesus, Blush = Love, Rose = Conviction…), copy/note/ask-AI verse actions |
| **Notes** | An immersive parchment writing room with serif ink, gentle prompts (*What stood out? How is Jesus speaking? How will I respond?*), verse attachments, pin/share, Reflection · Sermon · Prayer kinds |
| **Sermons** | Add a podcast episode URL or import an audio file. Full player (±15/30s, scrubbing waveform). **Automatic notes:** on-device transcription → key points + every scripture mentioned, as tappable chips that open the reader. Works even with no backend; Sonnet makes it richer |
| **Plans** | Simple, fully customizable checklists on parchment, golden progress thread, "Well done, good and faithful servant" when complete. Seeded with *Walking in His Ways* |
| **Ask (AI)** | "Ask. Seek. Knock." — assistant with full app context (current passage, your notes, your plan), suggested questions, and verse chips on every answer that jump straight into the reader. Powered by **your backend → Claude Sonnet** |

Design: warm near-black canvas, antique gold + bronze + parchment, New York serif display, Snell Roundhand script accents, procedural heavenly-light backgrounds (rays, stars, dawn glow), arch motifs, Liquid Glass surfaces on iOS 26 with graceful material fallback.

## Requirements

- Xcode 16 or newer (Xcode 26 recommended — enables real Liquid Glass surfaces).
- iOS 18.0+ deployment target. iPhone-first, runs on iPad.
- No third-party dependencies. None. Everything is Apple frameworks + bundled public-domain scripture.

## Run it

1. Open `TheHarvest/TheHarvest.xcodeproj`.
2. Select your team under *Signing & Capabilities* (bundle id `com.theharvest.bible` — change freely).
3. Build & run.

Everything works offline out of the box — Bible, highlights, notes, plans, sermon import + on-device transcription + local note extraction. The AI assistant activates once you connect your backend.

## Connect your backend (Claude Sonnet)

You build the server; the app only ever talks to it. Set the base URL in **Profile → AI Backend** (there's a Test Connection button). Implement two endpoints:

### `POST {base}/chat`

Request:
```json
{
  "messages": [
    { "role": "user", "content": "What does it mean to abide in Jesus?" }
  ],
  "context": "App: The Harvest…\nCurrently reading: John 15 (KJV).\nThe reader's name: …\nRecent notes: …\nActive plan: …"
}
```

Response:
```json
{ "reply": "To abide in Jesus means to remain in constant connection with Him…" }
```

Server-side, forward `messages` to Claude (model `claude-sonnet-5`) with `context` as the system prompt (plus your own shepherding instructions), and return the completion as `reply`. The app renders any scripture references in the reply as tappable chips automatically.

### `POST {base}/sermon-notes`

Request:
```json
{ "title": "Faith That Moves", "transcript": "…full on-device transcript…" }
```

Response:
```json
{
  "summary": "Faith must be more than words…",
  "keyPoints": ["Jesus is the author and finisher.", "Obedience is the evidence."],
  "scriptures": ["Hebrews 11:1", "James 2:17", "Mark 9:23"]
}
```

If this endpoint is unreachable, the app silently falls back to its on-device analyzer (extractive key points + scripture-reference detection), so the feature never breaks.

## Where to change things

| Thing | Where |
|---|---|
| Palette & highlight inks | `Theme/HarvestPalette.swift` |
| Fonts (display / scripture / script) | `Theme/HarvestType.swift` |
| Backgrounds, arch shape | `Theme/Backgrounds.swift` |
| Liquid Glass fallback | `Theme/Glass.swift` |
| Verse of the Day rotation | `Bible/VerseOfTheDay.swift` |
| Add a translation | Drop `Resources/Bibles/{id}.json` (same shape as `kjv.json`) and add it to `BibleStore.availableTranslations` |
| Backend contract | `Services/AIService.swift` |
| Default plan seeding | `Views/RootView.swift` |
| App icon | `Assets.xcassets/AppIcon.appiconset` |

### Translation JSON shape

```json
{
  "id": "kjv",
  "name": "King James Version",
  "abbreviation": "KJV",
  "books": [
    { "name": "Genesis", "chapters": [ ["In the beginning…", "…"], ["…"] ] }
  ]
}
```

66 books in canonical order; `chapters[c][v]` is the verse text (0-indexed).

## Ideas already wired for later

- **Background audio** for sermons: add the `audio` background mode capability in *Signing & Capabilities* — the player is already `AVAudioSession .playback`.
- **Long-form transcription:** `SermonTranscriber` is one file; swap `SFSpeechRecognizer` for iOS 26's `SpeechAnalyzer/SpeechTranscriber` for faster long-sermon transcription when you're on Xcode 26.
- **More translations:** any public-domain text converted to the JSON shape above just works, including non-English.

---

*Jesus is the harvest. We are the laborers. — a beautiful app for a beautiful purpose.*
