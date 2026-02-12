'use client';

import { useState, useEffect, useCallback } from 'react';
import { ValidatedArtwork } from '../types/artwork';

interface UseProjectModalProps {
  artworks: ValidatedArtwork[];
}

interface UseProjectModalReturn {
  isOpen: boolean;
  currentProject: ValidatedArtwork | null;
  currentImageIndex: number;
  openProject: (project: ValidatedArtwork) => void;
  closeProject: () => void;
  nextProject: () => void;
  prevProject: () => void;
  nextImage: () => void;
  prevImage: () => void;
  setImageIndex: (index: number) => void;
}

export function useProjectModal({
  artworks,
}: UseProjectModalProps): UseProjectModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<ValidatedArtwork | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openProject = useCallback((project: ValidatedArtwork) => {
    setCurrentProject(project);
    setCurrentImageIndex(0);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProject = useCallback(() => {
    setIsOpen(false);
    setCurrentProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  }, []);

  const nextProject = useCallback(() => {
    if (!currentProject) return;
    const currentIndex = artworks.findIndex((a) => a.id === currentProject.id);
    const nextIndex = (currentIndex + 1) % artworks.length;
    setCurrentProject(artworks[nextIndex]);
    setCurrentImageIndex(0);
  }, [currentProject, artworks]);

  const prevProject = useCallback(() => {
    if (!currentProject) return;
    const currentIndex = artworks.findIndex((a) => a.id === currentProject.id);
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    setCurrentProject(artworks[prevIndex]);
    setCurrentImageIndex(0);
  }, [currentProject, artworks]);

  const nextImage = useCallback(() => {
    if (!currentProject || currentProject.validImages.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === currentProject.validImages.length - 1 ? 0 : prev + 1
    );
  }, [currentProject]);

  const prevImage = useCallback(() => {
    if (!currentProject || currentProject.validImages.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentProject.validImages.length - 1 : prev - 1
    );
  }, [currentProject]);

  const setImageIndex = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeProject();
          break;
        case 'ArrowLeft':
          if (e.shiftKey) {
            prevProject();
          } else {
            prevImage();
          }
          break;
        case 'ArrowRight':
          if (e.shiftKey) {
            nextProject();
          } else {
            nextImage();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeProject, nextProject, prevProject, nextImage, prevImage]);

  return {
    isOpen,
    currentProject,
    currentImageIndex,
    openProject,
    closeProject,
    nextProject,
    prevProject,
    nextImage,
    prevImage,
    setImageIndex,
  };
}
