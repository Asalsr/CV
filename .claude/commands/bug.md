---
description: Investigate and fix bugs systematically
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, AskUserQuestion
---

# /bug - Bug Investigation & Fix

## Goal

Systematically investigate and fix bugs with proper root cause analysis.

## Process

### Step 1: Gather Information

Ask the user (if not provided):
- What is the expected behavior?
- What is the actual behavior?
- Steps to reproduce?
- Any error messages?
- Which browser/device?

### Step 2: Reproduce

Attempt to reproduce the bug:
1. Follow the steps provided
2. Check browser console for errors
3. Check terminal for server errors

### Step 3: Investigate

**Check these areas:**

```
1. Component Logic
   - State management issues
   - Props being passed incorrectly
   - useEffect dependencies

2. Styling
   - Theme variables not applied
   - Responsive breakpoints
   - Dark/light mode issues

3. Data Flow
   - Redux state
   - API calls
   - localStorage/sessionStorage

4. i18n
   - Missing translation keys
   - Locale not loading

5. Build/Config
   - next.config.ts issues
   - Environment variables
```

### Step 4: Root Cause Analysis

Document findings:
```markdown
## Bug Analysis

**Symptom**: [What user sees]

**Root Cause**: [Why it happens]

**Location**: [File(s) involved]

**Fix**: [What needs to change]
```

### Step 5: Implement Fix

1. Make the minimal fix
2. Don't refactor unrelated code
3. Test the fix

### Step 6: Verify

```bash
# Run lint
cd frontend && npm run lint

# Build to check for errors
npm run build
```

### Step 7: Present Fix

```markdown
## Bug Fix Complete

### Problem
[Brief description]

### Root Cause
[What was wrong]

### Fix Applied
- `path/to/file.tsx`: [Change description]

### Verification
- Lint: PASSED
- Build: PASSED
- Manual test: [Instructions to verify]

---

Ready to commit? Type 'approve' to proceed.
```

**WAIT FOR USER APPROVAL**

### Step 8: Commit

```bash
git add .
git commit -m "fix: [brief description]

Root cause: [what was wrong]
Fix: [what was changed]

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## Common Issues in This Project

### Theme Issues
- CSS variables not updating: Check ThemeProvider
- Wrong colors: Check colorSchemes config

### i18n Issues
- Missing translations: Add to both en.json and fa.json
- Locale not loading: Check next-intl config

### Redux Issues
- State not persisting: Check localStorage sync
- Hydration mismatch: Check isHydrated flag

### Animation Issues
- Framer Motion not working: Check motion imports
- Flash on load: Add initial={false} or check hydration

## Request

$ARGUMENTS
