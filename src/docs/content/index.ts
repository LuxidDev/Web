export { default as IntroductionContent } from './IntroductionContent';
export { default as InstallationContent } from './InstallationContent';
export { default as FirstAppContent } from './FirstAppContent';
export { default as ArchitectureContent } from './ArchitectureContent';
export { default as SEAArchitectureContent } from './SEAArchitectureContent';
export { default as ActionsContent } from './ActionsContent';
export { default as EntitiesContent } from './EntitiesContent';
export { default as ScreensContent } from './ScreensContent';
export { default as LORMContent } from './LORMContent';
export { default as MigrationsContent } from './MigrationsContent';
export { default as RelationshipsContent } from './RelationshipsContent';
export { default as NovaTemplatingContent } from './NovaTemplatingContent';
export { default as ComponentsContent } from './ComponentsContent';
export { default as JuiceCLIContent } from './JuiceCLIContent';
export { default as MakeCommandsContent } from './MakeCommandsContent';

import { Book, Code, Terminal, Database, Layers, Zap, Brain, Rocket } from 'lucide-react';

export const docsChapters = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500',
    chapters: [
      {
        id: 'introduction',
        title: 'Introduction',
        path: '/docs/introduction',
        content: 'IntroductionContent',
        quickStart: true
      },
      {
        id: 'installation',
        title: 'Installation',
        path: '/docs/installation',
        content: 'InstallationContent'
      },
      {
        id: 'first-app',
        title: 'Your First App',
        path: '/docs/first-app',
        content: 'FirstAppContent'
      },
      {
        id: 'architecture',
        title: 'Architecture',
        path: '/docs/architecture',
        content: 'ArchitectureContent'
      },
    ]
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    chapters: [
      {
        id: 'sea-architecture',
        title: 'SEA Architecture',
        path: '/docs/sea-architecture',
        content: 'SEAArchitectureContent'
      },
      {
        id: 'actions',
        title: 'Actions',
        path: '/docs/actions',
        content: 'ActionsContent'
      },
      {
        id: 'entities',
        title: 'Entities',
        path: '/docs/entities',
        content: 'EntitiesContent'
      },
      {
        id: 'screens',
        title: 'Screens',
        path: '/docs/screens',
        content: 'ScreensContent'
      },
    ]
  },
  {
    id: 'database',
    title: 'Database & ORM',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    chapters: [
      {
        id: 'l-orm',
        title: 'L ORM',
        path: '/docs/l-orm',
        content: 'LORMContent'
      },
      {
        id: 'migrations',
        title: 'Migrations',
        path: '/docs/migrations',
        content: 'MigrationsContent'
      },
      {
        id: 'relationships',
        title: 'Relationships',
        path: '/docs/relationships',
        content: 'RelationshipsContent'
      },
    ]
  },
  {
    id: 'templating',
    title: 'Templating',
    icon: Code,
    color: 'from-orange-500 to-red-500',
    chapters: [
      {
        id: 'nova-templating',
        title: 'Nova Templating',
        path: '/docs/nova-templating',
        content: 'NovaTemplatingContent'
      },
      {
        id: 'components',
        title: 'Components',
        path: '/docs/components',
        content: 'ComponentsContent'
      },
    ]
  },
  {
    id: 'cli',
    title: 'Juice CLI',
    icon: Terminal,
    color: 'from-yellow-500 to-amber-500',
    chapters: [
      {
        id: 'juice-cli',
        title: 'Juice CLI',
        path: '/docs/juice-cli',
        content: 'JuiceCLIContent'
      },
      {
        id: 'make-commands',
        title: 'Make Commands',
        path: '/docs/make-commands',
        content: 'MakeCommandsContent'
      },
    ]
  },
];

export const allDocs = docsChapters.flatMap(section => section.chapters);
