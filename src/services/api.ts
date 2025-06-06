import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

export const getProducts = async () => {
  const response = await api.get('/products');
  if (
    response.status === 200 &&
    response.data &&
    response.data.status &&
    Array.isArray(response.data.products)
  ) {
    return response.data.products;
  }
  throw new Error('Failed to fetch products');
};

export const getProductById = async (id: string | number) => {
  const response = await api.get(`/products/${id}`);
  if (
    response.status === 200 &&
    response.data &&
    response.data.status &&
    response.data.product
  ) {
    return response.data.product;
  }
  throw new Error('Product not found');
};

export const buyProduct = async (
  productId: string | number,
  tokenName: string,
  network: string
) => {
  const response = await api.post(`/buy/${productId}`, {
    tokenName,
    network,
  });
  return response.data;
}; 