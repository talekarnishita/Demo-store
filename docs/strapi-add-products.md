# Adding products in Strapi (with images)

Add products in Strapi so they show on the frontend with images and can be added to cart.

## 1. Open Strapi Admin

- Run Strapi: `cd backend && npm run develop`
- Open **http://localhost:1337/admin** and log in.

## 2. Create the Product content type (if not already)

- Go to **Content-Type Builder**.
- If **Product** doesn’t exist, create it with:
  - **name** (Text, required)
  - **slug** (UID, attached to `name`)
  - **price** (Decimal)
  - **description** (Text)
  - **image** (Media, single image)
- Save and restart Strapi if prompted.

## 3. Allow public access to products

- **Settings** → **Users & Permissions** → **Roles** → **Public**
- Under **Product**, enable **find** and **findOne**.
- Save.

## 4. Add products with images

- Go to **Content Manager** → **Product** → **Create new entry**.
- Fill in:
  - **name** (e.g. “Blue Widget”)
  - **slug** (auto from name, or type one)
  - **price** (e.g. 19.99)
  - **description** (optional)
  - **image**: click **Add new asset** → upload an image (or choose from Media Library).
- Click **Save** then **Publish**.

Repeat for more products. Images will appear on the frontend product list and in the cart.

## 5. Frontend

- Run the frontend: `cd frontend && npm run dev`.
- Open **http://localhost:5173/products** to see products with images.
- Use **Add to cart** on each product, then open **Cart** and **Checkout** to pay the cart total via Stripe.

## Image URL

- In development, the frontend proxies `/api` to Strapi, so image URLs like `/uploads/...` work.
- In production, set **VITE_STRAPI_URL** to your Strapi URL so image paths are resolved correctly (see `frontend/src/utils/strapiMedia.ts`).
