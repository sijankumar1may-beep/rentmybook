"use client";

import { useState } from "react";
import { FoodCard } from "@/components/food-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { foodItems } from "@/data/food-items";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { Router, useRouter } from "next/router";
export function BookList() {
  const [activeCategory, setActiveCategory] = useState("NCERT");
  const [bookData, setBookData] = useState<any>();
  const [bookSearchQuery, setBookSearchQuery] = useState<string>("");
  const categories = [
    { id: "maths", name: "Maths" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "bio", name: "Bio" },
    { id: "iit", name: "IIT" },
  ];
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const bookDataAPI = "https://openlibrary.org/search.json";
const router=useRouter();
  const getBookData = async (bookName: string) => {
    const data = await fetch(
      `${bookDataAPI}?q=${bookName}&fields=key,title,author_name,cover_i`
    );

    return data.json();
  };
  const fetchData = async (bookQuery: string) => {
    const bookdata = await getBookData(bookQuery);
    console.log("bookdata", bookdata);

    const filteredData = bookdata?.docs?.filter((item: any) => {
      if (bookSearchQuery != "") {
        if (
          item?.title
            ?.toLowerCase()
            ?.includes(bookSearchQuery?.toLowerCase()) ||
          item?.title?.toLowerCase()?.includes(activeCategory.toLowerCase())
        ) {
          return item;
        }
      } else {
        if (
          item?.title?.toLowerCase()?.includes(activeCategory.toLowerCase())
        ) {
          return item;
        }
      }
    });
    console.log("filteredData", filteredData);
    if (bookdata?.docs?.length > 0) {
      setBookData(filteredData);
    } else {
      console.log("API is failed");
    }
    //
  };
  
  useEffect(() => {
    fetchData(activeCategory);
  }, [activeCategory]);

  const goToTheCart=()=>{
    router.push('/cart')
  }
  return (
    <div className="py-8" id="books">
      {/* <h2 className="text-3xl font-bold mb-8 text-center">Our Menu</h2> */}
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        <span className="text-brand-green text-center">RentMyBook</span>
        <span className="text-brand-orange text-center"></span> - Our Book
        Collection
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-center">
        We provide service of rental book for more than 12000 books.
      </p>
      <div className="flex flex-col md:flex-row justify-evenly mb-4">
        <div className="mb-[5px] md:mb-0 md:w-[20%] flex relative md:h-[2.5rem]">
          <input
            className="text-white relative pl-8 bg-orange-600 focus:bg-green-500 placeholder:text-white placeholder:italic ...  p-[.5rem] w-full rounded-lg"
            placeholder="Search any book..."
            type="text"
            name="search"
            value={bookSearchQuery}
            onBlur={(e) => setBookSearchQuery("")}
            onChange={(e: any) => {
              setBookSearchQuery(e.target.value);
              fetchData(e.target.value);
            }}
          />
          <button className="absolute top-2 md:top-2 left-2 text-white" onClick={()=>{
            fetchData(bookSearchQuery)
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          </button>
        </div>

        <div className="hidden md:block mb-[30px] pt-[10px] pb-[40px] md:p-0 bg-green-500 md:w-[75%] cursor-pointer">
          <Tabs
            defaultValue="all"
            onValueChange={setActiveCategory}
            className="mb-8 rounded-lg md:mb-0"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-green-500">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="font-bold text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {bookData?.map((item: any) => {
                console.log("bookDatabookData",bookData)
                return <FoodCard key={item?.cover_i} book={item} />;
              })}
      </div>
      </div>
      <div className="text-center mt-10">
        <p className="text-gray-600 mb-6">Want to see our full book list?</p>
        <Link href="/#books">
          <button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-2 px-6 rounded-md transition-colors">
            View Book List
          </button>
        </Link>
      </div>
      {totalItems>0 && <div className="fixed bottom-1 z-30 bg-orange-600 hover:bg-green-600 w-[90%] md:hidden text-center rounded-full">
        <button className=" p-4 mx-8" onClick={()=>{goToTheCart()}}>Place order</button>
      </div>}
    </div>
  );
}
