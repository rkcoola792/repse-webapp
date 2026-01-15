import React from "react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shipping Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Details about our shipping and delivery process.
          </p>

          <div className="space-y-8">
            {/* Shipping Methods */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Shipping Methods
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    International Buyers
                  </h3>
                  <p className="leading-relaxed">
                    Orders are shipped and delivered through registered international
                    courier companies and/or International Speed Post only.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Domestic Buyers
                  </h3>
                  <p className="leading-relaxed">
                    Orders are shipped through registered domestic courier companies
                    and/or Speed Post only.
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Timeline */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Shipping Timeline
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Orders are shipped within{" "}
                <span className="font-semibold">3-5 days</span> from the date of
                order and payment, or as per the delivery date agreed at the time
                of order confirmation.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Delivery of shipments is subject to courier company/post office norms
                and timelines.
              </p>
            </div>

            {/* Delivery Address */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Delivery Address
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Delivery of all orders will be made to the address provided by the
                buyer at the time of order placement. Please ensure that your delivery
                address is complete and accurate.
              </p>
            </div>

            {/* Service Delivery Confirmation */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Service Delivery Confirmation
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Delivery of our services will be confirmed via email to the mail ID
                specified during registration. Please check your inbox and spam folder
                for confirmation emails.
              </p>
            </div>

            {/* Liability */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Delivery Liability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                RAJEEV KUMAR is not liable for any delays in delivery by the courier
                company or postal authorities.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We guarantee to hand over the consignment to the courier company or
                postal authorities within 3-5 days from the date of order and payment,
                or as per the delivery date agreed at the time of order confirmation.
              </p>
            </div>

            {/* Help & Support */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Need Help?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For any issues in utilizing our services or questions about your shipment,
                please contact our helpdesk:
              </p>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-900 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <span className="font-semibold">Phone:</span>{" "}
                      <a
                        href="tel:8178102316"
                        className="text-gray-900 hover:text-gray-700 underline"
                      >
                        8178102316
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-900 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <span className="font-semibold">Email:</span>{" "}
                      <a
                        href="mailto:rkcoola792@gmail.com"
                        className="text-gray-900 hover:text-gray-700 underline break-all"
                      >
                        rkcoola792@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;