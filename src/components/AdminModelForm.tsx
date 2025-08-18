import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const CATEGORIES = [
  'Chat & Conversation',
  'Writing & Content', 
  'Image & Design',
  'Coding & Developer Tools',
  'Productivity & Workflow',
  'Voice & Audio',
  'Video & Animation',
  'Data & Analytics',
  'Finance & Crypto',
  'Education & Learning',
  'Marketing & SEO',
  'Healthcare & Wellness',
  'Developer APIs & Models',
  'Security & Legal',
  'Experimental & Research Projects'
];

interface ModelFormData {
  name: string;
  description: string;
  category: string;
  tags: string[];
  pricing_type: 'Free' | 'Paid' | 'Freemium';
  website_url: string;
  logo_file?: File;
}

const AdminModelForm = () => {
  const [formData, setFormData] = useState<ModelFormData>({
    name: '',
    description: '',
    category: '',
    tags: [],
    pricing_type: 'Free',
    website_url: ''
  });
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo_file: file }));
      
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
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('logos')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = null;
      
      // Upload logo if provided
      if (formData.logo_file) {
        imageUrl = await uploadImage(formData.logo_file);
        if (!imageUrl) {
          throw new Error('Failed to upload logo');
        }
      }

      // Insert model/agent data
      const { error } = await supabase
        .from('models_agents')
        .insert({
          name: formData.name.trim(),
          description: formData.description.trim(),
          category: formData.category,
          tags: formData.tags,
          pricing_type: formData.pricing_type,
          website_url: formData.website_url.trim(),
          logo_url: imageUrl
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Model/Agent added successfully",
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        tags: [],
        pricing_type: 'Free',
        website_url: ''
      });
      setImagePreview(null);

    } catch (error) {
      console.error('Error adding model/agent:', error);
      toast({
        title: "Error",
        description: "Failed to add model/agent. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-[#111827] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Add New Model/Agent</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter model/agent name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter description (max 250 characters)"
            maxLength={250}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.description.length}/250 characters
          </p>
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Website URL */}
        <div>
          <Label htmlFor="url">Website URL *</Label>
          <Input
            id="url"
            type="url"
            value={formData.website_url}
            onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
            placeholder="https://example.com"
            required
          />
        </div>

        {/* Logo Upload */}
        <div>
          <Label htmlFor="logo">Logo</Label>
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
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Logo
            </Button>
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-contain rounded-lg bg-muted border" />
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Tags</Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button type="button" onClick={handleAddTag} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => handleRemoveTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Pricing Type */}
        <div>
          <Label htmlFor="pricing">Pricing Type *</Label>
          <Select value={formData.pricing_type} onValueChange={(value: 'Free' | 'Paid' | 'Freemium') => setFormData(prev => ({ ...prev, pricing_type: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select pricing type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Freemium">Freemium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold"
          style={{ fontFamily: 'Poppins, sans-serif' }}
          disabled={isLoading || !formData.name || !formData.description || !formData.category || !formData.website_url}
        >
          {isLoading ? 'Adding...' : 'Add Model/Agent'}
        </Button>
      </form>
    </div>
  );
};

export default AdminModelForm;