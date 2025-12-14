import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">About RentMyBook</h1>

      <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
  RentMyBook was founded in 2024 with a mission to make learning affordable and accessible for every student. 
  We noticed how expensive textbooks and study materials had become, especially for school and college students who need books only for a short time.
</p>
<p className="text-gray-600 mb-4">
  What started as a small idea to share books within our community quickly grew into a student-friendly rental marketplace. 
  Today, RentMyBook allows students to rent books at the lowest price and even earn money by renting out the books they already own.
</p>

<p className="text-gray-600">
  Our goal is simple: reduce educational costs, promote book-sharing, and build a smarter, more supportive learning ecosystem.
</p>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden">
          <Image src="/rentmybooklogo.png?height=100&width=100" alt="Our Logo" fill className="bg-cover rounded-full" />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Affordable Pricing</h3>
<p className="text-gray-600">Rent books at the lowest rates. No need to spend hundreds or thousands buying new textbooks.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Wide Book Collection</h3>
<p className="text-gray-600">From school textbooks to competitive exam guides — choose from thousands of titles.</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Easy Delivery & Returns</h3>
<p className="text-gray-600">We deliver books to your doorstep and pick them up when you're done — hassle-free learning.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-8 text-center">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: "Sumit Kumar", role: "Founder & Product Lead", image: "/placeholder.svg?height=200&width=200" },
            { name: "Priya Patel", role: "Operations Manager & Co Founder", image: "/placeholder.svg?height=200&width=200" },
            { name: "Amit Singh", role: "Customer Experience", image: "/placeholder.svg?height=200&width=200" },
            { name: "Neha Gupta", role: "Logistics & Delivery", image: "/placeholder.svg?height=200&width=200" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
