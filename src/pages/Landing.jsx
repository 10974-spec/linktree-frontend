import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Rocket, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link2, Palette, BarChart3, Smartphone, Zap, Users, Shield, Globe } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);

  const features = [
    {
      icon: <Link2 className="w-8 h-8 text-orange-600" />,
      title: 'Beautiful Link Hub',
      description: 'Create a stunning profile with all your important links in one place'
    },
    {
      icon: <Palette className="w-8 h-8 text-blue-700" />,
      title: 'Customizable Themes',
      description: 'Personalize your profile with colors, fonts, and layouts that match your style'
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-700" />,
      title: 'Smart Analytics',
      description: 'Track clicks and understand your audience with detailed insights'
    },
    {
      icon: <Smartphone className="w-8 h-8 text-pink-700" />,
      title: 'Mobile Perfect',
      description: 'Looks amazing on any device - desktop, tablet, or mobile'
    }
  ];

  const sampleCards = [
    {
      name: "Emma Johnson",
      title: "Digital Creator & Educator",
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-900 to-pink-700",
      avatar: "👩‍💻",
      links: [
        { name: "YouTube Channel", icon: "▶️" },
        { name: "Instagram", icon: "📸" },
        { name: "Portfolio", icon: "💼" },
        { name: "Latest Project", icon: "🚀" }
      ]
    },
    {
      name: "Alex Chen",
      title: "Tech Entrepreneur",
      gradient: "from-blue-600 to-cyan-500",
      bgGradient: "from-blue-900 to-cyan-700",
      avatar: "👨‍💼",
      links: [
        { name: "Startup Website", icon: "🌐" },
        { name: "LinkedIn", icon: "💼" },
        { name: "AngelList", icon: "👼" },
        { name: "Tech Blog", icon: "📝" }
      ]
    },
    {
      name: "Sarah Williams",
      title: "Fashion Influencer",
      gradient: "from-rose-500 to-orange-400",
      bgGradient: "from-rose-800 to-orange-600",
      avatar: "👗",
      links: [
        { name: "TikTok", icon: "🎵" },
        { name: "Style Guide", icon: "👠" },
        { name: "Shop My Looks", icon: "🛍️" },
        { name: "Brand Collabs", icon: "🤝" }
      ]
    },
    {
      name: "Mike Rodriguez",
      title: "Fitness Coach",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-800 to-emerald-700",
      avatar: "💪",
      links: [
        { name: "Workout Plans", icon: "🏋️" },
        { name: "Nutrition Guide", icon: "🥗" },
        { name: "YouTube", icon: "🎥" },
        { name: "1-on-1 Coaching", icon: "👥" }
      ]
    },
    {
      name: "Priya Patel",
      title: "Travel Blogger",
      gradient: "from-amber-500 to-red-500",
      bgGradient: "from-amber-800 to-red-700",
      avatar: "✈️",
      links: [
        { name: "Travel Blog", icon: "📖" },
        { name: "Photo Gallery", icon: "📷" },
        { name: "Travel Tips", icon: "💡" },
        { name: "Booking Deals", icon: "🎫" }
      ]
    }
  ];

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % sampleCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + sampleCards.length) % sampleCards.length);
  };

  const goToCard = (index) => {
    setCurrentCard(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BioDeck
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-gray-900 font-medium border border-blue-600 transition-colors rounded-full px-6 py-2 hover:bg-blue-50"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4 mr-2"/> The modern link-in-bio platform
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Digital</span> Business Card
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            BioDeck helps you create beautiful, customizable link hubs that connect your audience 
            to everything you care about. Perfect for creators, entrepreneurs, and professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Create Your BioDeck - It's Free
            </Link>
            <button 
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium group"
            >
              <span>See How It Works</span>
              <span className="group-hover:translate-y-1 transition-transform">↓</span>
            </button>
          </div>

          {/* Carousel Section */}
          <div className="relative max-w-4xl mx-auto mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl blur-3xl opacity-30"></div>
            
            {/* Carousel Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
              {/* Carousel Navigation */}
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={prevCard}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex space-x-2">
                  {sampleCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCard(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentCard ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextCard}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Carousel Content */}
              <div className="relative overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentCard * 100}%)` }}
                >
                  {sampleCards.map((card, index) => (
                    <div 
                      key={index}
                      className="w-full flex-shrink-0"
                    >
                      <div className={`bg-gradient-to-br ${card.bgGradient} rounded-2xl p-8 text-white`}>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-full flex items-center justify-center text-2xl`}>
                            {card.avatar}
                          </div>
                          <div className="text-left">
                            <h3 className="text-xl font-bold">{card.name}</h3>
                            <p className="text-gray-300">{card.title}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {card.links.map((link, linkIndex) => (
                            <div 
                              key={linkIndex}
                              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-200 cursor-pointer group"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className="text-lg">{link.icon}</span>
                                  <span>{link.name}</span>
                                </div>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Indicator */}
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">
                  {currentCard + 1} of {sampleCards.length} sample profiles
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50K+", label: "Links Created" },
              { number: "1M+", label: "Monthly Clicks" },
              { number: "99%", label: "Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need in One Link</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              BioDeck gives you powerful tools to create the perfect digital presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  index === currentFeature 
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple Setup, Instant Impact</h2>
            <p className="text-gray-600 text-lg">Get started in minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Sign Up', description: 'Create your free account in seconds' },
              { step: '2', title: 'Customize', description: 'Add your links and personalize your profile' },
              { step: '3', title: 'Share', description: 'Add your BioDeck link everywhere' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Digital Presence?</h2>
            <p className="text-blue-100 text-lg mb-8">
              Join thousands of creators who use BioDeck to connect with their audience
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Start Building Your BioDeck</span>
              <span>→</span>
            </Link>
            
            <div className="mt-6 text-blue-200 text-sm">
              No credit card required • Free forever plan
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-2xl font-bold">BioDeck</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-400">
            <p>© 2024 BioDeck. The modern link-in-bio platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;