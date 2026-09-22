'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Sun,
  Moon,
  Clock,
  Users,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Project, PROJECTS } from '../../../data/projects';
import { useLanguage } from '../../../context/LanguageContext';
import { Repetition3DText } from '../../../components/Repetition3DText';

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { language, toggleLanguage } = useLanguage();
  const [backgroundMode, setBackgroundMode] = useState<'white' | 'black'>('black');
  const isWhite = backgroundMode === 'white';

  // Strictly monochrome: only white, black and neutral grayscale borders
  const bgColor = isWhite ? '#ffffff' : '#000000';
  const textColor = isWhite ? '#000000' : '#ffffff';
  const borderColor = isWhite ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)';
  const cardBg = isWhite ? '#fafafa' : '#0a0a0a';
  const pillBg = isWhite ? '#000000' : '#ffffff';
  const pillText = isWhite ? '#ffffff' : '#000000';

  const toggleTheme = () => {
    setBackgroundMode(prev => (prev === 'white' ? 'black' : 'white'));
  };

  const t = project[language] || project.fr;
  const otherProjects = PROJECTS.filter(p => p.slug !== project.slug);

  return (
    <div style={{
      backgroundColor: bgColor,
      color: textColor,
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'background-color 0.25s ease, color 0.25s ease',
      boxSizing: 'border-box',
    }}>
      {/* Top Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        backgroundColor: isWhite ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        borderBottom: `1px solid ${borderColor}`,
        padding: '0.8rem clamp(1rem, 4vw, 2.5rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            href="/#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            <ArrowLeft size={16} />
            <span>{language === 'fr' ? 'Accueil' : 'Home'}</span>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'inherit',
                textDecoration: 'none',
                padding: '6px 12px',
                border: `1px solid ${borderColor}`,
                borderRadius: '2px',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              <Github size={15} />
              <span>GitHub</span>
            </a>
          )}

          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            style={{
              background: 'transparent',
              border: `1px solid ${borderColor}`,
              borderRadius: '2px',
              color: 'inherit',
              cursor: 'pointer',
              padding: '6px 10px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '1px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
            title={language === 'fr' ? 'Passer en anglais' : 'Switch to French'}
          >
            <span style={{ opacity: language === 'fr' ? 1 : 0.35 }}>FR</span>
            <span style={{ opacity: 0.3 }}>/</span>
            <span style={{ opacity: language === 'en' ? 1 : 0.35 }}>EN</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: `1px solid ${borderColor}`,
              color: 'inherit',
              borderRadius: '2px',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title={language === 'fr' ? 'Changer de thème' : 'Toggle theme'}
          >
            {isWhite ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: 'clamp(3rem, 7vw, 5rem) clamp(1rem, 4vw, 2rem) 8rem clamp(1rem, 4vw, 2rem)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(2.5rem, 5vw, 3.5rem)',
      }}>
        {/* Project Header Hero */}
        <section style={{
          borderBottom: `1px solid ${borderColor}`,
          paddingBottom: '3rem',
          textAlign: 'center',
        }}>
          {/* Badge & Subtitle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}>
            {t.badge && (
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                padding: '3px 10px',
                border: `1px solid ${borderColor}`,
                borderRadius: '999px',
                backgroundColor: pillBg,
                color: pillText,
              }}>
                {t.badge}
              </span>
            )}
            <span style={{ fontSize: '0.9rem', opacity: 0.7, letterSpacing: '0.5px' }}>
              {t.subtitle}
            </span>
          </div>

          {/* Exact 3D title effect matching the About title on the home page */}
          <div style={{ margin: '1.5rem 0 2rem 0' }}>
            <Repetition3DText
              text={project.title}
              color={textColor}
            />
          </div>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
            lineHeight: 1.7,
            opacity: 0.85,
            maxWidth: '780px',
            margin: '0 auto',
            textAlign: 'justify',
          }}>
            {t.fullDescription}
          </p>

          {/* Meta Information Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: `1px dashed ${borderColor}`,
            fontSize: '0.9rem',
            opacity: 0.85,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} />
              <span><strong>{language === 'fr' ? 'Durée :' : 'Duration:'}</strong> {t.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={16} />
              <span>
                <strong>{language === 'fr' ? 'Équipe :' : 'Team:'}</strong>{' '}
                {project.teamSize === 1
                  ? (language === 'fr' ? 'Solo' : 'Solo')
                  : `${project.teamSize} ${language === 'fr' ? 'développeurs' : 'developers'}`}
              </span>
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'inherit',
                  textDecoration: 'underline',
                  fontWeight: 600,
                }}
              >
                <span>{language === 'fr' ? 'Voir sur GitHub' : 'View on GitHub'}</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </section>

        {/* Technical Highlights / Architecture */}
        {t.highlights && t.highlights.length > 0 && (
          <section>
            <h2 style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textTransform: 'uppercase',
            }}>
              <Cpu size={20} />
              <span>{language === 'fr' ? 'Architecture & Composants' : 'Architecture & Key Components'}</span>
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
            }}>
              {t.highlights.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: '2px',
                    padding: '1.4rem',
                    backgroundColor: cardBg,
                  }}
                >
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    margin: '0 0 0.5rem 0',
                    letterSpacing: '-0.3px',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    opacity: 0.8,
                    margin: 0,
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Features List */}
        {t.features && t.features.length > 0 && (
          <section style={{
            border: `1px solid ${borderColor}`,
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            borderRadius: '2px',
            backgroundColor: cardBg,
          }}>
            <h2 style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              margin: '0 0 1.2rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textTransform: 'uppercase',
            }}>
              <Sparkles size={18} />
              <span>{language === 'fr' ? 'Fonctionnalités Clés' : 'Key Features'}</span>
            </h2>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}>
              {t.features.map((feat, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.8rem',
                    fontSize: '0.92rem',
                    lineHeight: 1.5,
                    opacity: 0.9,
                  }}
                >
                  <CheckCircle2 size={16} style={{ marginTop: '3px', flexShrink: 0, opacity: 0.7 }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Challenges & Technical Learnings */}
        {t.challenges && t.challenges.length > 0 && (
          <section>
            <h2 style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              marginBottom: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textTransform: 'uppercase',
            }}>
              <Layers size={20} />
              <span>{language === 'fr' ? 'Défis Techniques' : 'Technical Challenges'}</span>
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}>
              {t.challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1rem 1.2rem',
                    borderLeft: `2px solid ${textColor}`,
                    backgroundColor: isWhite ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    opacity: 0.85,
                  }}
                >
                  {challenge}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technologies / Stack (Monochrome) */}
        <section style={{
          paddingTop: '1.5rem',
          borderTop: `1px solid ${borderColor}`,
        }}>
          <h3 style={{
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1rem',
            opacity: 0.7,
            fontWeight: 700,
          }}>
            {language === 'fr' ? 'Stack Technologique' : 'Tech Stack'}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {project.technologies.map(tech => (
              <span
                key={tech}
                style={{
                  padding: '5px 13px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  borderRadius: '100px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: pillBg,
                  color: pillText,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Other Projects */}
        <section style={{
          marginTop: '1.5rem',
          paddingTop: '2.5rem',
          borderTop: `1px solid ${borderColor}`,
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1.2rem',
            opacity: 0.8,
          }}>
            {language === 'fr' ? 'Découvrir les autres projets' : 'Explore Other Projects'}
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}>
            {otherProjects.map(other => {
              const otherT = other[language] || other.fr;
              return (
                <Link
                  key={other.slug}
                  href={`/project/${other.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    padding: '1.2rem',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '2px',
                    textDecoration: 'none',
                    color: 'inherit',
                    backgroundColor: cardBg,
                    transition: 'border-color 0.2s ease, transform 0.2s ease',
                  }}
                  className="project-card-hover"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{other.title}</span>
                    <ArrowRight size={15} />
                  </div>
                  <span style={{ fontSize: '0.82rem', opacity: 0.7, lineHeight: 1.4 }}>
                    {otherT.subtitle}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Back Link */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link
            href="/#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '12px 24px',
              border: `1px solid ${borderColor}`,
              borderRadius: '2px',
            }}
          >
            <ArrowLeft size={15} />
            <span>{language === 'fr' ? "Retour à l'accueil" : 'Back to Home'}</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
