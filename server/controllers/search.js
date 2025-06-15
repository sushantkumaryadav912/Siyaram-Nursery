const supabase = require("../utils/db");

async function searchProducts(request, response) {
  try {
    const { query } = request.query;
    if (!query) {
      return response
        .status(400)
        .json({ error: "Query parameter is required" });
    }
    const { data, error } = await supabase
      .from("Product")
      .select("*")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    if (error) throw error;
    return response.json(data);
  } catch (error) {
    console.error("Error searching products:", error);
    return response.status(500).json({ error: "Error searching products" });
  }
}

module.exports = { searchProducts };