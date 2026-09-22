'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Github, Users, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import { ResponsiveText } from './ResponsiveText';

interface ProjectCardProps {
  title: string;
  slug?: string;
  badge?: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  links?: { label: string; url: string }[];
  duration: string;
  teamSize: number;
  backgroundMode: 'white' | 'black';
}

export const ProjectCard = ({
  title,
  slug,
  badge,
  description,
  technologies,
  githubUrl,
  liveUrl,
  links,
  duration,
  teamSize,
  backgroundMode
}: ProjectCardProps) => {
  const router = useRouter();
  const isWhite = backgroundMode === 'white';
  const borderColor = isWhite ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
  const accentColor = isWhite ? '#000000' : '#ffffff';

  const handleCardClick = (e: React.MouseEvent) => {
    if (!slug) return;
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;
    router.push(`/project/${slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        width: '100%',
        maxWidth: '100%',
        padding: 'clamp(1.5rem, 5vw, 3rem)',
        border: `0.5px solid ${borderColor}`,
        borderRadius: '2px',
        backgroundColor: isWhite ? '#ffffff' : '#000000',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1rem, 3vw, 2rem)',
        transition: 'all 0.25s ease',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        cursor: slug ? 'pointer' : 'default',
      }}
      className={slug ? 'project-card-hover' : ''}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h3 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
            margin: 0,
            fontWeight: '700',
            letterSpacing: '-0.5px',
            wordBreak: 'break-word'
          }}>{title}</h3>
          {badge && (
            <span style={{
              fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '3px 9px',
              border: `1px solid ${borderColor}`,
              borderRadius: '999px',
              opacity: 0.85
            }}>
              {badge}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }} title="GitHub">
              <Github size={22} />
            </a>
          )}
          {links && links.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '3px 8px',
                border: `1px solid ${borderColor}`,
                borderRadius: '2px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <span>{link.label}</span>
              <ExternalLink size={12} />
            </a>
          ))}
          {liveUrl && !links && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              <ExternalLink size={22} />
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
        opacity: 0.7
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={16} />
          <span>{duration}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={16} />
          <span>{teamSize === 1 ? 'Solo' : `${teamSize} developers`}</span>
        </div>
        {slug && (
          <div style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: '700',
            letterSpacing: '0.5px',
            fontSize: 'clamp(0.75rem, 1.3vw, 0.85rem)',
            opacity: 0.9,
          }}>
            <span>Détails</span>
            <ArrowRight size={14} />
          </div>
        )}
      </div>
    </div>
  );
};
