# Modularising for Better Context Window

## Principle

**One module = one concern = one Cursor context.**  
When you ask Cursor to change “how we call the API” or “how we handle payments”, open only the relevant folder and doc.

## Frontend ([frontend/src/](../frontend/src/))

| Folder | Responsibility | Example |
|--------|----------------|---------|
| [frontend/src/api/](../frontend/src/api/) | All HTTP calls to backend. No business logic. | `products.ts`, `orders.ts`, `payments.ts` |
| [frontend/src/services/](../frontend/src/services/) | Business logic, Stripe session creation, formatting. | `stripe.ts` |
| [frontend/src/types/](../frontend/src/types/) | Shared TypeScript types (mirror Strapi/API). | `product.ts`, `order.ts` |
| [frontend/src/hooks/](../frontend/src/hooks/) | React hooks (data fetching, auth). | `useProducts.ts`, `useCheckout.ts` |
| [frontend/src/context/](../frontend/src/context/) | React context (e.g. cart). | `CartContext.tsx` |
| [frontend/src/pages/](../frontend/src/pages/) | Page-level components and routing. | Home, Products, Cart, Checkout |
| [frontend/src/utils/](../frontend/src/utils/) | Helpers (e.g. Strapi media URL). | `strapiMedia.ts` |

## Backend (Strapi in [backend/](../backend/))

| Folder | Responsibility |
|--------|----------------|
| [backend/src/api/](../backend/src/api/) | One folder per content type: routes, controllers, services, schema. |
| [backend/src/api/payment/](../backend/src/api/payment/) | Payment (Stripe) custom route and controller. |
| [backend/config/](../backend/config/) | Server, database, admin, plugins. |

## Scrapy (Python in [scraper/](../scraper/))

| Folder | Responsibility |
|--------|----------------|
| [scraper/scraper/spiders/](../scraper/scraper/spiders/) | One spider per file (context window). |
| [scraper/scraper/items.py](../scraper/scraper/items.py) | Item models (scraped data shape). |
| [scraper/scraper/pipelines.py](../scraper/scraper/pipelines.py) | Post-processing; optional Strapi POST. |

## How to Use in Cursor

1. **“Add a new API call”**  
   → Open [docs/05-api-production.md](05-api-production.md) + [frontend/src/api/](../frontend/src/api/).  
   → Say: “In `frontend/src/api/products.ts` add `getProductById(id)`.”

2. **“Add a new content type”**  
   → Open [docs/03-data-modelling-schema.md](03-data-modelling-schema.md) + [backend/src/api/](../backend/src/api/).  
   → Say: “Create content type X with fields Y (see docs).”

3. **“Integrate Stripe checkout”**  
   → Open [docs/02-payment-gateway.md](02-payment-gateway.md) + [frontend/src/services/](../frontend/src/services/) and [frontend/src/api/](../frontend/src/api/).

4. **“Fix a bug on the product page”**  
   → Open [frontend/src/pages/](../frontend/src/pages/) and the relevant component only.

5. **“Add or change a Scrapy spider”**  
   → Open [docs/07-scrapy-integration.md](07-scrapy-integration.md) + [scraper/scraper/spiders/](../scraper/scraper/spiders/).

This keeps each conversation focused and within context limits.
