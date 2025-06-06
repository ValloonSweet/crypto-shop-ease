import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useCart } from '../../contexts/CartContext';
import { buyProduct } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface NetworkOption {
  id: string;
  name: string;
  symbol: string;
  icon: string;
}

interface TokenOption {
  id: string;
  name: string;
  symbol: string;
  rate: number;
}

interface CryptoPaymentProps {
  selectedNetwork: string;
  setSelectedNetwork: (network: string) => void;
  selectedToken: string;
  setSelectedToken: (token: string) => void;
  email: string;
  shippingAddress: {
    fullName: string;
    address: string;
  };
  onCheckout: () => void;
}

const CryptoPayment = ({ 
  selectedNetwork, 
  setSelectedNetwork, 
  selectedToken, 
  setSelectedToken,
  email,
  shippingAddress,
  onCheckout
}: CryptoPaymentProps) => {
  const { state } = useCart();
  const [paying, setPaying] = useState(false);
  const navigate = useNavigate();

  const networkOptions: NetworkOption[] = [
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: '🔷' },
    { id: 'bsc', name: 'BNB Smart Chain', symbol: 'BSC', icon: '🟡' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC', icon: '🟣' },
    { id: 'tron', name: 'TRON', symbol: 'TRX', icon: '🔴' }
  ];

  const tokenOptions: TokenOption[] = [
    { id: 'BTT', name: 'BTT', symbol: 'BTT', rate: 1.0 },
    { id: 'USDC', name: 'USDC', symbol: 'USDC', rate: 1.0 }
  ];

  const selectedNetworkData = networkOptions.find(network => network.id === selectedNetwork);
  const selectedTokenData = tokenOptions.find(token => token.id === selectedToken);
  const tokenAmount = selectedTokenData ? (state.total * selectedTokenData.rate).toFixed(2) : '0';

  return (
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
          onClick={async () => {
            setPaying(true);
            try {
              const productId = state.items[0]?.id;
              const data = await buyProduct(productId, selectedToken, selectedNetwork);
              if (data && data.status && data.dep_req && data.dep_req.payment_link) {
                window.location.href = data.dep_req.payment_link;
              } else {
                alert(data.msg || 'Payment initiation failed.');
              }
            } catch (err) {
              alert('Failed to initiate payment.');
            } finally {
              setPaying(false);
            }
          }}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-6"
          disabled={!email || !shippingAddress.fullName || !shippingAddress.address || paying}
        >
          {paying ? 'Processing...' : `Pay ${tokenAmount} ${selectedTokenData?.symbol} on ${selectedNetworkData?.name}`}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By completing this purchase, you agree to our terms of service. 
          Cryptocurrency payments are processed securely through supported networks.
        </p>
      </CardContent>
    </Card>
  );
};

export default CryptoPayment;
