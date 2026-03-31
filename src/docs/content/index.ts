export { default as IntroductionContent } from './IntroductionContent';
export { default as InstallationContent } from './InstallationContent';
export { default as ArchitectureContent } from './ArchitectureContent';
export { default as ActionsContent } from './ActionsContent';
export { default as EntitiesContent } from './EntitiesContent';
export { default as ScreensContent } from './ScreensContent';
export { default as RocketORMContent } from './RocketORMContent';
export { default as MigrationsContent } from './MigrationsContent';
export { default as RelationshipsContent } from './RelationshipsContent';
export { default as NovaTemplatingContent } from './NovaTemplatingContent';
export { default as ComponentsContent } from './ComponentsContent';
export { default as JuiceCLIContent } from './JuiceCLIContent';
export { default as MakeCommandsContent } from './MakeCommandsContent';

export { default as QueryBuilderContent } from './QueryBuilderContent';
export { default as LayoutsContent } from './LayoutsContent';
export { default as CLIBasicsContent } from './CLIBasicsContent';
export { default as DatabaseCommandsContent } from './DatabaseCommandsContent';
export { default as CustomCommandsContent } from './CustomCommandsContent';
export { default as MiddlewareContent } from './MiddlewareContent';
export { default as AuthenticationContent } from './AuthenticationContent';
export { default as ValidationContent } from './ValidationContent';
export { default as ErrorHandlingContent } from './ErrorHandlingContent';
export { default as TestingContent } from './TestingContent';
export { default as CorsContent } from './CorsContent';
export { default as ProductionSetupContent } from './ProductionSetupContent';
export { default as PerformanceContent } from './PerformanceContent';
export { default as SecurityContent } from './SecurityContent';
export { default as RoutingReferenceContent } from './RoutingReferenceContent';
export { default as ORMReferenceContent } from './ORMReferenceContent';
export { default as CLIReferenceContent } from './CLIReferenceContent';

/* Tutorial Content */
export { default as IntroductionTutorial } from '../tutorial/IntroductionTutorial';
export { default as UnderstandingSEATutorial } from '../tutorial/UnderstandingSEATutorial';
export { default as TodoEntityTutorial } from '../tutorial/TodoEntityTutorial';
export { default as DatabaseMigrationTutorial } from '../tutorial/DatabaseMigrationTutorial';
export { default as TodoActionTutorial } from '../tutorial/TodoActionTutorial';
export { default as DefineRoutesTutorial } from '../tutorial/DefineRoutesTutorial';
export { default as TestYourAPITutorial } from '../tutorial/TestYourAPITutorial';
export { default as HealthCheckEndpointTutorial } from '../tutorial/HealthCheckEndpointTutorial';
export { default as QuickReferenceCommands } from '../tutorial/QuickReferenceCommands';
export { default as BestPracticesTutorial } from '../tutorial/BestPracticesTutorial';
export { default as ConclusionTutorial } from '../tutorial/ConclusionTutorial';

import { Code, Terminal, Database, Layers, Zap, Brain, Rocket, Server, Workflow } from 'lucide-react';

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
      {
        id: 'juice-cli',
        title: 'Juice CLI First Look',
        path: '/docs/juice-cli',
        content: 'JuiceCLIContent',
        quickStart: true
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
        id: 'screens',
        title: 'Views (Nova)',
        path: '/docs/screens',
        content: 'ScreensContent'
      },
      {
        id: 'actions',
        title: 'Actions (Controllers)',
        path: '/docs/actions',
        content: 'ActionsContent'
      },
      {
        id: 'entities',
        title: 'Entities (Models)',
        path: '/docs/entities',
        content: 'EntitiesContent'
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
        id: 'l-orm',
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
        title: 'Model Relationships',
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
    id: 'templating',
    title: 'Nova Engine',
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
        title: 'Template Components',
        path: '/docs/components',
        content: 'ComponentsContent'
      },
      {
        id: 'layouts',
        title: 'Layouts & Frames',
        path: '/docs/layouts',
        content: 'LayoutsContent'
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
      {
        id: 'make-commands',
        title: 'Make Commands',
        path: '/docs/make-commands',
        content: 'MakeCommandsContent'
      },
      {
        id: 'database-commands',
        title: 'Database Commands',
        path: '/docs/database-commands',
        content: 'DatabaseCommandsContent'
      },
      {
        id: 'custom-commands',
        title: 'Custom Commands',
        path: '/docs/custom-commands',
        content: 'CustomCommandsContent'
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
      {
        id: 'testing',
        title: 'Testing',
        path: '/docs/testing',
        content: 'TestingContent'
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
        title: 'Understanding SEA',
        path: '/docs/sea',
        content: 'UnderstandingSEATutorial'
      },
      {
        id: 'todoentity',
        title: 'Create the Todo Entity',
        path: '/docs/todo-entity',
        content: 'TodoEntityTutorial'
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
        title: '(Optional) Add Health Check Endpoint',
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
  {
    id: 'deployment',
    title: 'Deployment',
    icon: Server,
    color: 'from-rose-500 to-pink-500',
    chapters: [
      {
        id: 'production-setup',
        title: 'Production Setup',
        path: '/docs/production-setup',
        content: 'ProductionSetupContent'
      },
      {
        id: 'performance',
        title: 'Performance Optimization',
        path: '/docs/performance',
        content: 'PerformanceContent'
      },
      {
        id: 'security',
        title: 'Security Best Practices',
        path: '/docs/security',
        content: 'SecurityContent'
      },
    ]
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    icon: Layers,
    color: 'from-cyan-500 to-teal-500',
    chapters: [
      {
        id: 'routing-reference',
        title: 'Routing API',
        path: '/docs/routing-reference',
        content: 'RoutingReferenceContent'
      },
      {
        id: 'orm-reference',
        title: 'ORM API',
        path: '/docs/orm-reference',
        content: 'ORMReferenceContent'
      },
      {
        id: 'cli-reference',
        title: 'CLI Reference',
        path: '/docs/cli-reference',
        content: 'CLIReferenceContent'
      },
    ]
  },
];

export const allDocs = docsChapters.flatMap(section => section.chapters);
