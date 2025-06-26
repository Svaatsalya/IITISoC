import React, { useEffect, useRef } from 'react';
import { CheckCircle, Megaphone, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Easy Form',
    description: '✅ Fill out a simple form — we handle the design.',
    icon: <CheckCircle className="text-purple-500" size={28} />,
  },
  {
    title: 'Showcase Yourself',
    description: '✅ Showcase your skills, projects, and social links.',
    icon: <CheckCircle className="text-yellow-500" size={28} />,
  },
  {
    title: 'Live Preview',
    description: '✅ See real-time previews as you build.',
    icon: <CheckCircle className="text-green-500" size={28} />,
  },
  {
    title: 'Instant Publish',
    description: '✅ Instantly publish with a custom shareable link.',
    icon: <CheckCircle className="text-blue-500" size={28} />,
  },
  {
    title: 'No Hassle',
    description: '📣 Why struggle with templates or expensive designers?',
    icon: <Megaphone className="text-red-500" size={28} />,
  },
  {
    title: 'Global Reach',
    description: '✅ Your portfolio looks great on any device, anywhere.',
    icon: <Globe className="text-cyan-500" size={28} />,
  },
];

export default function About() {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="About bg-black text-white py-16 px-6 mt-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Build Smarter, Not Harder with Instant Portfolio Builder
        </h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-400">
          With Instant Portfolio Builder, you get a sleek, responsive personal website in minutes. Whether you're a developer, student, or professional — your work deserves to shine online.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left shadow-lg hover:shadow-purple-500/20 transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button className="bg-purple-600 hover:bg-purple-900 text-white font-semibold py-3 px-6 rounded-xl transition">
            Start Building Your Brand Today
          </button>
        </div>
      </div>
    </section>
  );
}
