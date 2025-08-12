// src/components/AgentForm.jsx
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase init
const supabaseUrl = "https://casroknzdishifjrwkit.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhc3Jva256ZGlzaGlmanJ3a2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODc0NzUsImV4cCI6MjA2OTk2MzQ3NX0.JUcrit1iBoD6FkPRz6Ua1BctZPul8QefG3-fONKO_K0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AgentForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
    link: "",
    image: null
  });
  const [loading, setLoading] = useState(false);
  const categories = [
    "Chat & Conversation",
    "Writing & Content",
    "Image & Design",
    "Coding & Developer Tools",
    "Productivity & Workflow",
    "Voice & Audio",
    "Video & Animation",
    "Data & Analytics",
    "Finance & Crypto",
    "Education & Learning",
    "Marketing & SEO",
    "Healthcare & Wellness",
    "Developer APIs & Models",
    "Security & Legal",
    "Experimental & Research Projects"
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      if (formData.image) {
        const fileName = `${Date.now()}-${formData.image.name}`;
        const { data: storageData, error: storageError } = await supabase.storage
          .from("agent-images")
          .upload(fileName, formData.image);
        if (storageError) throw storageError;
        imageUrl = `${supabaseUrl}/storage/v1/object/public/agent-images/${fileName}`;
      }

      const { error: insertError } = await supabase.from("agents").insert([
        {
          name: formData.name,
          description: formData.description,
          category_id: formData.category_id,
          link: formData.link,
          image_url: imageUrl
        }
      ]);
      if (insertError) throw insertError;

      alert("✅ Agent successfully added to the selected category!");
      setFormData({
        name: "",
        description: "",
        category_id: "",
        link: "",
        image: null
      });
    } catch (error) {
      console.error(error);
      alert("❌ Error adding agent!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Agent</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Agent Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          name="link"
          placeholder="Website / Tool Link"
          value={formData.link}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded cursor-pointer"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          {loading ? "Adding..." : "Add Agent"}
        </button>
      </form>
    </div>
  );
}
