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
  is_free: boolean;
  official_url: string;
  image_file?: File;
}

const AdminModelForm = () => {
  const [formData, setFormData] = useState<ModelFormData>({
    name: '',
    description: '',
    category: '',
    tags: [],
    is_free: true,
    official_url: ''
  });
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

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
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('models-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('models-images')
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
      
      // Upload image if provided
      if (formData.image_file) {
        imageUrl = await uploadImage(formData.image_file);
        if (!imageUrl) {
          throw new Error('Failed to upload image');
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
          is_free: formData.is_free,
          official_url: formData.official_url.trim(),
          image_url: imageUrl
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
        is_free: true,
        official_url: ''
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Model/Agent</h2>
      
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

        {/* Official URL */}
        <div>
          <Label htmlFor="url">Official URL *</Label>
          <Input
            id="url"
            type="url"
            value={formData.official_url}
            onChange={(e) => setFormData(prev => ({ ...prev, official_url: e.target.value }))}
            placeholder="https://example.com"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <Label htmlFor="image">Image</Label>
          <div className="mt-2">
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image')?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
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

        {/* Free/Paid Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="is_free"
            checked={formData.is_free}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_free: checked }))}
          />
          <Label htmlFor="is_free">
            {formData.is_free ? 'Free' : 'Paid'}
          </Label>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-[#F97316] hover:bg-[#EA580C]"
          disabled={isLoading || !formData.name || !formData.description || !formData.category || !formData.official_url}
        >
          {isLoading ? 'Adding...' : 'Add Model/Agent'}
        </Button>
      </form>
    </div>
  );
};

export default AdminModelForm;