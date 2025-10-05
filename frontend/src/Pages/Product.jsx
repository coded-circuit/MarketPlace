import { useState,useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import { BASE_URL } from '../App';
export default function Product() {
	const  {id}=useParams();
	const [product,setProduct] = useState(null);
	const [error,setError] = useState(null);
	const fetchProductbyId = async(id)=>{
		try{
			const res = await fetch(`${BASE_URL}/product/${encodeURIComponent(id)}`);
			if(!res.ok) throw new Error('Failed to fetch product');
			const data = await res.json();
			setProduct(data.data);
		}
		catch(e){
			setError(e.message);
		}
	}
	function formatDate(d) {
		try { return new Date(d).toLocaleDateString(); }
			catch { return ''; }
	}
    const handleShare = () => {
        const payload = { title: product?.title, text: product?.description, url: window.location.href };
        if (navigator.share) navigator.share(payload).catch(() => {});
        else {
          navigator.clipboard?.writeText(window.location.href);
          alert('Link copied to clipboard');
        }
      };
	useEffect(()=>{
		fetchProductbyId(id);
	},[id]);
	if(error) return <div>Error:{error}</div>
	if(!product) return <div>Loading...</div>

	return (
        <div id="product">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 min-h-screen">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2 py-2">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link
              to={`/?category=${encodeURIComponent(product.category)}`}
              className="hover:text-primary-600 capitalize"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-700 truncate font-semibold">{product.title}</span>
          </nav>

          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-xl bg-gray-100 shadow">
                <div
                  className="bg-cover bg-center h-[520px]"
                  style={{ backgroundImage: `url(${product.img_url})` }}
                  role="img"
                  aria-label={product.title}
                />
              </div>
            </div>
              <div className="lg:col-span-6 space-y-6">
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Save"
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                  >
                    <span className="material-symbols-outlined text-[20px] leading-none">favorite</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Share"
                    onClick={handleShare}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                  >
                    <span className="material-symbols-outlined text-[20px] leading-none">ios_share</span>
                  </button>
                </div>
              </div>
              <div className="text-3xl font-semibold text-gray-900">₹{product.price}</div>
              <div className="flex flex-wrap items-center gap-5 text-sm">
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700  font-semibold border border-blue-100 capitalize">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-gray-600 font-semibold">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span className="truncate">{product.location}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 font-semibold">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span>{formatDate(product.created_at)}</span>
                </div>
              </div>
              
              <div className="border-b border-gray-200" />
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </section>
                <div className="border-b border-gray-200" />
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Seller</h3>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <span className="material-symbols-outlined">account_circle</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {product.seller_id.name }
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span>{product.seller_id.location}</span>
                    </div>
                  </div>
                </div>
              </section>
              <div className="pt-1">
                <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-white shadow hover:bg-primary-700 focus:outline-none">
                  <span className="material-symbols-outlined">chat</span>
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}