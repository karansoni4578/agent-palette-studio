import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgentSubmissionForm from '@/components/AgentSubmissionForm';
import AgentDisplayCard from '@/components/AgentDisplayCard';
import { useAgents } from '@/hooks/useAgents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Zap, Users, TrendingUp } from 'lucide-react';

const SubmitAgentPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { agents, loading } = useAgents();

  const handleAgentAdded = () => {
    // Trigger a refresh of the agents list
    setRefreshTrigger(prev => prev + 1);
  };

  // Get the 6 most recent agents
  const recentAgents = agents.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Submit Your AI Agent
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your AI agent with our community of developers, researchers, and AI enthusiasts. 
            Help others discover powerful tools that can transform their workflows.
          </p>
        </div>

        {/* Why Submit Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Submit to AI Agent Zone?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Increased Visibility</h3>
                <p className="text-sm text-gray-600">
                  Get your agent discovered by thousands of potential users
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Community Feedback</h3>
                <p className="text-sm text-gray-600">
                  Receive valuable feedback from our active community
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
                <p className="text-sm text-gray-600">
                  Connect with collaborators and grow your user base
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Free Promotion</h3>
                <p className="text-sm text-gray-600">
                  Showcase your work on our platform at no cost
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submission Form */}
        <div className="mb-16">
          <AgentSubmissionForm onAgentAdded={handleAgentAdded} />
        </div>

        {/* Recent Submissions */}
        {recentAgents.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Recently Submitted Agents
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentAgents.map((agent) => (
                <AgentDisplayCard key={`${agent.id}-${refreshTrigger}`} agent={agent} />
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading recent submissions...</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SubmitAgentPage;