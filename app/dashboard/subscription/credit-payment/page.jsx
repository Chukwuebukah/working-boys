"use client"

import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { 
    Star, 
    CreditCard, 
    Check, 
    Loader2,
    ArrowRight,
    Shield,
    Zap,
    CheckCircle,
    XCircle
  } from 'lucide-react';
import { AuthContext } from "../../../context/AuthContext";
import apiRequest from "../../../lib/apiRequest";

const SubscriptionPage = () => {
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [userStars, setUserStars] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();

    // Subscription plans
    const plans = [
        {
            id: 'basic',
            name: 'Basic Plan',
            price: '₦10,000',
            stars: 20,
            color: 'from-blue-500 to-blue-600',
            features: [
                '20 Stars',
                '4 Receipt Generations',
                'Email Support',
                '1 Month Access'
            ],
            popular: false
        },
        {
            id: 'premium',
            name: 'Premium plan',
            price: '₦20,000',
            stars: 50,
            color: 'from-purple-500 to-purple-600',
            features: [
                '50 Stars',
                '10 Receipt Generations',
                'Priority Email Support',
                '2 Months Access',
                'Advanced Templates'
            ],
            popular: true
        },
        {
            id: 'pro',
            name: 'Pro Plan',
            price: '₦30,000',
            stars: 100,
            color: 'from-green-500 to-green-600',
            features: [
                '100 Stars',
                '20 Receipt Generations',
                '24/7 Support',
                '3 Months Access',
                'All Templates',
                'Custom Templates'
            ],
            popular: false
        }
    ];

    // Fetch user's current stars
    useEffect(() => {
        const fetchUserStars = async () => {
            try {
                const response = await apiRequest.get('/payment/stars');
                setUserStars(response.data.stars);
                console.log('User stars fetched:', response.data.stars);
            } catch (error) {
                console.error('Error fetching user stars:', error.response?.data || error.message);
                setUserStars(0);
            }
        };

        if (currentUser) {
            fetchUserStars();
        }
    }, [currentUser]);

    // Check for payment callback and redirect to dashboard after verification
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const reference = urlParams.get('reference');
        const trxref = urlParams.get('trxref');
        const status = urlParams.get('status');

        const paymentReference = reference || trxref;

        if (paymentReference) {
            setLoading(true);
            console.log('Payment callback detected, reference:', paymentReference);
            
            if (status === 'cancelled') {
                console.log('Payment was cancelled');
                setPaymentStatus('failed');
                setLoading(false);
            } else {
                // Verify payment and redirect to dashboard
                verifyPaymentAndRedirect(paymentReference);
            }
            
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    // Handle payment initialization
    const handlePurchase = async (planId) => {
        if (!currentUser) {
            alert('Please login to purchase a subscription');
            return;
        }
        
        setLoading(true);
        setSelectedPlan(planId);
        setPaymentStatus(null);

        try {
            console.log('Initializing payment for plan:', planId);
            
            const response = await apiRequest.post('/payment/initialize', {
                planType: planId
            });

            console.log('Payment initialization response:', response.data);

            if (response.status === 200) {
                const { authorization_url } = response.data.data;
                // Redirect to Paystack payment page
                window.location.href = authorization_url;
            }
        } catch (error) {
            console.error('Payment initialization error:', error.response?.data || error.message);
            setPaymentStatus('failed');
            const errorMessage = error.response?.data?.message || 'Payment initialization failed. Please try again';
            alert(errorMessage);
        } finally {
            setLoading(false);
            setSelectedPlan(null);
        }
    };

    // Verify payment and redirect to dashboard
    const verifyPaymentAndRedirect = async (reference) => {
        console.log('Verifying payment with reference:', reference);
        
        try {
            const response = await apiRequest.post('/payment/verify', {
                reference
            });

            console.log('Payment verification response:', response.data);

            if (response.status === 200) {
                console.log('Payment verified successfully, redirecting to dashboard...');
                
                // Show success message briefly
                setPaymentStatus('success');
                
                // Redirect to dashboard after 1.5 seconds
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1500);
                
            }
        } catch (error) {
            console.error('Payment verification error:', error.response?.data || error.message);
            setPaymentStatus('failed');
            
            // Redirect to dashboard even on error after 3 seconds
            setTimeout(() => {
                router.push('/dashboard');
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    // Payment success/failure modal
    const PaymentModal = () => {
        if (!paymentStatus) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
                <div className="text-center">
                  {paymentStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                      <p className="text-gray-600 mb-6">
                        Your stars have been added successfully. Redirecting to dashboard...
                      </p>
                      <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    </>
                  ) : (
                    <>
                      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h3>
                      <p className="text-gray-600 mb-6">
                        There was an issue with your payment. Redirecting to dashboard...
                      </p>
                      <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    </>
                  )}
                </div>
              </div>
            </div>
        );
    };

    // Show loading screen during payment verification
    if (loading && new URLSearchParams(window.location.search).get('reference')) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
                    <p className="text-gray-600">Please wait while we verify your payment...</p>
                </div>
            </div>
        );
    }
  
    return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 xs:py-10 px-2 xs:px-4">
        <PaymentModal />
        
  <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-8 xs:mb-12 sm:mb-16">
            <div className="flex flex-col xs:flex-row justify-center items-center mb-4 xs:mb-6 gap-2 xs:gap-4">
              <div className="bg-yellow-100 p-2 xs:p-3 rounded-full mr-0 xs:mr-4">
                <Star className="w-6 xs:w-8 h-6 xs:h-8 text-yellow-500" />
              </div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900">
                Choose Your Plan
              </h1>
            </div>
            <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-xl sm:max-w-3xl mx-auto">
              Purchase stars to generate cryptocurrency payment receipts. Each receipt generation costs 5 stars.
            </p>
            {/* Current Stars Display */}
            <div className="mt-4 xs:mt-8 inline-flex items-center bg-white px-4 xs:px-6 py-2 xs:py-3 rounded-full shadow-md">
              <Star className="w-4 xs:w-5 h-4 xs:h-5 text-yellow-500 mr-2" />
              <span className="text-base xs:text-lg font-semibold text-gray-900">
                Current Balance: {userStars} Stars
              </span>
            </div>
          </div>
  
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                  plan.popular ? 'border-2 border-purple-500' : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-purple-500 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className={`bg-gradient-to-r ${plan.color} p-4 xs:p-6 sm:p-8 text-white ${plan.popular ? 'pt-8 xs:pt-12' : ''}`}>
                  <div className="text-center">
                    <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-1 xs:mb-2">{plan.name}</h3>
                    <div className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-1 xs:mb-2">{plan.price}</div>
                    <div className="flex items-center justify-center">
                      <Star className="w-4 xs:w-5 h-4 xs:h-5 mr-1" />
                      <span className="text-base xs:text-lg">{plan.stars} Stars</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 xs:p-6 sm:p-8">
                  <ul className="space-y-2 xs:space-y-4 mb-4 xs:mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 xs:w-5 h-4 xs:h-5 text-green-500 mr-2 xs:mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-xs xs:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePurchase(plan.id)}
                    disabled={loading && selectedPlan === plan.id}
                    className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 xs:py-4 px-4 xs:px-6 rounded-xl font-semibold text-base xs:text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                  >
                    {loading && selectedPlan === plan.id ? (
                      <Loader2 className="w-5 xs:w-6 h-5 xs:h-6 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-4 xs:w-5 h-4 xs:h-5 mr-2" />
                        Pay with Paystack
                        <ArrowRight className="w-4 xs:w-5 h-4 xs:h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
  
          {/* Payment Methods */}
          <div className="mt-10 xs:mt-12 sm:mt-16 text-center px-2">
            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-4 xs:mb-8">
              Secure Payment with Paystack
            </h3>
            <div className="flex flex-col xs:flex-row justify-center items-center gap-4 xs:gap-8 mb-4 xs:mb-8">
              <div className="bg-white p-3 xs:p-4 rounded-lg shadow-md w-full xs:w-auto">
                <CreditCard className="w-6 xs:w-8 h-6 xs:h-8 text-blue-500 mx-auto mb-1 xs:mb-2" />
                <p className="text-xs xs:text-sm text-gray-600">Cards</p>
              </div>
              <div className="bg-white p-3 xs:p-4 rounded-lg shadow-md w-full xs:w-auto">
                <Shield className="w-6 xs:w-8 h-6 xs:h-8 text-green-500 mx-auto mb-1 xs:mb-2" />
                <p className="text-xs xs:text-sm text-gray-600">Bank Transfer</p>
              </div>
              <div className="bg-white p-3 xs:p-4 rounded-lg shadow-md w-full xs:w-auto">
                <Zap className="w-6 xs:w-8 h-6 xs:h-8 text-purple-500 mx-auto mb-1 xs:mb-2" />
                <p className="text-xs xs:text-sm text-gray-600">USSD</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs xs:text-sm">
              All payments are processed securely through Paystack. 
              Your payment information is encrypted and never stored on our servers.
            </p>
          </div>
  
          {/* Features Section */}
          <div className="mt-12 xs:mt-16 sm:mt-20">
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 xs:mb-12">
              Why Choose Our Service?
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 p-3 xs:p-4 rounded-full w-12 xs:w-16 h-12 xs:h-16 mx-auto mb-2 xs:mb-4 flex items-center justify-center">
                  <Shield className="w-6 xs:w-8 h-6 xs:h-8 text-blue-500" />
                </div>
                <h3 className="text-base xs:text-xl font-semibold mb-1 xs:mb-2">Secure & Reliable</h3>
                <p className="text-gray-600 text-xs xs:text-base">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-3 xs:p-4 rounded-full w-12 xs:w-16 h-12 xs:h-16 mx-auto mb-2 xs:mb-4 flex items-center justify-center">
                  <Zap className="w-6 xs:w-8 h-6 xs:h-8 text-green-500" />
                </div>
                <h3 className="text-base xs:text-xl font-semibold mb-1 xs:mb-2">Instant Generation</h3>
                <p className="text-gray-600 text-xs xs:text-base">
                  Generate professional receipts in seconds
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-3 xs:p-4 rounded-full w-12 xs:w-16 h-12 xs:h-16 mx-auto mb-2 xs:mb-4 flex items-center justify-center">
                  <Star className="w-6 xs:w-8 h-6 xs:h-8 text-purple-500" />
                </div>
                <h3 className="text-base xs:text-xl font-semibold mb-1 xs:mb-2">Star System</h3>
                <p className="text-gray-600 text-xs xs:text-base">
                  Pay once, use multiple times with our star system
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SubscriptionPage;