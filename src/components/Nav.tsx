
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Sparkles } from 'lucide-react';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">DreamSpace</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                Home
              </Link>
              <Link to="/design" className={`text-sm font-medium transition-colors ${isActive('/design') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                Design
              </Link>
              <Link to="/explore" className={`text-sm font-medium transition-colors ${isActive('/explore') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                Explore
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="ml-4 bg-transparent border-primary text-primary hover:bg-accent/10"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-foreground">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-in">
          <div className="px-4 py-2 space-y-1">
            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'}`}>
              Home
            </Link>
            <Link to="/design" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/design') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'}`}>
              Design
            </Link>
            <Link to="/explore" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/explore') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'}`}>
              Explore
            </Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-accent/10">
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
