import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getAuthConfig = () => {
  const customer = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  return {
    headers: {
      Authorization: `Bearer ${customer?.token || ""}`,
      Accept: "application/json",
    },
  };
};

const getProducts = async (data) => {
  console.log(data);
  const params = new URLSearchParams();

  if (data?.brand) params.append("brand", data.brand);
  if (data?.tag) params.append("tags", data.tag);
  if (data?.category) params.append("category", data.category);
  if (data?.minPrice) params.append("price[gte]", data.minPrice);
  if (data?.maxPrice) params.append("price[lte]", data.maxPrice);
  if (data?.sort) params.append("sort", data.sort);

  const response = await axios.get(`${base_url}product?${params.toString()}`);

  if (response.data) {
    return response.data;
  }
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};

const addToWishlist = async (prodId) => {
  const response = await axios.put(
    `${base_url}product/Wishlist`,
    { prodId },
    getAuthConfig()
  );
  if (response.data) {
    return response.data;
  }
};

const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, getAuthConfig());
  if (response.data) {
    return response.data;
  }
};

export const productSevice = {
  getProducts,
  addToWishlist,
  getSingleProduct,
  rateProduct,
};
