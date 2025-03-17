import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Footer from "./Footer";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscriptionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${BASE_URL}/v1/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess("Thank you for subscribing!");
        setEmail(""); // Clear the input field
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen bg-gray-50 flex flex-col items-center justify-between p-6 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Welcome to Ocuris
        </h1>
        <p className="text-lg text-gray-600">
          Automate your workflows, create rules, and leverage AI to build
          powerful automation pipelines.
        </p>
      </section>

      {/* CTA Buttons */}
      <section className="w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <Link href="/create-rule">
            <Button className="w-full py-3 text-lg">Create Rules</Button>
          </Link>
          <Link href="/workflows">
            <Button className="w-full py-3 text-lg">Create Workflow</Button>
          </Link>
          <Link href="/ai-workflow">
            <Button className="w-full py-3 text-lg bg-yellow-600 hover:bg-yellow-700 flex items-center justify-center space-x-2">
              <Star className="w-5 h-5 animate-pulse" />
              <span>Use AI Workflow</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="max-w-5xl w-full text-center space-y-8">
        <h2 className="text-4xl font-bold text-gray-900">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="/usecase.png"
            alt="What We Do"
            className="w-full rounded-lg shadow-lg"
          />
          <p className="text-lg text-gray-600 leading-relaxed">
            At Ocuris, we help businesses streamline their processes by
            automating repetitive tasks, enhancing productivity, and reducing
            human error. Our platform allows you to create custom workflows
            tailored to your specific needs.
          </p>
        </div>
      </section>

      {/* What We Will Do Section */}
      <section className="max-w-5xl w-full text-center space-y-8">
        <h2 className="text-4xl font-bold text-gray-900">What We Will Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            Our vision is to continuously innovate, integrating cutting-edge AI
            capabilities to make workflow automation smarter, more efficient,
            and accessible to businesses of all sizes. Expect new tools,
            seamless integrations, and a future-proof platform.
          </p>
          <img
            src="/usecase.png"
            alt="What We Will Do"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Subscription Section */}
      <section className="rounded border max-w-5xl w-full bg-gray-300 p-10 shadow-lg text-center border-2">
        <h3 className="rounded text-3xl font-semibold text-red-900 mb-4">
          Stay Updated
        </h3>
        <p className="rounded text-lg text-gray-600 mb-6">
          Subscribe to our newsletter for the latest updates, new features, and
          AI workflow insights.
        </p>
        <form
          onSubmit={handleSubscriptionSubmit}
          className="rounded flex flex-col gap-4 md:flex-row justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
            className="w-full md:w-1/3 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="rounded w-full md:w-1/3 bg-yellow-600 hover:bg-yellow-700 py-3 text-lg"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {success && <p className="mt-4 text-green-500">{success}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
