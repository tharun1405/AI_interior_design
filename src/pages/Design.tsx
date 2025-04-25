import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ImageIcon, Upload, Camera, Sparkles, Download, Loader2, X, CheckCircle2 } from 'lucide-react';

const Design = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [roomType, setRoomType] = useState('living-room');
  const [designStyle, setDesignStyle] = useState('modern');
  const [colorScheme, setColorScheme] = useState('neutral');
  const [budget, setBudget] = useState([500]);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [recommendations, setRecommendations] = useState<any[] | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JPG or PNG image.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 10MB.',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleGenerateDesign = async () => {
    if (!uploadedImage) {
      toast({
        title: 'No image uploaded',
        description: 'Please upload an image of your room first.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('http://localhost:8080/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: uploadedImage,
          style: "modern living room with stylish furniture, sofa, coffee table, indoor plants, wall art, ambient lighting",
        }),
      });

      const data = await response.json();
      if (!data.generatedImageUrl) {
         throw new Error('No image returned');
      }

      setGeneratedImage(data.generatedImageUrl);

      if (includeRecommendations) {
        const mockRecommendations = [
          {
            id: 1,
            name: 'Modern Sofa',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
            price: 899,
            link: '#',
            category: 'Furniture',
          },
          {
            id: 2,
            name: 'Minimalist Coffee Table',
            image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4',
            price: 349,
            link: '#',
            category: 'Furniture',
          },
          {
            id: 3,
            name: 'Geometric Area Rug',
            image: 'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e',
            price: 199,
            link: '#',
            category: 'Decor',
          },
          {
            id: 4,
            name: 'Pendant Light Fixture',
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
            price: 129,
            link: '#',
            category: 'Lighting',
          },
        ];
        setRecommendations(mockRecommendations);
      }

      toast({
        title: 'Design generated successfully!',
        description: 'Your new room design is ready.',
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: 'Error generating design',
        description: 'There was an error processing your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setGeneratedImage(null);
    setRecommendations(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'dreamspace-design.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Panel - Upload and Settings */}
          <div className="w-full md:w-1/3">
            <Card className="bg-design-dark-gray border-white/10">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Upload a photo</h2>
                      <p className="text-white/70 mb-6">
                        Upload a photo of the room you want to redesign.
                      </p>
                      
                      <div className="space-y-4">
                        <div 
                          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                            uploadedImage ? 'border-design-purple bg-design-purple/5' : 'border-white/20 hover:border-white/40 bg-design-dark-blue/40'
                          }`}
                          onClick={handleUploadClick}
                        >
                          {uploadedImage ? (
                            <div className="relative">
                              <img 
                                src={uploadedImage} 
                                alt="Uploaded room" 
                                className="rounded-md mx-auto max-h-48 w-auto"
                              />
                              <Button 
                                variant="destructive" 
                                size="icon" 
                                className="absolute top-2 right-2 h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleClearImage();
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-4">
                              <ImageIcon className="h-10 w-10 text-white/50 mb-4" />
                              <p className="text-white/70 mb-2">Drag & drop your image here</p>
                              <p className="text-white/50 text-sm">or click to browse</p>
                            </div>
                          )}
                          <Input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/jpeg,image/png,image/jpg" 
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            className="flex-1 border-white/20 bg-design-dark-blue/40"
                            onClick={handleUploadClick}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 border-white/20 bg-design-dark-blue/40"
                            disabled
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Take Photo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-6">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold mb-4">Design Preferences</h2>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="roomType">Room Type</Label>
                          <Select
                            value={roomType}
                            onValueChange={setRoomType}
                          >
                            <SelectTrigger id="roomType" className="bg-design-dark-blue/40">
                              <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                            <SelectContent>
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
                          <Label htmlFor="designStyle">Design Style</Label>
                          <Select
                            value={designStyle}
                            onValueChange={setDesignStyle}
                          >
                            <SelectTrigger id="designStyle" className="bg-design-dark-blue/40">
                              <SelectValue placeholder="Select design style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="modern">Modern</SelectItem>
                              <SelectItem value="minimalist">Minimalist</SelectItem>
                              <SelectItem value="scandinavian">Scandinavian</SelectItem>
                              <SelectItem value="industrial">Industrial</SelectItem>
                              <SelectItem value="bohemian">Bohemian</SelectItem>
                              <SelectItem value="mid-century">Mid-Century Modern</SelectItem>
                              <SelectItem value="traditional">Traditional</SelectItem>
                              <SelectItem value="coastal">Coastal</SelectItem>
                              <SelectItem value="farmhouse">Farmhouse</SelectItem>
                              <SelectItem value="contemporary">Contemporary</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="colorScheme">Color Scheme</Label>
                          <Select
                            value={colorScheme}
                            onValueChange={setColorScheme}
                          >
                            <SelectTrigger id="colorScheme" className="bg-design-dark-blue/40">
                              <SelectValue placeholder="Select color scheme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="neutral">Neutral</SelectItem>
                              <SelectItem value="warm">Warm</SelectItem>
                              <SelectItem value="cool">Cool</SelectItem>
                              <SelectItem value="monochrome">Monochrome</SelectItem>
                              <SelectItem value="earth-tones">Earth Tones</SelectItem>
                              <SelectItem value="bold">Bold & Vibrant</SelectItem>
                              <SelectItem value="pastel">Pastel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="budget">Budget Range</Label>
                            <span className="text-sm text-white/70">${budget[0]}</span>
                          </div>
                          <Slider
                            id="budget"
                            min={100}
                            max={10000}
                            step={100}
                            value={budget}
                            onValueChange={setBudget}
                          />
                          <div className="flex justify-between text-xs text-white/50">
                            <span>$100</span>
                            <span>$10,000+</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="recommendations"
                            checked={includeRecommendations}
                            onCheckedChange={setIncludeRecommendations}
                          />
                          <Label htmlFor="recommendations">Include product recommendations</Label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Button 
                    onClick={handleGenerateDesign}
                    disabled={!uploadedImage || isGenerating}
                    className="w-full bg-design-purple hover:bg-design-light-purple"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Design
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Panel - Results */}
          <div className="w-full md:w-2/3">
            <Card className="bg-design-dark-gray border-white/10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Design Preview</h2>
                
                {!uploadedImage && !generatedImage ? (
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center h-96 flex flex-col items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-white/30 mb-4" />
                    <p className="text-white/50">Upload an image to see your redesigned space</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Before and After Images */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {uploadedImage && (
                        <div className="relative">
                          <div className="absolute top-2 left-2 bg-design-dark-blue/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                            Before
                          </div>
                          <img
                            src={uploadedImage}
                            alt="Original room"
                            className="w-full h-64 object-cover rounded-lg border border-white/10"
                          />
                        </div>
                      )}
                      
                      {isGenerating ? (
                        <div className="h-64 bg-design-dark-blue/40 rounded-lg border border-white/10 flex flex-col items-center justify-center">
                          <Loader2 className="h-10 w-10 text-design-purple animate-spin mb-4" />
                          <p className="text-white/70">Generating your design...</p>
                          <p className="text-white/50 text-sm mt-2">This might take a moment</p>
                        </div>
                      ) : generatedImage ? (
                        <div className="relative">
                          <div className="absolute top-2 left-2 bg-design-dark-blue/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                            After
                          </div>
                          <img
                            src={generatedImage}
                            alt="Redesigned room"
                            className="w-full h-64 object-cover rounded-lg border border-white/10"
                          />
                          <Button
                            size="sm"
                            className="absolute bottom-2 right-2 bg-design-dark-blue/80 backdrop-blur-sm"
                            onClick={handleDownloadImage}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ) : null}
                    </div>
                    
                    {/* Furniture Recommendations */}
                    {recommendations && (
                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Recommended Products</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {recommendations.map((item) => (
                            <div key={item.id} className="bg-design-dark-blue/40 rounded-lg border border-white/10 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-32 object-cover"
                              />
                              <div className="p-3">
                                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                <p className="text-white/70 text-sm">${item.price}</p>
                                <p className="text-white/50 text-xs">{item.category}</p>
                                <a
                                  href={item.link}
                                  className="mt-2 text-design-purple text-xs font-medium inline-flex items-center hover:underline"
                                >
                                  View Product
                                  <CheckCircle2 className="ml-1 h-3 w-3" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
