"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/constants";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { LiaTimesSolid } from "react-icons/lia";
import TryAiAdvisorButton from "@/components/common/TryAiAdvisorButton";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Helper function to check if a route is active
  const isActiveRoute = (href: string): boolean => {
    if (href === pathname) return true;
    // For Services parent link, check if current path starts with /services
    if (href === ROUTES.SERVICES && pathname.startsWith('/services')) {
      return true;
    }
    // For exact matches
    return pathname === href;
  };

  // Check if Services dropdown should show as active
  const isServicesActive = pathname.startsWith('/services');

  const navLinks = [
    { label: "About Us", href: ROUTES.ABOUT_US },
    {
      label: "Services",
      href: ROUTES.SERVICES,
      hasDropdown: true
    },
    { label: "Business Quest", href: ROUTES.BUSINESS_QUEST },
    { label: "Contact", href: ROUTES.CONTACT },
    { label: "Blog", href: ROUTES.BLOG },
    { label: "Join the waitlist", href: ROUTES.JOIN_THE_WAITLIST },
  ];

  const serviceItems = [
    {
      label: "Business Development",
      href: ROUTES.SERVICES_BUSINESS_DEVELOPMENT,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Brand Management",
      href: ROUTES.SERVICES_BRAND_MANAGEMENT,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 12L17 7L12 10L7 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Capacity Building",
      href: ROUTES.SERVICES_CAPACITY_BUILDING,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Marketing Consulting",
      href: ROUTES.SERVICES_MARKETING_CONSULTING,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M7 8H17M7 12H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Trade & Investment Facilitation",
      href: ROUTES.SERVICES_TRADE_INVESTMENT,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">

      {/* Main Navigation Bar */}
      <div className="bg-black/80 backdrop-blur-md px-4 md:px-6 py-2 shadow-lg">
        <div className="max-width-container mx-auto flex items-center justify-between">
          <section className="flex items-center gap-12">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className=" rounded-lg p-2 md:p-3 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 shrink-0">
                <Image
                  src={icons.logo}
                  alt="Brand Locus Logo"
                  width={60}
                  height={60}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link, index) => (
                <div
                  key={link.href || index}
                  className="relative group"
                  onMouseEnter={() => link.hasDropdown && setIsServicesOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setIsServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "relative text-white text-sm font-medium hover:text-gray-300 transition-colors flex items-center gap-1 px-2 py-1.5 rounded-md",
                      isActiveRoute(link.href) && "text-white font-semibold"
                    )}
                  >
                    {/* Active indicator underline */}
                    {isActiveRoute(link.href) && (
                      <motion.div
                        layoutId="activeNavLink"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {link.hasDropdown && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={cn(
                          "transition-transform duration-200 shrink-0",
                          isServicesOpen && "rotate-180",
                          isServicesActive && "text-white"
                        )}
                      >
                        <path
                          d="M2 4L6 8L10 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>
                  {link.hasDropdown && (
                    <div className={cn(
                      "absolute top-full left-0 w-full h-2",
                      !isServicesOpen && "pointer-events-none"
                    )} />
                  )}
                  <AnimatePresence>
                    {link.hasDropdown && isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 bg-black backdrop-blur-md border border-white/20 rounded-lg p-2 min-w-[320px]"
                      >
                        {serviceItems.map((service) => {
                          const isActive = pathname === service.href;
                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              className={cn(
                                "relative flex items-center gap-3 px-4 py-3 text-white text-sm rounded-lg transition-colors group",
                                isActive
                                  ? "bg-white/15 text-white"
                                  : "hover:bg-white/10"
                              )}
                              onClick={() => setIsServicesOpen(false)}
                            >
                              {/* Active indicator bar */}
                              {isActive && (
                                <motion.div
                                  layoutId="activeServiceLink"
                                  className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                                  initial={false}
                                  transition={{
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 30
                                  }}
                                />
                              )}
                              {/* Icon */}
                              <div className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 transition-colors",
                                isActive ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"
                              )}>
                                {service.icon}
                              </div>
                              {/* Service Name */}
                              <span className={cn(
                                "flex-1",
                                isActive ? "font-semibold" : "font-medium"
                              )}>
                                {service.label}
                              </span>
                              {/* Arrow */}
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-white/60 group-hover:text-white transition-colors shrink-0"
                              >
                                <path
                                  d="M6 12L10 8L6 4"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Button - Desktop */}
          <TryAiAdvisorButton className="hidden lg:inline-flex px-8 py-2 border border-gray-400 rounded-full text-white text-sm md:text-base hover:bg-white/10" />

          {/* Mobile Hamburger Menu */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <LiaTimesSolid size={35} /> : <HiOutlineMenuAlt3 size={35} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/80 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <div key={link.href || link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative block text-white text-base font-medium hover:text-gray-300 transition-colors py-2 px-3 rounded-md",
                      isActiveRoute(link.href) && "bg-white/10 text-white font-semibold"
                    )}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (!link.hasDropdown) setIsServicesOpen(false);
                    }}
                  >
                    {link.label}
                    {isActiveRoute(link.href) && (
                      <motion.div
                        layoutId="activeMobileNavLink"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30
                        }}
                      />
                    )}
                  </Link>
                  {/* Mobile Services Dropdown */}
                  {link.hasDropdown && (
                    <div className="mt-2 ml-4 space-y-2 border-l border-white/10 pl-4">
                      {serviceItems.map((service) => {
                        const isActive = pathname === service.href;
                        return (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={cn(
                              "relative flex items-center gap-3 py-2 px-3 text-white text-sm rounded-lg transition-colors",
                              isActive ? "bg-white/10 text-white font-semibold" : "hover:bg-white/10 hover:text-gray-300"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeMobileServiceLink"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                                initial={false}
                                transition={{
                                  type: "spring",
                                  stiffness: 380,
                                  damping: 30
                                }}
                              />
                            )}
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0",
                              isActive ? "bg-white/20" : "bg-white/5"
                            )}>
                              {service.icon}
                            </div>
                            <span className={cn(
                              "flex-1",
                              isActive ? "font-semibold" : "font-medium"
                            )}>
                              {service.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              <TryAiAdvisorButton className="w-full mt-4 px-4 py-3 border border-white rounded-lg text-white text-base hover:bg-white/10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
