export default function Login() {
    return (
      <div className="flex flex-row h-screen">
        {/* Left Side - Branding + Value Prop */}
        <div className="relative w-[60rem] flex flex-col justify-center items-center p-12 space-y-8">
          <h1 className="text-4xl font-extrabold">welcome back to flock</h1>
          <p className="text-lg text-gray-400 max-w-md text-center leading-relaxed">
            Log in to access your personalized visa & career roadmap.
          </p>
          {/* Optional - Background Gradient */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-black pointer-events-none"></div>
        </div>
  
        {/* Right Side - Log In Form */}
        <div className="min-h-screen flex items-center justify-center flex-1">
          <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-lg border">
            <h1 className="text-3xl font-bold">Log In to Your Account</h1>
            <p className="text-gray-400">Welcome back! Enter your details below.</p>
  
            <form className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm text-gray-600">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-md px-4 py-2 placeholder-gray-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
  
              <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-md px-4 py-2 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
  
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-500 transition"
              >
                Log In
              </button>
            </form>
  
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <a href="/SignUp" className="text-blue-400 hover:underline">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
  