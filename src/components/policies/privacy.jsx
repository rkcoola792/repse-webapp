import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            RAJEEV KUMAR is committed to ensuring that your privacy is protected.
          </p>

          <div className="space-y-8">
            {/* Introduction */}
            <div>
              <p className="text-gray-700 leading-relaxed">
                This privacy policy sets out how RAJEEV KUMAR uses and protects any
                information that you provide when you visit our website and/or agree
                to purchase from us. Should we ask you to provide certain information
                by which you can be identified, you can be assured that it will only
                be used in accordance with this privacy statement.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                RAJEEV KUMAR may change this policy from time to time by updating this
                page. You should check this page periodically to ensure that you are
                aware of any changes.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-700 mb-3">We may collect the following information:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Name</li>
                <li>Contact information including email address</li>
                <li>Demographic information such as postcode, preferences and interests</li>
                <li>Other information relevant to customer surveys and/or offers</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-3">
                We require this information to understand your needs and provide you
                with better service, particularly for the following reasons:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Internal record keeping</li>
                <li>Improving our products and services</li>
                <li>Sending promotional emails about new products, special offers, or other information that may interest you</li>
                <li>Contacting you for market research purposes via email, phone, fax, or mail</li>
                <li>Customizing the website according to your interests</li>
              </ul>
            </div>

            {/* Security */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We are committed to ensuring that your information is secure. To prevent
                unauthorized access or disclosure, we have implemented suitable physical,
                electronic, and managerial measures to safeguard the information we collect.
              </p>
            </div>

            {/* Cookies */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                How We Use Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                A cookie is a small file that asks permission to be placed on your
                computer's hard drive. Once you agree, the file is added and the cookie
                helps analyze web traffic or lets you know when you visit a particular site.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Cookies allow web applications to respond to you as an individual, tailoring
                operations to your needs, likes, and dislikes by gathering and remembering
                information about your preferences.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use traffic log cookies to identify which pages are being used. This helps
                us analyze data about webpage traffic and improve our website to better serve
                customer needs. We only use this information for statistical analysis purposes,
                and the data is then removed from the system.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                A cookie in no way gives us access to your computer or any information about
                you, other than the data you choose to share with us.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You can choose to accept or decline cookies. Most web browsers automatically
                accept cookies, but you can usually modify your browser settings to decline
                cookies if you prefer. This may prevent you from taking full advantage of
                the website.
              </p>
            </div>

            {/* Controlling Personal Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Controlling Your Personal Information
              </h2>
              <p className="text-gray-700 mb-3">
                You may choose to restrict the collection or use of your personal information
                in the following ways:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                <li>
                  When filling in a form on the website, look for the box you can click to
                  indicate that you do not want the information to be used for direct
                  marketing purposes
                </li>
                <li>
                  If you have previously agreed to us using your personal information for
                  direct marketing purposes, you may change your mind at any time by
                  contacting us at{" "}
                  <a
                    href="mailto:rkcoola792@gmail.com"
                    className="text-gray-900 hover:text-gray-700 underline"
                  >
                    rkcoola792@gmail.com
                  </a>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                We will not sell, distribute, or lease your personal information to third
                parties unless we have your permission or are required by law to do so.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We may use your personal information to send you promotional information
                about third parties which we think you may find interesting, only if you
                have indicated that you wish to receive such information.
              </p>
            </div>

            {/* Corrections */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Correcting Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you believe that any information we are holding about you is incorrect
                or incomplete, please contact us as soon as possible:
              </p>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="space-y-3 text-gray-700">
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
                <p className="text-gray-700 mt-4">
                  We will promptly correct any information found to be incorrect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;