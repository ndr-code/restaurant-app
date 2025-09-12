import React, { useState } from 'react';
import { useAppSelector } from '../store';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Checkout: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalAmount = useAppSelector((state) => state.cart.summary.totalPrice);
  const itemCount = useAppSelector((state) => state.cart.summary.totalItems);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'debit_card' | 'cash' | 'e_wallet'>('credit_card');
  const [notes, setNotes] = useState('');

  const handleCheckout = () => {
    // Implementation for checkout process
    console.log('Processing checkout...', {
      deliveryAddress,
      paymentMethod,
      notes,
      totalAmount
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-display-2xl font-bold text-gray-900 mb-4">
              Keranjang Kosong
            </h1>
            <p className="text-gray-600 mb-6">
              Tambahkan item ke keranjang untuk melanjutkan checkout
            </p>
            <Button>
              Mulai Berbelanja
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-display-2xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">
            Selesaikan pesanan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle>Alamat Pengiriman</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={3}
                  placeholder="Masukkan alamat lengkap pengiriman..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Metode Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { value: 'credit_card', label: 'Kartu Kredit' },
                    { value: 'debit_card', label: 'Kartu Debit' },
                    { value: 'e_wallet', label: 'E-Wallet' },
                    { value: 'cash', label: 'Tunai' }
                  ].map((method) => (
                    <label key={method.value} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value as 'credit_card' | 'debit_card' | 'cash' | 'e_wallet')}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span>{method.label}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Catatan Pesanan (Opsional)</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={2}
                  placeholder="Catatan khusus untuk pesanan..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={`${item.restaurant.id}-${item.menuId}`} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{item.menu.name}</p>
                          <p className="text-gray-500">
                            {item.restaurant.name} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          Rp {item.itemTotal.toLocaleString('id-ID')}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({itemCount} item):</span>
                      <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Ongkos Kirim:</span>
                      <span>Rp 10.000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pajak (10%):</span>
                      <span>Rp {(totalAmount * 0.1).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>Rp {(totalAmount + 10000 + (totalAmount * 0.1)).toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={!deliveryAddress.trim()}
                  >
                    Bayar Sekarang
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-2">
                    Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
