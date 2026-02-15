import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2, Maximize2, X } from 'lucide-react';
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
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);

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

  const handlePlaceOrder = () => {
    const timeInfo = serviceType === 'pickup'
      ? (pickupTime === 'custom' ? customTime : `${pickupTime} minutes`)
      : '';

    const formatTime = (timeString: string) => {
      if (!timeString) return '';
      // Parse time in HH:MM format
      const [hour, minute] = timeString.split(':');

      // Convert 24-hour to 12-hour format
      const hourNum = parseInt(hour);
      const period = hourNum >= 12 ? 'PM' : 'AM';
      const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;

      return `${hour12}:${minute} ${period}`;
    };



    const orderDetails = `
🛒 ${siteSettings?.site_name || "Tea Max Milk Tea Hub"} ORDER

👤 Customer: ${customerName}
📞 Contact: ${contactNumber}
📍 Service: ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
${serviceType === 'delivery' ? `🏠 Address: ${address}${landmark ? `\n🗺️ Landmark: ${landmark}` : ''}` : ''}
${serviceType === 'pickup' ? `⏰ Pickup Time: ${timeInfo}` : ''}



📋 ORDER DETAILS:
${cartItems.map(item => {
      let itemDetails = `• ${item.name}`;
      if (item.selectedVariation) {
        itemDetails += ` (${item.selectedVariation.name})`;
      }
      if (item.selectedAddOns && item.selectedAddOns.length > 0) {
        itemDetails += ` + ${item.selectedAddOns.map(addOn =>
          addOn.quantity && addOn.quantity > 1
            ? `${addOn.name} x${addOn.quantity}`
            : addOn.name
        ).join(', ')}`;
      }
      itemDetails += ` x${item.quantity} - ₱${item.totalPrice * item.quantity}`;
      return itemDetails;
    }).join('\n')}

💰 TOTAL: ₱${totalPrice}
${serviceType === 'delivery' ? `🛵 DELIVERY FEE:` : ''}
💳 Payment: ${selectedPaymentMethod?.name || paymentMethod}
${paymentMethod !== 'cod'
        ? '📸 Payment Screenshot: Please attach your payment receipt screenshot'
        : '💵 Payment Status: Cash on Delivery'
      }

${notes ? `📝 Notes: ${notes}` : ''}

Please confirm this order to proceed. Thank you for choosing ${siteSettings?.site_name || "Tea Max Milk Tea Hub"}! 🍽️
    `.trim();

    const encodedMessage = encodeURIComponent(orderDetails);
    const fbHandle = siteSettings?.facebook_handle?.replace('@', '') || 'teamaxmilkteahub';
    const messengerUrl = `https://m.me/${fbHandle}?text=${encodedMessage}`;

    window.open(messengerUrl, '_blank');

  };

  const isDetailsValid = customerName.trim() && contactNumber.trim() &&
    (serviceType !== 'delivery' || address.trim()) &&
    (serviceType !== 'pickup' || (pickupTime !== 'custom' || customTime.trim()));

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
          <h1 className="text-3xl font-serif font-semibold text-natalna-dark ml-8">Order Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-serif font-medium text-natalna-dark mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-natalna-beige">
                  <div>
                    <h4 className="font-medium text-black">{item.name}</h4>
                    {item.selectedVariation && (
                      <p className="text-sm text-gray-600">Size: {item.selectedVariation.name}</p>
                    )}
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Add-ons: {item.selectedAddOns.map(addOn => addOn.name).join(', ')}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">₱{item.totalPrice} x {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-black">₱{item.totalPrice * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-natalna-beige pt-4">
              <div className="flex items-center justify-between text-2xl font-serif font-semibold text-natalna-dark">
                <span>Total:</span>
                <span>₱{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-serif font-medium text-natalna-dark mb-6">Customer Information</h2>

            <form className="space-y-6">
              {/* Customer Information */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border border-natalna-beige rounded-lg focus:ring-2 focus:ring-natalna-primary focus:border-transparent transition-all duration-200"
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
                  className="w-full px-4 py-3 border border-natalna-beige rounded-lg focus:ring-2 focus:ring-natalna-primary focus:border-transparent transition-all duration-200"
                  placeholder="09XX XXX XXXX"
                  required
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-black mb-3">Service Type *</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'pickup', label: 'Pickup', icon: '🚶' },
                    { value: 'delivery', label: 'Delivery', icon: '🛵' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setServiceType(option.value as ServiceType)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${serviceType === option.value
                        ? 'border-natalna-primary bg-natalna-primary text-black shadow-md'
                        : 'border-natalna-beige bg-white text-gray-700 hover:border-natalna-secondary'
                        }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>



              {/* Pickup Time Selection */}
              {serviceType === 'pickup' && (
                <div>
                  <label className="block text-sm font-medium text-black mb-3">Pickup Time *</label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: '5-10', label: '5-10 minutes' },
                        { value: '15-20', label: '15-20 minutes' },
                        { value: '25-30', label: '25-30 minutes' },
                        { value: 'custom', label: 'Custom Time' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPickupTime(option.value)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${pickupTime === option.value
                            ? 'border-natalna-primary bg-natalna-primary text-black shadow-md'
                            : 'border-natalna-beige bg-white text-gray-700 hover:border-natalna-secondary'
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
                        className="w-full px-4 py-3 border border-natalna-beige rounded-lg focus:ring-2 focus:ring-natalna-primary focus:border-transparent transition-all duration-200"
                        placeholder="e.g., 45 minutes, 1 hour, 2:30 PM"
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
                      className="w-full px-4 py-3 border border-natalna-beige rounded-lg focus:ring-2 focus:ring-natalna-primary focus:border-transparent transition-all duration-200"
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
                      className="w-full px-4 py-3 border border-natalna-beige rounded-lg focus:ring-2 focus:ring-natalna-primary focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Near McDonald's, Beside 7-Eleven, In front of school"
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
                  className="w-full px-4 py-3 border border-natalna-beige rounded-lg focus:ring-2 focus:ring-natalna-primary focus:border-transparent transition-all duration-200"
                  placeholder="Any special requests or notes..."
                  rows={3}
                />
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleProceedToPayment();
                }}
                disabled={!isDetailsValid}
                className={`w-full py-4 rounded-xl font-medium text-lg transition-all duration-200 transform shadow-lg ${isDetailsValid
                  ? 'bg-gradient-to-r from-natalna-primary to-natalna-wood text-black hover:from-natalna-wood hover:to-natalna-wood hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Proceed to Payment
              </button>

              {!isDetailsValid && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  {!customerName.trim() && 'Please enter your name. '}
                  {!contactNumber.trim() && 'Please enter your contact number. '}
                  {serviceType === 'delivery' && !address.trim() && 'Please enter your address. '}
                  {serviceType === 'pickup' && pickupTime === 'custom' && !customTime.trim() && 'Please enter pickup time. '}
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
        <h1 className="text-3xl font-serif font-semibold text-natalna-dark ml-8">Payment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Method Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-serif font-medium text-natalna-dark mb-6">Choose Payment Method</h2>

          <div className="grid grid-cols-1 gap-4 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${paymentMethod === method.id
                  ? 'border-natalna-primary bg-natalna-primary/5 text-black shadow-lg scale-[1.02]'
                  : 'border-natalna-beige bg-white text-gray-700 hover:border-natalna-secondary hover:scale-[1.01]'
                  }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-transform duration-300 ${paymentMethod === method.id ? 'bg-natalna-primary scale-110' : 'bg-gray-100 group-hover:scale-110'}`}>
                    {method.id === 'cod' ? '💵' : '💳'}
                  </div>
                  <div className="text-left">
                    <span className="font-semibold block">{method.name}</span>
                    <span className="text-xs text-gray-500">
                      {method.id === 'cod' ? 'Pay when you receive' : 'Pay via digital transfer'}
                    </span>
                  </div>
                </div>
                {paymentMethod === method.id && (
                  <CheckCircle2 className="h-6 w-6 text-natalna-primary animate-scale-in animate-pulse-subtle" />
                )}
              </button>
            ))}
          </div>

          {/* Payment Details with QR Code */}
          {selectedPaymentMethod && (
            <div className="bg-white rounded-xl p-6 mb-6 border-2 border-dashed border-natalna-beige hover:border-natalna-primary transition-colors duration-300">
              <h3 className="font-medium text-black mb-4 flex items-center">
                <span className="w-2 h-2 bg-natalna-primary rounded-full mr-2"></span>
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
                    <p className="text-2xl font-bold text-natalna-dark">₱{totalPrice}</p>
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
                  <p className="text-[10px] text-gray-400 text-center mt-2 font-medium uppercase tracking-widest">Scan to Pay</p>
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
                    <span className="font-bold text-natalna-dark">₱{totalPrice}</span>
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

          {/* Reference Number */}
          {paymentMethod !== 'cod' ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-black mb-2">📸 Payment Proof Required</h4>
              <p className="text-sm text-gray-700">
                After making your payment, please take a screenshot of your payment receipt and attach it when you send your order via Messenger. This helps us verify and process your order quickly.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-black mb-2">💵 Cash on Delivery</h4>
              <p className="text-sm text-gray-700">
                Please prepare the exact amount for your order. You will pay when you {serviceType === 'pickup' ? 'pick up your order' : 'receive your delivery'}.
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-serif font-medium text-natalna-dark mb-6">Final Order Summary</h2>

          <div className="space-y-4 mb-6">
            <div className="bg-natalna-cream rounded-lg p-4 border border-natalna-beige">
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
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-red-100">
                <div>
                  <h4 className="font-medium text-black">{item.name}</h4>
                  {item.selectedVariation && (
                    <p className="text-sm text-gray-600">Size: {item.selectedVariation.name}</p>
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
                  <p className="text-sm text-gray-600">₱{item.totalPrice} x {item.quantity}</p>
                </div>
                <span className="font-semibold text-black">₱{item.totalPrice * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-red-200 pt-4 mb-6">
            <div className="flex items-center justify-between text-2xl font-noto font-semibold text-black">
              <span>Total:</span>
              <span>₱{totalPrice}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handlePlaceOrder();
            }}
            className="w-full py-4 rounded-xl font-medium text-lg transition-all duration-200 transform bg-gradient-to-r from-natalna-primary to-natalna-wood text-black hover:from-natalna-wood hover:to-natalna-wood hover:scale-[1.02] shadow-lg"
          >
            Place Order via Messenger
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            You'll be redirected to Facebook Messenger to confirm your order. Don't forget to attach your payment screenshot!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
