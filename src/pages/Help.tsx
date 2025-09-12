import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      category: 'Ordering',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'Simply browse restaurants, select your desired items, add them to cart, and proceed to checkout. You can pay securely online and track your order in real-time.'
        },
        {
          question: 'Can I modify my order after placing it?',
          answer: 'You can modify your order within 5 minutes of placing it, provided the restaurant hasn\'t started preparing it. Contact support for assistance.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, PayPal, and digital wallets like Apple Pay and Google Pay.'
        }
      ]
    },
    {
      category: 'Delivery',
      questions: [
        {
          question: 'How long does delivery take?',
          answer: 'Delivery time varies by restaurant and location, typically ranging from 20-60 minutes. You\'ll see estimated delivery time before placing your order.'
        },
        {
          question: 'What are the delivery charges?',
          answer: 'Delivery fees vary by restaurant and distance. Most deliveries range from $2-5, with free delivery available on orders above certain amounts.'
        },
        {
          question: 'How can I track my order?',
          answer: 'After placing an order, you\'ll receive tracking information via SMS and email. You can also track your order in real-time through your account.'
        }
      ]
    },
    {
      category: 'Account',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign Up" on the homepage, fill in your details, and verify your email address. You can also sign up using Google or Facebook.'
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Log into your account, go to "Profile Settings," and update your information. Don\'t forget to save your changes.'
        }
      ]
    },
    {
      category: 'Restaurants',
      questions: [
        {
          question: 'How do I find restaurants near me?',
          answer: 'We automatically detect your location to show nearby restaurants. You can also manually enter your address in the location field.'
        },
        {
          question: 'Can I see restaurant reviews and ratings?',
          answer: 'Yes! Each restaurant page shows customer reviews, ratings, and photos. You can also filter restaurants by rating.'
        },
        {
          question: 'How do I leave a review for a restaurant?',
          answer: 'After receiving your order, you\'ll get an option to rate and review the restaurant. You can also do this from your order history.'
        }
      ]
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      qa => 
        qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Help Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or get help with using RestaurantApp
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400 text-xl">🔍</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Help
              </h2>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📞</span>
                  Contact Support
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">💬</span>
                  Live Chat
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📧</span>
                  Email Us
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📋</span>
                  Order Status
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">
                  Popular Topics
                </h3>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-blue-600 hover:text-blue-800">
                    • Track my order
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800">
                    • Payment issues
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800">
                    • Account problems
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800">
                    • Delivery questions
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {searchQuery && (
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  {filteredFaqs.reduce((total, category) => total + category.questions.length, 0)} results found for "{searchQuery}"
                </p>
              </div>
            )}

            <div className="space-y-8">
              {(searchQuery ? filteredFaqs : faqs).map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {category.category}
                  </h2>
                  
                  <div className="space-y-4">
                    {category.questions.map((qa, qaIndex) => {
                      const globalIndex = categoryIndex * 100 + qaIndex;
                      const isExpanded = expandedFaq === globalIndex;
                      
                      return (
                        <Card key={qaIndex} className="overflow-hidden">
                          <button
                            className="w-full text-left p-6 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                            onClick={() => toggleFaq(globalIndex)}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900 pr-4">
                                {qa.question}
                              </h3>
                              <span className="text-gray-400 text-xl">
                                {isExpanded ? '−' : '+'}
                              </span>
                            </div>
                          </button>
                          
                          {isExpanded && (
                            <div className="px-6 pb-6">
                              <div className="border-t border-gray-200 pt-4">
                                <p className="text-gray-700 leading-relaxed">
                                  {qa.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {searchQuery && filteredFaqs.length === 0 && (
              <Card className="p-8 text-center">
                <div className="text-6xl mb-4">🤔</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any help topics matching "{searchQuery}". 
                  Try different keywords or contact our support team.
                </p>
                <Button>Contact Support</Button>
              </Card>
            )}

            {/* Still Need Help */}
            <div className="mt-12">
              <Card className="p-8 bg-blue-50 border-blue-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Still need help?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Can't find what you're looking for? Our support team is here to help you 24/7.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button>
                      Contact Support
                    </Button>
                    <Button variant="outline">
                      Send Feedback
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
