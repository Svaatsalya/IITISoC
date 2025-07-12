import React, { useRef, useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import 'boxicons/css/boxicons.min.css';
import gsap from 'gsap';
import Modal from './Modal';
import AboutUs from './AboutUs';
import { landingPageStyles } from '../assets/dummystyle';
import ModalLS from '../components/ModalLS';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProfileInfoCard } from '../components/Cards';

const Header = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const menuRef = useRef(null);
    const backdropRef = useRef(null);
    const linksRef = useRef([]);

    const isOnDashboard = location.pathname.startsWith("/dashboard");

    useEffect(() => {
        document.body.style.overflow = showAbout ? 'hidden' : 'auto';
    }, [showAbout]);

    const openMenu = () => {
        setIsMenuOpen(true);
        const menu = menuRef.current;
        const backdrop = backdropRef.current;

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
            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate('/')}
            >
                <img src="/Logo3.png" alt="Logo" className="w-12 h-12 block md:hidden" />
                <h1 className="text-3xl font-bold hidden md:block text-white">Portofy</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10 text-white">
                <a
                    href="#"
                    className="hover:text-purple-300 transition"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowAbout(true);
                    }}
                >
                    ABOUT US
                </a>

                {/* ✅ FEATURES only visible if NOT on dashboard */}
                {!isOnDashboard && (
                    <a href="#features" className="hover:text-purple-300 transition">
                        FEATURES
                    </a>
                )}

             
            </nav>

            {/* Right Section: Auth or Dashboard/Home */}
            <div className="hidden md:flex items-center gap-5">
                {user ? (
                    <>
                        <button
                            className={landingPageStyles.desktopAuthButton}
                            onClick={() => navigate(isOnDashboard ? '/' : '/dashboard')}
                        >
                            <div className={landingPageStyles.desktopAuthButtonOverlay}></div>
                            <span className={landingPageStyles.desktopAuthButtonText}>
                                {isOnDashboard ? 'Home' : 'Dashboard'}
                            </span>
                        </button>
                        <ProfileInfoCard />
                    </>
                ) : (
                    <button
                        className={landingPageStyles.desktopAuthButton}
                        onClick={() => setOpenAuthModal(true)}
                    >
                        <div className={landingPageStyles.desktopAuthButtonOverlay}></div>
                        <span className={landingPageStyles.desktopAuthButtonText}>Get Started</span>
                    </button>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="md:hidden text-3xl text-white z-[999]">
                <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} transition-all duration-300`}></i>
            </button>

            {/* Backdrop */}
            {isMenuOpen && (
                <div
                    ref={backdropRef}
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm z-40"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    ref={menuRef}
                    className="fixed top-0 left-0 right-0 bg-[#1a1a1a] p-8 z-50 rounded-b-2xl shadow-2xl text-white"
                >
                    <nav className="flex flex-col items-center gap-6 mt-4">
                        <a
                            href="#"
                            ref={(el) => (linksRef.current[0] = el)}
                            className="text-lg hover:text-purple-300 transition-all"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowAbout(true);
                                closeMenu();
                            }}
                        >
                            ABOUT US
                        </a>

                        {/* ✅ FEATURES only on non-dashboard */}
                        {!isOnDashboard && (
                            <a
                                href="#features"
                                ref={(el) => (linksRef.current[1] = el)}
                                className="text-lg hover:text-purple-300 transition-all"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById('features');
                                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                                    closeMenu();
                                }}
                            >
                                FEATURES
                            </a>
                        )}

                     

                        {/* Mobile Auth / Dashboard Button */}
                        <div className="mt-4">
                            {user ? (
                                <button
                                    className={landingPageStyles.mobileDashboardButton}
                                    onClick={() => {
                                        navigate(isOnDashboard ? '/' : '/dashboard');
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    {isOnDashboard ? 'Home' : 'Dashboard'}
                                </button>
                            ) : (
                                <button
                                    className={landingPageStyles.mobileAuthButton}
                                    onClick={() => {
                                        setOpenAuthModal(true);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Get Started
                                </button>
                            )}
                        </div>
                    </nav>
                </div>
            )}

            <Modal show={showAbout} onClose={() => setShowAbout(false)}>
                <AboutUs />
            </Modal>

            <ModalLS
                isOpen={openAuthModal}
                onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage('login');
                }}
                hideHeader
            >
                <div>
                    {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
                    {currentPage === 'signup' && <SignUp setCurrentPage={setCurrentPage} />}
                </div>
            </ModalLS>
        </header>
    );
};

export default Header;
