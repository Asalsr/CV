---
feature_date: 260212
estimated_tasks: 6
complexity: medium
---

# Implementation Tasks: Update Roadmap with Real CV Data

## Overview

Replace test/placeholder roadmap data with real CV content, add highlights to entries that lack them, add a new Certifications box, and adjust desktop layout for 6 items. All 3 i18n files updated in sync.

## Tasks

### Phase 1: i18n Translation Files

- [ ] T001: Update all 3 translation files with real roadmap data
  - Files: `frontend/messages/en.json`, `frontend/messages/sv.json`, `frontend/messages/fa.json`
  - Changes:
    - **job1**: Fix company → `Sweden Startup Nation (SISP), Sweden`, add `h4` highlight
    - **job3**: Add `h1`, `h2`, `h3` highlights
    - **job4**: Add `h1`, `h2`, `h3` highlights
    - **job5**: Remove GPA from title, add `h1`, `h2`, `h3` highlights
    - **job6** (NEW): Add full section (year, title, company, description, h1, h2, h3)
  - i18n keys:
    - `roadmap.job1.company` → EN: `Sweden Startup Nation (SISP), Sweden` | SV: `Sweden Startup Nation (SISP), Sverige` | FA: `Sweden Startup Nation (SISP)، سوئد`
    - `roadmap.job1.h4` → EN: `Data models, APIs & automation workflows` | SV: `Datamodeller, API:er & automationsflöden` | FA: `مدل‌های داده، API و گردش‌کارهای خودکار`
    - `roadmap.job3.h1` → EN: `Responsive websites & web applications` | SV: `Responsiva webbplatser & webbapplikationer` | FA: `وب‌سایت‌ها و اپلیکیشن‌های واکنش‌گرا`
    - `roadmap.job3.h2` → EN: `WordPress theme customization & plugins` | SV: `Anpassning av WordPress-teman & plugins` | FA: `سفارشی‌سازی قالب‌های WordPress و افزونه‌ها`
    - `roadmap.job3.h3` → EN: `UI/UX best practices implementation` | SV: `Implementering av UI/UX-best practices` | FA: `پیاده‌سازی بهترین شیوه‌های UI/UX`
    - `roadmap.job4.h1` → EN: `Co-developed internal social-media platform` | SV: `Medutvecklade intern social medieplattform` | FA: `توسعه مشترک پلتفرم شبکه اجتماعی داخلی`
    - `roadmap.job4.h2` → EN: `Designed catalogs, banners & e-books` | SV: `Designade kataloger, banners & e-böcker` | FA: `طراحی کاتالوگ‌ها، بنرها و کتاب‌های الکترونیکی`
    - `roadmap.job4.h3` → EN: `Sales strategy & localized content` | SV: `Försäljningsstrategi & lokaliserat innehåll` | FA: `استراتژی فروش و محتوای بومی‌سازی شده`
    - `roadmap.job5.title` → EN: `B.A. Fine Arts & B.Sc. Computer Science` | SV: `B.A. Konst & B.Sc. Datavetenskap` | FA: `کارشناسی هنرهای زیبا و کارشناسی علوم کامپیوتر`
    - `roadmap.job5.h1` → EN: `Fine Arts Academy of Rome` | SV: `Konstakademin i Rom` | FA: `آکادمی هنرهای زیبای رم`
    - `roadmap.job5.h2` → EN: `Abrar University of Tehran` | SV: `Abrar University, Teheran` | FA: `دانشگاه ابرار تهران`
    - `roadmap.job5.h3` → EN: `C++, Java, Data Analysis, Databases, Networks` | SV: `C++, Java, dataanalys, databaser, nätverk` | FA: `++C، جاوا، تحلیل داده، پایگاه داده، شبکه`
    - `roadmap.job6.year` → EN: `2023` | SV: `2023` | FA: `۲۰۲۳`
    - `roadmap.job6.title` → EN: `Professional Certifications` | SV: `Professionella certifieringar` | FA: `گواهینامه‌های حرفه‌ای`
    - `roadmap.job6.company` → EN: `IBM, Engim Turin, Google` | SV: `IBM, Engim Turin, Google` | FA: `IBM، Engim Turin، Google`
    - `roadmap.job6.description` → EN: `Industry certifications in front-end development, React, and UX design.` | SV: `Branschcertifieringar inom front-end-utveckling, React och UX-design.` | FA: `گواهینامه‌های صنعتی در توسعه فرانت‌اند، React و طراحی UX.`
    - `roadmap.job6.h1` → EN: `IBM – Developing Front-End Apps with React` | SV: `IBM – Utveckling av front-end-appar med React` | FA: `IBM – توسعه اپلیکیشن‌های فرانت‌اند با React`
    - `roadmap.job6.h2` → EN: `Engim Turin – Front-End Development` | SV: `Engim Turin – Front-end-utveckling` | FA: `Engim Turin – توسعه فرانت‌اند`
    - `roadmap.job6.h3` → EN: `Google UX Design – Wireframes & Prototypes` | SV: `Google UX Design – Wireframes & Prototyper` | FA: `Google UX Design – وایرفریم و پروتوتایپ`
  - Acceptance: All 3 JSON files valid, all keys present and consistent across languages

### Phase 2: Component Data

- [ ] T002: Update roadmapData array — fix existing entries
  - Files: `frontend/src/components/figma/Roadmap.tsx`
  - Changes:
    - Job 1: Fix company to `Sweden Startup Nation (SISP), Sweden`, add 4th highlight `Data models, APIs & automation workflows`
    - Job 3 (Liquido): Add `highlights` array with 3 items
    - Job 4 (DYS/Tanvarz): Add `highlights` array with 3 items
    - Job 5 (Education): Remove `(GPA 4.0)` from title, add `highlights` array with 3 items
  - Acceptance: All existing entries updated with correct data and highlights render in browser

- [ ] T003: Add Certifications entry as 6th roadmap item
  - Files: `frontend/src/components/figma/Roadmap.tsx`
  - Changes:
    - Import `Award` icon from `lucide-react`
    - Add 6th entry to `roadmapData`:
      ```
      {
        year: '2023',
        title: 'Professional Certifications',
        company: 'IBM, Engim Turin, Google',
        description: 'Industry certifications in front-end development, React, and UX design.',
        highlights: [
          'IBM – Developing Front-End Apps with React',
          'Engim Turin – Front-End Development',
          'Google UX Design – Wireframes & Prototypes'
        ],
        icon: Award,
        color: 'from-[var(--teal-light)] to-[var(--teal)]',
        position: 'left'
      }
      ```
  - Acceptance: 6th card renders after Education with Award icon and teal gradient

### Phase 3: Desktop Layout

- [ ] T004: Adjust desktop SVG layout for 6 items
  - Files: `frontend/src/components/figma/Roadmap.tsx`
  - Changes:
    - Container height: `h-[1200px]` → `h-[1400px]`
    - SVG viewBox: `0 0 800 1200` → `0 0 800 1400`
    - SVG main curve path: extend final control point from y=1200 to y=1400
    - SVG secondary curve path: same extension
    - Particle `offsetPath`: update to match new curve endpoint
    - Card position: `index * 22` → `index * 18` (percentage)
  - Acceptance: All 6 cards visible on desktop, SVG curve flows through all 6 milestone dots, no overlap or overflow

### Phase 4: Tests

- [ ] T005: Update Roadmap test expectations for 6 entries
  - Files: `frontend/src/__tests__/Roadmap.test.tsx`
  - Changes:
    - Add `Award` to lucide-react mock
    - Update "should render all 5 roadmap entries" → "should render all 6 roadmap entries"
    - Add assertion for `Professional Certifications` title
    - Add assertion for `2023` year
    - Add assertion for `IBM, Engim Turin, Google` company
    - Update highlights test to include new highlights (Liquido, DYS/Tanvarz, Education, Certifications)
    - Update education test — remove GPA 4.0 expectation from title
  - Acceptance: All tests pass with `npm test`

### Phase 5: Verification

- [ ] T006: Visual verification on desktop and mobile
  - Run dev server and verify:
    - All 6 cards render correctly on desktop with proper left/right alternation
    - SVG curve and milestone dots align with cards
    - Mobile vertical timeline shows all 6 entries
    - New highlights display on Liquido, DYS/Tanvarz, Education, and Certifications entries
    - No GPA visible in Education title
    - Award icon shows on Certifications card
    - No visual regressions
  - Acceptance: Screenshot review confirms pixel-perfect layout

## Relevant Files

| File | Purpose |
|------|---------|
| `frontend/src/components/figma/Roadmap.tsx` | Main component — data + layout |
| `frontend/messages/en.json` | English translations |
| `frontend/messages/sv.json` | Swedish translations |
| `frontend/messages/fa.json` | Farsi translations |
| `frontend/src/__tests__/Roadmap.test.tsx` | Unit tests |

## Notes

- The component currently uses **hardcoded strings**, not `useTranslations()`. We update both the component data and i18n files to keep them in sync, but the component will continue reading from the hardcoded array.
- The desktop SVG curve uses Bezier curves — extending the path requires updating the final control point Y values consistently across the main path, secondary path, and particle offset path.
- Task order matters: T001 can run in parallel with T002+T003. T004 depends on T003 (needs 6 items). T005 depends on T002+T003+T004.
