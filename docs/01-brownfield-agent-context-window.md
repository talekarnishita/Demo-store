# BMAD-Style: Brownfield, Agent Model & Context Window Appropriation

## Brownfield Development (Existing Codebases)

**Brownfield** = working on existing projects with established codebases (vs **greenfield** = from scratch).

- **Clean up planning artifacts**: Don’t keep completed PRD/epic/story files in `docs/` or `_bmad-output/` unless you need them for reference.
- **Maintain docs**: Keep `docs/` succinct—intent, business rules, architecture—so agents (and you) have accurate context.
- **Scope the approach**: Small changes → quick-flow/tech-spec; major changes → full BMAD phases (PRD → Architecture → Epics → Stories).

When using Cursor on this repo, point the agent at:
- This `docs/` folder for “how we work”
- One **module at a time** (see “Context window appropriation” below) for implementation.

---

## Agent Model (Cursor + BMAD Mindset)

Think of Cursor as your **DEV agent**. Give it:

1. **Role**: “You are implementing [feature] in this React/Strapi project using the patterns in `docs/`.”
2. **Scope**: One module or one file at a time (API layer, one page, one content type).
3. **Context**: Open the relevant doc (e.g. `docs/03-data-modelling-schema.md`) and the folder you’re editing.

BMAD-style agents you can “simulate” in Cursor:
- **Analyst**: “Document this existing [folder/file]” → use for brownfield.
- **Architect**: “Design the API/data model for [feature]” → use `docs/03-data-modelling-schema.md`.
- **DEV**: “Implement [story] in `frontend/src/api/`” → use modular structure below.

---

## Context Window Appropriation

**Problem**: Large codebases don’t fit in one context window; agents get confused or miss details.

**Solution**: **Modularise by concern** so each part is self-contained and small enough to fit in context.

| Module / folder        | Purpose                          | When to open for Cursor        |
|------------------------|----------------------------------|---------------------------------|
| `frontend/src/api/`    | All backend API calls            | “Add/change an API call”        |
| `frontend/src/services/` | Business logic, Stripe, etc.  | “Add payment or service logic”  |
| `frontend/src/types/`  | Shared TS types                  | “Add types for new API”         |
| `frontend/src/hooks/`  | React hooks (data, auth)         | “Add a hook for X”              |
| `backend/src/api/`     | Strapi API routes & controllers  | “Add Strapi API/controller”     |
| `backend/config/`      | Strapi config                    | “Change server/DB config”       |
| `docs/`                | Intent, schema, runbooks         | “Understand how we work”        |

**Rules**:
- One task = one module. Tell Cursor: “In `frontend/src/api/products.ts` add a function to fetch product by id.”
- Keep files small. Prefer many small files over one giant file.
- Document each module in `docs/` (e.g. “API layer: see `docs/05-api-production.md`”).

This way you “appropriate” the context window to the right slice of the system.
