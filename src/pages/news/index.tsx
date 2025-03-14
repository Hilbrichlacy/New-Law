import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const NewsPage: React.FC = () => {
  const featuredArticle = {
    title: 'Haryawn Advises on Record-Breaking M&A Deal',
    excerpt: 'Firm represents leading technology company in $50B acquisition, marking the largest tech M&A transaction of 2024.',
    image: '/news/featured-article.jpg',
    category: 'Deals & Cases',
    date: 'March 15, 2024',
    link: '/news/record-breaking-m-a-deal',
  };

  const newsItems = [
    {
      title: 'New Partner Joins Global Corporate Practice',
      excerpt: 'Experienced M&A attorney brings expertise in cross-border transactions.',
      category: 'Firm News',
      date: 'March 10, 2024',
      link: '/news/new-partner-joins',
    },
    {
      title: 'Client Alert: Recent Changes in Securities Regulations',
      excerpt: 'Analysis of new SEC rules and their impact on public companies.',
      category: 'Client Alerts',
      date: 'March 8, 2024',
      link: '/news/securities-regulations-update',
    },
    {
      title: 'Latham Recognized as Top Law Firm for Pro Bono Work',
      excerpt: 'Firm receives prestigious award for commitment to public service.',
      category: 'Awards & Recognition',
      date: 'March 5, 2024',
      link: '/news/pro-bono-award',
    },
    {
      title: 'Webinar: Navigating International Trade Law',
      excerpt: 'Join our experts for a discussion on recent developments in global trade.',
      category: 'Events',
      date: 'March 3, 2024',
      link: '/news/trade-law-webinar',
    },
  ];

  return (
    <>
      <Head>
        <title>News & Insights - Haryawn</title>
        <meta name="description" content="Stay updated with the latest news, insights, and legal developments from Haryawn." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="/images/news/hero.jpg"
            alt="News & Insights"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">News & Insights</h1>
            <p className="text-xl md:text-2xl">
              Latest updates, analysis, and legal developments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-lg overflow-hidden"
          >
            <Image
              src="/images/news/featured-article.jpg"
              alt={featuredArticle.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-primary-600 px-3 py-1 rounded-full text-sm">
                  {featuredArticle.category}
                </span>
                <span className="text-sm">{featuredArticle.date}</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{featuredArticle.title}</h2>
              <p className="text-lg mb-6">{featuredArticle.excerpt}</p>
              <Link
                href={featuredArticle.link}
                className="inline-block bg-white text-gray-900 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Read More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  <Link
                    href={item.link}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for the latest legal insights and firm updates
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewsPage; 