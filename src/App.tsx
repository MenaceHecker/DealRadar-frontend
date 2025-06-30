import React from 'react';
import './App.css'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface Product {
  url: string;
  product_name: string;
  current_price_raw: string;
  availability: string;
  last_scraped_timestamp: string;
}

function App() {
  // --- Updated static/dummy data for products ---
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
      current_price_raw: "$449.00",
      availability: "In Stock",
      last_scraped_timestamp: "2025-06-01T18:30:00.000Z"
    }
  ];
  // --- End of updated static data ---


  const chartData = products.map(product => ({
    name: product.product_name.substring(0, 20) + '...', 
    price: parseFloat(product.current_price_raw.replace(/[^0-9.-]+/g, "")) 
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-10 font-sans text-gray-800">

      {/* Navbar */}
      <nav className="bg-white rounded-xl shadow-lg p-4 mb-8 flex flex-col sm:flex-row justify-between items-center border-b-4 border-purple-500">
        <div className="text-2xl sm:text-3xl font-extrabold text-purple-800 mb-4 sm:mb-0">
          DealRadar
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200">
            Search
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <header className="text-center mb-12 p-6 bg-white rounded-xl shadow-lg border-b-4 border-blue-500">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-800 tracking-tight leading-tight">
          DealRadar Dashboard
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
          Your vigilant eye on price drops and availability for products you track.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 px-2 border-l-4 border-blue-400 pl-3">
          Current Tracked Products
        </h2>

        {products.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center border border-gray-200">
            <p className="text-gray-600 text-lg">No dummy products to display. Add some to the 'products' array in App.tsx!</p>
          </div>
        ) : (
          <>
            {/* Bar Graph Section */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Product Prices Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                  <Legend />
                  <Bar dataKey="price" fill="#8884d8" name="Current Price" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
              {products.map((product) => (
                <div
                  key={product.url}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200
                             hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out
                             flex flex-col justify-between"
                >
                  <div>
                    {/* Product Name */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight min-h-[3.5em] line-clamp-2">
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors duration-200"
                        title={product.product_name} // Show full name on hover
                      >
                        {product.product_name}
                      </a>
                    </h3>

                    {/* Price */}
                    <p className="text-3xl font-extrabold text-green-700 mb-4 tracking-tight">
                      {product.current_price_raw || 'N/A'}
                    </p>
                  </div>

                  {/* Availability Badge */}
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold capitalize mb-3
                                     ${product.availability.includes('In Stock') ? 'bg-green-100 text-green-800' :
                        product.availability.includes('Limited Stock') ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                      {product.availability}
                    </span>

                    {/* Last Scraped Timestamp */}
                    <p className="text-xs text-gray-500 mt-auto">
                      Last Scraped: {new Date(product.last_scraped_timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center mt-12 p-6 bg-white rounded-xl shadow-lg text-gray-600 text-sm border-t-4 border-blue-500">
        <p>&copy; {new Date().getFullYear()} DealRadar. All rights reserved.</p>
        <p className="mt-2">Stay informed, save more!</p>
      </footer>
    </div>
  );
}

export default App;