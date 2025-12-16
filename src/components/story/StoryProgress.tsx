import React, { useEffect, useState } from 'react';

interface StoryProgressProps {
  sections: { id: string; label: string }[];
  className?: string;
}

export default function StoryProgress({ sections, className = '' }: StoryProgressProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId) {
            setActiveSection(sectionId);
            setIsVisible(true);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = document.querySelector(`[data-section-id="${section.id}"]`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const currentLabel = sections.find((s) => s.id === activeSection)?.label || '';

  return (
    <div
      className={`
        fixed bottom-6 right-6 
        hidden lg:block
        transition-opacity duration-500
        ${isVisible && currentLabel ? 'opacity-100' : 'opacity-0'}
        pointer-events-none
        ${className}
      `}
    >
      <span className="text-xs uppercase tracking-wider text-steam-muted font-heading">
        {currentLabel}
      </span>
    </div>
  );
}
