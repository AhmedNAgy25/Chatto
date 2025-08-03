const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 flex-col justify-center items-center p-8 lg:p-12 xl:p-16 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-indigo-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 text-center max-w-md">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <svg
              className="w-12 h-12 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-200">
          {title}
        </h2>
        <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-12 flex justify-center space-x-4">
          <div className="w-3 h-3 bg-blue-400/50 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-purple-400/50 rounded-full animate-pulse delay-300"></div>
          <div className="w-3 h-3 bg-indigo-400/50 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
