export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-screen">
      {/* Left Side - Branding + Value Prop */}
      <div className="relative xl:w-2/3 md:w-1/2 md:flex hidden flex-col justify-center items-center p-6 lg:p-12">
        {/* Optional - Background Gradient */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-900 via-indigo-600 to-indigo-500 pointer-events-none"></div>

        <h1 className="text-5xl font-extrabold mb-1">Welcome to Flock</h1>
        <p className="text-xl font-medium text-muted-foreground lg:text-center">
          Sign in to access your personalized visa & career roadmap.
        </p>
      </div>

      {children}
    </div>
  );
}
