const supabase = require("../utils/db");

async function getAllProducts(request, response) {
  const mode = request.query.mode || "";
  if (mode === "admin") {
    try {
      const { data, error } = await supabase.from("Product").select("*");
      if (error) throw error;
      return response.json(data);
    } catch (error) {
      return response.status(500).json({ error: "Error fetching products" });
    }
  } else {
    const dividerLocation = request.url.indexOf("?");
    let filterObj = {};
    let sortObj = {};
    let sortByValue = "defaultSort";
    const page = Number(request.query.page) || 1;

    if (dividerLocation !== -1) {
      const queryArray = request.url
        .substring(dividerLocation + 1, request.url.length)
        .split("&");
      let filterType;
      let filterArray = [];

      for (let i = 0; i < queryArray.length; i++) {
        if (
          queryArray[i].indexOf("filters") !== -1 &&
          queryArray[i].indexOf("price") !== -1
        ) {
          filterType = "price";
        }
        if (
          queryArray[i].indexOf("filters") !== -1 &&
          queryArray[i].indexOf("rating") !== -1
        ) {
          filterType = "rating";
        }
        if (
          queryArray[i].indexOf("filters") !== -1 &&
          queryArray[i].indexOf("category") !== -1
        ) {
          filterType = "category";
        }
        if (
          queryArray[i].indexOf("filters") !== -1 &&
          queryArray[i].indexOf("inStock") !== -1
        ) {
          filterType = "inStock";
        }
        if (
          queryArray[i].indexOf("filters") !== -1 &&
          queryArray[i].indexOf("outOfStock") !== -1
        ) {
          filterType = "outOfStock";
        }
        if (queryArray[i].indexOf("sort") !== -1) {
          sortByValue = queryArray[i].substring(queryArray[i].indexOf("=") + 1);
        }

        if (queryArray[i].indexOf("filters") !== -1) {
          let filterValue;
          if (queryArray[i].indexOf("category") === -1) {
            filterValue = parseInt(
              queryArray[i].substring(
                queryArray[i].indexOf("=") + 1,
                queryArray[i].length
              )
            );
          } else {
            filterValue = queryArray[i].substring(
              queryArray[i].indexOf("=") + 1,
              queryArray[i].length
            );
          }
          const filterOperator = queryArray[i].substring(
            queryArray[i].indexOf("$") + 1,
            queryArray[i].indexOf("=") - 1
          );
          filterArray.push({ filterType, filterOperator, filterValue });
        }
      }
      for (let item of filterArray) {
        filterObj = {
          ...filterObj,
          [item.filterType]: {
            [item.filterOperator]: item.filterValue,
          },
        };
      }
    }

    let whereClause = { ...filterObj };
    if (filterObj.category && filterObj.category.equals) {
      delete whereClause.category;
    }

    if (sortByValue === "defaultSort") {
      sortObj = {};
    } else if (sortByValue === "titleAsc") {
      sortObj = { title: "asc" };
    } else if (sortByValue === "titleDesc") {
      sortObj = { title: "desc" };
    } else if (sortByValue === "lowPrice") {
      sortObj = { price: "asc" };
    } else if (sortByValue === "highPrice") {
      sortObj = { price: "desc" };
    }

    let query = supabase
      .from("Product")
      .select("*, category(name)")
      .range((page - 1) * 10, page * 12 - 1);

    if (Object.keys(filterObj).length > 0) {
      if (filterObj.price) {
        if (filterObj.price.lte)
          query = query.lte("price", filterObj.price.lte);
        if (filterObj.price.gte)
          query = query.gte("price", filterObj.price.gte);
      }
      if (filterObj.rating) {
        if (filterObj.rating.gte)
          query = query.gte("rating", filterObj.rating.gte);
      }
      if (filterObj.inStock) {
        query = query.gte("inStock", filterObj.inStock.gte);
      }
      if (filterObj.outOfStock) {
        query = query.eq("inStock", 0);
      }
      if (filterObj.category && filterObj.category.equals) {
        query = query.eq("category.name", filterObj.category.equals);
      }
    }

    if (Object.keys(sortObj).length > 0) {
      query = query.order(Object.keys(sortObj)[0], {
        ascending: sortObj[Object.keys(sortObj)[0]] === "asc",
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return response.json(data);
  }
}

async function createProduct(request, response) {
  try {
    const {
      slug,
      title,
      mainImage,
      price,
      description,
      manufacturer,
      categoryId,
      inStock,
    } = request.body;
    const { data, error } = await supabase
      .from("Product")
      .insert({
        slug,
        title,
        mainImage,
        price,
        rating: 5,
        description,
        manufacturer,
        categoryId,
        inStock,
      })
      .select();
    if (error) throw error;
    return response.status(201).json(data[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    return response.status(500).json({ error: "Error creating product" });
  }
}

async function updateProduct(request, response) {
  try {
    const { id } = request.params;
    const {
      slug,
      title,
      mainImage,
      price,
      rating,
      description,
      manufacturer,
      categoryId,
      inStock,
    } = request.body;
    const { data: existingProduct, error: findError } = await supabase
      .from("Product")
      .select("*")
      .eq("id", id)
      .single();
    if (findError || !existingProduct) {
      return response.status(404).json({ error: "Product not found" });
    }
    const { data, error } = await supabase
      .from("Product")
      .update({
        slug,
        title,
        mainImage,
        price,
        rating,
        description,
        manufacturer,
        categoryId,
        inStock,
      })
      .eq("id", id)
      .select();
    if (error) throw error;
    return response.status(200).json(data[0]);
  } catch (error) {
    return response.status(500).json({ error: "Error updating product" });
  }
}

async function deleteProduct(request, response) {
  try {
    const { id } = request.params;
    const { data: relatedOrderProductItems, error: orderError } = await supabase
      .from("customer_order_product")
      .select("*")
      .eq("productId", id);
    if (orderError) throw orderError;
    if (relatedOrderProductItems.length > 0) {
      return response
        .status(400)
        .json({ error: "Cannot delete product because of foreign key constraint" });
    }
    const { error } = await supabase.from("Product").delete().eq("id", id);
    if (error) throw error;
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting product" });
  }
}

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

async function getProductById(request, response) {
  const { id } = request.params;
  const { data, error } = await supabase
    .from("Product")
    .select("*, category(*)")
    .eq("id", id)
    .single();
  if (error || !data) {
    return response.status(404).json({ error: "Product not found" });
  }
  return response.status(200).json(data);
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductById,
};