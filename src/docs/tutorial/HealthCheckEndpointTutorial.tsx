import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import CodeExample from "@/components/CodeExample";

export default function HealthCheckEndpointTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <CodeExample
        code={`<?php
namespace App\Actions;

use Luxid\Foundation\Action;
use Luxid\Http\Request;
use Luxid\Http\Response;

class HealthCheckerAction extends Action
{
    public function index(Request $request, Response $response)
    {
        return $this->response()->json([
            'status' => 'healthy',
            'timestamp' => date('Y-m-d H:i:s'),
        ]);
    }
}`}
        title="app/Actions/HealthCheckerAction.php"
        explanation=""
      />

     <h4 className="text-xl font-bold mb-4">Add the new routes to your routes file</h4>

      <CodeExample
        code={`<?php
use App\Actions\TodoAction;

// Your exisiting routes ...

route('health')
    ->get('/api/health')
    ->uses(HealthCheckerAction::class, 'index')
    ->open();`}
        title="routes/api.php"
        explanation=""
      />

    </>
  );
}
