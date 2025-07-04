"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, CheckSquare, Cat, Dog, Menu, X } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800">
      <div className="flex justify-between items-center px-4 py-3 md:hidden">
        <span className="text-white text-lg font-bold">Menu</span>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden px-4 pb-4 space-y-2`}
      >
        <Link
          href="/"
          className={`flex items-center space-x-2 text-base font-medium hover:bg-gray-800 active:bg-gray-600 rounded-md px-3 py-2 transition-all duration-150 ${
            isActive("/") ? "text-white bg-gray-700" : "text-gray-400"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link
          href="/todos"
          className={`flex items-center space-x-2 text-base font-medium hover:bg-gray-800 active:bg-gray-600 rounded-md px-3 py-2 transition-all duration-150 ${
            isActive("/todos") ? "text-white bg-gray-700" : "text-gray-400"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Todos</span>
        </Link>
        <Link
          href="/cats"
          className={`flex items-center space-x-2 text-base font-medium hover:bg-gray-800 active:bg-gray-600 rounded-md px-3 py-2 transition-all duration-150 ${
            isActive("/cats") ? "text-white bg-gray-700" : "text-gray-400"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Cat className="w-4 h-4" />
          <span>Cats</span>
        </Link>
        <Link
          href="/dogs"
          className={`flex items-center space-x-2 text-base font-medium hover:bg-gray-800 active:bg-gray-600 rounded-md px-3 py-2 transition-all duration-150 ${
            isActive("/dogs") ? "text-white bg-gray-700" : "text-gray-400"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Dog className="w-4 h-4" />
          <span>Dogs</span>
        </Link>
      </div>

      <div className="hidden md:flex justify-center items-center py-4">
        <Link
          href="/"
          className={`flex items-center space-x-2 text-xl lg:text-2xl font-bold hover:bg-gray-800 active:bg-gray-600 rounded-md px-6 lg:px-10 py-1 transition-all duration-150 ${
            isActive("/") ? "text-white" : "text-gray-400"
          }`}
        >
          <Home className="w-5 h-5 lg:w-6 lg:h-6" />
          <span>Home</span>
        </Link>
        <Link
          href="/todos"
          className={`flex items-center space-x-2 text-xl lg:text-2xl font-bold hover:bg-gray-800 active:bg-gray-600 rounded-md px-6 lg:px-10 py-1 transition-all duration-150 ${
            isActive("/todos") ? "text-white" : "text-gray-400"
          }`}
        >
          <CheckSquare className="w-5 h-5 lg:w-6 lg:h-6" />
          <span>Todos</span>
        </Link>
        <Link
          href="/cats"
          className={`flex items-center space-x-2 text-xl lg:text-2xl font-bold hover:bg-gray-800 active:bg-gray-600 rounded-md px-6 lg:px-10 py-1 transition-all duration-150 ${
            isActive("/cats") ? "text-white" : "text-gray-400"
          }`}
        >
          <Cat className="w-5 h-5 lg:w-6 lg:h-6" />
          <span>Cats</span>
        </Link>
        <Link
          href="/dogs"
          className={`flex items-center space-x-2 text-xl lg:text-2xl font-bold hover:bg-gray-800 active:bg-gray-600 rounded-md px-6 lg:px-10 py-1 transition-all duration-150 ${
            isActive("/dogs") ? "text-white" : "text-gray-400"
          }`}
        >
          <Dog className="w-5 h-5 lg:w-6 lg:h-6" />
          <span>Dogs</span>
        </Link>
      </div>
    </nav>
  );
}
