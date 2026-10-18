// POST /api/order: the "Sipariş ver" form. Forwards to ORDER_WEBHOOK_URL.
import { forward } from './_forward.js'

export const POST = (request) => forward(request, 'order')
