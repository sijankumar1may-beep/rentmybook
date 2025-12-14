import { BookList } from "@/components/booklist";
import { Hero } from "@/components/hero";
import Pricing from "@/components/pricing";
import Workingmodel from "@/components/workingmodel";
import Futureplane from "@/components/futureplan";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      
      <Workingmodel />
      <BookList />
      <Futureplane />
      {/* <Pricing /> */}
    </div>
  );
}
