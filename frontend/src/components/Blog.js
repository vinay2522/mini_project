import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Section from './Section';
import { useTheme } from '../context/ThemeContext';

const BlogPost = ({ title, date, author, excerpt }) => {
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  return (
    <motion.div
      className={`p-6 bg-${darkMode ? 'gray-800 text-white' : 'white text-black'} rounded-md shadow-md`}
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="text-sm text-gray-600 flex items-center gap-4 mb-4">
        <FaCalendar /> {date} <FaUser /> {author}
      </div>
      <p className="mb-4">{excerpt}</p>
      <a className="text-blue-500 underline">{t('blog.readMore')}</a>
    </motion.div>
  );
};

const Blog = () => {
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  const blogPosts = [
    {
      title: t('blog.post1'),
      date: "2023-05-15",
      author: "Dr. John Doe",
      excerpt: t('blog.post1.excerpt'),
    },
    {
      title: t('blog.post2'),
      date: "2023-04-28",
      author: "Jane Smith",
      excerpt: t('blog.post2.excerpt'),
    },
    {
      title: t('blog.post3'),
      date: "2023-04-10",
      author: "Mike Johnson",
      excerpt: t('blog.post3.excerpt'),
    },
  ];

  return (
    <Section title={t('blog.title')} id="blog">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <BlogPost key={index} {...post} />
        ))}
      </div>
    </Section>
  );
};

export default Blog;
