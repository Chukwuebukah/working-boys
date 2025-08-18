"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import apiRequest from '../../../lib/apiRequest';


const PaymentCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your payment...');
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const reference = searchParams.get('reference');
    const trxref = searchParams.get('trxref');
    
    const paymentReference = reference || trxref;

    if (paymentReference) {
      verifyPayment(paymentReference);
    } else {
      setStatus('error');
      setMessage('No payment reference found');
    }
  }, [searchParams]);

  const verifyPayment = async (reference) => {
    try {
      const response = await apiRequest.post('/payment/verify', {
        reference
      });

      if (response.status === 200) {
        setStatus('success');
        setMessage('Payment successful! Stars have been added to your account.');
        setStars(response.data.stars);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setStatus('error');
      setMessage(error.response?.data?.message || 'Payment verification failed');
    }
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const handleTryAgain = () => {
    router.push('/subscription');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-semibold">
                {stars} stars added to your account!
              </p>
            </div>
            <button
              onClick={handleGoToDashboard}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              Go to Dashboard
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={handleTryAgain}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleGoToDashboard}
                className="w-full bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go to Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;