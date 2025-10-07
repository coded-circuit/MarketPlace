import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BASE_URL } from '../App';
export default function RootLayout() {
	const[isLoggedIn,setIsLoggedIn] = useState(false);
	const[errors,setErrors] =useState({});
	const[user,setUser] = useState(null);
	const checkAuth =async()=>{
		try{
			const res= await fetch(`${BASE_URL}/user`,{
				credentials:'include',
			})
			
			if(res.ok){
				const data = await res.json();
				setIsLoggedIn(true);
			}
		}
		catch(err){
			setErrors({Error:err.message})
		}
	}
	const handleLogOut = async () => {
		//It will send the request to server to remove session id and in backend, we will remove session id from cookie.
		try {
			const res = await fetch(`${BASE_URL}/user/logout`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' }
			});
			if (res.ok) {
				setIsLoggedIn(false);
				setUser(null);
			} else {
				const errData = await res.json().catch(() => ({ message: 'Logout failed' }));
				setErrors({ Error: errData.message || 'Logout failed' });
			}
		} catch (err) {
			setErrors({ Error: err.message });
		}
	}
	useEffect(()=>{
		checkAuth();
	},[])
	return (
		<div>
			<header className='flex items-center justify-between bg-white border-b border-secondary-200 shadow-sm px-4 py-3'>
				<div className='flex items-center gap-5 flex-1 min-w-0'>
					<NavLink to='/'><h3 className='text-3xl font-bold text-primary-600'>MarketPlace</h3></NavLink>

					<div className='flex items-center gap-3 w-full max-w-5xl'>
						{/* Location input */}
						<div className='relative'>
							<span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 text-[20px]'>location_on</span>
							<input
								type='text'
								aria-label='Products near your location'
								placeholder='Products near you...'
								className='w-56 sm:w-64 bg-white pl-10 pr-3 py-2 border border-secondary-300 rounded-lg shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500'
							/>
						</div>

						{/* Product search (long) */}
						<div className='relative flex-1 min-w-0'>
							<span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 text-[20px]'>search</span>
							<input
								type='text'
								aria-label='Search products'
								placeholder='Search products...'
								className='w-full bg-white pl-10 pr-3 py-2 border border-secondary-300 rounded-lg shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500'
							/>
						</div>
					</div>
				</div>

				<div className='flex items-center gap-3'>
					<NavLink to='/sell'><button className='inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>Sell</button></NavLink>
					{isLoggedIn ? (
						<>
						<NavLink to='/profile'>
							<button className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 '>
								<span className='material-symbols-outlined text-[20px]'>person</span>
							</button>
						</NavLink>
						<button 
							onClick={handleLogOut}
							className='inline-flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-red-700 shadow-sm hover:bg-red-100 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500'
						>
							<span className='material-symbols-outlined text-[18px]'>logout</span>
							Logout
						</button>
						</>
					):(
						<>
						<NavLink to='/login'><button className='inline-flex items-center rounded-md border border-secondary-300 bg-white px-4 py-2 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none'>Login</button></NavLink>
						<NavLink to='/register'><button className='inline-flex items-center rounded-md border border-secondary-300 bg-white px-4 py-2 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none'>Register</button></NavLink>
						</>
					)}
				</div>
			</header>
			<main className='bg-slate-50 '>
				<Outlet/>
			</main>
		</div>
	)
}