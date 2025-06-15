export const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/products");
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/categories");
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};