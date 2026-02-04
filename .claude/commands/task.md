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

### Task Guidelines

**Good tasks:**
- Single responsibility
- Clear acceptance criteria
- Estimated file locations
- Can be completed independently (when possible)

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
