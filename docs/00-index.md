# BMAD-style documentation index

Use these with Cursor: open the doc that matches your task so the agent has the right context.

| Doc | When to use | Direct folder links |
|-----|-------------|---------------------|
| [01 – Brownfield, agent model, context window](01-brownfield-agent-context-window.md) | Working on existing code; structuring Cursor context; agent roles | [docs/](../docs/) · [frontend/src/](../frontend/src/) · [backend/src/](../backend/src/) |
| [02 – Payment gateway](02-payment-gateway.md) | Stripe integration; env; flow | [frontend/src/api/](../frontend/src/api/) · [frontend/src/services/](../frontend/src/services/) · [backend/src/api/payment/](../backend/src/api/payment/) |
| [03 – Data modelling & schema](03-data-modelling-schema.md) | Strapi content types; Product, Order; schema workflow | [backend/src/api/](../backend/src/api/) · [frontend/src/types/](../frontend/src/types/) · [frontend/src/api/](../frontend/src/api/) |
| [04 – Modular context window](04-modular-context-window.md) | Where to put code; one module per Cursor task | [frontend/src/](../frontend/src/) · [backend/src/](../backend/src/) · [scraper/](../scraper/) |
| [05 – API for production](05-api-production.md) | React + Strapi + Vercel; CORS; env; learning path | [frontend/src/api/](../frontend/src/api/) · [frontend/src/hooks/](../frontend/src/hooks/) · [backend/config/](../backend/config/) |
| [06 – Vercel + React + Strapi](06-vercel-react-strapi.md) | Deployment; Strapi as context/backend; env per environment | [frontend/](../frontend/) · [backend/](../backend/) |
| [07 – Scrapy integration](07-scrapy-integration.md) | Web scraping; modular spiders; optional push to Strapi | [scraper/](../scraper/) · [scraper/scraper/spiders/](../scraper/scraper/spiders/) |
| [08 – Architecture](08-architecture.md) | System flow; high-level diagrams; products → cart → checkout → Stripe | [frontend/src/](../frontend/src/) · [backend/src/](../backend/src/) |
| [09 – Railway deployment](09-railway-deployment.md) | Deploy frontend + backend on Railway; monorepo; PostgreSQL; env | [frontend/](../frontend/) · [backend/](../backend/) |
| [Backend – After Strapi (payment route)](backend-after-strapi.md) | Adding Stripe payment route after Strapi setup; backend payment API | [backend/src/api/payment/](../backend/src/api/payment/) |
| [Strapi – Add products (with images)](strapi-add-products.md) | Add products in Strapi so they show on frontend with images | [backend/](../backend/) (Strapi Admin) |
| [Agent context](agent-context.md) | **Load this for a new agent** – tech stack, structure, flow, modular rules, doc index | [docs/](../docs/) |

**Runbook**: root [README.md](../README.md). **New agent:** run Cursor command **bmad-context-agent** or load [docs/agent-context.md](agent-context.md).
