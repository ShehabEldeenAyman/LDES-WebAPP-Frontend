const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <span className="block text-sm">&copy; 2026 DataViz Platform. All rights reserved.</span>
      </div>
      <div className="flex space-x-6 text-sm">
        <a href="#" className="hover:text-white transition">Privacy</a>
        <a href="#" className="hover:text-white transition">Terms</a>
        <a href="#" className="hover:text-white transition">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer