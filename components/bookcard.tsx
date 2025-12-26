"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";

import { Plus } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { BookItem } from "@/lib/bookDataModel";
interface BookProps {
  book: BookItem;
}

export function BookCard({ book }: BookProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const {
    title,
    subtitle,
    authors,
    publishedDate,
    maturityRating,
    averageRating,
    imageLinks,
    previewLink,
    infoLink,
  } = book.volumeInfo;
  const { listPrice, retailPrice } = book.saleInfo;
  return (
    <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition">
      {/* Image Section */}
      <a href={`/books/${book?.id}`} target="" rel="noreferrer">
        <div className="flex justify-center bg-gray-100 py-4">
          <img
            src={imageLinks?.thumbnail || "/placeholder.png"}
            alt={title}
            loading="lazy"
            className="
        w-[160px] h-[240px]
        object-contain
        rounded-lg
        shadow-sm
      "
          />
        </div>

        {/* Content */}
        <div className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-4 pb-3 flex flex-col gap-2">
            {authors && (
              <p className="text-sm text-gray-600 line-clamp-2">
                <span className="font-medium">Author:</span>{" "}
                {authors.join(", ")}
              </p>
            )}

            <div className="flex flex-wrap gap-2 text-xs">
              {publishedDate && (
                <>
                  <span className="px-2 py-1 rounded font-semibold">
                    Publish Data:
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    📅 {publishedDate}
                  </span>
                  {averageRating && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                      Rating: {averageRating}
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center justify-between mt-2">
              {listPrice?.amount && (
                <>
                  <div className="text-sm text-black-400">
                    <span>Print Price:</span>
                    <span className="ml-1 italic">
                      {listPrice?.currencyCode} {listPrice?.amount}
                    </span>
                  </div>
                </>
              )}

              {/* {retailPrice?.amount && (
        <>
        <div className="text-sm text-gray-400">
          <span>Retail Price:</span>
          <span className="ml-1 italic">{retailPrice?.currencyCode} {retailPrice?.amount}</span>
        </div>
        </>
        )} */}
            </div>
          </CardContent>
        </div>
      </a>
      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => {
            toast({
              title: "Book added to cart",
              description: `${book.volumeInfo?.title} added to cart.`,
            });
            addToCart(book);
          }}
          className="w-full bg-green-500 hover:bg-green-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Rent Now
        </Button>
      </CardFooter>
    </Card>
  );
}
