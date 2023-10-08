export const calculateDiscount = (price, discount) => {
  return (discount / 100) * price;
};

export const calculatePrice = (price, discount, quantity) => {
  let total = price * quantity;
  total -= discount;
  return total;
};
