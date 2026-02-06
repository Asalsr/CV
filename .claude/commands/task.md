---
description: Generate implementation tasks from a PRD
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
plan-mode: true
---

# /task - Generate Implementation Tasks

## Goal

Transform a PRD into actionable implementation tasks with clear acceptance criteria.

## Process

### Step 1: Load the PRD

Find and read the latest PRD:
```
specs/YYMMDD-FEATURE-[name]/prd.md
```

If no path provided, list available specs and ask user to choose.

### Step 2: Analyze Requirements

From the PRD, extract:
- Functional requirements
- Technical approach
- Components to create/modify
- State management needs
- i18n requirements

### Step 3: Generate Tasks

Create `specs/YYMMDD-FEATURE-[name]/tasks.md`:

```markdown
---
feature_date: YYMMDD
estimated_tasks: XX
complexity: simple|medium|complex
---

# Implementation Tasks: [Feature Name]

## Overview
[Brief summary from PRD]

## Tasks

### Phase 1: Setup & Data
- [ ] T001: [Task description]
  - Files: `path/to/file.tsx`
  - Acceptance: [What "done" looks like]

### Phase 2: Components
- [ ] T002: [Task description]
  - Files: `path/to/file.tsx`
  - Acceptance: [What "done" looks like]

### Phase 3: Integration
- [ ] T003: [Task description]
  - Files: `path/to/file.tsx`
  - Acceptance: [What "done" looks like]

### Phase 4: Polish
- [ ] T004: [Task description]
  - Acceptance: [What "done" looks like]

## Relevant Files
<!-- Updated as tasks are completed -->

## Notes
- [Any implementation notes]
```

### i18n Requirement (MANDATORY)

Any task that introduces or modifies **user-facing text** MUST follow the project's internationalization pattern. Never use hardcoded strings in components.

**Rules:**
1. All user-facing text must be defined as translation keys in **all** language files:
   - `frontend/messages/en.json` (English)
   - `frontend/messages/sv.json` (Swedish)
   - `frontend/messages/fa.json` (Persian/Farsi)
2. Follow the existing namespaced key structure (e.g., `nav.journey`, `roadmap.job1.title`)
3. Use ICU message format for pluralization: `"{count, plural, one {# item} other {# items}}"`
4. Use `{placeholder}` syntax for dynamic values: `"© {year} All rights reserved."`
5. Components must use `useTranslations('namespace')` from `next-intl` — never inline strings

**Each task involving text must include:**
- The proposed translation keys
- The translated values for **all 3 languages** (en, sv, fa)
- The namespace the keys belong to
- The language files listed under `Files:`

**Example task with i18n:**
```
- [ ] T005: Add empty state message to project grid
  - Files: `frontend/src/components/ProjectGrid.tsx`, `frontend/messages/en.json`, `frontend/messages/sv.json`, `frontend/messages/fa.json`
  - i18n keys:
    - `projectGrid.empty` → EN: "No projects found" | SV: "Inga projekt hittades" | FA: "پروژه‌ای یافت نشد"
    - `projectGrid.clearFilters` → EN: "Clear filters" | SV: "Rensa filter" | FA: "پاک کردن فیلترها"
  - Acceptance: Empty state renders translated message, all 3 language files updated
```

### Task Guidelines

**Good tasks:**
- Single responsibility
- Clear acceptance criteria
- Estimated file locations
- Can be completed independently (when possible)
- Include i18n translations for all languages when task involves user-facing text

**Task size:**
- Simple: 1-5 tasks
- Medium: 5-15 tasks
- Complex: 15-30 tasks

### Step 4: Present Summary

```
## Tasks Generated

Location: specs/YYMMDD-FEATURE-[name]/tasks.md

### Summary
- Total tasks: X
- Phases: Y
- Complexity: Z

### Next Steps
1. Review the tasks
2. Adjust if needed
3. Run /implement to start building
```

## Request

$ARGUMENTS
