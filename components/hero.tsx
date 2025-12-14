import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  const sendMessage=()=>{
    const message = `
New Book Rental Order 📚
Name: Rahul
Phone: 9876543210
Book: Lucent GK
Address: New Ashok Nagar
`;

const whatsappUrl =
  "https://wa.me/8507064152?text=" + encodeURIComponent(message);

window.open(whatsappUrl, "_blank");

  }
  return (
    <section className="hero-pattern py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Rent Any Book at Just <span className="text-brand-orange">₹3 per Day</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
          Perfect for all students.
          <span className="block">No subscription. No security deposit.</span>
          <span className="block text-black font-semibold mt-5">Minimum rental: 30 days · ₹40 one‑time delivery & return (within 5 km)</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#books">
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-lg text-white bg-green-500">
             Browse Books on Rent
            </Button>
            </a>
            {/* <button onClick={()=>{sendMessage()}}>Order on whatsup</button> */}
            {/* <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange/10 text-lg">
              Subscribe Now
            </Button> */}
          </div>
          <div className="mt-8 flex items-center space-x-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-brand-green">4.8</span>
              <span className="text-sm text-gray-500">Student Ratings</span>
            </div>
            <div className="h-10 border-r border-gray-300"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-brand-green">500+</span>
              <span className="text-sm text-gray-500">Daily Orders</span>
            </div>
            <div className="h-10 border-r border-gray-300"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-brand-green">12000+</span>
              <span className="text-sm text-gray-500">Book Collection</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative">
            <div className="w-64 h-64 md:w-[500px] md:h-[500px] bg-white rounded-full overflow-hidden shadow-xl">
              <img 
                src="https://covers.openlibrary.org/a/id/9407725-L.jpg"
                alt="Featured book cover" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-white rounded-full overflow-hidden shadow-xl">
              <img 
                src="/rentmybooklogo.png"
                alt="Popular book" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white rounded-full overflow-hidden shadow-xl">
              <img 
                src="/rentmybooklogo.png"
                alt="Top-rated textbook" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
