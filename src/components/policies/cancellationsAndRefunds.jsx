import React from "react";

const CancellationsAndRefunds = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cancellations and Refunds Policy
          </h1>
          <p className="text-gray-600 mb-8">
            We believe in helping our customers and have a liberal cancellation policy.
          </p>

          <div className="space-y-8">
            {/* Cancellation Policy */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cancellation Policy
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Cancellation requests will be considered only if made within{" "}
                  <span className="font-semibold">3-5 days</span> of placing the order.
                </p>
                <p>
                  However, cancellation requests may not be entertained if the orders
                  have been communicated to the vendors/merchants and they have
                  initiated the shipping process.
                </p>
                <p>
                  We do not accept cancellation requests for perishable items like
                  flowers, eatables, etc. However, refund/replacement can be made if
                  the customer establishes that the quality of the product delivered is
                  not good.
                </p>
              </div>
            </div>

            {/* Damaged or Defective Items */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Damaged or Defective Items
              </h2>
              <p className="text-gray-700 leading-relaxed">
                In case of receipt of damaged or defective items, please report the same
                to our Customer Service team. The request will be entertained once the
                merchant has checked and determined the same at his own end. This should
                be reported within 3-5 days of receipt of the products.
              </p>
            </div>

            {/* Product Quality */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Product Quality Issues
              </h2>
              <p className="text-gray-700 mb-3">
                If you feel that the product received is not as shown on the site or does
                not meet your expectations, you must notify our customer service within
                3-5 days of receiving the product.
              </p>
              <p className="text-gray-700">
                Our Customer Service Team will review your complaint and take appropriate
                action after investigation.
              </p>
            </div>

            {/* Warranty Products */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Warranty Products
              </h2>
              <p className="text-gray-700">
                For complaints regarding products that come with a manufacturer's warranty,
                please contact the manufacturer directly as per their warranty terms.
              </p>
            </div>

            {/* Refund Processing */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Refund Processing
              </h2>
              <p className="text-gray-700">
                Once a refund is approved by RAJEEV KUMAR, it will take 3-5 days
                for the refund to be processed to your original payment method.
              </p>
            </div>

            {/* Important Note */}
            <div className="bg-gray-100 rounded-lg p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Important Note
              </h2>
              <p className="text-gray-700">
                Our customer service team is here to help. For any cancellation or refund
                requests, please contact us within the specified timeframes to ensure
                your request can be processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationsAndRefunds;