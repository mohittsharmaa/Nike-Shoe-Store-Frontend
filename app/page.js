"use client";
import { fetchFunction } from "../utils/api";
import HeroBanner from "./Components/HeroBanner";
import ProductCard from "./Components/ProductCard";
import Wrapper from "./Components/Wrapper";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetcher("/api/products?populate=*");
  }, []);
  const fetcher = async (endpoint) => {
    const { data } = await fetchFunction(endpoint);
    setData(data);
    // console.log(data);
  };

  return (
    <main>
      {/* <h1>{data?.[1]?.attributes?.name}</h1>   //for testing purposes */}
      <HeroBanner />
      {/* {products.data[0].attributes.name} */}

      <Wrapper>
        {/* heading and paragraph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <h1 className="text-[28px] md:text-[34px] mb-5 font-semibold">
            Cushoioning for Your Miles
          </h1>
          <span className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended streches of
            running.
          </span>
        </div>
        {/* heading and paragraph end */}

        {/* product grid start */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
          {data.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}

          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        </div>
        {/* product grid end */}
      </Wrapper>
    </main>
  );
}

// not working cannot figure out why and how to make it work

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const products = await fetchFunction("/api/products?populate=*");

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: products,
//   };
// }
