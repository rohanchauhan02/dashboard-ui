import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-between p-6 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl">
        <h1 className="text-5xl font-extrabold text-gray-900">Welcome to Ocuris</h1>
        <p className="text-lg text-gray-600">
          Automate your workflows, create rules, and leverage AI to build powerful automation pipelines.
        </p>
      </section>

      {/* CTA Buttons */}
      <section className="w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <Link href="/create-rule">
            <Button className="w-full py-3 text-lg">Create Rules</Button>
          </Link>
          <Link href="/create-workflow">
            <Button className="w-full py-3 text-lg">Create Workflow</Button>
          </Link>
          <Link href="/ai-workflow">
            <Button className="w-full py-3 text-lg bg-yellow-600 hover:bg-blue-700 flex items-center justify-center space-x-2">
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
            At Ocuris, we help businesses streamline their processes by automating repetitive tasks,
            enhancing productivity, and reducing human error. Our platform allows you to create custom
            workflows tailored to your specific needs.
          </p>
        </div>
      </section>

      {/* What We Will Do Section */}
      <section className="max-w-5xl w-full text-center space-y-8">
        <h2 className="text-4xl font-bold text-gray-900">What We Will Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            Our vision is to continuously innovate, integrating cutting-edge AI capabilities to make workflow
            automation smarter, more efficient, and accessible to businesses of all sizes. Expect new tools,
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
      <section className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">Stay Updated</h3>
        <p className="text-lg text-gray-600 mb-6">
          Subscribe to our newsletter for the latest updates, new features, and AI workflow insights.
        </p>
        <form className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full md:w-2/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Button type="submit" className="w-full md:w-1/3 bg-purple-600 hover:bg-purple-700 py-3 text-lg">
            Subscribe
          </Button>
        </form>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
