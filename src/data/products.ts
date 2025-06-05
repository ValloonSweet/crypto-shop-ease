
import { Product } from '../contexts/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Home Speaker',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=500&fit=crop',
    description: 'Voice-controlled smart speaker with built-in AI assistant. Control your smart home devices with ease.',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Luxury Pet Bed',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&h=500&fit=crop',
    description: 'Ultra-comfortable pet bed made with premium materials. Your furry friend will love this cozy sleeping spot.',
    category: 'Pet Supplies'
  },
  {
    id: '4',
    name: 'Professional Laptop',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=500&fit=crop',
    description: 'High-performance laptop perfect for professionals and creative work. Fast processor and stunning display.',
    category: 'Electronics'
  },
  {
    id: '5',
    name: 'Productivity MacBook',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop',
    description: 'Latest MacBook Pro with M-series chip. Ultimate performance for developers and content creators.',
    category: 'Electronics'
  },
  {
    id: '6',
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop',
    description: 'High-precision wireless gaming mouse with customizable RGB lighting and ergonomic design.',
    category: 'Electronics'
  }
];

export const categories = ['All', 'Electronics', 'Pet Supplies'];
