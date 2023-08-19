"use client";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/app/Components/ProductCard";
import Wrapper from "@/app/Components/Wrapper";
import { useParams } from "next/navigation";
import { fetchFunction } from "@/utils/api";
import { useState, useEffect } from "react";

// const page = ({ category, products, slug }) => {
const page = () => {
  const [data, setData] = useState([]);

  const params = useParams();
  const curr_category = params.slug;

  // calling charAt() with toUpperCase()
  let Capital_letter = curr_category.charAt(0).toUpperCase();
  let Capital_string = Capital_letter + curr_category.slice(1);

  useEffect(() => {
    fetcher();
  }, []);

  const fetcher = async () => {
    const products = await fetchFunction(
      `/api/products?populate=*&[filters][categories][slug][$eq]=${curr_category}`
    );
    const { data } = products;
    // console.log(data);
    setData(data);
  };

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {/* {category.data[0].attributes.name} */}
            {Capital_string}
          </div>
        </div>

        <div className="grid grid-cols-2 justify-items-center md:grid-cols-3 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
          {data ? (
            data.map((curr_product) => (
              <ProductCard key={curr_product.id} data={curr_product} />
            ))
          ) : (
            <div className="m-auto">
              <Image src="/assets/logo.svg" height={40} width={50} alt="Nike" />
              <h3>Loading...</h3>
            </div>
          )}

          {/* 
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
         */}
        </div>
      </Wrapper>
    </div>
  );
};

export default page;

// again this is how it should be done but i just cant figure out why this is not working I tried react dev tools also but props doesnot show up there no matter how much i tried so i had to find a work around and for that i fetched data the old way.

// export const getStaticPaths = async () => {
//   const categories = await fetchFunction("/api/categories?populate=*");
//   const paths = categories.data.map((c) => ({
//     params: {
//       slug: c.attributes.slug,
//     },
//   }));
//   return {
//     paths,
//     fallback: false, // false or "blocking"
//   };
// };

// export const getStaticProps = async ({ params: { slug } }) => {
//   //  the filters can be found on strapi docs
//   const category = await fetchFunction(
//     `/api/categories?filters[slug][$eq]=${slug}`
//   );
//   const products = await fetchFunction(
//     `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}`
//   );
//   return {
//     props: {
//       category: category,
//       products: products,
//       slug,
//     },
//   };
// };

// export default function page({ repo }) {
//   return repo.stargazers_count
// }
