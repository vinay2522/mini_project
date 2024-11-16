import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const GalleryItem = ({ src, alt }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative group overflow-hidden rounded-lg shadow-md"
  >
    <img src={src} alt={alt} className="w-full h-64 object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-white text-lg font-semibold">{alt}</p>
    </div>
  </motion.div>
);

const Gallery = () => {
  const { t } = useTranslation();

  const images = [
    { src: "https://via.placeholder.com/400x300?text=Ambulance+1", alt: t('gallery.image1') },
    { src: "https://via.placeholder.com/400x300?text=Ambulance+2", alt: t('gallery.image2') },
    { src: "https://via.placeholder.com/400x300?text=Emergency+Response", alt: t('gallery.image3') },
    { src: "https://via.placeholder.com/400x300?text=Medical+Equipment", alt: t('gallery.image4') },
    { src: "https://via.placeholder.com/400x300?text=Paramedic+Team", alt: t('gallery.image5') },
    { src: "https://via.placeholder.com/400x300?text=Hospital+Transfer", alt: t('gallery.image6') },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="section-title text-center mb-12">{t('gallery.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <GalleryItem key={index} {...image} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;