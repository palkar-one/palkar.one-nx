'use client'
import { SignedIn, SignedOut, SignInButton, UserButton, RedirectToSignIn } from "@clerk/nextjs";
import { Briefcase, BriefcaseBusiness, HomeIcon, LogIn, MenuIcon, MessageSquare, PersonStanding, SearchIcon, UsersIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

import { categories, states } from "@/lib/constants";

const searchFilters = categories.map((item) => item.display).concat(states["Tamil Nadu"]);

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setQuery(input);

        // Suggest words based on input
        if (input) {
        const filtered = searchFilters.filter((item) =>
            item.toLowerCase().startsWith(input.toLowerCase())
        );
        setSuggestions(filtered);
        } else {
        setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        setSuggestions([]);
    };

    const handleSubmit = (event:any) => {
        event.preventDefault(); // Prevent default form submission behavior
    
        // Construct the URL with query parameters
        const url = `/listing?query=${encodeURIComponent(query)}`; 
    
        // Redirect to the new URL
        window.location.href = url; 
      };

    return (
        <div className="flex items-center p-2 max-w-6xl mx-auto space-x-2">
            <Link className="flex-shrink-0" href="/">
                <Image
                    className="rounded-lg"
                    src="/icon.png"
                    width={40}
                    height={40}
                    alt="logo"        
                />
            </Link>
        
            <div className="flex-1">
                <form onSubmit={handleSubmit} className="flex items-center bg-gray-100 p-2 rounded-md flex-1 mx-2 custom-xs sm:max-w-[12rem] md:max-w-[16rem]">
                    <SearchIcon className="h-4 flex-shrink-0 text-gray-600" />
                    <input 
                        type="text" 
                        value={query}
                        placeholder="Search" 
                        list="countries" 
                        onChange={handleInputChange}
                        className="bg-transparent flex-1 outline-none" 
                    />

                    {suggestions.length > 0 && (
                        <ul className="absolute top-12 bg-white border rounded-lg shadow-md mt-2 max-h-48 overflow-y-auto z-10">
                        {suggestions.map((suggestion, index) => (
                            <li
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                            >
                            {suggestion}
                            </li>
                        ))}
                        </ul>
                    )}
                </form>
            </div>

            <div className="hidden sm:flex items-center space-x-4">
                <Link href="/" className="icon">
                    <HomeIcon className="h-5"/ >
                    <p className="">Home</p>
                </Link>

            {/* <Link href="/" className="icon hidden md:flex">
                <UsersIcon className="h-5"/ >
                <p>Network</p>
            </Link> */}

            {/* <Link href="/" className="icon hidden md:flex">
                <Briefcase className="h-5"/ >
                <p>Jobs</p>
            </Link> */}

            {/* <Link href="/" className="icon hidden md:flex">
                <MessageSquare className="h-5"/ >
                <p>Messaging</p>
            </Link> */}
            <Link href="/about" className="icon items-center space-x-1 hidden md:flex">
                <PersonStanding className="h-5"/ >
                <p>About Us</p>
            </Link>

            <Link href="/listing" className="icon items-center space-x-1 hidden md:flex">
                <BriefcaseBusiness className="h-5"/ >
                <p>Listings</p>
            </Link>

            <SignedIn>
                <UserButton/>
            </SignedIn>
            

            <SignedOut>
                <SignInButton mode="modal">
                <button
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-all"
                    aria-label="Sign In"
                >
                    <LogIn className="w-5 h-5 text-gray-700" />
                </button>
                </SignInButton>
            </SignedOut>
        </div>
        <div className="flex sm:hidden items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-all"
          aria-label="Menu"
        >
          {menuOpen ? (
            <XIcon className="w-5 h-5 text-gray-700" />
          ) : (
            <MenuIcon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>
        {menuOpen && (
            <div className="absolute top-16 right-0 w-1/2 bg-white shadow-lg rounded-md z-50">
            <div className="flex flex-col space-y-2 p-4">
                <a href="/" className="flex items-center space-x-2">
                <HomeIcon className="h-5" />
                <p>Home</p>
                </a>
                <a href="/listing" className="flex items-center space-x-2">
                <BriefcaseBusiness className="h-5" />
                <p>Listings</p>
                </a>
                <a href="/about" className="flex items-center space-x-2">
                <PersonStanding className="h-5" />
                <p>About Us</p>
                </a>
                <SignedIn>
                <button className="flex items-center space-x-2">
                    <UserButton />
                    <p>Profile</p>
                </button>
                </SignedIn>
                <SignedOut>
                <SignInButton mode="modal">
                    <button
                    className="flex items-center space-x-2 border-gray-300 hover:bg-gray-100"
                    aria-label="Sign In"
                    >
                    <LogIn className="w-5 h-5 text-gray-700" />
                    <span>Sign In</span>
                    </button>
                </SignInButton>
                </SignedOut>
            </div>
            </div>
        )}
        </div>
    )
}

export default Header;