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
    renderMode: 'performance',
    slides: {
      perView: 1.1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 20 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 24 },
      },
    },
    created(sliderInstance) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
          },
        }
      );

      intervalRef.current = setInterval(() => {
        if (sliderInstance) sliderInstance.next();
      }, 2500);
    },
  });

  useEffect(() => {
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-[#471172] to-[#551b82] py-20 px-4 sm:px-6 lg:px-10 text-white "
    >
      <div className="max-w-6xl mx-auto ">
        <h2 className="text-center text-4xl font-bold mb-14 text-white">
          🌟 Portfolio Highlights
        </h2>

        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {images.map((src, index) => (
              <div
                key={index}
                className="keen-slider__slide group rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
                onClick={() => setModalImage(src)}
              >
                <img
                  src={src}
                  loading="lazy"
                  alt={`Slide ${index + 1}`}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 left-3 flex items-center z-10">
            <button
              onClick={() => slider.current?.prev()}
              className="bg-purple-700/30 hover:bg-purple-700/60 p-2 rounded-full"
            >
              <ChevronLeft className="text-purple-200 w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-3 flex items-center z-10">
            <button
              onClick={() => slider.current?.next()}
              className="bg-purple-700/30 hover:bg-purple-700/60 p-2 rounded-full"
            >
              <ChevronRight className="text-purple-200 w-5 h-5" />
            </button>
          </div>
        </div>

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
              className="w-full max-h-[85vh] object-contain rounded-xl border border-purple-600 shadow-xl"
            />
          </div>
        </Modal>
      </div>
    </section>
  );
}
