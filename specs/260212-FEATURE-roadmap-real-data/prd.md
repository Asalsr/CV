---
feature_date: 260212
complexity: medium
branch: feature/260212-roadmap-real-data
created_date: 2026-02-12
---

# Feature: Update Roadmap with Real CV Data

## Overview

The roadmap section currently contains test/placeholder data. This PRD defines the update to use real professional data from Saeedeh Sarmadi's CV, while keeping the UI/UX exactly the same. One new box (Certifications) will be added in sequence after the existing entries.

## Goals

- Replace test data with accurate CV content across all 3 languages (EN, SV, FA)
- Add highlights to entries that currently lack them (Liquido, DYS/Tanvarz, Education)
- Add a new Certifications box as the 6th entry
- Adjust desktop layout spacing to accommodate 6 items instead of 5
- Keep UI/animations/styling identical

## User Stories

- As a visitor, I want to see accurate professional history so that I understand Saeedeh's real career journey
- As a visitor, I want to see certifications so that I understand her professional development

## Functional Requirements

### FR-1: Update Job 1 — Agentic Developer Intern

**Company name fix:** `Sweden Startup Nation (SSN) - SISP, Sweden` → `Sweden Startup Nation (SISP), Sweden`

**Add 4th highlight:**
- EN: `Data models, APIs & automation workflows`
- SV: `Datamodeller, API:er & automationsflöden`
- FA: `مدل‌های داده، API و گردش‌کارهای خودکار`

Everything else stays the same.

### FR-2: Update Job 2 — RADA Computing Solutions

No changes needed. Current data accurately reflects the CV.

### FR-3: Update Job 3 — Liquido Studio (ADD highlights)

Currently has no highlights. Add 3 from CV:

| # | EN | SV | FA |
|---|----|----|-----|
| h1 | Responsive websites & web applications | Responsiva webbplatser & webbapplikationer | وب‌سایت‌ها و اپلیکیشن‌های واکنش‌گرا |
| h2 | WordPress theme customization & plugins | Anpassning av WordPress-teman & plugins | سفارشی‌سازی قالب‌های WordPress و افزونه‌ها |
| h3 | UI/UX best practices implementation | Implementering av UI/UX-best practices | پیاده‌سازی بهترین شیوه‌های UI/UX |

### FR-4: Update Job 4 — DYS Company & Tanvarz (ADD highlights)

Keep combined as one entry (2009–2018). Add 3 highlights from CV:

| # | EN | SV | FA |
|---|----|----|-----|
| h1 | Co-developed internal social-media platform | Medutvecklade intern social medieplattform | توسعه مشترک پلتفرم شبکه اجتماعی داخلی |
| h2 | Designed catalogs, banners & e-books | Designade kataloger, banners & e-böcker | طراحی کاتالوگ‌ها، بنرها و کتاب‌های الکترونیکی |
| h3 | Sales strategy & localized content | Försäljningsstrategi & lokaliserat innehåll | استراتژی فروش و محتوای بومی‌سازی شده |

### FR-5: Update Job 5 — Education

**Remove GPA** from title (per user request).

| Field | Current | Updated (EN) |
|-------|---------|-------------|
| title | B.A. Fine Arts (GPA 4.0) & B.Sc. Computer Science | B.A. Fine Arts & B.Sc. Computer Science |

Add highlights for coursework/details:

| # | EN | SV | FA |
|---|----|----|-----|
| h1 | Fine Arts Academy of Rome | Konstakademin i Rom | آکادمی هنرهای زیبای رم |
| h2 | Abrar University of Tehran | Abrar University, Teheran | دانشگاه ابرار تهران |
| h3 | C++, Java, Data Analysis, Databases, Networks | C++, Java, dataanalys, databaser, nätverk | ++C، جاوا، تحلیل داده، پایگاه داده، شبکه |

Update SV/FA titles similarly (remove GPA).

### FR-6: Add Job 6 — Certifications (NEW box)

Add as 6th entry after Education, following the alternating left/right pattern.

| Field | EN | SV | FA |
|-------|----|----|-----|
| year | 2023 | 2023 | ۲۰۲۳ |
| title | Professional Certifications | Professionella certifieringar | گواهینامه‌های حرفه‌ای |
| company | IBM, Engim Turin, Google | IBM, Engim Turin, Google | IBM، Engim Turin، Google |
| description | Industry certifications in front-end development, React, and UX design. | Branschcertifieringar inom front-end-utveckling, React och UX-design. | گواهینامه‌های صنعتی در توسعه فرانت‌اند، React و طراحی UX. |
| h1 | IBM – Developing Front-End Apps with React | IBM – Utveckling av front-end-appar med React | IBM – توسعه اپلیکیشن‌های فرانت‌اند با React |
| h2 | Engim Turin – Front-End Development | Engim Turin – Front-end-utveckling | Engim Turin – توسعه فرانت‌اند |
| h3 | Google UX Design – Wireframes & Prototypes | Google UX Design – Wireframes & Prototyper | Google UX Design – وایرفریم و پروتوتایپ |

**Component data:**
- icon: `Award` (from lucide-react)
- color: `from-[var(--teal-light)] to-[var(--teal)]`
- position: `left` (follows alternating pattern: R, L, R, L, R, **L**)

### FR-7: Desktop Layout Adjustment

With 6 items instead of 5, the desktop layout needs spacing adjustment:

**Current (5 items):**
- Container: `h-[1200px]`, viewBox `0 0 800 1200`
- Card position: `top: ${index * 22}%`
- Milestone Y: `yPos = 50 + index * 240`

**Updated (6 items):**
- Container: `h-[1400px]`, viewBox `0 0 800 1400`
- Card position: `top: ${index * 18}%`
- Milestone Y: `yPos = 50 + index * 240` (keeps 240 spacing, fits in 1400)
- SVG curve path extended to reach y=1400 instead of 1200

### FR-8: Update i18n Translation Files

Update all 3 translation files (`en.json`, `sv.json`, `fa.json`) with:
- Updated job1 company name + 4th highlight
- New job3 highlights (h1, h2, h3)
- New job4 highlights (h1, h2, h3)
- Updated job5 title (no GPA) + highlights (h1, h2, h3)
- New job6 section (year, title, company, description, h1, h2, h3)

### FR-9: Wire Component to i18n

The current `Roadmap.tsx` uses **hardcoded English strings** in the `roadmapData` array, not `useTranslations()`. The i18n keys exist in all 3 message files but are not consumed by the component.

**Decision:** Keep the current hardcoded approach to preserve UI stability. Update the hardcoded data in `Roadmap.tsx` and keep the i18n files in sync for future migration.

## Non-Goals (Out of Scope)

- Changing any visual styling, animations, or layout patterns
- Wiring the component to use `useTranslations()` (future task)
- Adding new sections like Languages or Projects to the roadmap
- Modifying the Skills component
- Splitting DYS and Tanvarz into separate boxes

## Technical Approach

### Files to Modify

1. **`frontend/src/components/figma/Roadmap.tsx`**
   - Update `roadmapData` array (6 items)
   - Import `Award` icon from lucide-react
   - Adjust desktop container height to `h-[1400px]`
   - Update SVG viewBox to `0 0 800 1400`
   - Update SVG curve path to extend to y=1400
   - Update card position spacing to `index * 18%`

2. **`frontend/messages/en.json`** — Update roadmap section
3. **`frontend/messages/sv.json`** — Update roadmap section
4. **`frontend/messages/fa.json`** — Update roadmap section

### No New Files Needed

All changes are updates to existing files.

## Design Considerations

- Theme compatibility: No changes (same gradient colors and CSS variables)
- Responsive: Mobile vertical timeline auto-adapts to any number of items
- Desktop: Height increase from 1200px to 1400px is proportional to the new item count
- Accessibility: No changes needed

## Success Criteria

- [ ] All 6 roadmap entries display correctly on desktop and mobile
- [ ] All data matches the CV accurately
- [ ] No GPA shown in Education entry
- [ ] Certifications box appears as 6th entry with correct icon and styling
- [ ] Highlights appear on all entries (Liquido, DYS/Tanvarz, Education now have them)
- [ ] Desktop SVG curve and milestone dots align with all 6 cards
- [ ] All 3 i18n files updated and in sync
- [ ] Existing tests pass (update test expectations for 6 entries)

## Open Questions

None — all questions resolved with user.
