import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
export default function RootLayout() {
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
								className='w-56 sm:w-64 bg-white pl-10 pr-3 py-2 border border-secondary-300 rounded-lg shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm'
							/>
						</div>

						{/* Product search (long) */}
						<div className='relative flex-1 min-w-0'>
							<span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 text-[20px]'>search</span>
							<input
								type='text'
								aria-label='Search products'
								placeholder='Search products...'
								className='w-full bg-white pl-10 pr-3 py-2 border border-secondary-300 rounded-lg shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm'
							/>
						</div>
					</div>
				</div>

				<div className='flex items-center gap-3'>
					<NavLink to='/sell'><button className='inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>Sell</button></NavLink>
					<NavLink to='/login'><button className='inline-flex items-center rounded-md border border-secondary-300 bg-white px-4 py-2 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>Login</button></NavLink>
					<NavLink to='/register'><button className='inline-flex items-center rounded-md border border-secondary-300 bg-white px-4 py-2 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>Register</button></NavLink>
				</div>
			</header>
			<main className='bg-slate-50 '>
				<Outlet/>
			</main>
		</div>
	)
}