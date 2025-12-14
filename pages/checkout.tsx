import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <div className="text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-8">Thank you for your order. Your delicious lunch will be ready soon.</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  )
}
