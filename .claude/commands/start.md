---
description: Unified entry point for all development work - routes to appropriate workflow
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion, Bash, Task
plan-mode: true
---

# /start - Unified Development Entry Point

## Philosophy

Before implementing anything:
1. Explore the codebase to understand existing patterns
2. Check for similar existing components
3. Suggest the simplest solution
4. Then implement the user's decision

## Workflow

```
/start -> Analyze -> Classify -> Route -> Plan/Fix -> Present to User
```

## Step 1: Analyze the Request

Determine:
- What type of work is this?
- What's the scope?
- Confidence level (0-100%)

**Routing based on confidence:**
- < 70%: Ask clarifying questions
- >= 70%: Proceed with classification

## Step 2: Classify

| Category | Indicators | Route |
|----------|------------|-------|
| **Quick Fix** | Typo, text change, styling tweak, config change | Direct fix |
| **Bug** | Something broken, error, unexpected behavior | Bug workflow |
| **Enhancement** | Improve existing feature, refactor | Enhancement workflow |
| **Feature** | New functionality, new page, new component | Feature workflow |

### Quick Fix Criteria (no spec needed)
All must be true:
- No logic changes
- Isolated to single file/component
- Not touching theme system or i18n core

## Step 3: Route

### Route A: Quick Fix
1. Make the change
2. Run lint check: `npm run lint`
3. Present summary
4. Ask about commit

### Route B: Bug
1. Investigate the issue
2. Identify root cause
3. Create fix plan
4. Present to user
5. Implement after approval

### Route C: Enhancement
1. Explore existing implementation
2. Propose improvements
3. Present trade-offs
4. Implement after approval

### Route D: Feature
1. Run architectural review (see below)
2. Create PRD via /prd workflow
3. Stop for user review

## Architectural Review (Features)

Before creating any feature PRD:

### Check Existing Code
```
- src/components/ - Do we have similar components?
- src/lib/redux/ - Do we need new state?
- src/config/ - Any existing config to extend?
```

### Critical Thinking Checklist
- [ ] Is there an existing component to extend?
- [ ] Are we following existing patterns?
- [ ] Is a simpler solution possible?
- [ ] Do we really need new state management?
- [ ] Can we reuse existing animations?

### Present Options
If alternatives exist, present them:
```
I found we already have [X]. Options:

A) Extend existing [X] (recommended - consistent)
B) Create new [Y] (if needs differ significantly)

Which approach?
```

## Tech Stack Reference

- Next.js 16 (App Router)
- React 19
- Redux Toolkit (theme state)
- Tailwind CSS 4
- Framer Motion
- next-intl
- Lucide React

## Anti-Patterns

| Don't | Do Instead |
|-------|------------|
| Create new utility file | Check existing utils first |
| Add new state slice | Use existing patterns |
| Build from scratch | Extend existing components |
| Over-engineer | Keep it simple for a portfolio |

## Request

$ARGUMENTS
