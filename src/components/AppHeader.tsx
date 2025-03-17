import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AppHeader = ({
  setIsSignedIn,
}: {
  setIsSignedIn: (value: boolean) => void;
}) => {
  const isSignedIn = localStorage.getItem("isSignedIn") === "true";

  const handleSignOut = () => {
    localStorage.removeItem("isSignedIn");
    setIsSignedIn(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 h-14 flex items-center px-20 justify-between sticky top-0 z-50 shadow-md">
      {/* Left: Brand & Navigation Links */}
      <div className="flex items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-primary font-bold text-xl flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-8 w-8 mr-2"
            fill="currentColor"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#8B4513"
              strokeWidth="8"
              fill="none"
            />
            <circle cx="50" cy="50" r="10" fill="#8B4513" />
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 35 * Math.cos((i * Math.PI) / 4)}
                y2={50 + 35 * Math.sin((i * Math.PI) / 4)}
                stroke="#8B4513"
                strokeWidth="8"
              />
            ))}
          </svg>
          <span>Ocuris</span>
        </Link>

        {/* Product Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-8">
              Product
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            alignOffset={5}
            className="z-50 mt-2 shadow-lg border bg-white"
          >
            {/* <DropdownMenuLabel>Product Features</DropdownMenuLabel> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/product/features">Rules</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/product/integrations">Workflows</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/product/pricing">AI</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Other Navigation Links */}
        {!isSignedIn && (
          <nav className="ml-8 flex space-x-6">
            <Link
              href="/use-cases"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Use cases
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Docs
            </Link>
            <Link
              href="/community"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Community
            </Link>
            <Link
              href="/enterprise"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Enterprise
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Pricing
            </Link>
          </nav>
        )}
      </div>

      {/* Right: Sign in, Get started, Help, Notifications & Avatar */}
      <div className="flex items-center">
        {!isSignedIn ? (
          <>
            <Link
              href="/sign-in"
              className="rounded-full border-2 hover:bg-yellow-500 text-black px-4 py-1 text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/get-started"
              className="ml-4 rounded-full bg-yellow-400 border-2 hover:bg-yellow-500 text-black px-4 py-1 text-sm"
            >
              Get started
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/account"
              className="rounded-full border-2 hover:bg-yellow-500 text-black px-4 py-1 text-sm"
            >
              My Account
            </Link>
            <Link
              href="/"
              className="ml-6 rounded-full bg-yellow-400 border-2 hover:bg-yellow-500 text-black px-4 py-1 text-sm"
              onClick={handleSignOut}
            >
              Sign out
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
export default AppHeader;
