import React from 'react';
import { useAppSelector } from '../store';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Orders: React.FC = () => {
  const orders = useAppSelector((state) => state.order.orders);
  const isLoading = useAppSelector((state) => state.order.isOrdersLoading);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-display-2xl font-bold text-gray-900 mb-2">
            Pesanan Saya
          </h1>
          <p className="text-gray-600">
            Lihat status dan riwayat pesanan Anda
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Memuat pesanan...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada pesanan
            </h3>
            <p className="text-gray-600 mb-4">
              Mulai memesan makanan favorit Anda
            </p>
            <Button variant="outline">
              Mulai Memesan
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.transactionId}
                      </CardTitle>
                      <CardDescription>
                        {order.restaurant.name} • {order.restaurant.location}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'delivered' || order.status === 'done' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status === 'preparing' && 'Sedang Diproses'}
                        {order.status === 'on_the_way' && 'Dalam Perjalanan'}
                        {order.status === 'delivered' && 'Terkirim'}
                        {order.status === 'done' && 'Selesai'}
                        {order.status === 'cancelled' && 'Dibatalkan'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.menuName}</span>
                          <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Order Details */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total:</span>
                        <span className="font-semibold">
                          Rp {order.totalAmount.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Metode Pembayaran:</span>
                        <span>
                          {order.paymentMethod === 'credit_card' && 'Kartu Kredit'}
                          {order.paymentMethod === 'debit_card' && 'Kartu Debit'}
                          {order.paymentMethod === 'cash' && 'Tunai'}
                          {order.paymentMethod === 'e_wallet' && 'E-Wallet'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tanggal:</span>
                        <span>{new Date(order.createdAt).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" size="sm">
                        Lihat Detail
                      </Button>
                      {(order.status === 'delivered' || order.status === 'done') && (
                        <Button size="sm">
                          Pesan Lagi
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
