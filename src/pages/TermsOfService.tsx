import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-bg">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: December 2024
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                1. Overview
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Welcome to AI Agent Zone, a curated directory of AI tools and agents. By accessing and using this website, 
                you agree to comply with and be bound by these Terms of Service. AI Agent Zone is a free, public directory 
                designed to help users discover AI tools and resources. We do not require registration or personal information 
                to use our service.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                2. Use of the Website
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You are free to browse our directory and access external links to AI tools and services. However, you agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Attempt to scrape, copy, or download large portions of our directory data</li>
                <li>Use automated tools to overwhelm our servers or disrupt service</li>
                <li>Misrepresent yourself or provide false information in any communications</li>
                <li>Attempt to reverse engineer or access restricted areas of the website</li>
                <li>Use the website for any illegal or unauthorized purpose</li>
                <li>Submit spam or malicious content through any potential future submission features</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to block access to users who violate these terms.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                3. No Guarantees or Endorsement
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                AI Agent Zone is a directory service that lists AI tools and agents for informational purposes only. 
                We want to make it clear that:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>We do not own, operate, or control any of the listed AI tools</li>
                <li>Tool descriptions are provided for informational purposes and may not be complete or up-to-date</li>
                <li>We do not guarantee the availability, functionality, or quality of any listed tools</li>
                <li>Listing in our directory does not constitute an endorsement or recommendation</li>
                <li>We are not responsible for the actions, policies, or practices of third-party tools</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Users should evaluate tools independently and review their respective terms of service before use.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                4. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms of Service from time to time to reflect changes in our practices or for other 
                operational, legal, or regulatory reasons. Changes will be posted on this page with an updated "Last updated" date. 
                Since we don't require user accounts, we cannot notify users directly of changes. We encourage you to review 
                these terms periodically.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                AI Agent Zone and its operators shall not be liable for any direct, indirect, incidental, special, 
                consequential, or punitive damages arising from:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Use of or inability to use our directory service</li>
                <li>Access to or use of third-party AI tools linked from our directory</li>
                <li>Any errors, omissions, or inaccuracies in tool descriptions or information</li>
                <li>Loss of data, profits, or business opportunities</li>
                <li>Any technical issues or service interruptions</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Your use of external AI tools is entirely at your own risk and subject to their respective terms and conditions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                6. Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with applicable laws. 
                Any disputes arising from these terms or use of the website shall be resolved through appropriate legal channels.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-orange-primary mb-4">
                7. Contact
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions, concerns, or feedback about these Terms of Service, please contact us at:
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

export default TermsOfService;