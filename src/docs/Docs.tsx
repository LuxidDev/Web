import React from 'react';
import { useLocation } from 'react-router-dom';
import { docsChapters, allDocs } from './content';
import DocsLayout from './components/DocsLayout';
import * as Content from './content';

export default function Docs() {
  const location = useLocation();

  const currentDoc = allDocs.find(doc => doc.path === location.pathname) || allDocs[0];
  const currentSection = docsChapters.find(section =>
    section.chapters.some(chapter => chapter.id === currentDoc.id)
  );

  // Dynamically load the content component
  const ContentComponent = Content[currentDoc.content as keyof typeof Content];

  return (
    <DocsLayout currentDoc={currentDoc} currentSection={currentSection}>
      <ContentComponent />
    </DocsLayout>
  );
}


