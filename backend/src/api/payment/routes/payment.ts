/**
 * Core payment routes (CRUD). Custom route is in 01-create-checkout.ts.
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::payment.payment');
