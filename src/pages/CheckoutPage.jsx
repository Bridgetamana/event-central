import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { Calendar, MapPin, X, Check, CreditCard, ChevronRight, ChevronLeft } from "lucide-react";
import { PaystackButton } from "react-paystack";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast";
import Modal from "../components/ui/Modal";

const CheckoutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  const formValues = watch();

  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();
  const [event, setEvent] = useState(null);
  const [ticketSelection, setTicketSelection] = useState({
    regular: 0,
    vip: 0,
    premium: 0,
  });
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeStatus, setPromoCodeStatus] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const calculateTotal = () => {
    if (!event) {
      return {
        subtotal: 0,
        serviceFee: 0,
        discount: 0,
        total: 0,
      };
    }

    const regularPrice = event.price?.regular || 0;
    const vipPrice = event.price?.vip || 0;
    const premiumPrice = event.price?.premium || 0;

    const subtotal =
      ticketSelection.regular * regularPrice +
      ticketSelection.vip * vipPrice +
      ticketSelection.premium * premiumPrice;

    const serviceFee = subtotal * 0.037;
    const discountAmount = (subtotal + serviceFee) * (discount / 100);
    return {
      subtotal,
      serviceFee,
      discount: discountAmount,
      total: subtotal + serviceFee - discountAmount,
    };
  };

  useEffect(() => {
    if (location.state) {
      const { event, ticketData } = location.state;

      if (event) setEvent(event);

      if (ticketData) {
        setTicketSelection((prevState) => ({
          ...prevState,
          [ticketData.ticketType]: ticketData.quantity || 1,
        }));
      }
    } else {
      console.warn("No state passed to checkout page");
    }
  }, [location]); 

  const formValidation = {
    firstName: {
      required: "First name is required",
      minLength: {
        value: 2,
        message: "First name must be at least 2 characters long",
      },
    },
    lastName: {
      required: "Last name is required",
      minLength: {
        value: 2,
        message: "Last name must be at least 2 characters long",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    phone: {
      required: "Phone number is required",
      pattern: {
        value: /^[0-9]{10,14}$/,
        message: "Phone number must be 10-14 digits",
      },
    },
  };

  const steps = [
    { number: 1, title: "Tickets" },
    { number: 2, title: "Contact" },
    { number: 3, title: "Payment" },
  ];

  const handleTicketChange = (type, action) => {
    setTicketSelection((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (action === "increase" ? 1 : -1)),
    }));
  };

  const validatePromoCode = () => {
    const validPromoCodes = {
      EARLYBIRD: 10,
    };

    if (validPromoCodes[promoCode.toUpperCase()]) {
      setDiscount(validPromoCodes[promoCode.toUpperCase()]);
      showToast.success(
        `${validPromoCodes[promoCode.toUpperCase()]}% discount applied!`
      );
      setPromoCodeStatus("success");
    } else {
      showToast.error("Invalid promo code");
      setPromoCodeStatus("error");
      setDiscount(0);
    }
  };

  const canProceed = async () => {
    if (currentStep === 1) {
      return (
        ticketSelection.regular > 0 ||
        ticketSelection.vip > 0 ||
        ticketSelection.premium > 0
      );
    }

    if (currentStep === 2) {
      const isValid = await trigger();

      if (!isValid) {
        showToast.error("Please correct the errors in the form");
        return false;
      }
      return true;
    }
    return true;
  };

  const handleContinue = async () => {
    const proceed = await canProceed();
    if (proceed) {
      if (currentStep === 2) {
        const total = calculateTotal();
        const amountInKobo = Math.round(total.total * 100);

        if (amountInKobo === 0) {
          setModalMessage(
            `Thank you for securing your spot at ${event.title}! We’ve sent your ticket details to ${formValues.email}. We can't wait to see you there!`
          );

          setIsModalOpen(true);

        } else {
          setCurrentStep(3);
        }
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePaystackSuccess = () => {
    setIsProcessing(false);
    showToast.success("Payment successful!");
    setModalMessage(
      `Thank you for securing your spot at ${event.title}! We’ve sent your ticket details to ${formValues.email}. We can't wait to see you there!`
    );
    setIsModalOpen(true);
  };

  const handlePaystackClose = () => {
    setIsProcessing(false);
    showToast.error("Payment cancelled");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate(`/event/${event.id}`);
  };

  const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const initializePayment = () => {
    if (!event) {
      return {};
    }

    const total = calculateTotal();
    const amountInKobo = Math.round(total.total * 100);

    return {
      email: formValues.email,
      amount: amountInKobo,
      publicKey: PAYSTACK_PUBLIC_KEY,
      firstname: formValues.firstName,
      lastname: formValues.lastName,
      phone: formValues.phone,
      label: `Tickets for ${event.title}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Ticket Details",
            variable_name: "ticket_details",
            value: JSON.stringify({
              regular: ticketSelection.regular,
              vip: ticketSelection.vip,
              premium: ticketSelection.premium,
              event: event.title,
              date: event.date,
            }),
          },
        ],
      },
    };
  };

  const paystackButtonProps = {
    ...initializePayment(),
    text: "Pay Now",
    onSuccess: handlePaystackSuccess,
    onClose: handlePaystackClose,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      {event ? (
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= step.number
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.number}
                    </div>
                    <span className="text-sm mt-2">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        currentStep > step.number
                          ? "bg-indigo-600"
                          : "bg-gray-200"
                      }`}
                    />
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
                        <p className="text-gray-600">₦{event.price.regular}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            handleTicketChange("regular", "decrease")
                          }
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">
                          {ticketSelection.regular}
                        </span>
                        <button
                          onClick={() =>
                            handleTicketChange("regular", "increase")
                          }
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {event.price?.vip && (
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">VIP Ticket</h3>
                          <p className="text-gray-600">₦{event.price.vip}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              handleTicketChange("vip", "decrease")
                            }
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {ticketSelection.vip}
                          </span>
                          <button
                            onClick={() =>
                              handleTicketChange("vip", "increase")
                            }
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    {event.price?.premium && (
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Premium Ticket</h3>
                          <p className="text-gray-600">
                            ₦{event.price.premium}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              handleTicketChange("premium", "decrease")
                            }
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {ticketSelection.premium}
                          </span>
                          <button
                            onClick={() =>
                              handleTicketChange("premium", "increase")
                            }
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) =>
                            setPromoCode(e.target.value.toUpperCase())
                          }
                          placeholder="Enter promo code"
                          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                          onClick={validatePromoCode}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          Apply
                        </button>
                      </div>
                      {promoCodeStatus === "success" && (
                        <div className="flex items-center text-green-600 mt-2">
                          <Check className="w-4 h-4 mr-2" />
                          <span>{discount}% discount applied!</span>
                        </div>
                      )}
                      {promoCodeStatus === "error" && (
                        <div className="flex items-center text-red-600 mt-2">
                          <X className="w-4 h-4 mr-2" />
                          <span>Invalid promo code</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <form>
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">
                        Contact Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            {...register("firstName", formValidation.firstName)}
                            className={`w-full p-2 border rounded-lg focus:ring-2 ${
                              errors.firstName
                                ? "border-red-500 focus:ring-red-300"
                                : "focus:ring-indigo-500 focus:border-transparent"
                            }`}
                          />
                          {errors.firstName && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.firstName.message}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            {...register("lastName", formValidation.lastName)}
                            className={`w-full p-2 border rounded-lg focus:ring-2 ${
                              errors.lastName
                                ? "border-red-500 focus:ring-red-300"
                                : "focus:ring-indigo-500 focus:border-transparent"
                            }`}
                          />
                          {errors.lastName && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.lastName.message}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            {...register("email", formValidation.email)}
                            className={`w-full p-2 border rounded-lg focus:ring-2 ${
                              errors.email
                                ? "border-red-500 focus:ring-red-300"
                                : "focus:ring-indigo-500 focus:border-transparent"
                            }`}
                          />
                          {errors.email && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.email.message}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            {...register("phone", formValidation.phone)}
                            className={`w-full p-2 border rounded-lg focus:ring-2 ${
                              errors.phone
                                ? "border-red-500 focus:ring-red-300"
                                : "focus:ring-indigo-500 focus:border-transparent"
                            }`}
                          />
                          {errors.phone && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.phone.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </form>
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Payment</h2>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Back
                    </button>
                  )}
                  {currentStep < steps.length && (
                    <button
                      onClick={handleContinue}
                      className="ml-auto flex items-center px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                  {currentStep === steps.length && (
                    <PaystackButton
                      {...paystackButtonProps}
                      className="ml-auto flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      onSuccess={handlePaystackSuccess}
                      onClose={handlePaystackClose}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center">
                          Processing...
                          <svg
                            className="animate-spin ml-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Pay Now
                          <CreditCard className="w-4 h-4 ml-2" />
                        </span>
                      )}
                    </PaystackButton>
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
                      <span>
                        ₦
                        {(
                          ticketSelection.regular * event.price.regular
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {ticketSelection.vip > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>VIP Ticket x {ticketSelection.vip}</span>
                      <span>
                        ₦
                        {(
                          ticketSelection.vip * event.price.vip
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {ticketSelection.premium > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Premium Ticket x {ticketSelection.premium}</span>
                      <span>
                        ₦
                        {(
                          ticketSelection.premium * event.price.premium
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₦{calculateTotal().subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Service Fee (3.7%)</span>
                    <span>₦{calculateTotal().serviceFee.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>
                        -₦{calculateTotal().discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>₦{calculateTotal().total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No event set</p>
      )}
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default CheckoutPage;
