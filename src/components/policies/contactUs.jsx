import React from "react";

const ContactUs = () => {
    console.log("Rendering Contact Us component");
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            We're here to help! Reach out to us using the information below.
          </p>

          <div className="space-y-6">
            {/* Merchant Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Business Information
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Legal Entity Name:</span> RAJEEV KUMAR
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Get In Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-black mt-1 mr-3 flex-shrink-0"
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
                    <p className="font-medium text-gray-900">Phone</p>
                    <a
                      href="tel:8178102316"
                      className="text-black hover:text-black-800"
                    >
                      8178102316
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-black mt-1 mr-3 flex-shrink-0"
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
                    <p className="font-medium text-gray-900">Email</p>
                    <a
                      href="mailto:rkcoola792@gmail.com"
                      className="text-black hover:text-black-800 break-all"
                    >
                      rkcoola792@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Our Location
              </h2>
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-black mt-1 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Registered & Operational Address
                  </p>
                  <p className="text-gray-700">
                    A.792, Street No 20<br />
                    Mahavir Enclave 2<br />
                    New Delhi 110059<br />
                    West Delhi, Delhi<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-black-50 rounded-lg p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Business Hours
              </h2>
              <p className="text-gray-700">
                <span className="font-medium">Standard Turnaround:</span> 3-5 business days
              </p>
              <p className="text-gray-600 text-sm mt-2">
                We typically respond to inquiries within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;