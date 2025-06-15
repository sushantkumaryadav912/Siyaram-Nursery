const supabase = require("../utils/db");
const bcrypt = require("bcryptjs");

async function getAllUsers(request, response) {
  try {
    const { data, error } = await supabase.from("User").select("*");
    if (error) throw error;
    return response.json(data);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching users" });
  }
}

async function createUser(request, response) {
  try {
    const { email, password, role } = request.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    const { data, error } = await supabase
      .from("User")
      .insert({ email, password: hashedPassword, role })
      .select();
    if (error) throw error;
    return response.status(201).json(data[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    return response.status(500).json({ error: "Error creating user" });
  }
}

async function updateUser(request, response) {
  try {
    const { id } = request.params;
    const { email, password, role } = request.body;
    const hashedPassword = password ? await bcrypt.hash(password, 5) : undefined;
    const { data: existingUser, error: findError } = await supabase
      .from("User")
      .select("*")
      .eq("id", id)
      .single();
    if (findError || !existingUser) {
      return response.status(404).json({ error: "User not found" });
    }
    const updateData = { email, role };
    if (hashedPassword) updateData.password = hashedPassword;
    const { data, error } = await supabase
      .from("User")
      .update(updateData)
      .eq("id", id)
      .select();
    if (error) throw error;
    return response.status(200).json(data[0]);
  } catch (error) {
    return response.status(500).json({ error: "Error updating user" });
  }
}

async function deleteUser(request, response) {
  try {
    const { id } = request.params;
    const { error } = await supabase.from("User").delete().eq("id", id);
    if (error) throw error;
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting user" });
  }
}

async function getUser(request, response) {
  const { id } = request.params;
  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) {
    return response.status(404).json({ error: "User not found" });
  }
  return response.status(200).json(data);
}

async function getUserByEmail(request, response) {
  const { email } = request.params;
  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("email", email)
    .single();
  if (error || !data) {
    return response.status(404).json({ error: "User not found" });
  }
  return response.status(200).json(data);
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserByEmail,
};