---
description: Generate a Product Requirements Document (PRD) for new features
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion, Bash
plan-mode: true
---

# /prd - Generate Product Requirements Document

## Goal

Create a detailed PRD for new features on the portfolio website. The PRD should be clear enough for implementation but not over-engineered for a personal portfolio project.

## Process

### Step 1: Understand the Request

Read the user's feature request and determine:
- What is the feature?
- Which part of the site does it affect? (homepage, art portfolio, theme system, i18n, new page)
- What's the complexity? (simple/medium/complex)

### Step 2: Ask Clarifying Questions

Use AskUserQuestion to gather details:
- **Target Users**: Who will use this feature?
- **Core Functionality**: What should it do?
- **Design Reference**: Any inspiration or mockups?
- **Scope**: What should NOT be included?

### Step 3: Explore Existing Code

Before writing the PRD, check:
```
- src/components/ - existing components to reuse
- src/lib/redux/ - state management patterns
- src/config/ - configuration patterns
- src/i18n/ - internationalization setup
```

### Step 4: Generate PRD

Create the PRD in `specs/YYMMDD-FEATURE-[name]/prd.md`:

```markdown
---
feature_date: YYMMDD
complexity: simple|medium|complex
branch: feature/YYMMDD-[name]
created_date: YYYY-MM-DD
---

# Feature: [Feature Name]

## Overview
[Brief description of the feature and why it's needed]

## Goals
- Goal 1
- Goal 2

## User Stories
- As a visitor, I want to [action] so that [benefit]

## Functional Requirements
1. FR-1: [Requirement]
2. FR-2: [Requirement]

## Non-Goals (Out of Scope)
- [What this feature will NOT do]

## Technical Approach
- Components to create/modify
- State management needs
- i18n considerations
- Animation requirements

## Design Considerations
- Theme compatibility (light/dark mode)
- Responsive design (mobile/tablet/desktop)
- Accessibility

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Open Questions
- [Any remaining unknowns]
```

### Step 5: Present Summary

After creating the PRD:

```
## PRD Created

Location: specs/YYMMDD-FEATURE-[name]/prd.md

### Summary
[Brief summary]

### Next Steps
1. Review the PRD
2. Ask questions or request changes
3. Run /task to generate implementation tasks
4. Run /implement to start building
```

## File Organization

All specs go in feature-specific directories:
- `specs/YYMMDD-FEATURE-[name]/` - New features
- Never create files directly in `specs/` root

## Tech Stack Reference

This portfolio uses:
- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.3
- **State**: Redux Toolkit
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **i18n**: next-intl
- **Icons**: Lucide React

## Request

$ARGUMENTS
