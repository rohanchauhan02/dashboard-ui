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
import { HelpCircle, Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AppHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 justify-between">
      {/* Left: Brand & Navigation Links */}
      <div className="flex items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-primary font-bold text-xl flex items-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M17 7L7 17M7 7H17V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Orchestra</span>
        </Link>

        {/* Product Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-8">
              Product
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="z-50 mt-2 shadow-lg border bg-white"
          >
            <DropdownMenuLabel>Product Features</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/product/features">Features</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/product/integrations">Integrations</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/product/pricing">Pricing</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Other Navigation Links */}
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
      </div>

      {/* Right: Sign in, Get started, Help, Notifications & Avatar */}
      <div className="flex items-center">
        <Link
          href="/sign-in"
          className="rounded-full border-2 hover:bg-yellow-500 text-black px-3   py-1 text-lg"
        >
          Sign in
        </Link>
        <Link href="/get-started">
          <Button className="rounded-full bg-yellow-400 border-2 hover:bg-yellow-500 text-black px-6 py-3 text-lg">
            Get started
          </Button>
        </Link>
        {/* <Button variant="ghost" size="icon" className="ml-6">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="ml-2">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar className="ml-4">
          <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
        </Avatar> */}
      </div>
    </header>
  );
};
export default AppHeader;
