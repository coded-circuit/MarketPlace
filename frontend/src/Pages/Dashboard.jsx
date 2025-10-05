import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { BASE_URL } from '../App';
export default function Dashboard() {
  const [products,setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const fetchProducts = async()=>{
    try{
      const res = await fetch(`${BASE_URL}/product`);
      if(!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.data); 
    }
    catch(e){
      setError(e.message);
    }
  }

  const fetchProductsByCategory = async (categoryName) => {
    try {
      const res = await fetch(`${BASE_URL}/product/category/${encodeURIComponent(categoryName)}`);
      if (!res.ok) throw new Error(`Failed to fetch products of category ${categoryName}`);
      const data = await res.json();
      const arr = data.data;
      setProducts(arr);
      const total = arr.length;
      document.getElementById('filter').innerHTML = `Showing ${total} results in ${categoryName}`;
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(()=>{
    fetchProducts();
  },[])

  if(error) return <div>Error:{error}</div>

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    if (categoryName === 'all') {
      fetchProducts();
      document.getElementById('filter').innerHTML = '';
    } else {
      fetchProductsByCategory(categoryName);
     
    }
  }
  const baseBtn = 'px-3 py-2.5 rounded-md text-sm font-medium transition-colors focus:outline-none  focus:ring-offset-1';
const activeBtn = 'bg-primary-600 text-white shadow hover:bg-primary-700 focus:ring-indigo-600';
const defaultBtn = 'bg-indigo-600 text-white shadow hover:bg-primary-700 focus:ring-indigo-600';
const inactiveBtn = 'bg-gray-100 text-gray-700 hover:bg-primary-200 focus:ring-gray-300';

  return (
    <div id= 'dashboard'  className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 '>
      <div className=' flex py-8'>
      <div className='flex items-center gap-3 flex-wrap'>
  <button
    onClick={() => handleCategoryClick('all')}
    className={`${baseBtn} ${defaultBtn }`}
  >
    All Categories
  </button>
  <button
    onClick={() => handleCategoryClick('electronics')}
    className={`${baseBtn} ${selectedCategory === 'electronics' ? activeBtn : inactiveBtn}`}
  >
    Electronics
  </button>
  <button
    onClick={() => handleCategoryClick('vehicles')}
    className={`${baseBtn} ${selectedCategory === 'vehicles' ? activeBtn : inactiveBtn}`}
  >
    Vehicles
  </button>
  <button
    onClick={() => handleCategoryClick('furniture')}
    className={`${baseBtn} ${selectedCategory === 'furniture' ? activeBtn : inactiveBtn}`}
  >
    Furniture
  </button>
  <button
    onClick={() => handleCategoryClick('fashion')}
    className={`${baseBtn} ${selectedCategory === 'fashion' ? activeBtn : inactiveBtn}`}
  >
    Fashion
  </button>
  <button
    onClick={() => handleCategoryClick('real-estate')}
    className={`${baseBtn} ${selectedCategory === 'real-estate' ? activeBtn : inactiveBtn}`}
  >
    Real Estate
  </button>
  <button
    onClick={() => handleCategoryClick('services')}
    className={`${baseBtn} ${selectedCategory === 'services' ? activeBtn : inactiveBtn}`}
  >
    Services
  </button>
  <button
    onClick={() => handleCategoryClick('others')}
    className={`${baseBtn} ${selectedCategory === 'others' ? activeBtn : inactiveBtn}`}
  >
    Others
  </button>
</div>
      </div>
      <div  className='flex gap-6 items-center'>
      <button id='filter-btn'
  type="button"
  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-blue-700 shadow-sm hover:bg-blue-50 hover:border-blue-300 focus:outline-none  active:shadow-inner"
>
    <span className="material-symbols-outlined text-[20px] leading-none">filter_alt</span>
  <span className="font-medium">Filters</span>
</button>
        <div id='filter'></div>
      </div>
      <h1 className='text-3xl font-semibold py-4'>Fresh Reccomendations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <div
              className="aspect-[4/3] bg-cover bg-center group relative"
              style={{ backgroundImage: `url(${product.img_url})` }}
            >
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="size-10 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 flex items-center justify-center">
                  <span className="material-symbols-outlined">favorite_border</span>
                </button>
                <button className="size-10 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 flex items-center justify-center">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
            </div>

            <Link to={`/product/${product._id}`}>
            <div className="p-4 flex flex-col space-y-2 ">
              <h3 className="font-semibold text-gray-900 truncate">
                {product.title}
              </h3>
              <p className="text-lg font-bold text-gray-800">
                ₹{product.price}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {product.category}
                </span>
                <span className="truncate">{product.location}</span>
              </div>
              <p className="text-xs text-gray-400">
                Posted  on {product.created_at}
              </p>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}