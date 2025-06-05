import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';
import { Textarea } from '@/components/ui/textarea';
import { getProducts } from '../services/api';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
        setError('');
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = Array.isArray(products) ? products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Shop with Crypto
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover premium products and pay with your favorite cryptocurrency. 
            The future of shopping is here.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 256 417" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M127.9 0L124.6 11.2V277.6L127.9 280.9L255.8 208.2L127.9 0Z" fill="#343434"/><path d="M127.9 0L0 208.2L127.9 280.9V150.1V0Z" fill="#8C8C8C"/><path d="M127.9 304.7L125.9 307.2V415.2L127.9 420.1L255.9 232.2L127.9 304.7Z" fill="#3C3C3B"/><path d="M127.9 420.1V304.7L0 232.2L127.9 420.1Z" fill="#8C8C8C"/><path d="M127.9 280.9L255.8 208.2L127.9 150.1V280.9Z" fill="#141414"/><path d="M0 208.2L127.9 280.9V150.1L0 208.2Z" fill="#393939"/></svg>
              Ethereum
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 2500 2500" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1250" cy="1250" r="1250" fill="#F3BA2F"/><path d="M1250 500L1750 1250L1250 2000L750 1250L1250 500Z" fill="#fff"/></svg>
              Binance Smart Chain
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 0L37.5 32.5H0.5L19 0Z" fill="#8247E5"/></svg>
              Polygon
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <circle cx="128" cy="128" r="128" fill="#F60000"/>
                  <path d="M44 44L212 64L128 212L44 44ZM128 212L212 64L128 128L128 212ZM128 128L44 44L128 64L128 128Z" fill="#fff"/>
                </g>
              </svg>
              Tron
            </span>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                  : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {(!loading && !error && filteredProducts.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
