
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Heart } from 'lucide-react';

type DesignExample = {
  id: number;
  title: string;
  image: string;
  roomType: string;
  style: string;
  likes: number;
  isLiked: boolean;
  author: string;
  authorAvatar: string;
};

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');
  const [styleFilter, setStyleFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [likedDesigns, setLikedDesigns] = useState<number[]>([]);
  
  // Mock design examples data
  const [designExamples, setDesignExamples] = useState<DesignExample[]>([
    {
      id: 1,
      title: 'Modern Minimalist Living Room',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
      roomType: 'living-room',
      style: 'minimalist',
      likes: 245,
      isLiked: false,
      author: 'Sarah Chen',
      authorAvatar: 'https://i.pravatar.cc/100?img=1',
    },
    {
      id: 2,
      title: 'Scandinavian Bedroom Design',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0',
      roomType: 'bedroom',
      style: 'scandinavian',
      likes: 189,
      isLiked: false,
      author: 'Mark Johnson',
      authorAvatar: 'https://i.pravatar.cc/100?img=2',
    },
    {
      id: 3,
      title: 'Industrial Style Kitchen',
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1',
      roomType: 'kitchen',
      style: 'industrial',
      likes: 312,
      isLiked: false,
      author: 'Alex Morgan',
      authorAvatar: 'https://i.pravatar.cc/100?img=3',
    },
    {
      id: 4,
      title: 'Bohemian Home Office',
      image: 'https://images.unsplash.com/photo-1585779034823-7e9ac8faec70',
      roomType: 'office',
      style: 'bohemian',
      likes: 178,
      isLiked: false,
      author: 'Jamie Williams',
      authorAvatar: 'https://i.pravatar.cc/100?img=4',
    },
    {
      id: 5,
      title: 'Coastal Style Dining Room',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200',
      roomType: 'dining',
      style: 'coastal',
      likes: 201,
      isLiked: false,
      author: 'Olivia Smith',
      authorAvatar: 'https://i.pravatar.cc/100?img=5',
    },
    {
      id: 6,
      title: 'Mid-Century Modern Living Room',
      image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37',
      roomType: 'living-room',
      style: 'mid-century',
      likes: 276,
      isLiked: false,
      author: 'Daniel Brown',
      authorAvatar: 'https://i.pravatar.cc/100?img=6',
    },
    {
      id: 7,
      title: 'Contemporary Bathroom',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101',
      roomType: 'bathroom',
      style: 'contemporary',
      likes: 156,
      isLiked: false,
      author: 'Emma Turner',
      authorAvatar: 'https://i.pravatar.cc/100?img=7',
    },
    {
      id: 8,
      title: 'Farmhouse Style Kitchen',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115',
      roomType: 'kitchen',
      style: 'farmhouse',
      likes: 289,
      isLiked: false,
      author: 'Michael Davis',
      authorAvatar: 'https://i.pravatar.cc/100?img=8',
    },
  ]);

  const handleToggleLike = (id: number) => {
    setDesignExamples(examples =>
      examples.map(example => {
        if (example.id === id) {
          const newIsLiked = !example.isLiked;
          return {
            ...example,
            isLiked: newIsLiked,
            likes: newIsLiked ? example.likes + 1 : example.likes - 1,
          };
        }
        return example;
      })
    );
    
    setLikedDesigns(prev => {
      const isLiked = prev.includes(id);
      if (isLiked) {
        return prev.filter(designId => designId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const filteredDesigns = designExamples.filter(design => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.roomType.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by room type
    const matchesRoomType = roomTypeFilter === 'all' || design.roomType === roomTypeFilter;
    
    // Filter by style
    const matchesStyle = styleFilter === 'all' || design.style === styleFilter;
    
    // Filter by tab
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'trending' && design.likes > 200) ||
      (activeTab === 'latest' && design.id > designExamples.length - 4) ||
      (activeTab === 'liked' && likedDesigns.includes(design.id));
    
    return matchesSearch && matchesRoomType && matchesStyle && matchesTab;
  });

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Designs</h1>
          <p className="text-white/70 text-lg">
            Browse through our collection of AI-generated interior designs for inspiration.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Search and Filters */}
          <div className="w-full md:w-1/3">
            <Card className="bg-design-dark-gray border-white/10">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
                    <Input
                      placeholder="Search designs..."
                      className="pl-10 bg-design-dark-blue/40"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </h3>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-white/70">Room Type</p>
                      <Select
                        value={roomTypeFilter}
                        onValueChange={setRoomTypeFilter}
                      >
                        <SelectTrigger className="bg-design-dark-blue/40">
                          <SelectValue placeholder="All room types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All room types</SelectItem>
                          <SelectItem value="living-room">Living Room</SelectItem>
                          <SelectItem value="bedroom">Bedroom</SelectItem>
                          <SelectItem value="kitchen">Kitchen</SelectItem>
                          <SelectItem value="bathroom">Bathroom</SelectItem>
                          <SelectItem value="office">Home Office</SelectItem>
                          <SelectItem value="dining">Dining Room</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-white/70">Design Style</p>
                      <Select
                        value={styleFilter}
                        onValueChange={setStyleFilter}
                      >
                        <SelectTrigger className="bg-design-dark-blue/40">
                          <SelectValue placeholder="All styles" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All styles</SelectItem>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="minimalist">Minimalist</SelectItem>
                          <SelectItem value="scandinavian">Scandinavian</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="bohemian">Bohemian</SelectItem>
                          <SelectItem value="mid-century">Mid-Century Modern</SelectItem>
                          <SelectItem value="coastal">Coastal</SelectItem>
                          <SelectItem value="farmhouse">Farmhouse</SelectItem>
                          <SelectItem value="contemporary">Contemporary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent"
                      onClick={() => {
                        setSearchQuery('');
                        setRoomTypeFilter('all');
                        setStyleFilter('all');
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Design Gallery */}
          <div className="w-full md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-design-dark-gray/50 p-1">
                <TabsTrigger value="all" className="text-sm">All Designs</TabsTrigger>
                <TabsTrigger value="trending" className="text-sm">Trending</TabsTrigger>
                <TabsTrigger value="latest" className="text-sm">Latest</TabsTrigger>
                <TabsTrigger value="liked" className="text-sm">Liked</TabsTrigger>
              </TabsList>
              
              {['all', 'trending', 'latest', 'liked'].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-6 mt-6">
                  {filteredDesigns.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredDesigns.map((design) => (
                        <div 
                          key={design.id} 
                          className="bg-design-dark-gray border border-white/10 rounded-lg overflow-hidden group"
                        >
                          <div className="relative">
                            <img
                              src={design.image}
                              alt={design.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <button
                              className={`absolute top-2 right-2 p-2 rounded-full ${
                                design.isLiked 
                                  ? 'bg-design-purple text-white' 
                                  : 'bg-design-dark-blue/80 text-white/70 hover:bg-design-purple/20'
                              }`}
                              onClick={() => handleToggleLike(design.id)}
                            >
                              <Heart className={`h-4 w-4 ${design.isLiked ? 'fill-current' : ''}`} />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-design-dark-blue to-transparent">
                              <div className="flex items-center space-x-2">
                                <img 
                                  src={design.authorAvatar} 
                                  alt={design.author}
                                  className="h-6 w-6 rounded-full border border-white/20"
                                />
                                <span className="text-xs text-white/90">{design.author}</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium mb-1">{design.title}</h3>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-2">
                                <span className="text-xs px-2 py-1 bg-design-dark-blue/40 rounded-md text-white/70">
                                  {design.roomType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </span>
                                <span className="text-xs px-2 py-1 bg-design-dark-blue/40 rounded-md text-white/70">
                                  {design.style.charAt(0).toUpperCase() + design.style.slice(1)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 text-white/70">
                                <Heart className="h-3 w-3" />
                                <span className="text-xs">{design.likes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed border-white/20 rounded-lg">
                      <p className="text-white/50">No designs found with the current filters.</p>
                      <Button 
                        variant="link" 
                        className="text-design-purple mt-2"
                        onClick={() => {
                          setSearchQuery('');
                          setRoomTypeFilter('all');
                          setStyleFilter('all');
                        }}
                      >
                        Reset all filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
