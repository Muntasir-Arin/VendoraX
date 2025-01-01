import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-4">About VendoraX</h2>
            <p className="mb-4">
              VendoraX is your go-to platform for renting, buying, and selling products. We connect users with the best deals and ensure secure, seamless transactions every time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-orange-400 hover:text-orange-300">
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-orange-400 hover:text-orange-300">
                <span className="sr-only">X</span>
              </a>
              <a href="#" className="text-orange-400 hover:text-orange-300">
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Browse Products</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Post a Listing</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-orange-400" />
                <a href="mailto:support@vendorax.com" className="hover:text-orange-400 transition-colors">support@vendorax.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-orange-400" />
                <a href="tel:+1234567890" className="hover:text-orange-400 transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <MapPin size={20} className="mr-2 text-orange-400" />
                <span>456 Market Lane, CityVille, World</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Stay Connected</h2>
            <p className="mb-4">Join our community to receive updates on the latest listings, offers, and platform features. Subscribe to our newsletter today!</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border-orange-500 text-orange-100 placeholder-orange-300"
              />
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-black">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-orange-800 text-center">
          <p>&copy; {new Date().getFullYear()} VendoraX. All rights reserved. Empowering communities to rent, buy, and sell with confidence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
