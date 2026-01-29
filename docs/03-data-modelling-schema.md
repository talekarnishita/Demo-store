# Data Modelling & Schema (Strapi)

## Why Schema First

- **Strapi** is schema-driven: content types define your data model and auto-generate REST/GraphQL APIs.
- Clear schema = predictable API and easier context for agents (one place to look for “what exists”).

## Content Types in This Project

Defined in `backend/src/api/<name>/content-types/<name>/schema.json`.

### Example: `product`

- **Display name**: Product  
- **Fields**:
  - `name` (Text, required)
  - `slug` (UID, target field: name)
  - `price` (Decimal)
  - `description` (Rich text or Text)
  - `image` (Media, single)

### Example: `order`

- **Display name**: Order  
- **Fields**:
  - `stripeSessionId` (Text) – from Stripe Checkout
  - `status` (Enumeration: pending, paid, failed)
  - `amount` (Decimal)
  - `customerEmail` (Email)
  - `product` (Relation: many-to-one to Product) – optional

## Schema Workflow

1. **Design** in this doc or in Strapi Admin (Content-Type Builder).
2. **Implement** in Strapi: create content type → Strapi generates API and admin UI.
3. **Use in frontend**: types in `frontend/src/types/` mirror the API response; API calls in `frontend/src/api/`.

## Naming Conventions

- **Content types**: singular, lowercase (e.g. `product`, `order`).
- **API routes**: plural (e.g. `/api/products`, `/api/orders`) – Strapi default.
- **Fields**: camelCase in schema; same in API JSON.

## Relation to Context Window

Keep schema docs here; keep **implementations** in one place per module:
- Strapi schema → `backend/src/api/<name>/`
- Frontend types → `frontend/src/types/`
- API client → `frontend/src/api/products.ts`, etc.

So “data modelling” work is split into: (1) docs, (2) backend content types, (3) frontend types + API layer.
