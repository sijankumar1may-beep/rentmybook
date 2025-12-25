import { BookList } from "@/components/booklist";
import { Hero } from "@/components/hero";
import Pricing from "@/components/pricing";
import Workingmodel from "@/components/workingmodel";
import Futureplane from "@/components/futureplan";
import SEO from "@/components/Seo";
export default function Home() {
  return (
    <>
    <SEO title="Rent Books Online in India @ ₹3/Day | RentMyBooks" description="Rent books online in India at just ₹3 per day. Affordable book rental for students with fast delivery and wide book collection. Save money with RentMyBooks." canonical="https://rentmybooks.in"/>
    <div className="container mx-auto px-4 py-8">
      <Hero />
      
      <Workingmodel />
      <BookList />
      <Futureplane />
      {/* <Pricing /> */}
    </div>
    </>
  );
}
