const supabase = require("../utils/db");

async function getAllWishlist(request, response) {
  try {
    const { data, error } = await supabase
      .from("Wishlist")
      .select("*, product(*)");
    if (error) throw error;
    return response.json(data);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching wishlist" });
  }
}

async function getAllWishlistByUserId(request, response) {
  const { userId } = request.params;
  try {
    const { data, error } = await supabase
      .from("Wishlist")
      .select("*, product(*)")
      .eq("userId", userId);
    if (error) throw error;
    return response.json(data);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching wishlist" });
  }
}

async function createWishItem(request, response) {
  try {
    const { userId, productId } = request.body;
    const { data, error } = await supabase
      .from("Wishlist")
      .insert({ userId, productId })
      .select();
    if (error) throw error;
    return response.status(201).json(data[0]);
  } catch (error) {
    console.error("Error creating wish item:", error);
    return response.status(500).json({ error: "Error creating wish item" });
  }
}

async function deleteWishItem(request, response) {
  try {
    const { userId, productId } = request.params;
    const { error } = await supabase
      .from("Wishlist")
      .delete()
      .eq("userId", userId)
      .eq("productId", productId);
    if (error) throw error;
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting wish item" });
  }
}

async function getSingleProductFromWishlist(request, response) {
  try {
    const { userId, productId } = request.params;
    const { data, error } = await supabase
      .from("Wishlist")
      .select("*")
      .eq("userId", userId)
      .eq("productId", productId);
    if (error) throw error;
    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error getting wish item" });
  }
}

module.exports = {
  getAllWishlistByUserId,
  getAllWishlist,
  createWishItem,
  deleteWishItem,
  getSingleProductFromWishlist,
};