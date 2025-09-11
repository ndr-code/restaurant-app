import React from 'react';
import { useAppSelector } from '../store';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Cart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalAmount = useAppSelector((state) => state.cart.summary.totalPrice);
  const itemCount = useAppSelector((state) => state.cart.summary.totalItems);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-display-2xl font-bold text-gray-900 mb-2">
            Keranjang Belanja
          </h1>
          <p className="text-gray-600">
            {itemCount > 0 ? `${itemCount} item dalam keranjang` : 'Keranjang kosong'}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0a1 1 0 100-2 1 1 0 000 2zm-9 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Keranjang Anda kosong
            </h3>
            <p className="text-gray-600 mb-4">
              Mulai berbelanja dan tambahkan item ke keranjang
            </p>
            <Button variant="outline">
              Mulai Belanja
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={`${item.restaurant.id}-${item.menuId}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.menu.name}</h3>
                        <p className="text-gray-600 text-sm">
                          Restaurant: {item.restaurant.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Menu ID: {item.menuId}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold">
                          Rp {item.menu.price.toLocaleString('id-ID')}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="font-bold mt-1">
                          Rp {item.itemTotal.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Item:</span>
                    <span>{itemCount}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <Button className="w-full mt-4" size="lg">
                  Lanjut ke Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
