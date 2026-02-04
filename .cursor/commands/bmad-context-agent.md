---
name: 'context-agent'
description: 'Load project context for a new agent – tech stack, structure, flow, modular rules, doc index. Run at session start so the agent has full context.'
disable-model-invocation: true
---

<context-agent CRITICAL="TRUE">

1. **LOAD** the full project context from `docs/agent-context.md` (project root: `{project-root}`).
2. **READ** its entire contents – tech stack, repo structure, flow (products → cart → checkout), context-window/modular rules, doc index, env, quick commands.
3. **ADOPT** this context for the current session: you are working on the DEMO project (React + Strapi + Stripe + cart); use one module at a time; refer to `docs/00-index.md` for the doc and folder that match the user’s task.
4. **CONFIRM** briefly: “Context loaded. Project: DEMO (React + Strapi + Stripe, cart, checkout). Use docs/00-index.md and one module per task. What would you like to do?”

Do not skip loading the file. Use this context for all subsequent work until the user starts a new session or asks to reload context.

</context-agent>
