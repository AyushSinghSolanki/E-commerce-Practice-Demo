import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { cartItems, products, currency, delivery_fee } =
    useContext(ShopContext);

  const navigate = useNavigate();

  const [method, setMethod] = useState("stripe");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getSubtotal = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        total += product.price * cartItems[itemId][size];
      }
    }

    return total;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    navigate("/order");
  };

  const inputClass = "w-full p-3 outline-none border border-gray-200 text-sm";

  return (
    <form className="flex flex-col lg:flex-row justify-between gap-12 pl-2 pr-6 py-10 border-t">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-[55%]">
        <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
          DELIVERY INFORMATION
          <span className="w-10 h-0.5 bg-black"></span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            onChange={handleChange}
            placeholder="First name"
            className={inputClass}
          />
          <input
            name="lastName"
            onChange={handleChange}
            placeholder="Last name"
            className={inputClass}
          />
        </div>

        <input
          name="email"
          onChange={handleChange}
          placeholder="Email address"
          className={`${inputClass} mt-4`}
        />

        <input
          name="street"
          onChange={handleChange}
          placeholder="Street"
          className={`${inputClass} mt-4`}
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            name="city"
            onChange={handleChange}
            placeholder="City"
            className={inputClass}
          />
          <input
            name="state"
            onChange={handleChange}
            placeholder="State"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            name="zipcode"
            onChange={handleChange}
            placeholder="Zipcode"
            className={inputClass}
          />
          <input
            name="country"
            onChange={handleChange}
            placeholder="Country"
            className={inputClass}
          />
        </div>

        <input
          name="phone"
          onChange={handleChange}
          placeholder="Phone"
          className={`${inputClass} mt-4`}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[40%]">
        <h2 className="text-lg font-semibold flex items-center gap-3 mb-6">
          CART TOTALS
          <span className="w-10 h-0.5 bg-black"></span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {currency}
              {getSubtotal()}
            </p>
          </div>

          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>
              {currency}
              {delivery_fee}
            </p>
          </div>

          <div className="border-t border-black pt-3 flex justify-between font-bold">
            <p>Total</p>
            <p>
              {currency}
              {getSubtotal() + delivery_fee}
            </p>
          </div>
        </div>

        {/* PAYMENT */}
        <h2 className="text-lg font-semibold flex items-center gap-3 mt-10 mb-6">
          PAYMENT METHOD
          <span className="w-10 h-0.5 bg-black"></span>
        </h2>

        {/* STRIPE */}
        <div
          onClick={() => setMethod("stripe")}
          className="flex items-center justify-between p-3 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full border border-black ${
                method === "stripe" ? "bg-blue-500" : ""
              }`}
            ></div>
            <img src={assets.stripe_logo} className="h-5" />
          </div>
        </div>

        {/* RAZORPAY */}
        <div
          onClick={() => setMethod("razorpay")}
          className="flex items-center justify-between p-3 mt-3 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full border border-black ${
                method === "razorpay" ? "bg-blue-500" : ""
              }`}
            ></div>
            <img src={assets.razorpay_logo} className="h-5" />
          </div>
        </div>

        {/* COD */}
        <div
          onClick={() => setMethod("cod")}
          className="flex items-center justify-between p-3 mt-3 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full border border-black ${
                method === "cod" ? "bg-blue-500" : ""
              }`}
            ></div>
            <p className="text-sm font-medium">CASH ON DELIVERY</p>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-black text-white py-3 mt-8 hover:opacity-80"
        >
          PLACE ORDER
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
