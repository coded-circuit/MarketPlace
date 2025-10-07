import React, { useEffect, useState } from "react";
import { BASE_URL } from "../App";

export default function Profile() {
  const [user,setUser]=useState(null);
  const [error,setError]= useState(null);
  const  fetchUser = async()=>{
    try{
      const res = await fetch(`${BASE_URL}/user/me`,{
        credentials:'include' // then only it can be accessed.
      })
      if(!res.ok) throw new Error('failed to fetch User');
      const data = await res.json();
      
      setUser(data.data);
    }
    catch(e){
      setError(e.message)
    }
  }
  useEffect(()=>{
    fetchUser()
  },[])
  if(error) return <div>Error:{error}</div>
  return (
    <div>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-8">
  {/* Avatar */}
  <img
    alt={user?.name || "User"}
    className="size-36 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-blue-400/50"
    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBth4-TFzg9C3KvFmDr2AONKEp7HRqTdFarjHOxkkf8APNosOJ60w-HOVrP3JINILXmUL8766docgzZgvtlbYjQAVrUdNYy-R1rEgba-LxVolwZ64WS-8t5aMDMHJiBxlE-eL4XlBbuV0KECi6aJ1LNmPLfjr3bYn7qS6_f87pOVJtMgqgBBXvAFH95kEy69mPwlodORVLMUKfz3lPB7Tqwp6IZxJr5yz5_I6bluZqQbfH-7zs2AmgD_JW6vUKlVfGKvLy-igb6lps"
  />

  {/* Info */}
  <div className="flex-1 space-y-3">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
      {user?.name || "User Name"}
    </h1>
    <p className="text-gray-600 dark:text-gray-400 text-sm">
      Joined {user?.createdAt ? new Date(user.createdAt).getFullYear() : "in 2021"}
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 mt-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-blue-500">mail</span>
        <span className="font-medium">{user?.email || "user@example.com"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-blue-500">call</span>
        <span className="font-medium">{user?.phone || "+91 9876543210"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-blue-500">location_on</span>
        <span className="font-medium">{user?.location || "Guwahati, India"}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-blue-500">calendar_month</span>
        <span className="font-medium">
          Member since{" "}
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "2021"}
        </span>
      </div>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-3 mt-4">
      <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 px-4 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
        {user?.location || "India"}
      </span>
      <span className="bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300 px-4 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
        Active Member
      </span>
    </div>
  </div>
</div>

          <div className="mt-8 border-b border-border-light dark:border-border-dark">
            <nav className="flex gap-8 -mb-px">
              <a
                className="py-3 px-1 border-b-2 border-primary text-primary font-semibold text-sm"
                href="*"
              >
                Listings
              </a>
              <a
                className="py-3 px-1 border-b-2 border-transparent text-subtle-light dark:text-subtle-dark hover:border-primary/50 hover:text-foreground-light dark:hover:text-foreground-dark font-medium text-sm transition-colors"
                href="*"
              >
                Wishlist
              </a>
            </nav>
          </div>

          {/* Product Grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Product Card 1 */}
            <div className="group relative bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
              <div
                className="aspect-square bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_wjmPeQMQ7ARWR8GBDJFf1hpS1tpsKcWhNmxZjAUfsgw4Cx30SfIKiIQNJsFG7xRNbVoG5laOHORjlvmhzG5UwHpnjdGcci3FeoGhD1ZlPPztWTe0Se2xsACwDKppCAcvooFS54vXu_3xGKUohAw45646YwJHVQw2kudNAGDyo3mKRleTlb1ugd4Gg2tOVhkt8WVurAYsGpkEvn5J9PzMV4Uyj1s1H5KeI0YD5QdwasxObp880ngZqE_AxUXNUpBIaCK-7Cg6Z9w")',
                }}
              ></div>
              <div className="p-4">
                <h3 className="font-semibold truncate">
                  Vintage Leather Jacket
                </h3>
              </div>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="size-10 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30">
                  <span className="material-symbols-outlined">
                    favorite_border
                  </span>
                </button>
                <button className="size-10 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30">
                  <span className="material-symbols-outlined">
                    add_shopping_cart
                  </span>
                </button>
              </div>
            </div>

          
          </div>

          {/* Pagination */}
          <nav className="mt-8 flex justify-center items-center gap-2">
            <a
              className="flex items-center justify-center size-9 rounded-full text-subtle-light dark:text-subtle-dark hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              href="*"
            >
              <span className="material-symbols-outlined text-lg">
                chevron_left
              </span>
            </a>
            <a className="flex items-center justify-center size-9 rounded-full bg-primary text-white font-bold text-sm">
              1
            </a>
            <a className="flex items-center justify-center size-9 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 text-sm transition-colors">
              2
            </a>
            <a className="flex items-center justify-center size-9 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 text-sm transition-colors">
              3
            </a>
            <span className="text-subtle-light dark:text-subtle-dark">...</span>
            <a className="flex items-center justify-center size-9 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 text-sm transition-colors">
              10
            </a>
            <a
              className="flex items-center justify-center size-9 rounded-full text-subtle-light dark:text-subtle-dark hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-lg">
                chevron_right
              </span>
            </a>
          </nav>
        </div>
      </main>
    </div>
  );
}
