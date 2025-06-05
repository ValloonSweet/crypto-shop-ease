
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
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
          {/* Cart Items */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total: ${state.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                      placeholder="10001"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Crypto Payment */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>💰</span>
                  <span>Crypto Payment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Network Selection */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Choose Network</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {networkOptions.map((network) => (
                      <button
                        key={network.id}
                        onClick={() => setSelectedNetwork(network.id)}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          selectedNetwork === network.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{network.icon}</div>
                        <div className="font-semibold text-sm">{network.name}</div>
                        <div className="text-xs text-gray-600">{network.symbol}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Token Selection */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Choose Token</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {tokenOptions.map((token) => (
                      <button
                        key={token.id}
                        onClick={() => setSelectedToken(token.id)}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          selectedToken === token.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">💵</div>
                        <div className="font-semibold text-sm">{token.name}</div>
                        <div className="text-xs text-gray-600">{token.symbol}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Order Total:</span>
                    <span className="font-bold">${state.total.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Network:</span>
                    <span className="font-medium text-blue-600">{selectedNetworkData?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pay with {selectedTokenData?.name}:</span>
                    <span className="font-bold text-green-600">
                      {tokenAmount} {selectedTokenData?.symbol}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Badge variant="outline" className="w-full justify-center py-2">
                    ✅ Secure & Anonymous
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center py-2">
                    ⚡ Instant Processing
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center py-2">
                    🌍 Global Payments
                  </Badge>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-6"
                  disabled={!email || !shippingAddress.fullName || !shippingAddress.address}
                >
                  Pay {tokenAmount} {selectedTokenData?.symbol} on {selectedNetworkData?.name}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By completing this purchase, you agree to our terms of service. 
                  Cryptocurrency payments are processed securely through supported networks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
