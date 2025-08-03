import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Upload, Zap, Users, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const formSchema = z.object({
  agentName: z.string().min(1, "Agent name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  website: z.string().url("Please enter a valid URL"),
  category: z.string().min(1, "Please select a category"),
  requiresAPI: z.boolean(),
  isPaid: z.boolean(),
  tags: z.array(z.string()).min(1, "Please select at least one tag"),
});

type FormData = z.infer<typeof formSchema>;

const SubmitAgent = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requiresAPI: false,
      isPaid: false,
      tags: [],
    },
  });

  const requiresAPI = watch("requiresAPI");
  const isPaid = watch("isPaid");

  const availableTags = ["Free", "API Available", "Open Source", "Voice", "Chat", "Automation", "AI Assistant", "Productivity"];

  const handleTagChange = (tag: string, checked: boolean) => {
    const newTags = checked 
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    setSelectedTags(newTags);
    setValue("tags", newTags);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Submitted data:", data);
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FFF7ED]">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#111827] mb-4">Thank You!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your AI agent has been submitted successfully. We'll review it and get back to you within 2-3 business days.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white"
            >
              Submit Another Agent
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7ED]">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#111827] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Submit a New AI Agent
            </h1>
            <p className="text-lg text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Fill the form below to share your AI agent with the world.
            </p>
          </div>

          {/* Form Card */}
          <Card className="bg-white shadow-lg rounded-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Agent Name */}
                <div>
                  <Label htmlFor="agentName" className="text-[#111827] font-medium">
                    Agent Name *
                  </Label>
                  <Input
                    id="agentName"
                    {...register("agentName")}
                    className="mt-2 focus:border-[#F97316] focus:ring-[#F97316]"
                    placeholder="Enter your AI agent's name"
                  />
                  {errors.agentName && (
                    <p className="text-red-500 text-sm mt-1">{errors.agentName.message}</p>
                  )}
                </div>

                {/* Short Description */}
                <div>
                  <Label htmlFor="description" className="text-[#111827] font-medium">
                    Short Description *
                  </Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    className="mt-2 min-h-[80px] focus:border-[#F97316] focus:ring-[#F97316]"
                    placeholder="Describe what your AI agent does (2-3 lines)"
                    rows={3}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                {/* Website/Link */}
                <div>
                  <Label htmlFor="website" className="text-[#111827] font-medium">
                    Website/Link *
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    {...register("website")}
                    className="mt-2 focus:border-[#F97316] focus:ring-[#F97316]"
                    placeholder="https://youraiagent.com"
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                  )}
                </div>

                {/* Upload Agent Logo */}
                <div>
                  <Label className="text-[#111827] font-medium">Upload Agent Logo</Label>
                  <div className="mt-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#F97316] transition-colors">
                      {uploadedImage ? (
                        <div className="flex flex-col items-center">
                          <img 
                            src={uploadedImage} 
                            alt="Uploaded logo" 
                            className="w-24 h-24 object-cover rounded-lg mb-2"
                          />
                          <p className="text-sm text-gray-600">Logo uploaded successfully</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-12 h-12 text-gray-400 mb-2" />
                          <p className="text-gray-600">Click to upload or drag and drop</p>
                          <p className="text-sm text-gray-400">Square images preferred (PNG, JPG)</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Category */}
                <div>
                  <Label className="text-[#111827] font-medium">Primary Category *</Label>
                  <Select onValueChange={(value) => setValue("category", value)}>
                    <SelectTrigger className="mt-2 focus:border-[#F97316] focus:ring-[#F97316]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chat">Chat</SelectItem>
                      <SelectItem value="writing">Writing</SelectItem>
                      <SelectItem value="coding">Coding</SelectItem>
                      <SelectItem value="automation">Automation</SelectItem>
                      <SelectItem value="image">Image Generation</SelectItem>
                      <SelectItem value="audio">Audio/Voice</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <Label className="text-[#111827] font-medium">Tags *</Label>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {availableTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={tag}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={(checked) => handleTagChange(tag, !!checked)}
                          className="border-[#F97316] data-[state=checked]:bg-[#F97316]"
                        />
                        <Label htmlFor={tag} className="text-sm cursor-pointer">
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.tags && (
                    <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
                  )}
                </div>

                {/* API Access Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-[#111827] font-medium">Does this agent require API access?</Label>
                    <p className="text-sm text-gray-600">Users will need API keys to use this agent</p>
                  </div>
                  <Switch
                    checked={requiresAPI}
                    onCheckedChange={(checked) => setValue("requiresAPI", checked)}
                    className="data-[state=checked]:bg-[#F97316]"
                  />
                </div>

                {/* Free/Paid Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-[#111827] font-medium">Is it Free or Paid?</Label>
                    <p className="text-sm text-gray-600">Let users know about pricing</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${!isPaid ? 'text-[#F97316] font-medium' : 'text-gray-600'}`}>
                      Free
                    </span>
                    <Switch
                      checked={isPaid}
                      onCheckedChange={(checked) => setValue("isPaid", checked)}
                      className="data-[state=checked]:bg-[#F97316]"
                    />
                    <span className={`text-sm ${isPaid ? 'text-[#F97316] font-medium' : 'text-gray-600'}`}>
                      Paid
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-6 text-lg font-medium rounded-lg"
                >
                  Submit Agent
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Why Submit Section */}
          <Card className="mt-12 bg-white shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#111827] text-center">
                Why submit to AI Agent Zone?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Zap className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-1">Get Discovered</h3>
                    <p className="text-gray-600">Reach thousands of users actively looking for AI solutions like yours.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Users className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-1">Build Your Community</h3>
                    <p className="text-gray-600">Connect with other AI enthusiasts and grow your user base organically.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Globe className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-1">Free Exposure</h3>
                    <p className="text-gray-600">Get listed for free and benefit from our SEO-optimized platform.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitAgent;