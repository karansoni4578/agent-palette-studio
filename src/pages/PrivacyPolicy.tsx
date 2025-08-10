import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-bg">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: December 2024
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Welcome to AI Agent Zone. This Privacy Policy explains how we handle information when you use our website. 
                AI Agent Zone is a public directory of AI tools and agents that operates with a privacy-first approach. 
                We believe in transparency and want you to understand exactly what data we do and don't collect.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>We do not collect any personal data.</strong> AI Agent Zone operates as a static directory website without:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>User accounts or registration</li>
                <li>Email addresses or contact information</li>
                <li>Cookies or tracking technologies</li>
                <li>Analytics or usage data</li>
                <li>IP addresses or location data</li>
                <li>Device information or browser details</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Our website is designed to be completely anonymous and requires no personal information to browse or use.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                3. External Links
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                AI Agent Zone contains links to external AI tools and services. When you click on these links, you will leave our website 
                and visit third-party sites that have their own privacy policies and terms of service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are not responsible for the privacy practices of these external websites. We encourage you to review the 
                privacy policies of any third-party sites you visit through our directory.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                4. Affiliate Disclosure (Future)
              </h2>
              <p className="text-gray-700 leading-relaxed">
                In the future, AI Agent Zone may include affiliate links to help support the maintenance of this free directory. 
                If we do implement affiliate partnerships, they will never affect our ranking algorithms or the neutrality of our 
                tool descriptions. Any affiliate relationships will be clearly disclosed to our users.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                5. Changes to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated 
                "Last updated" date. Since we don't collect contact information, we cannot notify users directly of changes.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                6. Contact
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy or our practices, please reach out to us at:
                <br />
                <strong>hello@aiagentzone.xyz</strong>
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button 
              onClick={() => navigate('/')}
              className="bg-orange-primary hover:bg-orange-primary/90 text-white font-semibold px-8 py-3"
            >
              Go Back Home
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = 'mailto:hello@aiagentzone.xyz'}
              className="border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white font-semibold px-8 py-3"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;