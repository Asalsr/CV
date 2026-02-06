---
description: Execute implementation tasks from a task list
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task
---

# /implement - Execute Implementation

## Goal

Execute the tasks defined in a task list, with quality checks and user approval before committing.

## Process

### Step 1: Load Tasks

Find and read the task file:
```
specs/YYMMDD-FEATURE-[name]/tasks.md
```

If no path provided, list available specs and ask user to choose.

### Step 2: Execute Tasks

For each task:
1. Mark task as in-progress
2. Implement the change
3. Mark task as complete
4. Update "Relevant Files" section

**Execution order:**
- Follow the phases in order
- Within a phase, tasks can often be done in parallel

### Step 3: Quality Checks

After all tasks complete:

```bash
# Run linting
cd frontend && npm run lint

# Fix any issues found
# Re-run until clean
```

### Step 4: Approval Gate

Present summary to user:

```markdown
## Implementation Complete - Review Required

### Changes Summary
**Files Modified**: X files
**Files Created**: Y files

[List of files with brief descriptions]

### Tasks Completed
[List all completed tasks]

### Quality Checks
- Linting: PASSED/FAILED
- [Any other checks]

---

**Review the changes above.**

Type 'approve' to proceed with commit, or request changes.
```

**WAIT FOR USER APPROVAL**

### Step 5: Commit (After Approval)

```bash
# Stage changes
git add .

# Create commit with descriptive message
git commit -m "feat: [feature description]

- [Change 1]
- [Change 2]
- [Change 3]

Co-Authored-By: Claude <noreply@anthropic.com>"

# Show result
git log -1 --stat
```

### Step 6: Push (Optional)

Ask user:
```
Commit created. Push to remote? (yes/no)
```

If yes:
```bash
git push
```

## Error Handling

**If lint fails:**
- Fix all errors automatically
- Re-run lint
- Repeat until clean

**If task fails:**
- Document the issue
- Continue with other tasks
- Report in approval summary

## Tech Stack Reminders

When implementing:
- Use CSS variables for theme colors: `var(--color-primary-500)`
- Follow existing component patterns
- Add i18n keys to **all** language files: `messages/en.json`, `messages/sv.json`, and `messages/fa.json`
- Use Framer Motion for animations
- Ensure responsive design

## Request

$ARGUMENTS
