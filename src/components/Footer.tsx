import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Haryawn</h3>
            <p className="text-gray-400">
              Your trusted partner in global legal solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="text-gray-400 hover:text-white">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white">
                  News
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/practice-areas/corporate" className="text-gray-400 hover:text-white">
                  Corporate Law
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/litigation" className="text-gray-400 hover:text-white">
                  Litigation
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/real-estate" className="text-gray-400 hover:text-white">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/tax" className="text-gray-400 hover:text-white">
                  Tax
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Legal Street</li>
              <li>New York, NY 10001</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@haryawn.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Haryawn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 