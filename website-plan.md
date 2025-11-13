# 🧠 WEBSITE BUILD PLAN — “GabrielOS / Windows 98 Inspired Portfolio”

**Source:** [https://github.com/1j01/98](https://github.com/1j01/98)  
**Live Demo:** [https://gbwbs.vercel.app/](https://gbwbs.vercel.app/)  
**PDF Reference:** `WEBSITEBUILT.pdf`

---

## 🔰 Overview

Ovaj dokument sadrži detaljan plan razvoja i rekonstrukcije projekta **GabrielOS** — interaktivnog web portfolija u stilu **Windows 98 operativnog sistema**.  
Cilj je unaprijediti postojeću implementaciju (koja je već live) i dodati sve elemente iz PDF dokumenta: boot sekvencu, retro login, help centar, sistemske tabove, fajl menadžer, i “easter egg” funkcionalnosti.

---

## 🧩 EPIC 1 — Boot & Onboarding Experience

### 🎯 Cilj
Kreirati BIOS-style boot ekran i animirani login flow sa tekstualnim sekvencama, zvukom i retro efektima.

### 🧱 Features & Tasks

#### F1.1 — Boot Screen
- [ ] Implementirati `BootScreen` komponentu sa sekvencijalnim tekstovima iz PDF-a (npr. *Loading Creativity Drivers...*)
- [ ] Dodati keyboard interakciju: `ENTER` → prelazak na login.
- [ ] CRT efekat + blink cursor animacija.
- [ ] Accessibility: dugme “Skip intro”, poštovati “reduce motion”.

#### F1.2 — Login Screen (GabrielOS v1.2)
- [ ] Kreirati `LoginScreen` sa poljima:
  - Username (pre-filled)
  - Password (masked)
- [ ] Tekst: *“Authenticating curiosity... Verifying imagination...”*
- [ ] Na submit: lažni “auth” + prelazak na desktop.
- [ ] Responsive dizajn i fallback za mobile.

#### F1.3 — Animations & Sound
- [ ] Dodati retro zvuke (boot, login success).
- [ ] Mute toggle (po defaultu OFF).
- [ ] Implementirati “no sound” fallback.

---

## 🖥️ EPIC 2 — Portfolio Explorer & Navigation

### 🎯 Cilj
Glavni desktop i navigacija: ikone, taskbar, prozori sa sadržajem (About, Projects, Contact…).

### 🧱 Features & Tasks

#### F2.1 — Desktop & Taskbar
- [ ] Implementirati desktop grid sa ikonama:
  - About Me
  - Programs
  - Playground
  - Network
  - Contact
  - Downloads
- [ ] Tooltip na hover.
- [ ] Double-click otvara odgovarajući prozor.

#### F2.2 — Portfolio Explorer
- [ ] Kreirati `PortfolioExplorer` prozor koji se automatski otvara nakon welcome moda.
- [ ] Sekcije:
  - Labs / Programs / Playground / Network / Contact
- [ ] Svaka kartica: thumbnail, opis, link/demo.
- [ ] Keyboard navigacija + ARIA roles.

#### F2.3 — About Me Modal
- [ ] Ugraditi opis iz PDF-a (*STEM and Robotics Educator*).
- [ ] CTA dugmad:
  - “Schedule Consultation”
  - “Download Resume”

---

## 🧰 EPIC 3 — Help Center / FAQ

### 🎯 Cilj
Retro help panel sa sidebarom, F1 shortcutom i pretraživanjem.

### 🧱 Tasks

#### F3.1 — Help Center Window
- [ ] Sidebar sa temama (Welcome, What is STEM?, Philosophy...).
- [ ] Content panel sa markdown copy iz PDF-a.
- [ ] Pretraga tema.
- [ ] F1 → otvara help.

#### F3.2 — Content Population
- [ ] Prenijeti sve tekstove iz PDF-a.
- [ ] Testirati mobilni prikaz.
- [ ] Dodati easter egg “Press F1 for inspiration”.

---

## 🗂️ EPIC 4 — Desktop Features (Files, Games, Easter Eggs)

### 🎯 Cilj
Dodati “My Documents”, “Downloads”, “Recycle Bin”, “Games” i skriveni sadržaj.

### 🧱 Tasks

#### F4.1 — File Explorer
- [ ] Folderi: My Documents, Pictures, Downloads.
- [ ] Fajlovi:
  - `AboutMe.txt`
  - `CurriculumSamples.docx`
  - `CaseStudies.pdf`
  - `Reflections.log`
  - `Contacts.vcf`
- [ ] Tooltip info i download opcije.

#### F4.2 — Recycle Bin
- [ ] Lista fajlova (OldTeachingMethods.docx, PerfectLessonPlan.v1).
- [ ] Dugmad:
  - [ ] Restore All
  - [ ] Empty Recycle Bin
- [ ] Konfirmacija sa porukom iz PDF-a:  
  *“Are you sure you want to discard these lessons? [Cancel] [Learn from them]”*

#### F4.3 — Hidden Easter Eggs
- [ ] Skriveni fajlovi: `OldMindsets.dll`, `SystemOverthinking.tmp`.
- [ ] Otkrivaju se na hover / tajni klik.
- [ ] Tooltip s filozofskim citatom.

#### F4.4 — Games & Demos
- [ ] Folder “Games”.
- [ ] Ugraditi mini igre / demo linkove.
- [ ] Ako nije interaktivno → embed video (Vimeo/YouTube).

---

## ⚙️ EPIC 5 — System Settings

### 🎯 Cilj
Panel sa tabovima: General, Device Manager, Hardware Profiles, Performance.

### 🧱 Tasks

#### F5.1 — General Tab
- [ ] Info: GabrielOS v1.2, copyright, registration info.
- [ ] Tooltip: “Personalized creativity OS since 1998”.

#### F5.2 — Device Manager
- [ ] Lista “hardwarea”:
  - LEGO, VEX, Sphero, Micro:bit
  - Fusion 360, React, Flask, Firebase, GitHub
- [ ] Statusi (Installed, Warning, Missing Driver)
- [ ] Dugme “Update Driver” (fake).

#### F5.3 — Hardware Profiles
- [ ] Profili:
  - Educator
  - Consultant
  - Creator
  - Developer
  - Presenter
  - Vacation
- [ ] Aktivni profil prikazuje unikatni opis.
- [ ] Prelazak profila menja boje i “active dll” efekte.

#### F5.4 — Performance Tab
- [ ] Statuse iz PDF-a:
  - Creativity: Turbo Mode
  - Curiosity: Unlimited
  - Empathy: Stable
- [ ] Tekst “Reboot Schedule: Whenever inspiration strikes.”

---

## 🖼️ EPIC 6 — Media & Assets

### 🧱 Tasks
- [ ] Organizovati `/public/assets`:
  - images/
  - icons/
  - videos/
  - resume.pdf
- [ ] Optimizovati slike (webp, srcset).
- [ ] Dodati “Download Resume” dugme.
- [ ] SEO meta: author, description.

---

## 🚀 EPIC 7 — Repo / DevOps / Deployment

### 🧱 Tasks
#### F7.1 — Repo Setup
- [ ] Kreirati `README.md` sa uputstvom:
  ```bash
  git clone https://github.com/username/gabrielos.git
  npm install
  npm run dev
  npm run build
  npm run start
