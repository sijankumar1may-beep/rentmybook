import React from "react";

const Workingmodel = () => {
  return (
    <>
      <section className="py-14 px-6 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow font-bold">
            1. Choose your book
          </div>
          <div className="bg-white p-6 rounded-xl shadow font-bold">
            2. Get it delivered to your room
          </div>
          <div className="bg-white p-6 rounded-xl shadow font-bold">
            3. Use it for minimum 30 days
          </div>
          <div className="bg-white p-6 rounded-xl shadow font-bold">
            4. Return it easily
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4 font-bold">
          Late return? Just ₹4/day after 30 days.
        </p>
      </section>
      <section className="bg-white py-14 px-6 bg-gray-400">
        <h2 className="text-2xl font-bold text-center mb-10">
          Why Rent Instead of Buying?
        </h2>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-6 bg-red-300">
            <h3 className="font-semibold mb-2">Buying a Book</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Costs ₹300–₹1000</li>
              <li>• Used once or twice</li>
              <li>• Hard to resell</li>
            </ul>
          </div>
          <div className="border rounded-xl p-6 bg-green-300">
            <h3 className="font-semibold mb-2">RentMyBook</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• ₹90 for 30 days</li>
              <li>• Home delivery</li>
              <li>• No ownership headache</li>
              <li>• Save tree</li> 
            </ul>
          </div>
        </div>
      </section>
      <section className="py-14 px-6  mx-auto">
<h2 className="text-2xl font-bold text-center mb-8">Books Available for Rent</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
<div className="bg-white p-6 rounded-xl shadow">📘 Competitive Exam Books<br /><span className="text-sm text-gray-600">SSC, Banking, Railway</span></div>
<div className="bg-white p-6 rounded-xl shadow">📗 Class 11–12 Reference Books</div>
<div className="bg-white p-6 rounded-xl shadow">📙 College Core Subject Books</div>
</div>
</section>
<section className="bg-orange-400 text-white py-12 px-6 text-center">
<h2 className="text-2xl font-bold mb-4">Local & Student‑Friendly</h2>
<p className="text-white">
📍 Currently serving New Ashok Nagar & nearby areas<br />
Fast delivery · Simple pricing · No security deposit
</p>
</section>
<section className="py-14 px-6 mx-auto text-center" id="faq">
<h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
<div className="space-y-6">
<div>
<h4 className="font-semibold">Is there any security deposit?</h4>
<p className="text-gray-600">No. We do not take any security deposit.</p>
</div>
<div>
<h4 className="font-semibold">What if I return the book late?</h4>
<p className="text-gray-600">After 30 days, ₹4/day will be charged.</p>
</div>
<div>
<h4 className="font-semibold">How do I return the book?</h4>
<p className="text-gray-600">Return pickup is included in the ₹40 logistics fee.</p>
</div>
<div>
<h4 className="font-semibold">What if the book gets damaged?</h4>
<p className="text-gray-600">Normal usage is fine. Major damage may be charged.</p>
</div>
</div>
</section>

    </>
  );
};

export default Workingmodel;
