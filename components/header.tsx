"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router=useRouter();
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const goTotheBookList=()=>{
    router.push('/#books')
  }
  return (
    <header className="border-b bg-gray-300 sticky top-0 z-10 bg-gray-100 font-bold">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand-orange">
          <span className="text-black">RentMy</span><span>Book</span>
        </Link>
        <button onClick={()=>{goTotheBookList()}} className="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[4.5rem] h-[2.1rem] text-brand-orange">
        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
        </svg>
        </button>
        <Link
          href="/cart"
          className="relative md:hidden text-brand-orange"
        >
          <ShoppingCart className="h-[2.5rem] w-[2.5rem] mr-0" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary font-bold text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
        {/* Mobile menu button */}
        <Button
          size="sm"
          className="md:hidden bg-brand-orange text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6 font-bold" />
        </Button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#books"
            className="text-sm font-bold hover:text-primary text-brand-orange"
          >
            Books
          </Link>
          <Link
            href="/about"
            className="text-sm font-bold hover:text-primary text-brand-orange"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-sm font-bold hover:text-primary text-brand-orange"
          >
            Contact
          </Link>
          <button onClick={()=>{goTotheBookList()}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[4.5rem] h-[2.1rem] text-brand-orange">
        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
        </svg>
        </button>
          <Link href="/cart" className="relative text-brand-orange">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary font-bold text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-brand-orange hover:bg-brand-orange"
                >
                  <User className="h-6 w-6 font-bold font-large text-white hover:bg-brand-orange" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-bold">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="font-bold bg-brand-orange">
              <Button className="bg-brand-orange" size="sm">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4 border-radius-2 mx-2 mb-2 bg-brand-orange">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {user ? (
              <>
                <div className="text-sm font-medium">{user.email}</div>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
