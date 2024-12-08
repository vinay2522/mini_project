import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaPhoneAlt, FaTimes } from 'react-icons/fa';

const HospitalCard = ({ image, name, location, contact, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer"
    onClick={onClick}
  >
    <img src={image} alt={name} className="w-full h-40 sm:h-48 object-cover mb-4 rounded-lg" />
    <h3 className="text-lg sm:text-xl font-semibold mb-2">{name}</h3>
    <p className="mb-2 text-sm sm:text-base">
      <FaMapMarkerAlt className="inline-block mr-2" />
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`} target="_blank" rel="noopener noreferrer">
        {location}
      </a>
    </p>
    <p className="text-sm sm:text-base">
      <FaPhoneAlt className="inline-block mr-2" />
      <a href={`tel:${contact}`}>{contact}</a>
    </p>
  </motion.div>
);

const HospitalDetails = ({ hospital, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-90vh overflow-y-auto">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <FaTimes size={24} />
      </button>
      <img src={hospital.image} alt={hospital.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
      <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>
      <p className="mb-2 text-sm sm:text-base">
        <FaMapMarkerAlt className="inline-block mr-2" />
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.location)}`} target="_blank" rel="noopener noreferrer">
          {hospital.location}
        </a>
      </p>
      <p className="text-sm sm:text-base">
        <FaPhoneAlt className="inline-block mr-2" />
        <a href={`tel:${hospital.contact}`}>{hospital.contact}</a>
      </p>
    </div>
  </div>
);

const Hospitals = () => {
  const { t } = useTranslation();
  const [selectedHospital, setSelectedHospital] = useState(null);

  const hospitals = [
    {
      image: 'https://mbbscouncilcdn.s3.amazonaws.com/wp-content/uploads/2017/04/District-Hospital-Tumakuru-1.jpg',
      name: 'District Hospital Tumkur',
      location: 'District Hospital, B H Road (NH206), Ward No. 18, Tumakuru, Karnataka 572101',
      contact: '0916 419 7557'
    },
    {
      image: 'https://smcri.edu.in/images/smcri-3.webp',
      name: 'Sri Siddaganga Institute of Medical and Nursing Hospital',
      location: 'Tumkur Road, Tumkur University, Ss Puram, Tumakuru, Karnataka 572102',
      contact: ' 0816-2602222'
    },
    {
      image: 'https://th.bing.com/th/id/OLC.yfGjdlgjfBQAVA480x360?&rs=1&pid=ImgDetMain',
      name: 'Aruna Hospital',
      location: 'Dr S Radhakrishna Road, S.s Puram, Tumkur, Karnataka, Karnataka 572102 ',
      contact: '0816 227 6408'
    },
    {
      image: 'https://doctorlistingingestionpr.blob.core.windows.net/doctorprofilepic/1670556748739_HospitalProfileImage_Vinayaka%20Hospital_Profile1.jpg',
      name: 'Vinayaka Hospital',
      location: 'Opposite Govt College, Tumkur, Karnataka 572103 ',
      contact: '0816 225 4231'
    },
    {
      image: 'https://th.bing.com/th/id/OLC.D6iMHjIplmnppA480x360?&rs=1&pid=ImgDetMain',
      name: 'B Siddaramanna Hospital',
      location: 'Opp IB Railway Stationgandhinagar, Tumkur, Karnataka 572102 ',
      contact: '0944 829 7736'
    },
    {
      image: 'https://th.bing.com/th/id/OIP.7IpDhFeoXv8UqBp7pM-Z_QAAAA?rs=1&pid=ImgDetMain',
      name: 'Pragathi Hospital',
      location: 'Coffee Board Colony, S.s.Puram, Tumakuru, Karnataka 572102, India, Tumkur, Karnataka 572102',
      contact: '0816 227 3434'
    },
    {
      image: 'https://bpprodstorage.blob.core.windows.net/bpblobcontainer/5069373/images/81fbdf2b-d4ad-4a2a-ae9b-d3e5233e350fXQKDRRbqUdVTW3FqhVCXEwWE16wgVpt2p43bY1jwuvrNMxm4LJLyqSV59ChWgHEcr1V5eDSPg36_fH9-=s0.Jpeg',
      name: 'Kasturba Hospital - Tumkur',
      location: 'SS Puram Main Road, S.S.Puram, Tumakuru, Karnataka 572102',
      contact: '0816 402 1011'
    }
    // Add more hospitals here
  ];


  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('Hospitals')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {hospitals.map((hospital, index) => (
          <HospitalCard
            key={index}
            {...hospital}
            onClick={() => setSelectedHospital(hospital)}
          />
        ))}
      </div>
      {selectedHospital && (
        <HospitalDetails
          hospital={selectedHospital}
          onClose={() => setSelectedHospital(null)}
        />
      )}
    </div>
  );
};

export default Hospitals;

