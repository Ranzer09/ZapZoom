import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "flowbite-react";

import { useState } from "react"; // import state
import Minicart from "./miniCart";

export default function Header() {
    const {logout}=useLogout()
    const {user,loading}=useAuthContext()
    console.log('reloaded header')
    const handleClick=()=>{
        logout()
    }
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false
  if (loading) {
    return <div>Loading...</div>; // Or your loading spinner
}

  return (
    <div className="flex items-start  border-b border-gray-400 bg-gray-200 py-4 px-2">
     
      <nav className="w-full">
        
        <section className="MOBILE-MENU flex justify-between items-baseline lg:hidden w-full ">          
        <Link className="flex-1 no-underline text-black" to={!user?'/':'/Api/products'}>
      <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white no-underline">Zamazon</span>
     </Link>
     {user&&<span className="mx-3">
      <Link className='' to={!user?'/':'/Api/cart'}>
              <Minicart/>
            </Link>
      </span>}
        {isNavOpen?(!user?(
            <>
            <Button className="w-fit mx-1 px-0 text-md flex-none" href='/Api/user/login'>Login</Button>
            <Button className="w-fit mx-1 px-0 text-md flex-none" href='/Api/user/register'>Sign up</Button>
            </>
        ):(<></>)
        ):<></>}

          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> 
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} 
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex  flex-col items-center justify-between min-h-[250px] ">
            <Button className='flex-1 no-underline text-black bg-transparent border-0' href={!user?'/':'/Api/products'}>
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white no-underline">Zamazon</span>
            </Button>
            {!user?(
            <>
            <Button className="flex-none" href='/Api/user/login'>Login</Button>
            <Button className="flex-none" href='/Api/user/register'>Sign up</Button>
            </>
        ):
            (<>  
            <p className="flex-none">{user.email}</p>
            <Button className="flex-none" onClick={handleClick}>Logout</Button>
            </>)}
              <li className="border-0 border-gray-400 my-8 uppercase grid gap-2">  
                <a className="no-underline my-2" href="/Api/products">Home</a>
                <a className='no-underline' href="/Api/cart">Cart</a>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden justify-between  space-x-8 lg:flex items-baseline">
        <Link className='flex-1 no-underline text-black' to={!user?'/':'/Api/products'}>
      <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white ">Zamazon</span>
     </Link>
     
        {!user?(
            <>
            <Button href='/Api/user/login'>Login</Button>
            <Button href='/Api/user/register'>Sign up</Button>
            </>
        ):  
            (<>  
            <Link className='' to={!user?'/':'/Api/cart'}>
              <Minicart/>
            </Link>
            <p className="flex-none">{user.email}</p>
            <Button className='flex-none' onClick={handleClick}>Logout</Button>
            </>)}

        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 80%;
        margin-left:20%;
        height: 100vh;
        top: 0;
        left: 0;
        background: #939393a3;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        backdrop-filter:blur(2px);
      }
    `}</style>
    </div>
  );
}