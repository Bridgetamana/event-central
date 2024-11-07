import { useState } from 'react';
import { Calendar, MapPin, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';

const CheckoutPage = () => {
  
  const [currentStep, setCurrentStep] = useState(1);
  const [event, setEvent] = useState({
    title: "Event",
    date: "November 15, 2024",
    time: "7:00 PM",
    location: "Lagos, Nigeria",
    image: "",
    price: {
      regular: 5000,
      vip: 15000
    }
  });
  
  const [ticketSelection, setTicketSelection] = useState({
    regular: 0,
    vip: 0
  });
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const steps = [
    { number: 1, title: "Tickets" },
    { number: 2, title: "Contact" },
    { number: 3, title: "Payment" }
  ];

  const calculateTotal = () => {
    const subtotal = (ticketSelection.regular * event.price.regular) + (ticketSelection.vip * event.price.vip);
    const serviceFee = subtotal * 0.03;
    return { subtotal, serviceFee, total: subtotal + serviceFee };
  };

  const handleTicketChange = (type, action) => {
    setTicketSelection(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (action === 'increase' ? 1 : -1))
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return (ticketSelection.regular > 0 || ticketSelection.vip > 0);
    }
    if (currentStep === 2) {
      return Object.values(formData).every(value => value.trim() !== '');
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.number ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <span className="text-sm mt-2">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Select Tickets</h2>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Regular Ticket</h3>
                      <p className="text-gray-600">₦{event.price.regular.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleTicketChange('regular', 'decrease')}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{ticketSelection.regular}</span>
                      <button
                        onClick={() => handleTicketChange('regular', 'increase')}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">VIP Ticket</h3>
                      <p className="text-gray-600">₦{event.price.vip.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleTicketChange('vip', 'decrease')}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{ticketSelection.vip}</span>
                      <button
                        onClick={() => handleTicketChange('vip', 'increase')}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Payment</h2>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                )}
                {currentStep < 3 && (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceed()}
                    className="ml-auto flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                )}
                {currentStep === 3 && (
                  <button
                    className="ml-auto flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Pay Now
                    <CreditCard className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>

              <h4 className="font-medium">{event.title}</h4>
              
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <Calendar className="w-4 h-4 mr-2" />
                {event.date} • {event.time}
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                {ticketSelection.regular > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Regular Ticket x {ticketSelection.regular}</span>
                    <span>₦{(ticketSelection.regular * event.price.regular).toLocaleString()}</span>
                  </div>
                )}
                {ticketSelection.vip > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>VIP Ticket x {ticketSelection.vip}</span>
                    <span>₦{(ticketSelection.vip * event.price.vip).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Service Fee (3%)</span>
                  <span>₦{calculateTotal().serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total</span>
                  <span>₦{calculateTotal().total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;