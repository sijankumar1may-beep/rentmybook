"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import axios from "axios";

interface CheckoutForm {
  BookNames: string[];
  TotalPrice: string;
  Address: string;
  MobileNumber: string;
  PaymentOption: string;
}

export function CheckoutForm() {
  const { cartItems, clearCart, calculateTotal } = useCart();
  const [userAddress, setUserAddress] = useState<string>("");
  const { user } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [userMobileNumber, setUserMobileNumber] = useState<string>();
  const [formError, setFormError] = useState<boolean>(false);
  const total = calculateTotal();
  const deliveryFee = 40;
  const grandTotal = total + deliveryFee;
  const [fetchingAddress, setFetchingAddress] = useState(false);

  const defaultObject: CheckoutForm = {
    BookNames: [],
    TotalPrice: "",
    Address: "",
    MobileNumber: "",
    PaymentOption: "cash",
  };

  useEffect(() => {
    formData["TotalPrice"] = grandTotal.toString();
    formData["BookNames"] = cartItems.map((item) => {
      return item.title;
    });
  }, [grandTotal]);
  const [formData, setFormData] = useState<CheckoutForm>(defaultObject);

  const getActualAddress = async (lat: string, long: string) => {
    const apiLin = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;
    console.log("https://n", apiLin);

    const response = await fetch(apiLin);

    const data = await response.json();

    return data.display_name;
  };
  function getMyCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        console.log("Lat:", latitude, "Lng:", longitude);
        const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        console.log("mapLink", mapLink);
        const readableAddress: any = await getActualAddress(
          latitude.toString(),
          longitude.toString()
        );
        setFormData((prev) => ({
          ...prev,
          ["Address"]: ` ${readableAddress}: Google Map Link ${mapLink}`,
        }));
        setFetchingAddress(false);
        // Example: store or send to WhatsApp
      },
      (error) => {
        setFetchingAddress(false);
        alert("Unable to fetch location. Please enter address manually.");
      }
    );
  }
  const sendToWhatsapp = () => {
    const message = `
    *Confirm Your Rental 📚*
    *Books*: ${formData.BookNames}
    *Address*: ${formData.Address}
    *Total Cost*: ${formData.TotalPrice}
    *User Mobile Number*:${formData.MobileNumber}
    *PaymentOption*:${formData.PaymentOption}
    *No payment required now. We’ll confirm availability and delivery time on WhatsApp.*
    `;

    const whatsappUrl =
      "https://wa.me/9910646415?text=" + encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing
    // setTimeout(async () => {
    //   await fetch("/api/order", {
    //     method: "POST",
    //     body: JSON.stringify(cartItems),
    //   });
    //   clearCart();
    //   router.push("/checkout/success");
    //   setIsProcessing(false);
    // }, 1500);

    if (formData.Address != "" && formData.MobileNumber != "") {
      sendToWhatsapp();
    } else {
      setFormError(true);
    }
  };

  const populateFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e?.target?.name as keyof CheckoutForm;
    const value = e?.target?.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>₹3/day (30-day minimum)</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>One-time delivery & return fee</span>
          <span>₹{deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>

        <div className="pt-4 border-t">
          <form onSubmit={handleCheckout}>
            <div className="space-y-4">
              <div className="relative">
                <Label htmlFor="address" className="block">
                  <span>Delivery Address*</span> |{" "}
                  <span>
                    <button
                      type="button"
                      onClick={() => {
                        setFetchingAddress(true);
                        getMyCurrentLocation();
                      }}
                      className=" rounded-full underline cursor-pointer"
                    >
                      Use my current location
                    </button>
                  </span>
                </Label>
                {formError && formData.Address == "" && (
                  <span className="text-red-700 my-4">
                    Please fill this field
                  </span>
                )}
                { fetchingAddress && (
                  <div className="absolute top-0 right-2">
                    <svg
                      className="h-7 w-7 text-orange-600 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-75"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="#FFFFFF"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  </div>
                )}
                <Textarea
                  id="address"
                  name="Address"
                  value={formData.Address}
                  className={fetchingAddress ? "mt-5" : "mt-5"}
                  onChange={(e) => {
                    populateFormData(e);
                  }}
                  placeholder="Enter your full address"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="block">
                  <span className="font-bold">Phone Number *</span>{" "}
                  <span className="text-xs">
                    (Please enter number on which we can confirm order)
                  </span>
                </Label>
                {formError && formData.MobileNumber == "" && (
                  <span className="text-red-700 my-4">
                    Please fill this field
                  </span>
                )}
                <Input
                  id="phone"
                  type="tel"
                  name="MobileNumber"
                  value={formData.MobileNumber}
                  placeholder="Enter your phone number"
                  required
                  className="mt-2"
                  onChange={(e) => {
                    populateFormData(e);
                  }}
                />
              </div>

              <div>
                <Label>
                  <span className="font-bold">Preferred Payment Method* </span>
                  <span className="text-xs">
                    (You are only choosing a preference. Payment happens after
                    WhatsApp confirmation.)
                  </span>
                </Label>
                <RadioGroup
                  defaultValue="cash"
                  name="PaymentOption"
                  value={formData.PaymentOption}
                  onValueChange={(value: string) => {
                    setFormData((prev) => ({
                      ...prev,
                      ["PaymentOption"]: value,
                    }));
                  }}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">
                      Cash on Delivery (after confirmation)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI (after confirmation)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {user ? (
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isProcessing || cartItems.length === 0}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            ) : (
              <Button
                className="w-full mt-6"
                onClick={(e) => {
                  handleCheckout(e);
                }}
              >
                Confirm on WhatsApp
              </Button>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
