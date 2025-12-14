
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const plans = [
  {
    name: "Monthy",
    price: "₹99",
    period: "per month",
    description: "Perfect for trying out our service",
    features: [
      "Access a wide variety of books",
  "Choose books any time",
  "₹20 delivery charge within 5 km",
  "Pay only for the books you rent",
  "Late fee: ₹2 per day",
  "₹100 refundable security deposit"
    ],
    popular: false,
    buttonText: "Subscribe now"
  },
  {
    name: "Quarterly",
    price: "₹299",
    period: "per three months",
    description: "Our most popular plan",
    features: [
     "Select any books of your choice",
  "₹15 delivery charge per book (within 5 km)",
  "Free delivery within 3 km",
  "Late fee: ₹1 per day",
  "Borrow up to 2 books at a time",
  "₹100 refundable security deposit"
    ],
    popular: true,
    buttonText: "Subscribe now"
  },
  {
    name: "Peer to peer",
    price: "₹10",
    period: "per rental service",
    description: "Best value for students to earn and share knowledge",
    features: [
      "Upload your book details easily",
      "Earn ₹50 per rental on each book",
      "We handle pickup & delivery between peers",
      "Monthly payout to book owners",
      "Extra perks for active contributors"
    ],
    popular: false,
    buttonText: "Subscribe now"
  },
];

const Pricing: React.FC = () => {
  return (
    <section id="subscription" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple, Affordable Book Rental Plans</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose a plan that fits your reading needs. No hidden charges—just easy and affordable access to books.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${plan.popular ? 'border-brand-orange shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-brand-orange text-white text-xs font-semibold px-3 py-1 rounded-bl-md">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pt-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-500 mb-4">{plan.description}</p>
                <div className="flex justify-center items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-brand-green mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Link href='/contact'>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-brand-orange hover:bg-brand-orange/90' : 'bg-brand-green hover:bg-brand-green/90'}`}
                >
                  {plan.buttonText}
                </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">
          All plans are flexible and can be modified anytime. Need a custom plan for your college or group?
            <a href="/contact" className="text-brand-orange ml-1 hover:underline">Contact us</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
