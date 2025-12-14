"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useEffect } from "react"

export function CartItems() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // if (cartItems.length === 0) {
    //   router.push("/")
    // }
  }, [cartItems.length, router])

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">A new chapter begins when you add your first book!</p>
        <Button onClick={() => router.push("/#books")}>Search Books</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4 shadow-md">
      {cartItems.map((item) => (
        <Card key={item.cover_i} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <div className="w-20 h-20 relative rounded overflow-hidden mr-4">
                <img
                  src={`https://covers.openlibrary.org/a/id/${item?.cover_i}-S.jpg` || `/placeholder.svg?height=80&width=80`}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                {/* <p className="text-sm text-gray-500">{item.title}</p> */}
                <div className="flex items-center justify-between mt-2">
                  {/* <span className="font-medium text-primary">₹{item.price}</span> */}
                  <div className="flex flex-col justify-start">
                    {/* <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => decreaseQuantity(item.cover_i)}>
                      <Minus className="h-4 w-4" />
                    </Button> */}
                   <p className=" font-bold">Quantity: <span className="font-bold">{item.quantity}</span></p>
                   <p className="font-bold"> Rental period: Minimum 30 days</p>
                    {/* <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => increaseQuantity(item.cover_i)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                      onClick={() => removeFromCart(item.cover_i)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
