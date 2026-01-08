'use client';

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, Github, Linkedin, Send, Clock } from "lucide-react";

interface TimelineEntryProps {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  isLeft: boolean;
  icon: React.ElementType;
  sectionIsBlack: boolean;
  technologies?: string[];
  links?: { label: string; url: string; icon: React.ElementType }[];
  isMobile: boolean;
}

const TimelineEntry = ({ date, title, subtitle, description, isLeft, icon: Icon, sectionIsBlack, technologies, links, isMobile }: TimelineEntryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const textColor = sectionIsBlack ? '#ffffff' : '#000000';
  const borderColor = sectionIsBlack ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const cardBg = sectionIsBlack ? '#000000' : '#ffffff';

  return (
    <div ref={ref} style={{
      display: 'flex',
      width: '100%',
      justifyContent: isMobile ? 'center' : (isLeft ? 'flex-start' : 'flex-end'),
      marginBottom: 'clamp(3rem, 10vw, 6rem)',
      position: 'relative',
      zIndex: 2,
      boxSizing: 'border-box'
    }}>
      {!isMobile && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '40px',
          transform: 'translateX(-50%)',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: textColor,
          zIndex: 10,
          border: `4px solid ${sectionIsBlack ? '#000000' : '#ffffff'}`,
          boxShadow: `0 0 0 1px ${borderColor}`
        }} />
      )}

      <motion.div
        initial={{ opacity: 0, x: isMobile ? 0 : (isLeft ? -50 : 50), y: isMobile ? 30 : 0 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ 
          width: isMobile ? '100%' : '46%', 
          maxWidth: isMobile ? 'min(100%, 800px)' : 'none',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{
          width: '100%',
          padding: 'clamp(1.5rem, 5vw, 3rem)',
          border: `1px solid ${borderColor}`,
          backgroundColor: cardBg,
          borderRadius: '2px',
          textAlign: 'left',
          color: textColor,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{
              padding: '0.8rem',
              borderRadius: '50%',
              backgroundColor: textColor,
              color: sectionIsBlack ? '#000000' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon size={24} />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: '800', margin: 0, letterSpacing: '-0.5px', textTransform: 'uppercase', wordBreak: 'break-word' }}>{title}</h3>
              <p style={{ opacity: 0.9, margin: 0, fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: '600' }}>{subtitle}</p>
            </div>
          </div>
          
          <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', lineHeight: '1.6', opacity: 0.8, margin: 0 }}>
            {description}
          </p>

          {technologies && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '0.5rem' }}>
              {technologies.map(tech => (
                <span key={tech} style={{
                  padding: '4px 12px',
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                  backgroundColor: textColor,
                  color: sectionIsBlack ? '#000000' : '#ffffff',
                  borderRadius: '100px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          )}

          {links && (
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              {links.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    color: textColor, 
                    textDecoration: 'none',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                    fontWeight: '600',
                    borderBottom: `1px solid ${textColor}`,
                    paddingBottom: '2px'
                  }}
                >
                  <link.icon size={18} />
                  {link.label}
                </a>
              ))}
            </div>
          )}

          <div style={{
            display: 'flex',
            gap: '2.5rem',
            marginTop: '1rem',
            paddingTop: '1.5rem',
            borderTop: `1px solid ${borderColor}`,
            fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
            opacity: 0.6
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ResumeTimeline = ({ backgroundMode }: { backgroundMode: 'white' | 'black' }) => {
  const sectionIsBlack = backgroundMode === 'white';
  const activeLineColor = sectionIsBlack ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1400);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const timelineData = [
    {
      date: "6 Months",
      title: "Full Stack Developer Intern",
      subtitle: "BPCE-IT",
      description: "Developed large-scale banking applications within the IT subsidiary of France's second-largest banking group. Focused on building robust, secure, and high-performance systems in a complex financial ecosystem.",
      icon: Briefcase,
      technologies: ["FastAPI", "MongoDB", "React Admin", "Python", "Docker"]
    },
    {
      date: "6 Months",
      title: "Part-time Teacher",
      subtitle: "Epitech Lyon",
      description: "Mentored and evaluated junior students on technical projects. Taught core programming concepts, software architecture, and best practices, fostering technical excellence.",
      icon: GraduationCap,
      technologies: ["Haskell", "C++", "C", "Java"]
    },
    {
      date: "Contact",
      title: "Your Company?",
      subtitle: "Open to new opportunities",
      description: "My next experience could be with you! I'm looking for challenging projects where I can apply my expertise in low-level programming, graphics, and full-stack development.",
      icon: Send,
      links: [
        { label: "GitHub", url: "https://github.com/ulysse-mercadal", icon: Github },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/ulysse-mercadal/", icon: Linkedin }
      ]
    }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: 'clamp(4rem, 15vw, 150px) auto', padding: '0 20px', boxSizing: 'border-box' }}>
      <div style={{ position: 'relative' }}>
        <div 
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            transform: 'translateX(-50%)',
            width: '1px',
            background: activeLineColor,
            zIndex: 1
          }} 
        />
        
        {timelineData.map((item, index) => (
          <TimelineEntry
            key={index}
            date={item.date}
            title={item.title}
            subtitle={item.subtitle}
            description={item.description}
            isLeft={index % 2 === 0}
            icon={item.icon}
            sectionIsBlack={sectionIsBlack}
            technologies={item.technologies}
            links={item.links}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};