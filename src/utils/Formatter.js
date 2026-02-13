export const formatPrice = (price) => {
  if (price < 0.01) return price.toFixed(8);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(price);
};
