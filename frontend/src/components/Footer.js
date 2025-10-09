import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-200 dark:bg-gray-900 dark:text-white pt-10 pb-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Shop Name</h3>
            <p className="mb-4">Your one-stop destination for quality products at affordable prices.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/products" className="hover:underline">Products</Link></li>
              <li><Link to="/cart" className="hover:underline">Cart</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/electronics" className="hover:underline">Electronics</Link></li>
              <li><Link to="/category/clothing" className="hover:underline">Clothing</Link></li>
              <li><Link to="/category/home" className="hover:underline">Home & Kitchen</Link></li>
              <li><Link to="/category/books" className="hover:underline">Books</Link></li>
              <li><Link to="/category/toys" className="hover:underline">Toys & Games</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="mb-2">123 Shopping Street</p>
            <p className="mb-2">City, State 12345</p>
            <p className="mb-2">Phone: (123) 456-7890</p>
            <p className="mb-2">Email: info@shopname.com</p>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-6">
          <p className="text-center">&copy; {new Date().getFullYear()} Shop Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
