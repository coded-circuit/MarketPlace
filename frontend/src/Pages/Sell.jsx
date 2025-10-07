import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Sell() {
  const Navigate = useNavigate()
  const [currentUser,setCurrentUser] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'electronics',
    location: ''
  });
  const fetchCurrentUser = async()=>{
      try {
        const res = await fetch(`${BASE_URL}/user/me`, {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.data);
        }
        else{
          alert('User Not Logged in!')
          Navigate('/login');
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionImageUrl = "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
    
    const payload = {
      ...formData,
      img_url: submissionImageUrl,
      seller_id: currentUser._id,
    };

    try {
      const res = await fetch(`${BASE_URL}/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || data.msg === 'Error') throw new Error(data.error || 'Failed to create');
      alert("Product listed successfully!");
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'electronics',
        location: ''
      });
    } catch (err) {
      alert(`Listing failed: ${err.message}`);
    }
  };
  useEffect(()=>{
    fetchCurrentUser();
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-slate-50 to-blue-50 flex justify-center py-10 px-4 sm:px-6 lg:px-10">
      <main className="max-w-6xl w-full bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl ring-1 ring-indigo-100 overflow-hidden border border-indigo-100">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <h2 className="text-3xl font-bold">List your product</h2>
          <p className="mt-1 text-indigo-100">Add details, photos, and set a price to reach buyers quickly.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Body */}
          <div className="px-8 py-10 bg-gradient-to-br from-white via-indigo-50 to-white">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-10">

              {/* Left Side */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="e.g., Vintage Leather Sofa"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-indigo-100 bg-white/70 px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows="6"
                    placeholder="Include condition, features, and reason for selling"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-indigo-100 bg-white/70 px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                  />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-1">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 font-medium">₹</span>
                      <input
                        id="price"
                        type="number"
                        placeholder="5000"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-xl border border-indigo-100 bg-white/70 pl-8 pr-3 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-indigo-100 bg-white/70 px-3 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                    >
                      <option value="electronics">Electronics</option>
                      <option value="vehicles">Vehicles</option>
                      <option value="furniture">Furniture</option>
                      <option value="fashion">Fashion</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="services">Services</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-slate-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">location_on</span>
                    <input
                      id="location"
                      type="text"
                      placeholder="Lucknow, India"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-indigo-100 bg-white/70 pl-10 pr-3 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="lg:col-span-1 space-y-8">
                {/* Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Add photos
                  </label>
                  <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 px-6 py-10 text-center hover:border-indigo-400 hover:bg-indigo-100 transition-colors">
                    <div>
                      <span className="material-symbols-outlined text-5xl text-indigo-500">add_photo_alternate</span>
                      <div className="mt-2 text-sm text-slate-700">
                        <label htmlFor="file-upload" className="relative cursor-pointer font-semibold text-indigo-600 hover:text-indigo-800">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" />
                        </label>
                        <span className="pl-1">or drag and drop</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="rounded-xl bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-5 shadow-inner border border-indigo-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-3xl text-indigo-500">lightbulb</span>
                    <h4 className="font-semibold text-indigo-900">Tips for a great listing</h4>
                  </div>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-indigo-700">
                    <li>Use a clear, descriptive title.</li>
                    <li>Add multiple bright, high-quality photos.</li>
                    <li>Be honest about the condition.</li>
                    <li>Set a fair, competitive price.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gradient-to-r from-indigo-400 to-blue-400 border-t border-indigo-100">
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-indigo-700 font-semibold px-8 py-3 shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all"
              >
                List the product
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}