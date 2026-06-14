# Government Help — Temporary BSN & Banking Access

An interactive **low-/mid-fidelity prototype** for *Group Assignment 1 (Inclusive ICT)*.

> **Topic.** Can issuing temporary BSN numbers and DigiD access to Eritrean asylum
> seekers foster financial independence and reduce government costs in the
> Netherlands, if the system is designed to overcome severe non-English language
> barriers?

- **Target population:** Eritrean asylum seekers in the Netherlands (Global North)
- **Primary stakeholder:** the Dutch government
- **Domain:** government identity & financial onboarding

## Three core digital tasks

1. **Apply for asylum** — checklist of required documents + hand-off to the official IND website (the app does not replace the legal procedure, it prepares the user for it).
2. **Apply for a temporary BSN** — a guided, illustrated form that collects only the fields the RNI/BRP actually needs (name, date & country of birth, gender, COA reception location, ID photo) and "issues" a 9-digit BSN valid for 3 years.
3. **Open a bank account** — the issued BSN is pre-filled; the user picks a free basic account and receives an IBAN.

Sign-up / sign-in are deliberately **not** counted as tasks (per the brief). Task gating is enforced: BSN unlocks only after asylum, banking only after BSN — mirroring the real-world dependency chain.

## How to run

No build step, no server, no dependencies — this is itself an inclusive-design
choice (works on a basic phone, loads instantly, runs offline).

```
open index.html        # macOS
# or just double-click index.html, or:
python3 -m http.server  # then visit http://localhost:8000
```

## Design rationale → inclusive-design principles

| Choice | Why | Principle |
|---|---|---|
| **4 languages** (Tigrinya, Arabic, English, Dutch) with auto **RTL** for Arabic | Tigrinya & Arabic are the dominant languages of Eritrean asylum seekers; the language picker is the *first* screen, before any reading is required | Design Justice (designing *with* the margins); WCAG 3.1.1 |
| **Icon-first** — every label paired with an inline SVG icon (house, ID card, bank, phone) | Dual coding supports low-literate users and reduces dependence on any single language | Universal Design – Equitable & Simple/Intuitive Use |
| **Atkinson Hyperlegible** typeface | Designed by the Braille Institute for character disambiguation; helps low-vision & low-literacy readers | Universal Design – Perceptible Information |
| **Large touch targets (≥56px)** | Many users have only a basic or cracked smartphone; reduces input errors | WCAG 2.5.5 Target Size; Universal Design – Tolerance for Error |
| **Privacy popup on first entry** | A government-data form is intimidating for people fleeing a state; stating "used only by the Dutch government, never sold or shared" builds trust | Design Justice – transparency / informed consent |
| **Offline-capable + Low-data toggle** | AZC (reception centre) connectivity is unreliable and data is costly; low-data mode strips shadows/gradients | Equitable Use; structural-barrier mitigation |
| **Save & resume** | Long official forms shouldn't require one sitting (shared phones, limited time at the helpdesk) | Tolerance for Error; Low Physical Effort |
| **Status + colour + icon (never colour alone)** for task state | Colour-blind-safe progress signalling | WCAG 1.4.1 Use of Colour |
| **"Talk to a person" everywhere** → COA helpdesk / VluchtelingenWerk + interpreter request | Human fallback for anything the UI can't solve; never traps the user | Design Justice – centring lived experience |
| **No flags / culturally specific colours** | Flags, gestures and colour meanings differ across cultures and can alienate | Design Justice – cultural humility |
| **Onboarding walkthrough (3 screens)** | Explains *what* the app is and *who* it's for before asking for data | Simple & Intuitive Use |

## What the population can now do that they could not before

Without this, an Eritrean asylum seeker faces a Dutch-/English-only bureaucracy,
long BSN delays, and no bank access — blocking work, benefits, and independence.
The prototype gives a **single, language-first, icon-driven path** from arrival to
a working BSN and bank account, reducing reliance on caseworkers (and thus
government cost) while keeping a human safety net one tap away.