import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  const [, setLocation] = useLocation();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    localStorage.setItem("isSignedIn", "true");
    setLocation("/workflows");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Sign In
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 text-lg"
          >
            Sign In
          </Button>
        </form>
        {/* Additional Options */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
