"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import Wrapper from "../Components/Wrapper";
import CartItem from "./CartItem";
import { LuArrowUpRight } from "react-icons/lu";
import { useSelector } from "react-redux";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.attributes.price, 0);
  }, [cartItems]);

  return (
    <div className="w-full md:py-10">
      <Wrapper>
        {cartItems.length > 0 && (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0 ">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* MAIN DIV FOR LEFT AND RIGHT COLUMNS */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* LEFT DIV FOR CART ITEMS START */}
              <div className="flex-[2]">
                <div className="text-lg font-bold">CartItems</div>
                {cartItems.map((item) => {
                  // console.log(item);
                  return <CartItem key={item.id} data={item} />;
                })}
                {/* <CartItem />
                <CartItem />
                <CartItem /> */}
              </div>
              {/* LEFT DIV FOR CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>
                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      Price: ₹{subTotal}
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t-2 mt-5">
                    Thie subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>
                <button className="w-full flex justify-center items-center py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 gap-4 hover-icon">
                  Checkout
                  <span class="icon">
                    <LuArrowUpRight />
                  </span>
                </button>
              </div>
              {/* SUMMARY END */}
            </div>
            {/* MAIN DIV FOR LEFT AND RIGHT COLUMNS */}
          </>
        )}

        {/* Empty Screen to be rendered conditionally. */}
        {cartItems.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              alt="Product pricture"
              src="/assets/empty-cart.jpg"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore our top categories
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8">
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
