import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 text-center text-gray-600">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left: Company Info */}
        <div>
          <p className="text-sm">&copy; Job Portal 2024. All rights reserved.</p>
        </div>

        {/* Right: Links */}
        <div className="space-x-6">
          <a href="/about" className="hover:text-blue-600 text-sm">
            About Us
          </a>
          <a href="/contact" className="hover:text-blue-600 text-sm">
            Contact
          </a>
          <a href="/terms" className="hover:text-blue-600 text-sm">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:text-blue-600 text-sm">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
