import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-12 px-2 sm:px-6">
      {/* TITLE */}
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {/* ORDERS LIST */}
      <div className="space-y-4">
        
        {/* SAFE CHECK */}
        {products && products.length > 0 ? (
          products.slice(1, 4).map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-4 border border-gray-200 rounded-sm"
            >
              {/* LEFT SIDE */}
              <div className="flex items-start gap-5">
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={item.image?.[0]}
                  alt={item.name}
                />

                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                    <p className="font-semibold text-black">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Date: <span>25 Jul 2024</span>
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                {/* STATUS */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <p className="text-sm text-gray-700">Ready to ship</p>
                </div>

                {/* BUTTON */}
                <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition">
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
