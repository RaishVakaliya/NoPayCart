import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const socialButtons = [
    {
      icon: <FaFacebook size={20} />,
      color: 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300',
      label: 'Facebook',
    },
    {
      icon: <FaTwitter size={20} />,
      color: 'text-blue-400 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300',
      label: 'Twitter',
    },
    {
      icon: <FaInstagram size={20} />,
      color: 'text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300',
      label: 'Instagram',
    },
    {
      icon: <FaLinkedin size={20} />,
      color: 'text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300',
      label: 'LinkedIn',
    },
  ];

  return (
    <footer className="bg-slate-200 dark:bg-gray-900 dark:text-slate-300 pt-10 pb-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">NoPayCart</h3>
            <p className="mb-4">Your one-stop destination for quality products at affordable prices.</p>
            <div className="flex space-x-4">
              {socialButtons.map((btn, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={btn.label}
                  onClick={() => console.log(`${btn.label} clicked`)} // you can replace this with real link navigation
                  className={`${btn.color} transition-colors duration-200`}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/cart" className="hover:underline">Cart</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/product-category?category=mobiles" className="hover:underline">Mobile</Link></li>
              <li><Link to="/product-category?category=camera" className="hover:underline">Camera</Link></li>
              <li><Link to="/product-category?category=trimmers" className="hover:underline">Trimmer</Link></li>
              <li><Link to="/product-category?category=Mouses" className="hover:underline">Mouse</Link></li>
              <li><Link to="/product-category?category=watches" className="hover:underline">Watch</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="mb-2">Shopping Street, Main Road</p>
            <p className="mb-2">Ban, Kar 859426</p>
            <p className="mb-2">Phone: (843) 591-4388</p>
            <p className="mb-2">Email: info@nopaycart.com</p>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-6">
          <p className="text-center">&copy; {new Date().getFullYear()} NoPayCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
