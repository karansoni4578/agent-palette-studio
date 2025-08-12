import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCategories } from '@/hooks/useAgents';

interface AgentFormData {
  name: string;
  description: string;
  link: string;
  category_id: string;
  image_file?: File;
}

interface AgentSubmissionFormProps {
  onAgentAdded?: () => void;
}

const AgentSubmissionForm = ({ onAgentAdded }: AgentSubmissionFormProps) => {
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    description: '',
    link: '',
    category_id: ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { categories, loading: categoriesLoading } = useCategories();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image_file: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('agent-logos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('agent-logos')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = null;
      
      // Upload image if provided
      if (formData.image_file) {
        imageUrl = await uploadImage(formData.image_file);
        if (!imageUrl) {
          throw new Error('Failed to upload image');
        }
      }

      // Insert agent data
      const { error } = await supabase
        .from('agents')
        .insert({
          name: formData.name.trim(),
          description: formData.description.trim(),
          link: formData.link.trim(),
          category_id: formData.category_id,
          image_url: imageUrl
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Agent submitted successfully",
      });

      // Reset form and show success state
      setFormData({
        name: '',
        description: '',
        link: '',
        category_id: ''
      });
      setImagePreview(null);
      setIsSubmitted(true);
      
      // Notify parent component
      if (onAgentAdded) {
        onAgentAdded();
      }

    } catch (error) {
      console.error('Error submitting agent:', error);
      toast({
        title: "Error",
        description: "Failed to submit agent. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Agent Submitted Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for contributing to AI Agent Zone. Your submission is now live and will appear in the selected category.
          </p>
          <Button 
            onClick={resetForm}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Submit Another Agent
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Submit Your AI Agent</CardTitle>
        <p className="text-gray-600">Share your AI agent with the community</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Agent Name */}
          <div>
            <Label htmlFor="name">Agent Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter agent name"
              required
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what your agent does (max 250 characters)"
              maxLength={250}
              required
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.description.length}/250 characters
            </p>
          </div>

          {/* Link */}
          <div>
            <Label htmlFor="link">Agent Link *</Label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
              placeholder="https://your-agent-website.com"
              required
              className="mt-1"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category_id} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
            >
              <SelectTrigger className="mt-1 bg-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {categoriesLoading ? (
                  <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                ) : (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Logo Upload */}
          <div>
            <Label htmlFor="logo">Agent Logo (Optional)</Label>
            <div className="mt-2">
              <input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('logo')?.click()}
                className="w-full border border-gray-300 hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
            disabled={isLoading || !formData.name || !formData.description || !formData.link || !formData.category_id}
          >
            {isLoading ? 'Submitting...' : 'Submit Agent'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgentSubmissionForm;