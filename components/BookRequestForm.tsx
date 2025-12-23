import { useState } from "react";

type Props = {
  initialBookName?: string;
};

export default function BookRequestForm({ initialBookName = "" }: Props) {
  const [bookName, setBookName] = useState(initialBookName);
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [fetchingAddress, setFetchingAddress] = useState(false);

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
        setLocation(`${readableAddress}: Google Map Link ${mapLink}`);
        setFetchingAddress(false);
        // Example: store or send to WhatsApp
      },
      (error) => {
        setFetchingAddress(false);
        alert("Unable to fetch location. Please enter address manually.");
      }
    );
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `
Hi RentMyBook 👋

I’m looking for the following book for rent:

📘 Book: ${bookName}
✍️ Author: ${author || "Not specified"}
📍 Location: ${location || "Not specified"}

Please let me know if it’s available.
    `.trim();
    const whatsappNumber = "91XXXXXXXXXX"; // your WhatsApp number
    const whatsappUrl = `https://wa.me/${919910646415}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white rounded-xl shadow-sm border p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Request a Book 📚</h2>

      <p className="text-sm text-gray-600 text-center">
        We’ll check availability and confirm on WhatsApp.
      </p>

      {/* Book Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Book Name *</label>
        <input
          required
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="e.g. Atomic Habits"
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
        />
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Author (optional)
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g. James Clear"
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
        />
      </div>

      {/* Location */}
      <div className="relative">
        <label className="text-sm font-medium mb-1">City / Area</label>
        
        <button
        type="button"
          onClick={() => {
            setFetchingAddress(true);
            getMyCurrentLocation();
          }}
          className="underline  text-sm  mx-3 font-medium mb-1"
        >
          Fetch my current address
        </button>
        {fetchingAddress && (
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
        <input
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          placeholder="e.g. Noida"
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-3 rounded-md transition-colors"
      >
        Check Availability on WhatsApp
      </button>
    </form>
  );
}
