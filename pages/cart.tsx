import { CartItems } from "@/components/cart-items"
import { CheckoutForm } from "@/components/checkout-form"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { cartItems } = useCart()
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Confirm Your Rental</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CartItems />
        </div>
        {cartItems.length > 0 && (
         <div className="md:col-span-1">
         <CheckoutForm />
       </div>
        )}
        
      </div>
    </div>
  )
}
