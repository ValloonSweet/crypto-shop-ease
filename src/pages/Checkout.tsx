
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import CartSummary from '../components/checkout/CartSummary';
import ShippingForm from '../components/checkout/ShippingForm';
import CryptoPayment from '../components/checkout/CryptoPayment';

const Checkout = () => {
  const { state, clearCart } = useCart();
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [selectedToken, setSelectedToken] = useState('usdt');
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const networkOptions = [
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: '🔷' },
    { id: 'bsc', name: 'BNB Smart Chain', symbol: 'BSC', icon: '🟡' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC', icon: '🟣' },
    { id: 'tron', name: 'TRON', symbol: 'TRX', icon: '🔴' }
  ];

  const tokenOptions = [
    { id: 'usdt', name: 'Tether USD', symbol: 'USDT', rate: 1.0 },
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC', rate: 1.0 }
  ];

  const selectedNetworkData = networkOptions.find(network => network.id === selectedNetwork);
  const selectedTokenData = tokenOptions.find(token => token.id === selectedToken);
  const tokenAmount = selectedTokenData ? (state.total * selectedTokenData.rate).toFixed(2) : '0';

  const handleCheckout = () => {
    if (state.items.length === 0) return;
    
    // In a real app, this would integrate with the specific network's payment processor
    alert(`Processing payment of ${tokenAmount} ${selectedTokenData?.symbol} on ${selectedNetworkData?.name} network for $${state.total.toFixed(2)}`);
    clearCart();
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started</p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items and Shipping */}
          <div className="space-y-6">
            <CartSummary />
            <ShippingForm
              email={email}
              setEmail={setEmail}
              shippingAddress={shippingAddress}
              setShippingAddress={setShippingAddress}
            />
          </div>

          {/* Crypto Payment */}
          <div>
            <CryptoPayment
              selectedNetwork={selectedNetwork}
              setSelectedNetwork={setSelectedNetwork}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              email={email}
              shippingAddress={shippingAddress}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
