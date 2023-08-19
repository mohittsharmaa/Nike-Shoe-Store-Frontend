import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getDiscountedPrice } from "@/utils/helperFunctions";

const ProductCard = ({ data }) => {
  if (data == null) return null;
  return (
    <Link
      href={`/product/${data?.attributes?.slug}`}
      className="block transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer rounded-md shadow-md">
      <div className="relative aspect-w-1 aspect-h-1">
        <Image
          width={500}
          height={500}
          src={data?.attributes?.thumbnail.data.attributes.url}
          alt={data?.attributes?.name}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-medium">{data.attributes?.name}</h2>
        <div className="flex flex-col mt-2">
          <div className="flex items-baseline">
            <p className="text-lg font-semibold">₹ {data.attributes.price}</p>
            {data.attributes.original_price && (
              <div className="ml-2 hidden sm:block">
                <p className="text-base font-medium line-through text-black/[0.5]">
                  ₹ {data.attributes.original_price}
                </p>
                <p className="text-base font-medium text-green-500">
                  {getDiscountedPrice(
                    data.attributes.original_price,
                    data.attributes.price
                  )}
                  % off
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
