export { default as IntroductionContent } from './IntroductionContent';
export { default as InstallationContent } from './InstallationContent';
export { default as ArchitectureContent } from './ArchitectureContent';
export { default as ActionsContent } from './ActionsContent';
export { default as EntitiesContent } from './EntitiesContent';
export { default as NovaContent } from './NovaContent';
export { default as RocketORMContent } from './RocketORMContent';
export { default as MigrationsContent } from './MigrationsContent';
export { default as RelationshipsContent } from './RelationshipsContent';

export { default as QueryBuilderContent } from './QueryBuilderContent';
export { default as CLIBasicsContent } from './CLIBasicsContent';
export { default as MiddlewareContent } from './MiddlewareContent';
export { default as AuthenticationContent } from './AuthenticationContent';
export { default as ValidationContent } from './ValidationContent';
export { default as ErrorHandlingContent } from './ErrorHandlingContent';
export { default as CorsContent } from './CorsContent';

/* Tutorial Content */
export { default as IntroductionTutorial } from '../tutorial/IntroductionTutorial';
export { default as UnderstandingAVETutorial } from '../tutorial/UnderstandingAVETutorial';
export { default as TodoEntityTutorial } from '../tutorial/TodoEntityTutorial';
export { default as DatabaseMigrationTutorial } from '../tutorial/DatabaseMigrationTutorial';
export { default as TodoActionTutorial } from '../tutorial/TodoActionTutorial';
export { default as LuxidActionTutorial } from '../tutorial/LuxidActionTutorial';
export { default as DefineRoutesTutorial } from '../tutorial/DefineRoutesTutorial';
export { default as TestYourAPITutorial } from '../tutorial/TestYourAPITutorial';
export { default as HealthCheckEndpointTutorial } from '../tutorial/HealthCheckEndpointTutorial';
export { default as QuickReferenceCommands } from '../tutorial/QuickReferenceCommands';
export { default as BestPracticesTutorial } from '../tutorial/BestPracticesTutorial';
export { default as ConclusionTutorial } from '../tutorial/ConclusionTutorial';

import { Code, Terminal, Database, Zap, Brain, Rocket, Server, Workflow } from 'lucide-react';

export const docsChapters = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500',
    chapters: [
      {
        id: 'introduction',
        title: 'Introduction to Luxid',
        path: '/docs/introduction',
        content: 'IntroductionContent',
        quickStart: true
      },
      {
        id: 'installation',
        title: 'Installation & Setup',
        path: '/docs/installation',
        content: 'InstallationContent'
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
        id: 'nova',
        title: 'Views (Nova)',
        path: '/docs/nova',
        content: 'NovaContent'
      },
      {
        id: 'entities',
        title: 'Entities (Models)',
        path: '/docs/entities',
        content: 'EntitiesContent'
      },
      {
        id: 'actions',
        title: 'Actions (Controllers)',
        path: '/docs/actions',
        content: 'ActionsContent'
      },
    ]
  },
  {
    id: 'database-orm',
    title: 'Database & Rocket-ORM',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    chapters: [
      {
        id: 'rocket-orm',
        title: 'Rocket Deep Dive',
        path: '/docs/rocket-orm',
        content: 'RocketORMContent'
      },
      {
        id: 'migrations',
        title: 'Database Migrations',
        path: '/docs/migrations',
        content: 'MigrationsContent'
      },
      {
        id: 'relationships',
        title: 'Entity Relationships',
        path: '/docs/relationships',
        content: 'RelationshipsContent'
      },
      {
        id: 'query-builder',
        title: 'Query Builder',
        path: '/docs/query-builder',
        content: 'QueryBuilderContent'
      },
    ]
  },
  {
    id: 'juice-cli',
    title: 'Juice CLI',
    icon: Terminal,
    color: 'from-yellow-500 to-amber-500',
    chapters: [
      {
        id: 'cli-basics',
        title: 'CLI Basics',
        path: '/docs/cli-basics',
        content: 'CLIBasicsContent'
      },
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    icon: Zap,
    color: 'from-indigo-500 to-violet-500',
    chapters: [
      {
        id: 'middleware',
        title: 'Middleware',
        path: '/docs/middleware',
        content: 'MiddlewareContent'
      },
      {
        id: 'authentication',
        title: 'Authentication',
        path: '/docs/authentication',
        content: 'AuthenticationContent'
      },
      {
        id: 'validation',
        title: 'Validation',
        path: '/docs/validation',
        content: 'ValidationContent'
      },
      {
        id: 'error-handling',
        title: 'Error Handling',
        path: '/docs/error-handling',
        content: 'ErrorHandlingContent'
      },
      {
        id: 'cors',
        title: 'Cross-Origin Resource Sharing',
        path: '/docs/cors',
        content: 'CorsContent'
      },
    ]
  },
  {
    id: 'tutorial',
    title: 'Tutorial App',
    icon: Workflow,
    color: 'from-teal-500 to-sky-500',
    chapters: [
      {
        id: 'introduction',
        title: 'Introduction',
        path: '/docs/tutorial',
        content: 'IntroductionTutorial'
      },
      {
        id: 'sea',
        title: 'Understanding AVE',
        path: '/docs/ave',
        content: 'UnderstandingAVETutorial'
      },
      {
        id: 'todoentity',
        title: 'Create the Todo Entity',
        path: '/docs/todo-entity',
        content: 'TodoEntityTutorial'
      },
      {
        id: 'luxidaction',
        title: 'Create the Luxid Action',
        path: '/docs/luxid-action',
        content: 'LuxidActionTutorial'
      },
      {
        id: 'todoaction',
        title: 'Create the Todo Action',
        path: '/docs/todo-action',
        content: 'TodoActionTutorial'
      },
      {
        id: 'migration',
        title: 'Create the DB Migration',
        path: '/docs/migration',
        content: 'DatabaseMigrationTutorial'
      },
      {
        id: 'routes',
        title: 'Define Luxid Routes',
        path: '/docs/routes',
        content: 'DefineRoutesTutorial'
      },
      {
        id: 'test',
        title: 'Test Your API',
        path: '/docs/test-your-api',
        content: 'TestYourAPITutorial'
      },
      {
        id: 'health',
        title: 'Health Check Endpoint',
        path: '/docs/health-check-endpoint',
        content: 'HealthCheckEndpointTutorial'
      },
      {
        id: 'health',
        title: 'Quick Reference Commands',
        path: '/docs/quick-reference-commands',
        content: 'QuickReferenceCommands'
      },
      {
        id: 'bestpractices',
        title: 'Best Practices',
        path: '/docs/best-practices',
        content: 'BestPracticesTutorial'
      },
      {
        id: 'conclusion',
        title: 'Conclusion',
        path: '/docs/conclusion',
        content: 'ConclusionTutorial'
      },
    ]
  },
];

export const allDocs = docsChapters.flatMap(section => section.chapters);
