import React from 'react';
import { env } from '../config';

const Debug: React.FC = () => {
  React.useEffect(() => {
    console.log('🔍 DEBUG: Environment Configuration');
    console.log('API_BASE_URL:', env.API_BASE_URL);
    console.log('API_TIMEOUT:', env.API_TIMEOUT);
    console.log('All env vars:', env);
  }, []);

  const testApiCall = async () => {
    try {
      const response = await fetch(`${env.API_BASE_URL}/api/resto?page=1&limit=5`);
      const data = await response.json();
      console.log('✅ API Response:', data);
      alert(`API berhasil! Mendapat ${data.data?.restaurants?.length || 0} restoran`);
    } catch (error) {
      console.error('❌ API Error:', error);
      alert('API gagal! Cek console untuk detail.');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded text-xs max-w-xs">
      <div><strong>🔧 Debug Panel</strong></div>
      <div>API URL: {env.API_BASE_URL}</div>
      <div>Timeout: {env.API_TIMEOUT}ms</div>
      
      <button 
        onClick={testApiCall}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mt-2 text-xs"
      >
        🧪 Test API
      </button>
    </div>
  );
};

export default Debug;
