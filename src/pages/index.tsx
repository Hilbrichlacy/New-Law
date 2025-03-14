import React, { useEffect } from 'react';
import Head from 'next/head';
import Newsletter from '../components/Newsletter';
import Testimonials from '../components/Testimonials';
import OfficeMap from '../components/OfficeMap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGavel, FaBalanceScale, FaHandshake, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Add scroll-based animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Haryawn - Global Law Firm</title>
        <meta name="description" content="Haryawn is a global law firm providing comprehensive legal services across various practice areas." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="/images/home/hero.jpg"
          alt="Haryawn Office"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black bg-opacity-50"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Excellence in Legal Services
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Global Solutions for Complex Legal Challenges
          </p>
          <Link href="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg transition-colors"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '1000+', label: 'Clients Served' },
              { number: '50+', label: 'Countries' },
              { number: '500+', label: 'Attorneys' },
              { number: '25+', label: 'Practice Areas' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Practice Areas
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaGavel className="w-8 h-8" />, title: 'Corporate Law', description: 'Comprehensive legal solutions for businesses' },
              { icon: <FaBalanceScale className="w-8 h-8" />, title: 'Litigation', description: 'Expert representation in complex cases' },
              { icon: <FaHandshake className="w-8 h-8" />, title: 'Real Estate', description: 'Property and development expertise' },
              { icon: <FaChartLine className="w-8 h-8" />, title: 'Intellectual Property', description: 'Protecting your innovations' }
            ].map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-blue-600 mb-4">{area.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Latest News
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={`/images/news/news-${item}.jpg`}
                  alt={`News ${item}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Important Legal Development {item}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Stay informed about the latest legal developments and their impact on your business.
                  </p>
                  <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Read More →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Office Map Section */}
      <OfficeMap />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Contact Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-xl mb-8">
            Let us help you with your legal needs. Contact us today.
          </p>
          <Link href="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default HomePage; 