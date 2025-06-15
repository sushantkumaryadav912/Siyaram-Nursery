const supabase = require("../utils/db");

async function createOrderProduct(request, response) {
  try {
    const { customerOrderId, productId, quantity } = request.body;
    const { data, error } = await supabase
      .from("customer_order_product")
      .insert({ customerOrderId, productId, quantity })
      .select();
    if (error) throw error;
    return response.status(201).json(data[0]);
  } catch (error) {
    console.error("Error creating product order:", error);
    return response.status(500).json({ error: "Error creating product order" });
  }
}

async function updateProductOrder(request, response) {
  try {
    const { id } = request.params;
    const { customerOrderId, productId, quantity } = request.body;
    const { data: existingOrder, error: findError } = await supabase
      .from("customer_order_product")
      .select("*")
      .eq("id", id)
      .single();
    if (findError || !existingOrder) {
      return response.status(404).json({ error: "Order not found" });
    }
    const { data, error } = await supabase
      .from("customer_order_product")
      .update({ customerOrderId, productId, quantity })
      .eq("id", id)
      .select();
    if (error) throw error;
    return response.json(data[0]);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error updating order" });
  }
}

async function deleteProductOrder(request, response) {
  try {
    const { id } = request.params;
    const { error } = await supabase
      .from("customer_order_product")
      .delete()
      .eq("customerOrderId", id);
    if (error) throw error;
    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ error: "Error deleting product orders" });
  }
}

async function getProductOrder(request, response) {
  const { id } = request.params;
  const { data, error } = await supabase
    .from("customer_order_product")
    .select("*, product(*)")
    .eq("customerOrderId", id);
  if (error || !data.length) {
    return response.status(404).json({ error: "Order not found" });
  }
  return response.status(200).json(data);
}

async function getAllProductOrders(request, response) {
  try {
    const { data: productOrders, error } = await supabase
      .from("customer_order_product")
      .select(`
        productId,
        quantity,
        customerOrder:id,name,lastname,phone,email,company,adress,apartment,postalCode,dateTime,status,total
      `);
    if (error) throw error;

    const ordersMap = new Map();
    for (const order of productOrders) {
      const { customerOrder, productId, quantity } = order;
      const { id, ...orderDetails } = customerOrder;

      const { data: product, error: productError } = await supabase
        .from("Product")
        .select("id,title,mainImage,price,slug")
        .eq("id", productId)
        .single();
      if (productError) throw productError;

      if (ordersMap.has(id)) {
        ordersMap.get(id).products.push({ ...product, quantity });
      } else {
        ordersMap.set(id, {
          customerOrderId: id,
          customerOrder: orderDetails,
          products: [{ ...product, quantity }],
        });
      }
    }

    const groupedOrders = Array.from(ordersMap.values());
    return response.json(groupedOrders);
  } catch (error) {
    console.error("Error fetching all product orders:", error);
    return response.status(500).json({ error: "Error fetching all product orders" });
  }
}

module.exports = {
  createOrderProduct,
  updateProductOrder,
  deleteProductOrder,
  getProductOrder,
  getAllProductOrders,
};