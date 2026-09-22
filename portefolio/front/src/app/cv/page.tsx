'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Download, ExternalLink, ArrowLeft } from 'lucide-react';
import { Header } from '../../components/Header';
import { useLanguage } from '../../context/LanguageContext';
import { Repetition3DText } from '../../components/Repetition3DText';

export default function CvPage() {
  const { language } = useLanguage();
  const [backgroundMode, setBackgroundMode] = useState<'white' | 'black'>('black');
  const isWhite = backgroundMode === 'white';

  const bgColor = isWhite ? '#ffffff' : '#000000';
  const textColor = isWhite ? '#000000' : '#ffffff';
  const borderColor = isWhite ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
  const cardBg = isWhite ? '#ffffff' : '#000000';

  return (
    <div style={{
      backgroundColor: bgColor,
      color: textColor,
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'background-color 0.25s ease, color 0.25s ease',
      boxSizing: 'border-box',
    }}>
      <Header
        backgroundMode={backgroundMode}
        setBackgroundMode={setBackgroundMode as React.Dispatch<React.SetStateAction<string>>}
      />

      <main style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '100px 20px 8rem 20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
      }}>
        {/* Title Hero */}
        <section style={{
          textAlign: 'center',
          borderBottom: `0.5px solid ${borderColor}`,
          paddingBottom: '2.5rem',
        }}>
          <div style={{ margin: '1rem 0 2rem 0' }}>
            <Repetition3DText
              text={language === 'fr' ? 'Curriculum' : 'Resume'}
              color={textColor}
            />
          </div>

          <p style={{
            fontSize: '1rem',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.6,
          }}>
            {language === 'fr'
              ? 'Consultez mon curriculum vitae directement en ligne ou téléchargez-le au format PDF généré depuis les sources LaTeX.'
              : 'View my curriculum vitae directly online or download it as a PDF generated from LaTeX sources.'}
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <a
              href="/resume.pdf"
              download="CV_Ulysse_Mercadal.pdf"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: isWhite ? '#000000' : '#ffffff',
                color: isWhite ? '#ffffff' : '#000000',
                padding: '10px 20px',
                borderRadius: '2px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              <Download size={15} />
              <span>{language === 'fr' ? 'Télécharger le PDF' : 'Download PDF'}</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'transparent',
                color: textColor,
                border: `0.5px solid ${borderColor}`,
                padding: '10px 20px',
                borderRadius: '2px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              <ExternalLink size={15} />
              <span>{language === 'fr' ? 'Plein Écran' : 'Full Screen'}</span>
            </a>
          </div>
        </section>

        {/* Embedded PDF Viewer */}
        <section style={{
          width: '100%',
          border: `0.5px solid ${borderColor}`,
          borderRadius: '2px',
          overflow: 'hidden',
          backgroundColor: cardBg,
        }}>
          <iframe
            src="/resume.pdf#view=FitH"
            title="CV Ulysse Mercadal"
            style={{
              width: '100%',
              height: '80vh',
              minHeight: '600px',
              border: 'none',
              display: 'block',
            }}
          />
        </section>
      </main>
    </div>
  );
}
