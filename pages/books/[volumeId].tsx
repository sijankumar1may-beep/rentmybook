import { useRouter } from "next/router";
import { BookItem } from "@/lib/bookDataModel";
import { GetServerSideProps } from "next";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import Script from "next/script";
import Link from "next/link";
const BookInfo = (props: { bookData: BookItem }) => {
  const {toast}=useToast();
  const { volumeInfo, saleInfo, accessInfo } = props?.bookData;
  const { addToCart } = useCart();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const coverImage =
    volumeInfo.imageLinks?.extraLarge ||
    volumeInfo.imageLinks?.large ||
    volumeInfo.imageLinks?.medium ||
    volumeInfo.imageLinks?.smallThumbnail ||
    "/placeholder.png";

  return (
    <div className="container min-h-screen bg-gray-50">
      {/* <Script type="text/javascript" src="https://www.google.com/books/jsapi.js"  strategy="beforeInteractive"/>
      <Script type="text/javascript" src="https://www.google.com/books/jsapi.js"  strategy="afterInteractive">
      {
        `google.books.load();
         function initialize() {
        var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
        viewer.load('ISBN:0738531367');
      }

      google.books.setOnLoadCallback(initialize);`
      }</Script> */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Book Cover */}
          <div className="flex justify-center">
            <img
              src={coverImage.replace("http://", "https://")}
              alt={volumeInfo.title}
              className="w-[260px] h-[390px] object-contain rounded-xl shadow-lg bg-white p-4"
            />
          </div>

          {/* Book Info */}
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {volumeInfo.title}
            </h1>

            {volumeInfo.subtitle && (
              <h2 className="text-lg text-gray-600">{volumeInfo.subtitle}</h2>
            )}

            <div className="space-y-1 text-gray-700">
              {volumeInfo.authors && (
                <p>
                  <span className="font-medium">Author:</span>{" "}
                  {volumeInfo.authors.join(", ")}
                </p>
              )}

              {volumeInfo.publisher && (
                <p>
                  <span className="font-medium">Publisher:</span>{" "}
                  {volumeInfo.publisher}
                </p>
              )}

              {volumeInfo.publishedDate && (
                <p>
                  <span className="font-medium">Published:</span>{" "}
                  {volumeInfo.publishedDate}
                </p>
              )}

              <p>
                <span className="font-medium">Language:</span>{" "}
                {volumeInfo.language?.toUpperCase()}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {volumeInfo.averageRating}
              </span>

              {volumeInfo.categories?.map((cat: string) => (
                <span
                  key={cat}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Pricing */}
            {saleInfo?.listPrice && (
              <div className="border rounded-xl p-5 bg-white flex items-center justify-between mt-4">
                <div>
                  <p className="text-sm text-gray-700">
                    Print Price: ₹{saleInfo.listPrice.amount}
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => {
                toast({
                  title: "Book added to cart",
                  description: `${volumeInfo?.title} added to cart.`,
                });
                addToCart(props?.bookData);
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Rent Now at Rs 3 per Day
            </button>
            {/* Access Info */}
            <div className="flex gap-4 text-sm text-gray-600 mt-2">
              {accessInfo?.epub?.isAvailable && <span>📘 EPUB Available <a></a></span>}
              {accessInfo?.pdf?.isAvailable && <span>📄 PDF Available</span>}
              {accessInfo?.viewability && (
                <span>👀 View: {accessInfo.viewability}</span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {volumeInfo.description && (
          <div className="mt-10 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">About this book</h3>

            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: volumeInfo.description,
              }}
            />
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <InfoBox label="Pages" value={volumeInfo.pageCount} />
        </div>
      </div>
      {totalItems > 0 && (
        <Link
          className="fixed bottom-1 z-30 p-[1rem] bg-orange-600 hover:bg-green-600 w-[90%] md:hidden text-center rounded-full text-white"
          href="/cart"
        >
          Place order
        </Link>
      )}
      {/* <div id="viewerCanvas" style={{width: "600px", height: "500px"}}></div> */}
    </div>
  );
};

function InfoBox({ label, value }: { label: string; value?: string | number }) {
  if (!value) return null;
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const bookDataAPI = "https://www.googleapis.com/books/v1/volumes";
  const volumeId = context?.params?.volumeId;
  const data = await fetch(`${bookDataAPI}/${volumeId}?projection=full`);
  console.log("data", data);
  if (!data.ok) {
    return {
      notFound: true,
    };
  }
  const bookData = await data.json();
  console.log("bookDatainBookInfo", bookData);

  return {
    props: {
      bookData: bookData,
    },
  };
};

export default BookInfo;
