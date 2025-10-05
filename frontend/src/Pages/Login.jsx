import { useState } from 'react';
import {Link} from 'react-router-dom'
export default function Login() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [errors, setErrors] = useState({});
   const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit=(e)=>{
    e.preventDefault();
    //store username and pass, then verify it and if it is correct redirect it to Dashboard page.
  }
  return (
    <div className='h-screen'>
      <main
        id="main-content"
        className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-secondary-900">
              Sign in to your account
            </h1>
            <p className="mt-2 text-center text-sm text-secondary-600">
              Or{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                create a new account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-secondary-700"
                >
                  UserName
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.username ? 'border-red-300' : 'border-secondary-300'} rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                    aria-invalid={errors.username ? 'true' : 'false'}
                    aria-describedby={errors.username ? 'username-error' : undefined}
                  />
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600" id="username-error">
                      <span className="flex items-center">
                        {errors.username}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-secondary-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-secondary-300'} rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm pr-10`}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    aria-describedby={
                      errors.password ? 'password-error' : undefined
                    }
                  />
                  {errors.password && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="password-error"
                    >
                      <span className="flex items-center">
                        {errors.password}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-secondary-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
