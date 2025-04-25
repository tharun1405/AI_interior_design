import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Home as HomeIcon, Image, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const beforeAfterExamples = [
    {
      id: 1,
      before: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
      after: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
      title: 'Living Room',
      style: 'Modern Minimalist',
    },
    {
      id: 2,
      before: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
      after: 'https://images.unsplash.com/photo-1616137356540-82d72c8bc1a1',
      title: 'Kitchen',
      style: 'Contemporary',
    },
    {
      id: 3,
      before: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e',
      after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6',
      title: 'Bedroom',
      style: 'Scandinavian',
    },
  ];

  const features = [
    {
      icon: <Image className="h-6 w-6 text-design-purple" />,
      title: 'AI Room Transformation',
      description: 'Upload a photo of your room and let our AI redesign it based on your preferences.',
    },
    {
      icon: <HomeIcon className="h-6 w-6 text-design-purple" />,
      title: 'Multiple Room Types',
      description: 'From living rooms to kitchens, bedrooms to bathrooms, we support all room types.',
    },
    {
      icon: <ShoppingBag className="h-6 w-6 text-design-purple" />,
      title: 'Furniture Recommendations',
      description: 'Get personalized furniture and decor recommendations based on your design.',
    },
    {
      icon: <Zap className="h-6 w-6 text-design-purple" />,
      title: 'Instant Results',
      description: 'See your redesigned space in seconds, not days or weeks.',
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "I was skeptical about AI interior design, but DreamSpace exceeded my expectations. The redesign of my living room was stunning and practical!",
      author: "Sarah M.",
      role: "Homeowner",
    },
    {
      id: 2,
      quote: "As a professional designer, I use DreamSpace to quickly generate ideas for clients. It saves me hours of work and provides great inspiration.",
      author: "Michael L.",
      role: "Interior Designer",
    },
    {
      id: 3,
      quote: "The furniture recommendations were spot on! Saved me so much time searching for pieces that match my style and budget.",
      author: "Jennifer K.",
      role: "Apartment Renter",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 md:pb-24 lg:pb-32 bg-background">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 pt-10 md:pt-16 lg:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text">
                Transform Your Space with <span className="text-soft-gradient">AI-Powered</span> Design
              </h1>
              <p className="mt-6 text-xl text-text-muted">
                Redesign your home in seconds. Upload a photo, set your style preferences, and watch our AI transform your space into the room of your dreams.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/design">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary-light text-white w-full sm:w-auto shadow-soft"
                  >
                    Design Your Space <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-accent w-full sm:w-auto"
                  >
                    Explore Designs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative rounded-lg overflow-hidden shadow-lighter border border-border">
                <img 
                  src="/lovable-uploads/c7d240ca-b4d9-4983-8ca8-011ef9cdfc5d.png" 
                  alt="DreamSpace AI Design Example" 
                  className="w-full h-auto rounded-lg" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-border">
                    <h3 className="text-lg font-medium text-text">AI-Generated Room Design</h3>
                    <p className="text-sm text-text-muted">Modern Living Room • Scandi Style</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-text-muted">
              Transform your space in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-design-dark-blue/50 p-6 rounded-lg border border-white/10 text-center">
              <div className="w-12 h-12 bg-design-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-design-purple font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Your Room</h3>
              <p className="text-text-muted">
                Take a photo of your room or space that you want to redesign.
              </p>
            </div>
            
            <div className="bg-design-dark-blue/50 p-6 rounded-lg border border-white/10 text-center">
              <div className="w-12 h-12 bg-design-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-design-purple font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Set Your Preferences</h3>
              <p className="text-text-muted">
                Choose your design style, color scheme, and other preferences.
              </p>
            </div>
            
            <div className="bg-design-dark-blue/50 p-6 rounded-lg border border-white/10 text-center">
              <div className="w-12 h-12 bg-design-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-design-purple font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Your Design</h3>
              <p className="text-text-muted">
                Our AI generates a redesigned space with furniture recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 md:py-24 bg-background-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-design-purple/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Before & After</h2>
            <p className="text-xl text-text-muted">
              See the transformative power of our AI design technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {beforeAfterExamples.map((example) => (
              <div key={example.id} className="bg-design-dark-gray/50 rounded-lg overflow-hidden border border-white/10">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-12 grid grid-cols-2">
                    <img 
                      src={example.before} 
                      alt={`${example.title} Before`} 
                      className="object-cover w-full h-full border-r border-white/10" 
                    />
                    <img 
                      src={example.after} 
                      alt={`${example.title} After`} 
                      className="object-cover w-full h-full" 
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-0.5 bg-design-purple"></div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{example.title}</h3>
                  <p className="text-text-muted">{example.style}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/explore">
              <Button className="bg-design-purple hover:bg-design-light-purple">
                View More Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Features</h2>
            <p className="text-xl text-text-muted">
              Powerful tools to transform your living spaces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-design-dark-blue/50 p-6 rounded-lg border border-white/10">
                <div className="mb-4 bg-design-purple/10 w-12 h-12 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background-secondary relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-design-blue/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-xl text-text-muted">
              Join thousands of satisfied customers who have transformed their spaces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-design-dark-gray/50 p-6 rounded-lg border border-white/10">
                <div className="mb-4 text-design-purple">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <p className="text-text/80 mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-text/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-design-purple/20 to-design-dark-blue">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Sparkles className="h-12 w-12 text-design-purple mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/70 mb-10">
              Join thousands of users who are redesigning their homes with our AI-powered platform.
            </p>
            <Link to="/design">
              <Button size="lg" className="bg-design-purple hover:bg-design-light-purple text-white">
                Start Designing Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
