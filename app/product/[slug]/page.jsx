"use client";
import Wrapper from "@/app/Components/Wrapper";
import { IoMdHeartEmpty } from "react-icons/io";
import { useParams } from "next/navigation";
import ProductDetailsCarousel from "@/app/Components/ProductDetailsCarousel";
import RelatedProducts from "@/app/Components/RelatedProducts";
import { useState, useEffect } from "react";
import { fetchFunction } from "@/utils/api";
import { getDiscountedPrice } from "@/utils/helperFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/app/Redux/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productDetails = useParams();
  const curr_product_slug = productDetails.slug;
  //states and effects
  const [product, setProduct] = useState({});
  const [curr_category_slug, setCurr_category_slug] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedSize, setSelctedSize] = useState();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fetcher();
  }, [curr_category_slug]);

  const fetcher = async () => {
    const curr_product = await fetchFunction(
      `/api/products?populate=*&[filters][slug][$eq]=${curr_product_slug}`
    );
    const { data } = curr_product;
    // console.log(data);
    setProduct(data);
    const categorySlug =
      data[0]?.attributes?.categories.data[0].attributes?.slug;
    setCurr_category_slug(categorySlug);
    // console.log(curr_category_slug);
    const similar_products = await fetchFunction(
      `/api/products?populate=*&[filters][categories][slug][$eq]=${curr_category_slug}&[filters][slug][$ne]=${curr_product_slug}`
    );
    setSimilarProducts(similar_products.data);
    // console.log(similar_products);
  };

  const images = product[0]?.attributes?.image.data;
  const notify = () =>
    toast.success("Success! Product added to cart", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    // <div>{curr_product}</div>
    <div>
      <ToastContainer />
      {product ? (
        <div className="w-full md:py-20">
          <Wrapper>
            <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
              {/* left column start */}
              <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                <ProductDetailsCarousel images={images} />
              </div>
              {/* left column end */}

              {/* right column start */}
              <div className="flex-[1] py-3">
                {/* PRODUCT TITLE */}
                <div className="text-[34px] font-semibold mb-2 leading-tight">
                  {product[0]?.attributes?.name}
                </div>

                {/* PRODUCT SUBTITLE */}
                <div className="text-lg font-semibold mb-5">
                  {product[0]?.attributes?.subtitle}
                </div>

                {/* PRODUCT PRICE */}
                <div className="flex items-center">
                  <p className="mr-2 text-lg font-semibold">
                    MRP : ₹ {product[0]?.attributes?.price}
                  </p>
                  {product[0]?.attributes?.original_price && (
                    <>
                      <p className="text-base font-medium line-through">
                        ₹ {product[0]?.attributes?.original_price}
                      </p>
                      <p className="ml-auto text-base font-medium text-green-500">
                        {getDiscountedPrice(
                          product[0]?.attributes?.original_price,
                          product[0]?.attributes?.price
                        )}
                        % off
                      </p>
                    </>
                  )}
                </div>

                <div className="text-md font-medium text-black/[0.5]">
                  incl. of taxes
                </div>
                <div className="text-md font-medium text-black/[0.5] mb-20">
                  {`(Also includes all applicable duties)`}
                </div>

                {/* PRODUCT SIZE RANGE START */}
                <div className="mb-10">
                  {/* HEADING START */}
                  <div className="flex justify-between mb-2">
                    <div className="text-md font-semibold">Select Size</div>
                    <div className="text-md font-medium text-black/[0.5] cursor-pointer hover:underline">
                      Select Guide
                    </div>
                  </div>
                  {/* HEADING END */}

                  {/* SIZE START */}
                  <div className="grid grid-cols-3 gap-2" id="sizesGrid">
                    {product[0]?.attributes?.size.data.map((item, id) => (
                      <div
                        key={id}
                        className={`border rounded-md text-center py-3 font-medium ${
                          item.enabled
                            ? "hover:border-black cursor-pointer"
                            : "cursor-not-allowed bg-black/[0.1] opacity-50"
                        } ${selectedSize === item.size ? "border-black" : ""}`}
                        onClick={() => {
                          setSelctedSize(item.size);
                        }}>
                        {item.size}
                      </div>
                    ))}
                    {/* <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                      Uk-6
                    </div> */}
                  </div>
                  {/* SIZE END */}

                  {/* SHOW ERROR START */}

                  {showError && (
                    <div className="text-red-600 mt-1">
                      Size selection is required
                    </div>
                  )}
                  {/* <div className="text-red-600 mt-1">
                    Size selection is required
                  </div> */}

                  {/* SHOW ERROR END */}
                </div>
                {/* PRODUCT SIZE RANGE END */}

                {/* ADD TO CART BUTTON START */}
                <button
                  className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                  onClick={() => {
                    if (!selectedSize) {
                      setShowError(true);
                      document.getElementById("sizesGrid").scrollIntoView({
                        block: "center",
                        behavior: "smooth",
                      });
                    } else {
                      // const product = { id: 1, name: "Product xyz", quantity: 1 };
                      dispatch(
                        addToCart({
                          ...product[0],
                          selectedSize,
                          oneQuantityPrice: product[0]?.attributes?.price,
                        })
                      );
                      notify();
                    }
                  }}>
                  Add to Cart
                </button>
                {/* ADD TO CART BUTTON END */}

                {/* WHISHLIST BUTTON START */}
                <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                  Wishlist
                  <IoMdHeartEmpty size={20} />
                </button>
                {/* WHISHLIST BUTTON END */}

                <div>
                  <div className="text-lg font-bold mb-5">Product Details</div>
                  <div className="markdown text-md mb-5">
                    {product[0]?.attributes?.description}
                  </div>
                </div>
              </div>
              {/* right column end */}
            </div>

            <RelatedProducts products={similarProducts} />
          </Wrapper>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProductDetails;
