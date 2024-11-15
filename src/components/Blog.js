import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const BlogPost = ({ title, date, author, excerpt }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="card p-6"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex items-center text-seva-gray text-sm mb-4">
        <FaCalendar className="mr-2" />
        <span className="mr-4">{date}</span>
        <FaUser className="mr-2" />
        <span>{author}</span>
      </div>
      <p className="mb-4">{excerpt}</p>
      <button className="text-seva-red dark:text-seva-blue hover:underline">
        {t('blog.readMore')}
      </button>
    </motion.div>
  );
};
const Blog = () => {
  const { t } = useTranslation();

  const blogPosts = [
    {
      title: t('blog.post1.title'),
      date: "2023-05-15",
      author: "Dr. John Doe",
      excerpt: t('blog.post1.excerpt'),
    },
    {
      title: t('blog.post2.title'),
      date: "2023-04-28",
      author: "Jane Smith",
      excerpt: t('blog.post2.excerpt'),
    },
    {
      title: t('blog.post3.title'),
      date: "2023-04-10",
      author: "Mike Johnson",
      excerpt: t('blog.post3.excerpt'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="section-title text-center mb-12">{t('blog.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <BlogPost key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;