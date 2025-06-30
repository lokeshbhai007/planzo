'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Wallet, 
  Brain, 
  Shield, 
  TrendingUp, 
  BarChart3, 
  Lightbulb, 
  Lock, 
  Smartphone,
  ArrowRight,
  CheckCircle,
  IndianRupee,
  Target,
  PieChart,
  Zap,
  ChevronDown,
  Star,
  Sparkles,
  Play
} from 'lucide-react';

const WorkStep = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(featureInterval);
  }, []);

  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-blue-600" />,
      title: "Sign Up Securely",
      description: "Get started with Clerk-powered authentication. Your data is protected from day one.",
      detail: "Create your account in seconds",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Wallet className="w-8 h-8 text-green-600" />,
      title: "Track & Budget",
      description: "Add income, set smart budgets, and log expenses with our intuitive interface.",
      detail: "Real-time expense tracking",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "AI-Powered Insights",
      description: "Get personalized financial advice powered by Gemini AI tailored to your spending patterns.",
      detail: "Smart financial recommendations",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      title: "Expense Tracker",
      description: "Real-time updates and smart categorization",
      highlight: "Live Tracking",
      color: "from-blue-500 to-blue-600",
      demo: "Track ₹2,450 spent on groceries this week"
    },
    {
      icon: <Target className="w-6 h-6 text-green-600" />,
      title: "Budget Planning",
      description: "Set limits and get alerts before overspending",
      highlight: "Smart Limits",
      color: "from-green-500 to-green-600",
      demo: "Budget alert: 80% of dining limit reached"
    },
    {
      icon: <PieChart className="w-6 h-6 text-orange-600" />,
      title: "Financial Summary",
      description: "Visual insights into where your money goes",
      highlight: "Clear Insights",
      color: "from-orange-500 to-orange-600",
      demo: "40% food, 25% rent, 20% entertainment, 15% savings"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-600" />,
      title: "AI Insights",
      description: "Gemini-powered personalized advice",
      highlight: "AI Powered",
      color: "from-yellow-500 to-yellow-600",
      demo: "💡 Save ₹300/month by cooking twice a week"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-600" />,
      title: "Secure Login",
      description: "Clerk-powered enterprise authentication",
      highlight: "Bank Grade",
      color: "from-red-500 to-red-600",
      demo: "🔒 256-bit encryption protecting your data"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-purple-600" />,
      title: "Modern UI",
      description: "Built with shadcn/ui for the best experience",
      highlight: "Premium Design",
      color: "from-purple-500 to-purple-600",
      demo: "✨ Dark mode, responsive design, smooth animations"
    }
  ];

  const valueProps = [
    {
      icon: <Lock className="w-5 h-5 text-blue-600" />,
      title: "Privacy-First",
      description: "Your financial data never leaves secure servers",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      title: "Intelligent Advice",
      description: "Not just numbers - actionable insights for your goals",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <IndianRupee className="w-5 h-5 text-green-600" />,
      title: "Built for India",
      description: "PPF, SIP, and local financial instruments supported",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-600" />,
      title: "Student & Professional Ready",
      description: "Perfect for managing internship earnings to career planning",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const useCases = [
    "Track internship earnings & rent expenses",
    "Plan savings for college fees and education",
    "Manage family budget and household expenses",
    "Build emergency funds with AI guidance"
  ];

  const faqs = [
    {
      question: "Is Planzo free to use?",
      answer: "Yes! Planzo offers a comprehensive free tier with all essential features. Premium features for advanced analytics coming soon.",
      icon: "💰"
    },
    {
      question: "How is my data stored?",
      answer: "Your data is encrypted and stored securely with bank-grade security. We never share or sell your personal financial information.",
      icon: "🔒"
    },
    {
      question: "Do I need finance knowledge?",
      answer: "Not at all! Planzo is designed for everyone. Our AI explains everything in simple terms and guides you step by step.",
      icon: "🧠"
    },
    {
      question: "Works on mobile?",
      answer: "Absolutely! Planzo is fully responsive and works seamlessly on all devices - desktop, tablet, and mobile.",
      icon: "📱"
    }
  ];

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`
          }}
        >
          <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <FloatingElements />
      
      {/* Animated Background Gradient */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }}
      ></div>

      {/* How It Works Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3 h-3 text-blue-600 mr-2" />
            <span className="text-xs font-semibold text-blue-700">Simple & Powerful</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text ">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Get started with your financial journey in just 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Animated Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-300 via-green-300 to-purple-300 transform -translate-y-1/2 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-full" style={{
              animation: 'pulse 2s infinite'
            }}></div>
          </div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-green-300 via-purple-300 to-pink-300 transform -translate-y-1/2 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-purple-400 rounded-full" style={{
              animation: 'pulse 2s infinite',
              animationDelay: '1s'
            }}></div>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200/50 hover:border-blue-300/50 text-center relative z-10 transform hover:-translate-y-1 hover:scale-[1.02]">
                <div className="mb-6 flex justify-center">
                  <div className={`bg-gradient-to-br ${step.bgColor} rounded-2xl p-4 group-hover:scale-110 transition-all duration-500 shadow-md`}>
                    <div className="relative">
                      {step.icon}
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                </div>
                <div className={`absolute -top-4 -left-4 bg-gradient-to-r ${step.color} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg`}>
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{step.description}</p>
                <div className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-full inline-block">
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-1.5 rounded-full mb-4">
              <Star className="w-3 h-3 text-purple-600 mr-2" />
              <span className="text-xs font-semibold text-purple-700">Feature Rich</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text ">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              Everything you need to take control of your finances
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200/50 group cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] ${
                  activeFeature === index ? 'ring-2 ring-blue-400 ring-opacity-60 shadow-xl -translate-y-2' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 group-hover:scale-110 transition-all duration-500 shadow-md ${activeFeature === index ? 'bg-gradient-to-br from-blue-400 to-purple-400' : ''}`}>
                    {feature.icon}
                  </div>
                  <span className={`bg-gradient-to-r ${feature.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
                    {feature.highlight}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">{feature.description}</p>
                
                {/* Demo Preview */}
                <div className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 text-xs text-gray-700 transition-all duration-500 ${
                  activeFeature === index ? 'opacity-100 transform translate-y-0' : 'opacity-70 transform translate-y-1'
                }`}>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="font-medium">{feature.demo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Planzo Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-1.5 rounded-full mb-4">
              <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
              <span className="text-xs font-semibold text-green-700">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text">
              Why Choose Planzo?
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              Built with your privacy, intelligence, and success in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {valueProps.map((prop, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200/50 hover:border-blue-300/50 transform hover:-translate-y-2 hover:scale-[1.02]">
                  <div className={`bg-gradient-to-br ${prop.gradient} rounded-2xl p-4 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 shadow-md`}>
                    <div className="text-white">
                      {prop.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{prop.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{prop.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Use Cases */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-3 flex items-center justify-center">
                  <Target className="w-6 h-6 mr-3" />
                  Perfect For Every Financial Goal
                </h3>
                <p className="text-blue-100">See how Planzo fits into your life</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                    <div className="bg-green-400 rounded-full p-1.5 shadow-md">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-sm font-medium">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 px-4 py-1.5 rounded-full mb-4">
              <span className="text-sm mr-2">❓</span>
              <span className="text-xs font-semibold text-orange-700">Got Questions?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Everything you need to know about Planzo
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-200/50 overflow-hidden transition-all duration-500 hover:shadow-lg">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-300"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{faq.icon}</span>
                    <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${
                  openFaq === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-l-2 border-blue-500">
                      <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-3 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Planzo</h3>
            <p className="text-sm">&copy; 2025 Planzo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorkStep;