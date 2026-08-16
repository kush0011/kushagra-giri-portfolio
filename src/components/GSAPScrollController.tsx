import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const GSAPScrollController: React.FC = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Top Scroll Progress Bar Animation
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    }

    // 2. Refresh ScrollTrigger after DOM load
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // 3. Staggered GSAP scroll reveal for components with data-gsap="fade-up"
    const fadeElements = document.querySelectorAll('[data-gsap="fade-up"]');
    fadeElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // 4. Project card staggered reveal
    const projectCards = document.querySelectorAll('.gsap-project-card');
    if (projectCards.length > 0) {
      gsap.fromTo(
        projectCards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // 5. Skill tags pop animation
    const skillTags = document.querySelectorAll('.gsap-skill-tag');
    if (skillTags.length > 0) {
      gsap.fromTo(
        skillTags,
        { opacity: 0, scale: 0.7, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Sleek Fixed Neon GSAP Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-teal-300 origin-left shadow-[0_0_12px_rgba(56,189,248,0.8)] scale-x-0"
        />
      </div>
    </>
  );
};
