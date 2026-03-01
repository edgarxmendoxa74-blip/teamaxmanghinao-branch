import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2, Maximize2, X, Copy, Check, ShoppingBag, Truck, Banknote, Smartphone } from 'lucide-react';
import { CartItem, PaymentMethod, ServiceType } from '../types';
import { usePaymentMethods } from '../hooks/usePaymentMethods';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const { siteSettings } = useSiteSettings();
  const { paymentMethods } = usePaymentMethods();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('pickup');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pickupTime, setPickupTime] = useState('5-10');
  const [customTime, setCustomTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gcash');

  const [notes, setNotes] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Set default payment method when payment methods are loaded
  React.useEffect(() => {
    if (paymentMethods.length > 0 && !paymentMethod) {
      setPaymentMethod(paymentMethods[0].id as PaymentMethod);
    }
  }, [paymentMethods, paymentMethod]);

  const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethod);

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const generateOrderDetails = () => {
    const timeInfo = serviceType === 'pickup'
      ? (pickupTime === 'custom' ? customTime : `${pickupTime} minutes`)
      : '';

    const serviceLabel = serviceType.charAt(0).toUpperCase() + serviceType.slice(1);

    return `
${siteSettings?.site_name || "Tea Max Coffee Manghinao 1 Branch"} - ORDER

Customer: ${customerName}
Contact: ${contactNumber}
Service: ${serviceLabel}
${serviceType === 'delivery' ? `Address: ${address}${landmark ? `\nLandmark: ${landmark}` : ''}` : ''}
${serviceType === 'pickup' ? `Time: ${timeInfo}` : ''}

ORDER DETAILS:

${cartItems.map(item => {
      let itemDetails = `${item.quantity} x ${item.name}`;
      if (item.selectedVariation) {
        itemDetails += ` (${item.selectedVariation.name})`;
      }
      if (item.selectedFlavor) {
        itemDetails += ` (${item.selectedFlavor})`;
      }
      if (item.selectedAddOns && item.selectedAddOns.length > 0) {
        itemDetails += ` + ${item.selectedAddOns.map(addOn =>
          addOn.quantity && addOn.quantity > 1
            ? `${addOn.name} x${addOn.quantity}`
            : addOn.name
        ).join(', ')}`;
      }
      itemDetails += ` \u20B1${item.totalPrice * item.quantity}`;
      return itemDetails;
    }).join('\n\n')}


TOTAL: \u20B1${totalPrice}
${serviceType === 'delivery' ? `Delivery Fee: To be added by rider` : ''}
Payment: ${selectedPaymentMethod?.name || paymentMethod}
${paymentMethod !== 'cod'
        ? ``
        : 'Payment Status: Cash on Delivery'
      }

${notes ? `Notes: ${notes}` : ''}

Thank you for choosing ${siteSettings?.site_name || "Tea Max Coffee Manghinao 1 Branch"}!
    `.trim();
  };

  const handleCopyOrder = async () => {
    const text = generateOrderDetails();
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handlePlaceOrder = async () => {
    const orderDetails = generateOrderDetails();

    // Copy to clipboard first as a fallback for iOS/mobile issues
    try {
      await navigator.clipboard.writeText(orderDetails);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    const encodedMessage = encodeURIComponent(orderDetails);
    const fbHandle = siteSettings?.facebook_handle?.replace('@', '') || 'TeamaxManghinao';
    const messengerUrl = `https://m.me/${fbHandle}?text=${encodedMessage}`;

    // Show redirection modal
    setShowRedirectModal(true);

    // Short delay before redirection to ensure user sees the modal/instructions
    setTimeout(() => {
      window.location.href = messengerUrl;
    }, 2000);
  };

  const isDetailsValid = customerName.trim() && contactNumber.trim() &&
    (serviceType !== 'delivery' || address.trim()) &&
    (serviceType === 'delivery' || (pickupTime !== 'custom' || customTime.trim()));

  if (step === 'details') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-3xl font-serif font-semibold text-black ml-8">Order Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-serif font-medium text-black mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-black">{item.name}</h4>
                    {item.selectedVariation && (
                      <p className="text-sm text-gray-600">Variation: {item.selectedVariation.name}</p>
                    )}
                    {item.selectedFlavor && (
                      <p className="text-sm text-gray-600">Flavor: {item.selectedFlavor}</p>
                    )}
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Add-ons: {item.selectedAddOns.map(addOn => addOn.name).join(', ')}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">PHP {item.totalPrice} x {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-black">PHP {item.totalPrice * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between text-2xl font-serif font-semibold text-black">
                <span>Total:</span>
                <span>PHP {totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-serif font-medium text-black mb-6">Customer Information</h2>

            <form className="space-y-6">
              {/* Customer Information */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Contact Number *</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  placeholder="09XX XXX XXXX"
                  required
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-black mb-3">Service Type *</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'pickup', label: 'Pickup', icon: ShoppingBag },
                    { value: 'delivery', label: 'Delivery', icon: Truck }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setServiceType(option.value as ServiceType)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-1.5 ${serviceType === option.value
                        ? 'border-black bg-white text-black shadow-md'
                        : 'border-gray-200 bg-white text-gray-400 hover:border-black/50'
                        }`}
                    >
                      <option.icon className="h-5 w-5" />
                      <div className="text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection for non-delivery */}
              {serviceType === 'pickup' && (
                <div>
                  <label className="block text-sm font-medium text-black mb-3">
                    Pickup Time *
                  </label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: '5-10', label: '5-10 mins' },
                        { value: '15-20', label: '15-20 mins' },
                        { value: '25-30', label: '25-30 mins' },
                        { value: 'custom', label: 'Custom' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPickupTime(option.value)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${pickupTime === option.value
                            ? 'border-black bg-white text-black shadow-md'
                            : 'border-gray-200 bg-white text-gray-400 hover:border-black/50'
                            }`}
                        >
                          <Clock className="h-4 w-4 mx-auto mb-1" />
                          {option.label}
                        </button>
                      ))}
                    </div>

                    {pickupTime === 'custom' && (
                      <input
                        type="text"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        placeholder="e.g., 45 minutes, 2:30 PM"
                        required
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Delivery Address */}
              {serviceType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Delivery Address *</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      placeholder="Enter your complete delivery address"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Near McDonald's"
                    />
                  </div>
                </>
              )}

              {/* Special Notes */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Special Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  placeholder="Any special requests..."
                  rows={2}
                />
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleProceedToPayment();
                }}
                disabled={!isDetailsValid}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 transform border-2 ${isDetailsValid
                  ? 'border-black bg-white text-black hover:bg-black hover:text-white active:bg-black active:text-white hover:scale-[1.02] active:scale-95 shadow-lg'
                  : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
              >
                Proceed to Payment
              </button>

              {!isDetailsValid && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  {!customerName.trim() && 'Name is required. '}
                  {!contactNumber.trim() && 'Contact is required. '}
                  {serviceType === 'delivery' && !address.trim() && 'Address is required. '}
                  {serviceType === 'pickup' && pickupTime === 'custom' && !customTime.trim() && 'Time is required. '}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Payment Step
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setStep('details');
          }}
          className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Details</span>
        </button>
        <h1 className="text-3xl font-serif font-semibold text-black ml-8">Payment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Method Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-serif font-medium text-black mb-6">Choose Payment Method</h2>

          <div className="grid grid-cols-1 gap-4 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${paymentMethod === method.id
                  ? 'border-black bg-white text-black shadow-md scale-[1.02]'
                  : 'border-gray-100 bg-white text-gray-400 hover:border-black/30 hover:scale-[1.01]'
                  }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${paymentMethod === method.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {method.id === 'cod' ? <Banknote className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
                  </div>
                  <div className="text-left">
                    <span className="font-semibold block">{method.name}</span>
                    {method.id === 'cod' && (
                      <span className="text-xs text-gray-500">Pay when you receive</span>
                    )}
                  </div>
                </div>
                {paymentMethod === method.id && (
                  <CheckCircle2 className="h-6 w-6 text-black" />
                )}
              </button>
            ))}
          </div>

          {/* Payment Details with QR Code */}
          {selectedPaymentMethod && (
            <div className="bg-white rounded-xl p-6 mb-6 border-2 border-dashed border-gray-200 hover:border-black transition-colors duration-300">
              <h3 className="font-medium text-black mb-4 flex items-center">
                Payment Details
              </h3>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{selectedPaymentMethod.name}</p>
                  {selectedPaymentMethod.account_number && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Account Number</span>
                      <p className="font-mono text-lg text-black font-bold tracking-tight">{selectedPaymentMethod.account_number}</p>
                    </div>
                  )}
                  {selectedPaymentMethod.account_name && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Account Name</span>
                      <p className="text-sm text-black font-medium">{selectedPaymentMethod.account_name}</p>
                    </div>
                  )}
                  <div className="pt-2">
                    <p className="text-2xl font-bold text-black">PHP {totalPrice}</p>
                    <p className="text-[10px] text-gray-400">Exact amount to pay</p>
                  </div>
                </div>
                <div className="relative group self-center md:self-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowQRModal(true);
                    }}
                    className="relative block rounded-xl overflow-hidden shadow-xl border-4 border-white transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={selectedPaymentMethod.qr_code_url}
                      alt={`${selectedPaymentMethod.name} QR Code`}
                      className="w-40 h-40 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                      <Maximize2 className="h-8 w-8 mb-1" />
                      <span className="text-[10px] font-bold uppercase">Click to View</span>
                    </div>
                  </button>

                </div>
              </div>
            </div>
          )}

          {/* QR Code Modal */}
          {showQRModal && selectedPaymentMethod && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setShowQRModal(false)}>
              <div className="relative bg-white rounded-2xl p-4 max-w-sm w-full animate-scale-in" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
                  aria-label="Close QR Modal"
                >
                  <X className="h-8 w-8" />
                </button>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-black">{selectedPaymentMethod.name}</h3>
                  <p className="text-sm text-gray-500">Scan this QR code to pay</p>
                </div>
                <img
                  src={selectedPaymentMethod.qr_code_url}
                  alt="QR Code Large"
                  className="w-full aspect-square rounded-xl shadow-inner"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                  }}
                />
                <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Account:</span>
                    <span className="font-bold text-black">{selectedPaymentMethod.account_name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total:</span>
                    <span className="font-bold text-black">PHP {totalPrice}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="w-full mt-4 py-3 bg-black text-white rounded-xl font-bold transition-transform active:scale-95"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-black mb-2 flex items-center">
                <Banknote className="h-5 w-5 mr-2 text-teamax-accent" />
                Cash on Delivery
              </h4>
              <p className="text-sm text-gray-700">
                Please prepare exact amount. You will pay when you {serviceType === 'pickup' ? 'pick up' : 'receive'} your order.
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-medium text-black">Final Order Summary</h2>
            <button
              onClick={handleCopyOrder}
              className="flex items-center space-x-2 text-sm font-medium text-teamax-accent hover:text-black transition-colors bg-teamax-accent/10 px-3 py-1.5 rounded-lg"
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Details</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-black mb-2">Customer Details</h4>
              <p className="text-sm text-gray-600">Name: {customerName}</p>
              <p className="text-sm text-gray-600">Contact: {contactNumber}</p>
              <p className="text-sm text-gray-600">Service: {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
              {serviceType === 'delivery' && (
                <>
                  <p className="text-sm text-gray-600">Address: {address}</p>
                  {landmark && <p className="text-sm text-gray-600">Landmark: {landmark}</p>}
                </>
              )}
              {serviceType === 'pickup' && (
                <p className="text-sm text-gray-600">
                  Pickup Time: {pickupTime === 'custom' ? customTime : `${pickupTime} minutes`}
                </p>
              )}
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <h4 className="font-medium text-black">{item.name}</h4>
                  {item.selectedVariation && (
                    <p className="text-sm text-gray-600">Variation: {item.selectedVariation.name}</p>
                  )}
                  {item.selectedFlavor && (
                    <p className="text-sm text-gray-600">Flavor: {item.selectedFlavor}</p>
                  )}
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                    <p className="text-sm text-gray-600">
                      Add-ons: {item.selectedAddOns.map(addOn =>
                        addOn.quantity && addOn.quantity > 1
                          ? `${addOn.name} x${addOn.quantity}`
                          : addOn.name
                      ).join(', ')}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">PHP {item.totalPrice} x {item.quantity}</p>
                </div>
                <span className="font-semibold text-black">PHP {item.totalPrice * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex items-center justify-between text-2xl font-serif font-semibold text-black">
              <span>Total:</span>
              <span>PHP {totalPrice}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handlePlaceOrder();
            }}
            className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 transform border-2 border-black bg-white text-black hover:bg-black hover:text-white active:bg-black active:text-white hover:scale-[1.01] active:scale-95 shadow-md"
          >
            Place Order via Messenger
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            You'll be redirected to Messenger to confirm your order.
          </p>
        </div>
      </div>

      {/* Redirection Modal */}
      {showRedirectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-scale-in">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-8 w-8 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">Redirecting...</h3>
            <p className="text-gray-600 mb-6">
              We're opening Messenger for you to send your order.
            </p>

            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <p className="text-sm font-medium text-blue-800 flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Order Details Copied!
              </p>
              <p className="text-xs text-blue-600 mt-1">
                If the message field is empty, just <b>long-press and paste</b> in Messenger.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  const orderDetails = generateOrderDetails();
                  const encodedMessage = encodeURIComponent(orderDetails);
                  const fbHandle = siteSettings?.facebook_handle?.replace('@', '') || 'TeamaxManghinao';
                  window.location.href = `https://m.me/${fbHandle}?text=${encodedMessage}`;
                }}
                className="w-full py-3 bg-black text-white rounded-xl font-bold transition-transform active:scale-95"
              >
                Go to Messenger Now
              </button>
              <button
                onClick={() => setShowRedirectModal(false)}
                className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold transition-transform active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
