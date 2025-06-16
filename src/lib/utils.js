export const categoryMenuList = [
  {
    id: 1,
    title: "Indoor Plants",
    src: "/indoor-plant-icon.png",
    href: "/shop/indoor-plants"
  },
  {
    id: 2,
    title: "Outdoor Plants",
    src: "/outdoor-plant-icon.png",
    href: "/shop/outdoor-plants"
  },
  {
    id: 3,
    title: "Gardening Tools",
    src: "/gardening-tool-icon.png",
    href: "/shop/gardening-tools"
  },
  {
    id: 4,
    title: "Seeds & Bulbs",
    src: "/seeds-icon.png",
    href: "/shop/seeds-bulbs"
  },
  {
    id: 5,
    title: "Pots & Planters",
    src: "/pot-icon.png",
    href: "/shop/pots-planters"
  }
];

export const incentives = [
  {
    name: "Free Shipping",
    description: "Enjoy free shipping on all orders to nurture your garden effortlessly.",
    imageSrc: "/shipping-icon.png",
  },
  {
    name: "Plant Care Support",
    description: "Get expert advice to keep your plants thriving.",
    imageSrc: "/plant-care-icon.png",
  },
  {
    name: "Eco-Friendly Packaging",
    description: "We use sustainable materials to protect your plants and the planet.",
    imageSrc: "/eco-icon.png",
  }
];

export const navigation = {
  sale: [
    { name: "Seasonal Discounts", href: "/shop/sale" },
    { name: "Clearance Plants", href: "/shop/clearance" }
  ],
  about: [
    { name: "About Siyaram Nursery", href: "/about" },
    { name: "Our Mission", href: "/mission" }
  ],
  buy: [
    { name: "Gift Cards", href: "/gift-cards" },
    { name: "Bulk Orders", href: "/bulk-orders" }
  ],
  help: [
    { name: "Contact Us", href: "/contact" },
    { name: "Plant Care FAQs", href: "/faqs" }
  ],
};

export const isValidNameOrLastname = (input) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(input);
};

export const isValidEmailAddressFormat = (input) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};

export const isValidCardNumber = (input) => {
  const cleanedInput = input.replace(/[^0-9]/g, "");
  const regex = /^\d{13,19}$/;
  return regex.test(cleanedInput);
};

export const isValidCreditCardExpirationDate = (input) => {
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return regex.test(input);
};

export const isValidCreditCardCVVOrCVC = (input) => {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(input);
};