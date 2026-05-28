import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* TITLE */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* NAME (only for Sign Up) */}
      {currentState === "Sign Up" && (
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      {/* EMAIL */}
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email address"
        required
      />

      {/* PASSWORD */}
      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      {/* LINKS */}
      <div className="w-full flex justify-between text-sm -mt-2">
        <p className="cursor-pointer">Forgot your password?</p>

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4 hover:opacity-80 active:bg-gray-700 transition"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;