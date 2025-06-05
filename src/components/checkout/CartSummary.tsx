
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const CartSummary = () => {
  const { state, updateQuantity, removeItem } = useCart();

  return (
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
  );
};

export default CartSummary;
