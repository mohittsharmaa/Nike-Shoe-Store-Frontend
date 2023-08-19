"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import { useRouter } from "next/navigation";
import {
  HiOutlineHeart,
  HiOutlineX,
  HiOutlineShoppingCart,
  HiMenuAlt3,
} from "react-icons/hi";
import { fetchFunction } from "@/utils/api";
import { useSelector } from "react-redux";

// Navbar has menu items some of which have submenu also. for submenu we need to render a down logo and submenu also.
// Menu is for mobile devices also which will be toggled according to screen size.

const Navbar = () => {
  // invocations
  const router = useRouter();
  const { cartItems } = useSelector((state) => state.cart);
  // states and effects start
  const [mobileMenu, setMobileMenu] = useState(false); // for mobile menu
  const [showCatMenu, setShowCatMenu] = useState(false); // for subcategories menu
  const [show, setShow] = useState("translate-y-0"); // for navbar itself....when we scroll it should hide but when we scroll up it should show again
  const [lastScrollY, setLastScrollY] = useState(0); // used to toggle the above(show) state
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);
  // states effeccts end
  // functions start
  const controlNavbar = () => {
    if (window.scrollY > 200 && !mobileMenu) {
      if (window.scrollY > lastScrollY) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("translate-y-0 shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const { data } = await fetchFunction("/api/categories?populate=*");
    // console.log(data);
    setCategories(data);
  };

  //functions end
  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}>
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            className="w-[40px] md:w-[60px]"
            height={40}
            width={50}
            alt="Nike"
          />
          {/* <h1>{categories[0]}</h1> */}
        </Link>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />
        {mobileMenu && (
          <MenuMobile
            className=" md:hidden lg:hidden xl:hidden"
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        <div className="flex items-center gap-2 text-black">
          <div className="w-8 md:w-12 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <HiOutlineHeart
              onClick={() => router.push("/wishlist")}
              className="text-[15px] md:text-[20px]"
            />
            <div className="h-[14px] md:h-[18px] min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              5
            </div>
          </div>
          <Link href="/cart">
            <div className="w-8 md:w-12 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <HiOutlineShoppingCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>
          <div className="w-8 md:w-12 md:h-12 rounded-full flex justify-center items-center md:hidden hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <HiOutlineX
                className=" text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <HiMenuAlt3
                className=" text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;
