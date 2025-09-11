import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { MapPin, Phone, Mail, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F1117] text-white pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-gray-700">

        {/* Brand Info */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-purple-400">
            <BookOpen size={24} className="text-purple-400" />
            Campus<span className="text-orange-400">Prep</span>
          </h2>
          <p className="text-sm mt-3 text-gray-300">
            Your one-stop platform for campus placement preparation, company info, and interview resources.
          </p>
          <div className="flex mt-4 space-x-4 text-xl text-gray-400">
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaGithub className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">Home</a></li>
            <li><a href="#">Companies</a></li>
            <li><a href="#">Interview Questions</a></li>
            <li><a href="#">Placement Updates</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </div>

        {/* Top Companies */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Top Companies</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Deloitte</li>
            <li>Lumen</li>
            <li>CoForge</li>
            <li>Sopra steria</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-1 text-purple-300" />
              QIS Group Of Institutions,<br />Vegamukkapalem, Andhra Pradesh, 523272
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-purple-300" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-purple-300" />
              contact@campusprep.edu
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      {/* Bottom Section */}
      <div className="text-sm text-gray-400 py-6 px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-3 md:gap-0">
        <p className="text-center md:text-left">© 2025 CampusPrep. All rights reserved.</p>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
