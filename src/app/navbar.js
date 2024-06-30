"use client";
import React, { useState, useEffect } from 'react';

function Navbar () {
    const [isClick, setisClick] = useState(false);
    const toggleNavbar = () => {
        setisClick(!isClick);
    };
    const [header, setHeader] = useState(false);
    const scrollHeader = () => {
        if (window.scrollY >= 42) {
            setHeader(true);
        } else { setHeader(false); }
    };
    useEffect(() => {
        window.addEventListener('scroll',scrollHeader);
        return () => {
            window.addEventListener('scroll',scrollHeader);
        };
    }, []);
    return (
        <>
        <div className={header ? "mx-auto px-4 sm:px-6 lg:px-8 fixed bg-[black] transition-all duration-500":"bg-[black] transition-all duration-500"}>
            <div className="header flex justify-end items-center h-16"> 
                <div className="flex items-center space-x-8 ">

                </div>
                <div className="flex md:block justify-center">
                    <div className="ml-4 flex justify-center space-x-4">
                    
                    </div>
                    <div className={header ? "md:block flex items-center bg-[transparent]":"bg-[transparent]"}>
                        <button className="header inline-flex items-center justify-end p-0 rounded-lg text-white md:text-white hover:text-white focus:outline-none focus:ring-inset focus:ring-white" onClick={toggleNavbar}>
                            {isClick ? (<svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6112 12" />
                            </svg>) : (<svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 6h15M4 12h16m-7 6h7" />
                            </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {isClick && (
<div className={header ? "md:hidden  mx-auto px-4 sm:px-6 lg:px-8 fixed bg-[black] transition-all duration-100":"bg-[black] transition-all duration-100"}>
<div className="header flex h-400 px-8 pt-2 fixed pb-3 space-y-1 sm:px-6">
                        <a href="/" className="header block text-white hover:bg-white hover:text-black rounded-lg p-2">Home</a>
                        <a href="/" className="header block text-white hover:bg-white hover:text-black rounded-lg p-2">About</a>
                        <a href="/" className="header block  text-white hover:bg-white hover:text-black rounded-lg p-2">Events</a>
                        <a href="/" className="header block  text-white hover:bg-white hover:text-black rounded-lg p-2">Sponsors</a>
                        <a href="/" className="header block  text-white hover:bg-white hover:text-black rounded-lg p-2">Contact</a>
                        <a href="/" className="header block  text-white hover:bg-white  hover:text-black rounded-lg p-2">log in</a>
</div>
</div>
        )
            
        }
        </>
    );
};

export default Navbar;