import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutPage: React.FC = () => {
  const timeline = [
    {
      year: '1934',
      title: 'Firm Founded',
      description: 'Haryawn was established in Los Angeles, California.',
    },
    {
      year: '1960',
      title: 'First International Office',
      description: 'Opened our first international office in London.',
    },
    {
      year: '1990',
      title: 'Global Expansion',
      description: 'Expanded operations across Europe and Asia.',
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Launched innovative legal tech solutions and virtual services.',
    },
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'Delivering the highest quality legal services with precision and dedication.',
      icon: '⭐',
    },
    {
      title: 'Integrity',
      description: 'Maintaining the highest standards of professional ethics and conduct.',
      icon: '⚖️',
    },
    {
      title: 'Innovation',
      description: 'Embracing new technologies and approaches to legal practice.',
      icon: '💡',
    },
    {
      title: 'Diversity',
      description: 'Fostering an inclusive environment that values different perspectives.',
      icon: '🌍',
    },
  ];

  const leadership = [
    {
      name: 'John Smith',
      title: 'Global Chair',
      image: '/images/leadership/john-smith.jpg',
      bio: 'Over 25 years of experience in corporate law and strategic leadership.',
    },
    {
      name: 'Sarah Johnson',
      title: 'Managing Partner',
      image: '/images/leadership/sarah-johnson.jpg',
      bio: 'Expert in international transactions and cross-border operations.',
    },
    {
      name: 'Michael Chen',
      title: 'Executive Partner',
      image: '/images/leadership/michael-chen.jpg',
      bio: 'Specialist in technology and innovation in legal services.',
    },
  ];

  return (
    <>
      <Head>
        <title>About Us - Haryawn</title>
        <meta name="description" content="Learn about Haryawn's history, values, and leadership team." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="/images/about/hero.jpg"
            alt="About Haryawn"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl md:text-2xl">
              A global law firm with a legacy of excellence and innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Firm History */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Our History</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-24 text-2xl font-bold text-primary-600">
                  {item.year}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-600 mb-3">{member.title}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage; 