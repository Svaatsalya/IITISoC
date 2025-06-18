import React, { useRef, useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Modal from 'react-modal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import 'keen-slider/keen-slider.min.css';

gsap.registerPlugin(ScrollTrigger);
Modal.setAppElement('#root');

const images = [
  '/Portfolio1.png',
  '/Portfolio2.png',
  '/Portfolio3.png',
  '/Portfolio4.png',
  '/Portfolio5.png',
  '/Portfolio6.png',
];

export default function ImageSlider() {
  const sectionRef = useRef(null);
  const [modalImage, setModalImage] = useState(null);
  const intervalRef = useRef(null);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1.2,
      spacing: 24,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2.2, spacing: 28 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3.2, spacing: 32 },
      },
    },
    created(sliderInstance) {
      gsap.fromTo(
        '.keen-slider__slide',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Auto-slide every 3s (faster)
      intervalRef.current = setInterval(() => {
        if (sliderInstance) {
          sliderInstance.next();
        }
      }, 3000);
    },
  });

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-[#1a002f] to-[#0c0015] py-28 px-4 sm:px-6 lg:px-10 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-5xl font-extrabold mb-16 text-white drop-shadow-lg">
           Portfolio Highlights
        </h2>

        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {images.map((src, index) => (
              <div
                key={index}
                className="keen-slider__slide cursor-pointer group rounded-3xl overflow-hidden shadow-md transform transition-transform duration-500 hover:scale-[1.02]"
                onClick={() => setModalImage(src)}
              >
                <div className="relative w-full h-72 md:h-80 lg:h-[26rem]">
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="absolute inset-y-0 left-2 flex items-center z-10">
            <button
              onClick={() => slider.current?.prev()}
              className="bg-purple-700/30 hover:bg-purple-700/60 p-3 rounded-full shadow-md"
            >
              <ChevronLeft className="text-purple-200 w-6 h-6" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center z-10">
            <button
              onClick={() => slider.current?.next()}
              className="bg-purple-700/30 hover:bg-purple-700/60 p-3 rounded-full shadow-md"
            >
              <ChevronRight className="text-purple-200 w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal View */}
        <Modal
          isOpen={!!modalImage}
          onRequestClose={() => setModalImage(null)}
          className="fixed inset-0 flex items-center justify-center p-4 bg-black/90"
          overlayClassName="fixed inset-0 bg-purple-900/60 backdrop-blur-sm"
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 z-10 p-2 bg-purple-800/40 hover:bg-purple-800/60 rounded-full"
            >
              <X className="text-white" />
            </button>
            <img
              src={modalImage}
              alt="Modal View"
              className="w-full max-h-[85vh] object-contain rounded-xl border border-purple-600 shadow-2xl"
            />
          </div>
        </Modal>
      </div>
    </section>
  );
}
