

const CheckoutSuccess=()=>{
    return(
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-4">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-brand-orange mb-2">Order Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
          <p className="text-sm text-brand-orange">Order ID:</p>
          <p className="font-semibold text-gray-700 mb-2">#MC123456</p>
          <p className="text-sm text-brand-orange">Date:</p>
          <p className="font-semibold text-gray-700 mb-2">{new Date().toString()}</p>
        </div>

        <button
          onClick={() => window.location.href = '/#menu'}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl transition"
        >
          Back to Food Menu
        </button>
      </div>
    </div>
    )
}

export default CheckoutSuccess;