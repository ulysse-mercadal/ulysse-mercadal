import React from 'react';
import { notFound } from 'next/navigation';
import { PROJECTS, getProjectBySlug } from '../../../data/projects';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateStaticParams() {
  return PROJECTS.map(p => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Projet introuvable - Ulysse Mercadal',
    };
  }

  return {
    title: `${project.title} - Ulysse Mercadal`,
    description: project.fr.shortDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
