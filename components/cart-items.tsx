"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";

import { CartItem } from "@/context/cart-context";

export function CartItems() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (cartItems.length === 0) {
  //     router.push("/");
  //   }
  // }, [cartItems.length, router]);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">
          A new chapter begins when you add your first book!
        </p>
        <Button onClick={() => router.push("/#books")}>Search Books</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 shadow-md">
      {cartItems.map((item:CartItem) => (
        <Card key={item?.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <div className="w-20 h-20 relative rounded overflow-hidden mr-4">
                <img
                  src={
                    `${item?.volumeInfo?.imageLinks?.smallThumbnail}` || `${item?.volumeInfo?.imageLinks?.thumbnail}` ||
                    `/placeholder.svg?height=80&width=80`
                  }
                  alt={item?.volumeInfo?.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item?.volumeInfo?.title}</h3>
                {/* <p className="text-sm text-gray-500">{item.title}</p> */}
                <div className="flex items-center justify-between mt-2">
                  {/* <span className="font-medium text-primary">₹{item.price}</span> */}
                  <div className="flex flex-col justify-start">
                    <div className="font-semibold">
                      <div className="font-bold flex flex-row justify-start">
                        <span>Quantity: </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 mx-4"
                          onClick={() => decreaseQuantity(item?.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span className="font-bold">{item?.quantity}</span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 mx-4"
                          onClick={() => increaseQuantity(item?.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeFromCart(item?.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="font-bold"> Rental period: Minimum 30 days</p>
                    <a  className="text-green-500 underline mt-6" href={`/books/${item?.id}`}>View detail about this book...</a>
                    <a  className="bg-green-500 text-white rounded-lg  mt-6 button p-3 b" href={`/#books`}>Add more items to cart</a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
