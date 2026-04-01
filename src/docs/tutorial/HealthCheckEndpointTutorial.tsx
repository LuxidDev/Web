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

use Luxid\\Nodes\\Response;

class HealthCheckerAction extends LuxidAction
{
    /**
    * Get /api/health
    */
    public function index()
    {
        return Response::json([
            'status' => 'healthy',
            'timestamp' => date('Y-m-d H:i:s'),
        ]);
    }
}`}
        title="app/Actions/HealthCheckerAction.php"
        explanation=""
      />
    </>
  );
}
