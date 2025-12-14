

const Futureplane=()=>{

return( <section className="bg-gray-200 py-14 px-6">
        <div className="mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">What’s Coming Next 🚀</h2>
          <p className="text-gray-600 mb-10">
            We’re starting simple. More student-friendly features are on the way.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">📚 Earn From Your Books</h3>
              <p className="text-sm text-gray-600">
                Have unused books? Upload them and earn when other students rent them.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">🔁 Long-Term Rentals</h3>
              <p className="text-sm text-gray-600">
                Special options for semester-long and exam preparation needs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-2">📦 Bigger Collection</h3>
              <p className="text-sm text-gray-600">
                More exam books and college textbooks added regularly.
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-8">
            These features are coming soon. Pricing and availability may vary.
          </p>
        </div>
      </section>)
}

export default Futureplane;