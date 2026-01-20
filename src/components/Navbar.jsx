const Navbar = () => (
  <nav className="bg-slate-900 text-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <div className="flex-shrink-0 font-bold text-xl tracking-wider text-blue-400">
          DataViz
        </div>
        
        {/* Navigation Links (Hidden on small mobile, visible on larger) */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            {['Dashboard', 'Analytics', 'Reports', 'Settings'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        
        {/* Mobile Menu Button Placeholder */}
        <div className="-mr-2 flex md:hidden">
          <button className="bg-slate-800 p-2 rounded-md hover:text-white hover:bg-slate-700">
            <span className="sr-only">Open main menu</span>
            {/* Simple hamburger icon svg */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;