import React from 'react'; // Removed useState, useEffect as we're using static data for now
import './App.css';

// Interface for our product data structure
interface Product {
  url: string;
  product_name: string;
  current_price_raw: string;
  availability: string;
  last_scraped_timestamp: string;
  // current_price_float?: number; // Optional if not used in static display
}

function App() {
  // --- Using static/dummy data for now ---
  const products: Product[] = [
    {
      url: "https://www.amazon.com/Apple-2025-MacBook-13-inch-Laptop/dp/B0DZDC3WW5/",
      product_name: "Apple 2025 MacBook Air 13-inch Laptop (Dummy Data 1)",
      current_price_raw: "$856.07",
      availability: "In Stock",
      last_scraped_timestamp: "2025-06-01T20:00:00.000Z"
    },
    {
      url: "https://www.amazon.com/Dell-G16-7630-Gaming-Laptop/dp/B0CKD892K1/",
      product_name: "Dell G16 7630 Gaming Laptop (Dummy Data 2)",
      current_price_raw: "$1,399.99",
      availability: "Out of Stock",
      last_scraped_timestamp: "2025-06-01T19:45:00.000Z"
    },
    {
      url: "https://www.example.com/product/headphone-deal",
      product_name: "Wireless Noise-Cancelling Headphones (New Deal)",
      current_price_raw: "$199.50",
      availability: "Limited Stock",
      last_scraped_timestamp: "2025-06-01T20:10:00.000Z"
    },
    {
      url: "https://www.amazon.com/Apple-Bluetooth-Headphones-Personalized-Effortless/dp/B0DGHMNQ5Z/ref=ast_sto_dp_puis?th=1",
      product_name: "Apple AirPods 4",
      current_price_raw: "$119.00",
      availability: "In Stock",
      last_scraped_timestamp: "2025-06-01T18:30:00.000Z"
    }
  ];
  // --- End of static data ---

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
          DealRadar Dashboard
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Monitor your tracked product prices and availability.
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tracked Products</h2>

        {products.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">No dummy products to display. Add some to the 'products' array!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.url} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    {product.product_name}
                  </a>
                </h3>
                <p className="text-2xl font-extrabold text-green-600 mb-2">
                  {product.current_price_raw || 'N/A'}
                </p>
                <p className={`text-sm font-semibold mb-3 ${product.availability.includes('In Stock') ? 'text-green-500' : 'text-red-500'}`}>
                  Availability: {product.availability}
                </p>
                <p className="text-xs text-gray-500">
                  Last Scraped: {new Date(product.last_scraped_timestamp).toLocaleString()}
                </p>
                {/* You could add price change indicators here later */}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
