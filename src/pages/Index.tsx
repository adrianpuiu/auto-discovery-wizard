import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, Users, Zap, TrendingUp, Phone, Calendar, Mail, MessageSquare, BarChart3, Settings, ArrowRight, Star, Timer, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const surveySteps = [
    {
      id: 'business-type',
      title: 'What type of business do you run?',
      description: 'Help us understand your industry to provide tailored automation solutions',
      options: [
        { value: 'plumbing', label: 'Plumbing Services', icon: '🔧', description: 'Emergency calls, scheduling, invoicing' },
        { value: 'hvac', label: 'HVAC Services', icon: '❄️', description: 'Maintenance schedules, service calls' },
        { value: 'electrical', label: 'Electrical Services', icon: '⚡', description: 'Safety protocols, job scheduling' },
        { value: 'cleaning', label: 'Cleaning Services', icon: '🧽', description: 'Route optimization, quality control' },
        { value: 'roofing', label: 'Roofing Services', icon: '🏠', description: 'Weather tracking, estimates' },
        { value: 'landscaping', label: 'Landscaping', icon: '🌿', description: 'Seasonal planning, maintenance' },
        { value: 'other', label: 'Other Service Business', icon: '🏪', description: 'Custom solutions available' }
      ]
    },
    {
      id: 'team-size',
      title: 'How many people work in your business?',
      description: 'Team size helps us recommend the right automation scale',
      options: [
        { value: '1-3', label: '1-3 employees', icon: '👤', description: 'Solo or small team operations' },
        { value: '4-10', label: '4-10 employees', icon: '👥', description: 'Growing small business' },
        { value: '11-25', label: '11-25 employees', icon: '👨‍👩‍👧‍👦', description: 'Established local business' },
        { value: '26-50', label: '26-50 employees', icon: '🏢', description: 'Medium-sized operation' },
        { value: '50+', label: '50+ employees', icon: '🏭', description: 'Large service company' }
      ]
    },
    {
      id: 'pain-points',
      title: 'What are your biggest operational challenges?',
      description: 'Select all that apply - we\'ll prioritize solutions for these areas',
      multiple: true,
      options: [
        { value: 'scheduling', label: 'Scheduling & Dispatching', icon: '📅', description: 'Managing appointments and technician routes' },
        { value: 'customer-service', label: 'Customer Communication', icon: '📞', description: 'Handling calls, follow-ups, support' },
        { value: 'invoicing', label: 'Billing & Invoicing', icon: '💰', description: 'Payment processing, invoice generation' },
        { value: 'lead-management', label: 'Lead Management', icon: '🎯', description: 'Capturing and converting prospects' },
        { value: 'inventory', label: 'Inventory Tracking', icon: '📦', description: 'Parts and supply management' },
        { value: 'reporting', label: 'Business Analytics', icon: '📊', description: 'Performance tracking and insights' },
        { value: 'compliance', label: 'Compliance & Documentation', icon: '📋', description: 'Regulatory requirements, paperwork' },
        { value: 'quality-control', label: 'Quality Control', icon: '✅', description: 'Service standards and reviews' }
      ]
    },
    {
      id: 'time-spent',
      title: 'How much time does your team spend on admin tasks weekly?',
      description: 'This helps us calculate potential time savings from automation',
      options: [
        { value: '5-10', label: '5-10 hours', icon: '⏰', description: 'Light administrative work' },
        { value: '11-20', label: '11-20 hours', icon: '⏳', description: 'Moderate admin overhead' },
        { value: '21-30', label: '21-30 hours', icon: '⌛', description: 'Significant time investment' },
        { value: '31-40', label: '31-40 hours', icon: '🕐', description: 'Heavy administrative burden' },
        { value: '40+', label: '40+ hours', icon: '⏰', description: 'Administrative tasks dominate' }
      ]
    },
    {
      id: 'budget',
      title: 'What would you invest monthly for automation that saves 20+ hours?',
      description: 'Understanding your budget helps us recommend the right solution tier',
      options: [
        { value: '200-500', label: '$200-$500/month', icon: '💵', description: 'Essential automation tools' },
        { value: '500-1000', label: '$500-$1,000/month', icon: '💳', description: 'Comprehensive automation suite' },
        { value: '1000-2000', label: '$1,000-$2,000/month', icon: '💎', description: 'Advanced AI-powered solutions' },
        { value: '2000+', label: '$2,000+/month', icon: '🏆', description: 'Enterprise-level automation' },
        { value: 'unsure', label: 'I\'m not sure yet', icon: '❓', description: 'Let\'s discuss ROI first' }
      ]
    }
  ];

  const handleOptionSelect = (stepId: string, value: string) => {
    const step = surveySteps[currentStep];
    if (step.multiple) {
      const current = responses[stepId] || [];
      const updated = current.includes(value) 
        ? current.filter(v => v !== value)
        : [...current, value];
      setResponses(prev => ({ ...prev, [stepId]: updated }));
    } else {
      setResponses(prev => ({ ...prev, [stepId]: value }));
      // Auto-advance for single-select questions
      setTimeout(() => {
        if (currentStep < surveySteps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setSurveyCompleted(true);
        }
      }, 500);
    }
  };

  const handleNext = () => {
    if (currentStep < surveySteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepComplete = () => {
    const step = surveySteps[currentStep];
    const response = responses[step.id];
    return response && (step.multiple ? response.length > 0 : true);
  };

  const calculateProgress = () => {
    return ((currentStep + 1) / surveySteps.length) * 100;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generatePersonalizedResults = () => {
    const businessType = responses['business-type'];
    const teamSize = responses['team-size'];
    const painPoints = responses['pain-points'] || [];
    const timeSpent = responses['time-spent'];
    const budget = responses['budget'];

    // Calculate potential savings based on time spent
    const timeSavingsMap = {
      '5-10': { hours: 8, savings: 1280 },
      '11-20': { hours: 15, savings: 2400 },
      '21-30': { hours: 22, savings: 3520 },
      '31-40': { hours: 30, savings: 4800 },
      '40+': { hours: 35, savings: 5600 }
    };

    const potentialSavings = timeSavingsMap[timeSpent] || { hours: 20, savings: 3200 };

    // Recommend solutions based on pain points
    const solutionMap = {
      'scheduling': { name: 'Smart Scheduling System', description: 'AI-powered appointment booking and dispatch optimization' },
      'customer-service': { name: '24/7 AI Customer Support', description: 'Automated chat and phone support with smart routing' },
      'invoicing': { name: 'Automated Billing Suite', description: 'Instant invoice generation and payment processing' },
      'lead-management': { name: 'Lead Conversion Engine', description: 'Automatic lead capture, scoring, and nurturing' },
      'inventory': { name: 'Smart Inventory Tracker', description: 'Real-time parts tracking and automatic reordering' },
      'reporting': { name: 'Business Intelligence Dashboard', description: 'Automated reporting and performance analytics' },
      'compliance': { name: 'Compliance Automation', description: 'Automated documentation and regulatory compliance' },
      'quality-control': { name: 'Quality Assurance System', description: 'Automated quality checks and customer feedback' }
    };

    const recommendedSolutions = painPoints.slice(0, 3).map(point => solutionMap[point]).filter(Boolean);

    // ROI calculation
    const monthlySavings = potentialSavings.savings;
    const budgetRange = budget?.split('-')[0]?.replace('$', '').replace(',', '') || '500';
    const investmentAmount = parseInt(budgetRange);
    const roi = Math.round(((monthlySavings - investmentAmount) / investmentAmount) * 100);

    return {
      timeSaved: potentialSavings.hours,
      monthlySavings,
      recommendedSolutions,
      roi,
      businessType,
      teamSize
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header with time tracker */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Automation Discovery</h1>
                <p className="text-sm text-muted-foreground">Find your perfect automation solution</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Timer className="w-4 h-4" />
                <span>Time: {formatTime(timeSpent)}</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Trusted by 500+ businesses
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="hero" 
        data-animate 
        className={`py-16 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-800 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Used by 500+ service businesses to save 20+ hours weekly
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover Which <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI Automations</span> Will Transform Your Business
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Take our 2-minute assessment to get personalized automation recommendations that could save your team 20+ hours weekly and increase revenue by 30%.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="text-muted-foreground">2-minute assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-muted-foreground">Personalized recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-muted-foreground">ROI calculator included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Survey Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {!surveyCompleted ? (
              <>
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Step {currentStep + 1} of {surveySteps.length}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(calculateProgress())}% complete
                    </span>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />
                </div>

                {/* Current step */}
                <Card className="border-0 shadow-xl bg-gradient-to-r from-background to-slate-50">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      {surveySteps[currentStep].title}
                    </CardTitle>
                    <CardDescription className="text-lg text-muted-foreground">
                      {surveySteps[currentStep].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {surveySteps[currentStep].options.map((option) => {
                        const isSelected = surveySteps[currentStep].multiple 
                          ? (responses[surveySteps[currentStep].id] || []).includes(option.value)
                          : responses[surveySteps[currentStep].id] === option.value;
                        
                        return (
                          <Button
                            key={option.value}
                            variant={isSelected ? "default" : "outline"}
                            className={`h-auto p-6 text-left justify-start transition-all duration-300 hover:scale-105 ${
                              isSelected 
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                                : 'hover:bg-blue-50 hover:border-blue-300'
                            }`}
                            onClick={() => handleOptionSelect(surveySteps[currentStep].id, option.value)}
                          >
                            <div className="flex items-start gap-4 w-full">
                              <div className="text-2xl flex-shrink-0 mt-1">
                                {option.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-base mb-1">
                                  {option.label}
                                </div>
                                <div className={`text-sm ${isSelected ? 'text-blue-100' : 'text-muted-foreground'}`}>
                                  {option.description}
                                </div>
                              </div>
                              {isSelected && (
                                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                              )}
                            </div>
                          </Button>
                        );
                      })}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-8">
                      <Button 
                        variant="outline" 
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className="px-8"
                      >
                        Previous
                      </Button>
                      {surveySteps[currentStep].multiple && (
                        <Button 
                          onClick={handleNext}
                          disabled={!isStepComplete() || currentStep === surveySteps.length - 1}
                          className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                          Next <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* Results Screen */
              <div className="space-y-8">
                {/* Completion Header */}
                <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-blue-50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-foreground mb-2">
                      🎉 Assessment Complete!
                    </CardTitle>
                    <CardDescription className="text-lg text-muted-foreground">
                      Here's your personalized automation roadmap based on your responses
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Personalized Results */}
                {(() => {
                  const results = generatePersonalizedResults();
                  return (
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Time & Cost Savings */}
                      <Card className="border-0 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-green-600" />
                            Your Potential Savings
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Time saved weekly:</span>
                              <span className="text-2xl font-bold text-green-600">{results.timeSaved} hours</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Monthly cost savings:</span>
                              <span className="text-2xl font-bold text-green-600">${results.monthlySavings.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Estimated ROI:</span>
                              <span className="text-2xl font-bold text-blue-600">{results.roi}%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recommended Solutions */}
                      <Card className="border-0 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Settings className="w-5 h-5 text-blue-600" />
                            Recommended Solutions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {results.recommendedSolutions.map((solution, index) => (
                              <div key={index} className="border rounded-lg p-3">
                                <div className="font-semibold text-foreground mb-1">
                                  {solution.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {solution.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Business Profile */}
                      <Card className="border-0 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-600" />
                            Your Business Profile
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Industry:</span>
                              <Badge variant="secondary">
                                {surveySteps[0].options.find(opt => opt.value === results.businessType)?.label}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Team Size:</span>
                              <Badge variant="secondary">
                                {results.teamSize} employees
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Assessment Time:</span>
                              <Badge variant="secondary">
                                {formatTime(timeSpent)}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Next Steps */}
                      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-white">
                            <ArrowRight className="w-5 h-5" />
                            Ready to Get Started?
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-blue-100 mb-4">
                            Get a detailed implementation plan and ROI analysis tailored specifically for your business.
                          </p>
                          <div className="space-y-3">
                            <Button 
                              className="w-full bg-white text-blue-600 hover:bg-blue-50"
                              size="lg"
                              onClick={() => {
                                toast.success('Great! Your custom plan is being prepared. We\'ll contact you shortly!', {
                                  description: 'Check your email for your personalized automation roadmap.',
                                  duration: 5000,
                                });
                              }}
                            >
                              Get My Custom Plan
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full border-white text-white hover:bg-white/10"
                              size="lg"
                              onClick={() => {
                                toast.success('Consultation request received!', {
                                  description: 'Our team will reach out within 24 hours to schedule your free consultation.',
                                  duration: 5000,
                                });
                              }}
                            >
                              Schedule Free Consultation
                              <Phone className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })()}

                {/* Restart Survey Option */}
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSurveyCompleted(false);
                      setCurrentStep(0);
                      setResponses({});
                    }}
                    className="px-8"
                  >
                    Take Assessment Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Preview Section */}
      <section 
        id="benefits" 
        data-animate 
        className={`py-16 bg-gradient-to-r from-slate-900 to-blue-900 text-white transition-all duration-1000 delay-300 ${isVisible.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              See What Automation Can Do For Your Business
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Based on real results from businesses like yours
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Save 20+ Hours Weekly",
                description: "Automate scheduling, follow-ups, and administrative tasks",
                metric: "Average time saved per week",
                color: "from-green-400 to-green-600"
              },
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "Increase Revenue 30%",
                description: "Never miss leads, improve response times, optimize pricing",
                metric: "Revenue increase within 6 months",
                color: "from-blue-400 to-blue-600"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Boost Customer Satisfaction",
                description: "24/7 support, faster response times, better communication",
                metric: "Customer satisfaction improvement",
                color: "from-purple-400 to-purple-600"
              }
            ].map((benefit, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-4`}>
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                  <CardDescription className="text-blue-100">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-blue-200">
                    {benefit.metric}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section 
        id="social-proof" 
        data-animate 
        className={`py-16 bg-background transition-all duration-1000 delay-500 ${isVisible['social-proof'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by Service Businesses Nationwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of businesses already saving time and increasing revenue with automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { metric: "500+", label: "Businesses Automated", icon: "🏢" },
              { metric: "20hrs", label: "Average Weekly Savings", icon: "⏰" },
              { metric: "30%", label: "Revenue Increase", icon: "📈" },
              { metric: "97%", label: "Client Satisfaction", icon: "⭐" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.metric}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Preview */}
      {Object.keys(responses).length > 2 && (
        <section 
          id="preview" 
          data-animate 
          className={`py-16 bg-gradient-to-r from-blue-50 to-indigo-50 transition-all duration-1000 delay-700 ${isVisible.preview ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    Your Automation Preview
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Based on your responses, here's what we recommend
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Priority Automations:</h3>
                      <div className="space-y-2">
                        {responses['pain-points']?.slice(0, 3).map((pain, index) => (
                          <Badge key={index} variant="secondary" className="mr-2">
                            {surveySteps[2].options.find(opt => opt.value === pain)?.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Estimated Savings:</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Time saved weekly:</span>
                          <span className="font-semibold text-green-600">15-25 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly cost savings:</span>
                          <span className="font-semibold text-green-600">$2,400-$4,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Your Complete Automation Plan?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Complete the assessment to receive a detailed automation roadmap, ROI calculator, and personalized recommendations for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
            >
              Complete Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              Schedule Consultation
              <Phone className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Automation Discovery</span>
              </div>
              <p className="text-slate-400">
                Helping service businesses save time and increase revenue through intelligent automation solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Popular Automations</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Customer Service Chatbots</li>
                <li>Appointment Scheduling</li>
                <li>Lead Management</li>
                <li>Invoice Automation</li>
                <li>Route Optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Industries We Serve</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Plumbing & HVAC</li>
                <li>Electrical Services</li>
                <li>Cleaning Services</li>
                <li>Landscaping</li>
                <li>Roofing Contractors</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-slate-800" />
          <div className="text-center text-slate-400">
            <p>&copy; 2025 Automation Discovery. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
