const supabase = require("../utils/db");

async function getProductBySlug(request, response) {
  const { slug } = request.params;
  const { data, error } = await supabase
    .from("Product")
    .select("*, category(*)")
    .eq("slug", slug)
    .single();
  if (error || !data) {
    return response.status(404).json({ error: "Product not found" });
  }
  return response.status(200).json(data);
}

module.exports = { getProductBySlug };