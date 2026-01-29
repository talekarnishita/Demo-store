/**
 * Payment service – optional (e.g. create Payment record after webhook).
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::payment.payment');
