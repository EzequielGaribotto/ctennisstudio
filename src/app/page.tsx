"use client";

import { useState, useEffect } from "react";
import ProfileSection from "../components/section/profile/ProfileSection";
import ProjectsSection from "../components/section/projects/ProjectsSection";
import ExperienceSection from "../components/section/experience/ExperienceSection";
import TrainingSection from "../components/section/training/TrainingSection";
import GamingSection from "../components/section/gaming/GamingSection";
import { useTranslation } from "../context/TranslationContext";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const { isHydrated } = useTranslation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add minimal opacity during hydration to avoid flicker
  const style = {
    width: '100%', 
    maxWidth: '100%',
    padding: isMobile ? '0.5rem 0' : '2rem',
    opacity: isHydrated ? 1 : 0.98,
    transition: 'opacity 300ms ease-in'
  };

  return (
    <div className="centered-container" style={style}>
      <ProfileSection />
      <ProjectsSection />
      <ExperienceSection />
      <TrainingSection />
      <GamingSection />
    </div>
  );
}