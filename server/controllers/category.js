const supabase = require("../utils/db");

async function createCategory(request, response) {
  try {
    const { name } = request.body;
    const { data, error } = await supabase
      .from("Category")
      .insert({ name })
      .select();
    if (error) throw error;
    return response.status(201).json(data[0]);
  } catch (error) {
    console.error("Error creating category:", error);
    return response.status(500).json({ error: "Error creating category" });
  }
}

async function updateCategory(request, response) {
  try {
    const { id } = request.params;
    const { name } = request.body;
    const { data: existingCategory, error: findError } = await supabase
      .from("Category")
      .select("*")
      .eq("id", id)
      .single();
    if (findError || !existingCategory) {
      return response.status(404).json({ error: "Category not found" });
    }
    const { data, error } = await supabase
      .from("Category")
      .update({ name })
      .eq("id", id)
      .select();
    if (error) throw error;
    return response.status(200).json(data[0]);
  } catch (error) {
    return response.status(500).json({ error: "Error updating category" });
  }
}

async function deleteCategory(request, response) {
  try {
    const { id } = request.params;
    const { error } = await supabase.from("Category").delete().eq("id", id);
    if (error) throw error;
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting category" });
  }
}

async function getCategory(request, response) {
  const { id } = request.params;
  const { data, error } = await supabase
    .from("Category")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) {
    return response.status(404).json({ error: "Category not found" });
  }
  return response.status(200).json(data);
}

async function getAllCategories(request, response) {
  try {
    const { data, error } = await supabase.from("Category").select("*");
    if (error) throw error;
    return response.json(data);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching categories" });
  }
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
};