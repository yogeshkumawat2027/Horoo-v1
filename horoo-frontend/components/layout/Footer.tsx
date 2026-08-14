"use client";

import Link from "next/link";
import Image from "next/image";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaBed,
  FaBuilding,
  FaUserFriends,
  FaHome,
  FaWarehouse,
  FaHotel,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const propertyCategories = [
    { name: "Rooms", href: "/rooms", icon: FaBed },
    { name: "Flats", href: "/flats", icon: FaBuilding },
    { name: "Hostels", href: "/hostels", icon: FaUserFriends },
    { name: "House", href: "/house", icon: FaHome },
    { name: "Commercials", href: "/commercials", icon: FaWarehouse },
    { name: "Hotel Rooms", href: "/hotels", icon: FaHotel },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    // { name: "Refund Policy", href: "/refund" },
  ];

  const ownerLinks = [
    { name: "List Your Property", href: "/list-rental" },
    // { name: "Owner Dashboard", href: "/owner/dashboard" },
    // { name: "Pricing Plans", href: "/owner/pricing" },
    { name: "Owner Guidelines", href: "/owner/guidelines" },
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-lg" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-12 gap-8">

          {/* Company Info */}
          <div className="flex-1 lg:max-w-sm">
            <div className="mb-6">
              <Image
                src="/logo/LogoOfHoroo.jpg"
                alt="Horoo Logo"
                width={120}
                height={40}
                className="mb-4"
              />

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Horoo is your trusted platform for finding the perfect
                accommodation. From rooms to commercial spaces, we connect
                property seekers with verified owners.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhone className="text-orange-500 flex-shrink-0" />

                <a
                  href="tel:+918279053200"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91 8279053200
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-orange-500 flex-shrink-0" />

                <a
                  href="mailto:horoobooking@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  horoobooking@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-orange-500 flex-shrink-0 mt-1" />

                <span className="text-gray-300 text-sm">
                  Kota, Rajasthan - 324010
                </span>
              </div>
            </div>
          </div>

          {/* Property Categories */}
          <div className="flex-1 lg:max-w-sm">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Property Categories
            </h3>

            <ul className="space-y-3">
              {propertyCategories.map((category) => {
                const IconComponent = category.icon;

                return (
                  <li key={category.name}>
                    <Link
                      href={category.href}
                      className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition-colors group"
                    >
                      <IconComponent className="text-sm group-hover:text-orange-500" />

                      <span className="text-sm">
                        {category.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links & Owner Section */}
          <div className="flex-1 lg:max-w-sm grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h3>

              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Owners */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                For Property Owners
              </h3>

              <ul className="space-y-3">
                {ownerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex-1 lg:max-w-sm">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Follow Us
            </h3>

            <p className="text-gray-300 text-sm mb-6">
              Connect with us on social media for the latest updates and
              property listings.
            </p>

            <div className="flex gap-3 mb-8">

              <a
                href="https://facebook.com/horoo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <FaFacebook className="text-lg" />
              </a>

              <a
                href="https://twitter.com/horoo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-400 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <FaTwitter className="text-lg" />
              </a>

              <a
                href="https://instagram.com/horoo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-pink-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <FaInstagram className="text-lg" />
              </a>

              <a
                href="https://linkedin.com/company/horoo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <FaLinkedin className="text-lg" />
              </a>

              <a
                href="https://wa.me/918279053200"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <FaWhatsapp className="text-lg" />
              </a>

            </div>

            {/* Additional Contact */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-2">
                Quick Contact
              </h4>

              <p className="text-gray-300 text-sm mb-2">
                Need immediate assistance?
              </p>

              <a
                href="tel:+918279053200"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <FaPhone className="text-xs" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <div className="text-gray-400 text-sm m-auto">
              © {currentYear} Horoo. All rights reserved. Made with ❤️ in
              India.
            </div>

            {/*
            <div className="flex flex-wrap gap-6 text-sm">
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Sitemap
              </Link>

              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>

              <Link
                href="/security"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Security
              </Link>

              <Link
                href="/careers"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Careers
              </Link>
            </div>
            */}

          </div>
        </div>
      </div>
    </footer>
  );
}