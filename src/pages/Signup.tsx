import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="border-2 w-full max-w-md bg-white p-8 rounded shadow-lg space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-900">Sign Up for Ocuris</h1>
        <p className="text-gray-600 text-center">Create an account to start automating your workflows.</p>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Button type="submit" className="rounded w-full bg-yellow-400 hover:bg-blue-400 py-3 text-lg">
            Sign Up
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-purple-600 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
