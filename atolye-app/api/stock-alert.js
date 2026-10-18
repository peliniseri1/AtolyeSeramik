// POST /api/stock-alert: the "Stok bildirimi iste" form. Forwards to STOCK_WEBHOOK_URL.
import { forward } from './_forward.js'

export const POST = (request) => forward(request, 'stock-alert')
