import axios from "axios";
import { base_url, getAuthConfig } from "../../utils/axiosConfig";

const cache = new Map();
const PRODUCT_CACHE_MS = 60 * 1000;

const getCached = (key) => {
  const cached = cache.get(key);
  if (!cached || cached.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }
  return cached.data;
};

const setCached = (key, data, ttl = PRODUCT_CACHE_MS) => {
  cache.set(key, { data, expiresAt: Date.now() + ttl });
  return data;
};

const getProducts = async (data) => {
  const params = new URLSearchParams();

  if (data?.brand) params.append("brand", data.brand);
  if (data?.tag) params.append("tags", data.tag);
  if (Array.isArray(data?.category)) {
    params.append("category", data.category.join(","));
  } else if (data?.category) {
    params.append("category", data.category);
  }
  if (data?.minPrice) params.append("price[gte]", data.minPrice);
  if (data?.maxPrice) params.append("price[lte]", data.maxPrice);
  if (data?.sort) params.append("sort", data.sort);
  if (data?.limit) params.append("limit", data.limit);
  if (data?.page) params.append("page", data.page);
  if (data?.fields) params.append("fields", data.fields);

  const cacheKey = `products:${params.toString()}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`${base_url}product?${params.toString()}`);

  if (response.data) {
    return setCached(cacheKey, response.data);
  }
};

const getSingleProduct = async (id) => {
  const cacheKey = `product:${id}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return setCached(cacheKey, response.data);
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
