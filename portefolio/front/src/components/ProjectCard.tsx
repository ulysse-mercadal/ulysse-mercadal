'use client';

import React from 'react';
import { Github, Users, Clock, ExternalLink } from 'lucide-react';
import { ResponsiveText } from './ResponsiveText';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  duration: string;
  teamSize: number;
  backgroundMode: 'white' | 'black';
}

export const ProjectCard = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  duration,
  teamSize,
  backgroundMode
}: ProjectCardProps) => {
  const isWhite = backgroundMode === 'white';
  const borderColor = isWhite ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
  const accentColor = isWhite ? '#000000' : '#ffffff';

  return (
    <div style={{
      width: '100%',
      maxWidth: '100%', // Added to prevent overflow
      padding: 'clamp(1.5rem, 5vw, 3rem)',
      border: `0.5px solid ${borderColor}`,
      borderRadius: '2px',
      backgroundColor: isWhite ? '#ffffff' : '#000000',
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(1rem, 3vw, 2rem)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
          margin: 0,
          fontWeight: '700',
          letterSpacing: '-0.5px',
          wordBreak: 'break-word'
        }}>{title}</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              <Github size={24} />
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              <ExternalLink size={24} />
            </a>
          )}
        </div>
      </div>

      <ResponsiveText style={{ textAlign: 'left', fontSize: 'clamp(1rem, 2vw, 1.2rem)', opacity: 0.8 }}>
        {description}
      </ResponsiveText>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
        {technologies.map(tech => (
          <span key={tech} style={{
            padding: '4px 12px',
            fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
            backgroundColor: accentColor,
            color: isWhite ? '#ffffff' : '#000000',
            borderRadius: '100px',
            fontWeight: '600',
            whiteSpace: 'nowrap'
          }}>
            {tech}
          </span>
        ))}
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(1rem, 5vw, 2.5rem)',
        marginTop: 'auto',
        paddingTop: '1.5rem',
        borderTop: `0.5px solid ${borderColor}`,
        fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
        opacity: 0.6
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={16} />
          <span>{duration}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={16} />
          <span>{teamSize === 1 ? 'Solo' : `${teamSize} developers`}</span>
        </div>
      </div>
    </div>
  );
};
