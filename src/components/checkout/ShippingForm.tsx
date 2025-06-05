
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

interface ShippingFormProps {
  email: string;
  setEmail: (email: string) => void;
  shippingAddress: ShippingAddress;
  setShippingAddress: (address: ShippingAddress) => void;
}

const ShippingForm = ({ email, setEmail, shippingAddress, setShippingAddress }: ShippingFormProps) => {
  return (
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
  );
};

export default ShippingForm;
