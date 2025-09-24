"use client";
import React, { useEffect, useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import Image from "next/image";

import { useAppContext } from "@/context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();

  const [theme, setTheme] = useState("light");

    useEffect(() => {
    // Read saved theme (if any) or detect system preference
    try {
      const saved = localStorage.getItem("theme");
      if (saved) {
        setTheme(saved);
        document.documentElement.classList.toggle("dark", saved === "dark");
      } else {
        const prefersDark =
          window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = prefersDark ? "dark" : "light";
        setTheme(initial);
        document.documentElement.classList.toggle("dark", initial === "dark");
      }
    } catch (e) {
      console.warn("could not read theme", e);
    }
  }, []);

    const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (e) {
      // ignore
    }
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 h-16">
      <Image
        className="cursor-pointer w-30 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/shop" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact us
        </Link>
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>
      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
          className="p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {user ? 
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')}/>
              </UserButton.MenuItems>
            </UserButton>
          </>
        :
          <button
            className="flex items-center gap-2 hover:text-gray-900 transition"
            onClick={openSignIn}
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        }
      </ul>
      <div className="flex items-center gap md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
          className="p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {user ? 
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/shop')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')}/>
              </UserButton.MenuItems>
            </UserButton>
          </>
        :
          <button
            className="flex items-center gap-2 hover:text-gray-900 transition"
            onClick={openSignIn}
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        }
      </div>
    </nav>
  );
};

export default Navbar;
