import React from 'react';
import { ArrowRight, Globe, Server, Database, Zap, Workflow } from 'lucide-react';

interface FlowDiagramProps {
  darkMode: boolean;
}

export default function FlowDiagram({ darkMode }: FlowDiagramProps) {
  return (
    <div className={`my-8 p-6 rounded-2xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
      }`}>
      <div className="flex items-center gap-3 mb-6">
        <Workflow className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h3 className="text-2xl font-bold">Request Lifecycle Flow</h3>
      </div>

      <div className="relative">
        {/* Flow Line */}
        <div className={`absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-300'
          }`} />

        {/* Steps */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8">
          {[
            { icon: Globe, label: 'HTTP Request', desc: 'User makes request', color: 'blue' },
            { icon: Server, label: 'Router', desc: 'Route matching', color: 'purple' },
            { icon: Zap, label: 'Action', desc: 'Business logic', color: 'green' },
            { icon: Database, label: 'Entity', desc: 'Data operations', color: 'yellow' },
            { icon: Globe, label: 'Response', desc: 'JSON/HTML output', color: 'blue' },
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? `bg-${step.color}-500/20` : `bg-${step.color}-100`
                }`}>
                <step.icon className={`w-8 h-8 ${darkMode ? `text-${step.color}-400` : `text-${step.color}-600`
                  }`} />
              </div>
              <div className="text-center">
                <h4 className="font-bold mb-1">{step.label}</h4>
                <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {step.desc}
                </p>
              </div>
              {index < 4 && (
                <ArrowRight className={`absolute top-1/2 -right-6 w-6 h-6 transform -translate-y-1/2 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'
                  } hidden md:block`} />
              )}
            </div>
          ))}
        </div>

        {/* Detailed Explanation */}
        <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-300'
          }`}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                }`}>
                <h5 className="font-bold mb-2">HTTP Layer</h5>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Request → Router → Action. The Action handles input validation and orchestrates business logic.
                </p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'
                }`}>
                <h5 className="font-bold mb-2">Data Layer</h5>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Action → Entity → Database. Entities handle all data operations using L ORM.
                </p>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'
              }`}>
              <h5 className="font-bold mb-2">Response Layer</h5>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Action prepares data → Screen renders template (or JSON) → HTTP response sent to client.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
