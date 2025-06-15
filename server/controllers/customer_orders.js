const supabase = require("../utils/db");

async function createCustomerOrder(request, response) {
  try {
    const {
      name,
      lastname,
      phone,
      email,
      company,
      adress,
      apartment,
      postalCode,
      status,
      city,
      country,
      orderNotice,
      total,
    } = request.body;
    const { data, error } = await supabase
      .from("Customer_order")
      .insert({
        name,
        lastname,
        phone,
        email,
        company,
        adress,
        apartment,
        postalCode,
        status,
        city,
        country,
        orderNotice,
        total,
      })
      .select();
    if (error) throw error;
    return response.status(201).json(data[0]);
  } catch (error) {
    console.error("Error creating order:", error);
    return response.status(500).json({ error: "Error creating order" });
  }
}

async function updateCustomerOrder(request, response) {
  try {
    const { id } = request.params;
    const {
      name,
      lastname,
      phone,
      email,
      company,
      adress,
      apartment,
      postalCode,
      dateTime,
      status,
      city,
      country,
      orderNotice,
      total,
    } = request.body;
    const { data: existingOrder, error: findError } = await supabase
      .from("Customer_order")
      .select("*")
      .eq("id", id)
      .single();
    if (findError || !existingOrder) {
      return response.status(404).json({ error: "Order not found" });
    }
    const { data, error } = await supabase
      .from("Customer_order")
      .update({
        name,
        lastname,
        phone,
        email,
        company,
        adress,
        apartment,
        postalCode,
        dateTime,
        status,
        city,
        country,
        orderNotice,
        total,
      })
      .eq("id", id)
      .select();
    if (error) throw error;
    return response.status(200).json(data[0]);
  } catch (error) {
    return response.status(500).json({ error: "Error updating order" });
  }
}

async function deleteCustomerOrder(request, response) {
  try {
    const { id } = request.params;
    const { error } = await supabase.from("Customer_order").delete().eq("id", id);
    if (error) throw error;
    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ error: "Error deleting order" });
  }
}

async function getCustomerOrder(request, response) {
  const { id } = request.params;
  const { data, error } = await supabase
    .from("Customer_order")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) {
    return response.status(404).json({ error: "Order not found" });
  }
  return response.status(200).json(data);
}

async function getAllOrders(request, response) {
  try {
    const { data, error } = await supabase.from("Customer_order").select("*");
    if (error) throw error;
    return response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error fetching orders" });
  }
}

module.exports = {
  createCustomerOrder,
  updateCustomerOrder,
  deleteCustomerOrder,
  getCustomerOrder,
  getAllOrders,
};