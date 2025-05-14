import { Route, Routes } from 'react-router-dom'


import { OrderConfirmation } from './pages/orderConfirmed'
import { Checkout } from './pages/checkout'
import { Index } from './pages/Index'
import { NotFound } from './pages/NotFound'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orderConfirmed" element={<OrderConfirmation />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
