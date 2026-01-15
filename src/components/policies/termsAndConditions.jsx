import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 mb-8">
            Please read these terms and conditions carefully before using our website or services.
          </p>

          <div className="space-y-8">
            {/* Definitions */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Definitions
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="leading-relaxed">
                  For the purpose of these Terms and Conditions:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    The terms <span className="font-semibold">"we"</span>,{" "}
                    <span className="font-semibold">"us"</span>,{" "}
                    <span className="font-semibold">"our"</span> refer to RAJEEV KUMAR,
                    whose registered/operational office is at A.792, Street No 20,
                    Mahavir Enclave 2, New Delhi 110059, West Delhi, Delhi, India.
                  </li>
                  <li>
                    <span className="font-semibold">"You"</span>,{" "}
                    <span className="font-semibold">"your"</span>,{" "}
                    <span className="font-semibold">"user"</span>,{" "}
                    <span className="font-semibold">"visitor"</span> refer to any natural
                    or legal person who is visiting our website and/or agreed to purchase
                    from us.
                  </li>
                </ul>
              </div>
            </div>

            {/* Agreement */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Agreement
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Your use of the website and/or purchase from us are governed by these
                Terms and Conditions. By accessing or using our website, you agree to
                be bound by these terms.
              </p>
            </div>

            {/* Website Content */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Website Content
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="leading-relaxed">
                  The content of the pages of this website is subject to change without
                  notice.
                </p>
                <p className="leading-relaxed">
                  Neither we nor any third parties provide any warranty or guarantee as
                  to the accuracy, timeliness, performance, completeness, or suitability
                  of the information and materials found or offered on this website for
                  any particular purpose.
                </p>
                <p className="leading-relaxed">
                  You acknowledge that such information and materials may contain
                  inaccuracies or errors, and we expressly exclude liability for any such
                  inaccuracies or errors to the fullest extent permitted by law.
                </p>
              </div>
            </div>

            {/* User Responsibility */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Responsibility
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="leading-relaxed">
                  Your use of any information or materials on our website and/or product
                  pages is entirely at your own risk, for which we shall not be liable.
                </p>
                <p className="leading-relaxed">
                  It shall be your own responsibility to ensure that any products,
                  services, or information available through our website and/or product
                  pages meet your specific requirements.
                </p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Intellectual Property
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="leading-relaxed">
                  Our website contains material which is owned by or licensed to us. This
                  material includes, but is not limited to, the design, layout, look,
                  appearance, and graphics.
                </p>
                <p className="leading-relaxed">
                  Reproduction is prohibited other than in accordance with the copyright
                  notice, which forms part of these terms and conditions.
                </p>
                <p className="leading-relaxed">
                  All trademarks reproduced on our website which are not the property of,
                  or licensed to, the operator are acknowledged on the website.
                </p>
                <p className="leading-relaxed">
                  Unauthorized use of information provided by us shall give rise to a
                  claim for damages and/or be a criminal offense.
                </p>
              </div>
            </div>

            {/* Links to Other Websites */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Links to Other Websites
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="leading-relaxed">
                  From time to time, our website may include links to other websites.
                  These links are provided for your convenience to provide further
                  information.
                </p>
                <p className="leading-relaxed">
                  You may not create a link to our website from another website or
                  document without RAJEEV KUMAR's prior written consent.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Any dispute arising out of use of our website and/or purchase with us
                and/or any engagement with us is subject to the laws of India.
              </p>
            </div>

            {/* Payment and Transactions */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payment Transactions
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We shall be under no liability whatsoever in respect of any loss or
                damage arising directly or indirectly out of the decline of authorization
                for any transaction, on account of the cardholder having exceeded the
                preset limit mutually agreed by us with our acquiring bank from time to
                time.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-100 rounded-lg p-6 mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Questions About These Terms?
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms and Conditions, please
                contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Address:</span><br />
                  A.792, Street No 20<br />
                  Mahavir Enclave 2<br />
                  New Delhi 110059<br />
                  West Delhi, Delhi<br />
                  India
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  <a
                    href="tel:8178102316"
                    className="text-gray-900 hover:text-gray-700 underline"
                  >
                    8178102316
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:rkcoola792@gmail.com"
                    className="text-gray-900 hover:text-gray-700 underline"
                  >
                    rkcoola792@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;