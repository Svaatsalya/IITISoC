import React, { useRef, useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import gsap from 'gsap';

const Header = () => {
  const menuRef = useRef(null);
  const backdropRef = useRef(null);
  const linksRef = useRef([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    const menu = menuRef.current;
    const backdrop = backdropRef.current;

    // Show container first
    setIsMenuOpen(true);

    // Animate elements
    setTimeout(() => {
      gsap.set(menu, { scale: 0.92, y: -50, opacity: 0 });
      gsap.set(linksRef.current, { opacity: 0, y: 20 });

      gsap.to(menu, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'elastic.out(1, 0.6)',
      });

      gsap.to(backdrop, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(linksRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, 50);
  };

  const closeMenu = () => {
    const menu = menuRef.current;
    const backdrop = backdropRef.current;

    // Animate out
    gsap.to(menu, {
      scale: 0.9,
      y: -30,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    });

    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setIsMenuOpen(false),
    });
  };

  const toggleMenu = () => {
    isMenuOpen ? closeMenu() : openMenu();
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 lg:px-20 z-50 relative">
      {/* Logo / Title */}
      <div className="flex items-center gap-3">
        <img src="/Logo3.png" alt="Logo" className="w-12 h-12 block md:hidden" />
        <h1
           data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500"  className="text-3xl font-bold hidden md:block text-white">Portofy</h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-10 text-white">
        <a href="#" className="hover:text-purple-300 transition">ABOUT US</a>
        <a href="#" className="hover:text-purple-300 transition">FEATURES</a>
        <a href="#" className="hover:text-purple-300 transition">TEMPLATES</a>
      </nav>
      <div className='flex items-center gap-5'>
      <button className="hidden md:block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">SIGN UP</button>
      <button className="hidden md:block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"> LOG IN</button>
      </div>
      {/* Toggle Button */}
      <button onClick={toggleMenu} className="md:hidden text-3xl text-white z-[999]">
        <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} transition-all duration-300`}></i>
      </button>

      {/* Backdrop Blur */}
      {isMenuOpen && (
        <div
          ref={backdropRef}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Animated Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 right-0 bg-[#1a1a1a] p-8 z-50 rounded-b-2xl shadow-2xl text-white"
        >
          <nav className="flex flex-col items-center gap-6 mt-4">
            {['ABOUT US', 'FEATURES', 'TEMPLATES'].map((item, index) => (
              <a
                key={item}
                href="#"
                ref={(el) => (linksRef.current[index] = el)}
                className="text-lg hover:text-purple-300 transition-all"
              >
                {item}
              </a>
            ))}
            <div className='flex items-center gap-4'>
              <button className="mt-4 bg-purple-600 hover:bg-purple-700 py-2 px-6 rounded-full transition-all">
              SIGN UP
            </button>
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 py-2 px-6 rounded-full transition-all">
              LOG IN
            </button>
            </div>
            
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;