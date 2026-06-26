# Prototype Improvements — Post Cognitive Walkthrough
**Group 9 · Inclusive ICT · Group Assignment 2 (Part ii)**

Updated prototype: **https://inclusive-ict-prototype.vercel.app/**

Sticky notes in the prototype label each change on-screen. Use the **"Show changes / Hide changes"** pill in the status strip to toggle the annotation layer.

---

## Task 1 — Apply for asylum

| Finding (CW) | What was wrong | What changed |
|---|---|---|
| Q3 — IND hand-off | The bare redirect to the external IND site removed all language protection. Yonas had no idea what he would face there. | Added an in-app, in-language illustrated explainer: a 4-step list of what happens on the IND site plus a "Bring with you" checklist, shown before he leaves the app. |
| Q3/Q4 — Ambiguous self-certify button | "I have applied for asylum" could be read as the act of applying, or tapped just to unlock the next step (false-completed state). | Re-labelled to "I have finished the IND step — mark as done". Tapping it now opens a confirmation sheet that explicitly states: "This only updates your checklist. It does not send anything to the IND." |
| Inclusion — stall point | The IND hand-off is the most likely place Yonas stalls or abandons. | Added a prominent "Talk to a person / interpreter" shortcut directly on this screen. |

---

## Task 2 — Apply for a temporary BSN

| Finding (CW) | What was wrong | What changed |
|---|---|---|
| Q2 — Date of birth control | The native `<input type="date">` rendered in an East-Asian locale (年/月/日). Yonas may also not know his exact Gregorian birth date (Ge'ez calendar). | Replaced with a localised Day / Month / Year picker. Month names render in the chosen language. An "I'm not sure of the exact day" option accepts a year-only date. |
| Q2 — Country of birth | A free-text box that silently required Latin-script typing. | Replaced with a tap-to-choose dropdown showing countries in Tigrinya, Arabic and English. No typing required. |
| Q3 — Combined save/submit button | One button labelled "Submit application" blurred whether tapping it saved or sent the form — sensitive for someone wary of government data collection. | Split into two clearly labelled buttons: "Save for later" and "Send my application". A one-line note explains exactly what is sent and to whom. |
| Q4 — No inline validation | Error feedback was absent; there was no in-language indication of which fields were wrong. | Added an in-language error banner and per-field error messages anchored to the offending field. Errors clear immediately as the user corrects each field. |
| Q4 — Photo upload on unstable connection | A silent failure point on the AZC's unreliable Wi-Fi. | Photo step now shows a confirmation thumbnail and a one-tap retake. A hint notes that the image is automatically compressed on a slow connection. |

---

## Task 3 — Open a bank account

| Finding (CW) | What was wrong | What changed |
|---|---|---|
| Q2 — Provider choice freeze | Three banks with identical "Basic account — free" labels gave Yonas no basis to choose, causing a decision freeze. | One bank is shown as "Recommended" with a plain-language one-liner (e.g. "Free. No Dutch address needed. App in Arabic and English."). The other two are behind "See other banks". |
| Q3 — Unexplained jargon | "Basic account" and "IBAN" were used without explanation. | Added tap-to-expand definitions for both terms in the user's chosen language. |
| Q3 — Anxiety about commitment | No reassurance that confirming was free or reversible — a real concern for someone wary of official processes. | Added a plain-language note: "This opens a free account. No money and no fee now. You can change bank later." |
| Inclusion — no exit | No way to verify before committing without leaving the screen. | Added a persistent "Talk to a person / interpreter" shortcut on this screen. |
