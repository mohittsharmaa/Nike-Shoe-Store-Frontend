export const getDiscountedPrice = (original_price, discounted_price) => {
  let discount = original_price - discounted_price;
  let discountPercentage = (discount / original_price) * 100;

  return discountPercentage.toFixed(2);
};
