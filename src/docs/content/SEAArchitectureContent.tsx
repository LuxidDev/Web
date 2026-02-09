import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Layers, GitBranch, Workflow, Cpu, ArrowRight, CheckCircle, Code, Database, Zap } from 'lucide-react';
import CodeExample from '@/components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';

export default function SEAArchitectureContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20'
          : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
      }`}>
        <div className="flex items-start gap-4">
          <Layers className={`w-12 h-12 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">SEA Architecture Deep Dive</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Understanding how Screen, Entities, and Actions work together to create maintainable applications.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">Why SEA Instead of MVC?</h2>

      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Traditional MVC Issues
            </h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                Controllers often become bloated "God objects"
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                Models mix business logic with data access
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                Views sometimes contain too much logic
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                Hard to test components in isolation
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              SEA Advantages
            </h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                Clear single responsibility for each component
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                Natural separation of concerns
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                Easy to test and maintain
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                Scales well with application growth
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">SEA Component Responsibilities</h3>

      <div className="space-y-6">
        {/* Screen */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
              <Code className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h4 className="text-xl font-bold">Screen - Presentation Layer</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-bold mb-2">What Screens Do</h5>
              <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Render HTML templates using Nova
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Handle layout composition with frames
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Format and display data from Actions
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Integrate CSS and JavaScript assets
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-2">What Screens Don't Do</h5>
              <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Database queries or business logic
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  HTTP request processing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Data validation or transformation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Authentication or authorization
                </li>
              </ul>
            </div>
          </div>

          <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
            <h5 className="font-bold mb-2">Example: Screen Implementation</h5>
            <InlineCodeExample
              code={`<?php
// Engine/Foundation/Screen.php - Core rendering
class Screen
{
    public function renderScreen($screen, $data = [])
    {
        $screenContent = $this->renderOnlyScreen($screen, $data);
        $frameContent = $this->frameContent();

        return str_replace('|| content ||', $screenContent, $frameContent);
    }

    protected function frameContent()
    {
        $frame = Application::$app->frame;
        if (Application::$app->action) {
            $frame = Application::$app->action->frame;
        }

        ob_start();
        include_once Application::$ROOT_DIR . "/screens/frames/$frame.nova.php";
        return ob_get_clean();
    }

    protected function renderOnlyScreen($screen, $data)
    {
        foreach ($data as $key => $value) {
            $$key = $value;
        }

        ob_start();
        include_once Application::$ROOT_DIR . "/screens/$screen.nova.php";
        return ob_get_clean();
    }
}`}
              title="Screen Rendering Engine"
              description="Screens use simple PHP includes with output buffering, making them fast and easy to understand."
              icon={Code}
              color="blue"
              language="php"
            />
          </div>
        </div>

        {/* Entities */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-500/10' : 'bg-green-100'}`}>
              <Database className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h4 className="text-xl font-bold">Entities - Data Layer</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-bold mb-2">What Entities Do</h5>
              <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Represent database tables as PHP classes
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Handle CRUD operations with L ORM
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Enforce data validation rules
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Define relationships between entities
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-2">What Entities Don't Do</h5>
              <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Handle HTTP requests or responses
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Render HTML or templates
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Manage user sessions or authentication
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Perform complex business logic orchestration
                </li>
              </ul>
            </div>
          </div>

          <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
            <h5 className="font-bold mb-2">Example: Entity Implementation</h5>
            <InlineCodeExample
              code={`<?php
// Engine/Database/DbEntity.php - Active Record base
abstract class DbEntity extends Entity
{
    // Save (insert or update)
    public function save(): bool
    {
        $tableName = $this->tableName();
        $attributes = $this->attributes();

        if ($this->{static::primaryKey()} === 0) {
            // INSERT
            $params = array_map(fn($attr) => ":$attr", $attributes);
            $sql = "INSERT INTO $tableName (".implode(',', $attributes).")
                    VALUES (".implode(',', $params).")";
        } else {
            // UPDATE
            $setClause = implode(', ', array_map(
                fn($attr) => "$attr = :$attr",
                $attributes
            ));
            $sql = "UPDATE $tableName SET $setClause
                    WHERE ".static::primaryKey()." = :id";
        }

        $statement = self::prepare($sql);
        foreach ($attributes as $attribute) {
            $statement->bindValue(":$attribute", $this->{$attribute});
        }

        return $statement->execute();
    }

    // Find with conditions
    public static function findOne(array $where): ?static
    {
        $tableName = static::tableName();
        $whereClause = implode(" AND ", array_map(
            fn($attr) => "$attr = :$attr",
            array_keys($where)
        ));

        $sql = "SELECT * FROM $tableName WHERE $whereClause";
        $statement = static::prepare($sql);

        foreach ($where as $key => $value) {
            $statement->bindValue(":$key", $value);
        }

        $statement->execute();
        return $statement->fetchObject(static::class) ?: null;
    }
}`}
              title="Entity Base Class"
              description="Entities use PDO prepared statements for security and provide a clean Active Record interface."
              icon={Database}
              color="green"
              language="php"
            />
          </div>
        </div>

        {/* Actions */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
              <Zap className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h4 className="text-xl font-bold">Actions - Business Logic Layer</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-bold mb-2">What Actions Do</h5>
              <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Handle HTTP requests and responses
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Orchestrate business logic using Entities
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Validate and sanitize input data
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Manage authentication and authorization
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-2">What Actions Don't Do</h5>
              <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Direct database access (use Entities)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  HTML rendering (delegate to Screens)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Complex data validation (Entity responsibility)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  Maintain application state (use Session)
                </li>
              </ul>
            </div>
          </div>

          <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <h5 className="font-bold mb-2">Example: Action Implementation</h5>
            <InlineCodeExample
              code={`<?php
// Engine/Foundation/Action.php with helpers
class Action
{
    use ActionHelpers; // Provides helper methods

    public string $frame = 'app';
    public string $activity = '';

    public function nova($screen, $data = [])
    {
        return $this->app()->screen->renderScreen($screen, $data);
    }

    // Example Action method using Luxid's actual methods
    public function store()
    {
        // 1. Get request data (auto-sanitized)
        $data = $this->request()->getBody();

        // 2. Create Entity instance
        $entity = new MyEntity();
        $entity->loadData($data);

        // 3. Validate using Entity rules
        if (!$entity->validate()) {
            // Return error response via Response class
            return $this->response()->error('Validation failed', $entity->errors, 400);
        }

        // 4. Save using Entity's save method
        if (!$entity->save()) {
            return $this->response()->error('Failed to save', null, 500);
        }

        // 5. Return success response
        return $this->response()->success(['entity' => $entity], 'Created successfully', 201);

        // OR render Screen:
        // return $this->nova('entity.show', ['entity' => $entity]);
    }
}

// ActionHelpers trait ACTUALLY provides:
// - $this->app()       // Application instance
// - $this->request()   // Request object
// - $this->response()  // Response object
// - $this->session()   // Session object
// - $this->db()        // Database connection
// - $this->router()    // Router instance
// - $this->user()      // Current authenticated user
// - $this->isGuest()   // Check if user is guest`}
              title="Action Base Class"
              description="Actions focus on orchestrating the flow: request → entity → validation → persistence → response."
              icon={Zap}
              color="purple"
              language="php"
            />
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">SEA Communication Patterns</h3>

      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Workflow className="w-5 h-5" />
              Pattern 1: Simple CRUD Flow
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <div className="text-2xl font-bold mb-2">1</div>
                <div className="text-sm font-semibold">HTTP Request</div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Router → Action</div>
              </div>
              <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <div className="text-2xl font-bold mb-2">2</div>
                <div className="text-sm font-semibold">Business Logic</div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Action → Entity</div>
              </div>
              <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                <div className="text-2xl font-bold mb-2">3</div>
                <div className="text-sm font-semibold">Data Persistence</div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Entity → Database</div>
              </div>
              <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                <div className="text-2xl font-bold mb-2">4</div>
                <div className="text-sm font-semibold">Response</div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Action → Screen/JSON</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              Pattern 2: Complex Business Process
            </h4>
            <CodeExample
              code={`<?php
// Example: Order processing with multiple Entities
public function processOrder($orderId)
{
    // 1. Get order from database
    $order = Order::find($orderId);
    if (!$order) {
        return $this->error('Order not found');
    }

    // 2. Check inventory (multiple Entity queries)
    $items = OrderItem::findAll(['order_id' => $orderId]);
    foreach ($items as $item) {
        $product = Product::find($item->product_id);
        if ($product->stock < $item->quantity) {
            return $this->error('Insufficient stock: ' . $product->name);
        }
    }

    // 3. Update inventory
    foreach ($items as $item) {
        $product = Product::find($item->product_id);
        $product->stock -= $item->quantity;
        $product->save();
    }

    // 4. Create transaction record
    $transaction = new Transaction();
    $transaction->order_id = $orderId;
    $transaction->amount = $order->total;
    $transaction->status = 'completed';
    $transaction->save();

    // 5. Update order status
    $order->status = 'processed';
    $order->processed_at = date('Y-m-d H:i:s');
    $order->save();

    // 6. Send notification (could be another Entity)
    $notification = new Notification();
    $notification->user_id = $order->user_id;
    $notification->message = 'Your order has been processed';
    $notification->save();

    // 7. Return response
    return $this->success([
        'order' => $order,
        'transaction' => $transaction
    ], 'Order processed successfully');
}`}
              language="php"
              title="Complex Business Process Example"
              explanation="Actions orchestrate complex processes involving multiple Entities while keeping each Entity focused on its own data."
            />
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Best Practices for SEA</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Do These
          </h4>
          <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Keep Actions thin - delegate to Entities
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Put business logic in Entities
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Use Screens only for presentation
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Create focused, single-purpose Actions
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              Use middleware for cross-cutting concerns
            </li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <span className="text-red-500 text-xl">×</span>
            Avoid These
          </h4>
          <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <li className="flex items-start gap-2">
              <span className="text-red-500 text-xl">×</span>
              Don't put SQL in Actions
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 text-xl">×</span>
              Don't put business logic in Screens
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 text-xl">×</span>
              Avoid fat Actions (split them up)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 text-xl">×</span>
              Don't skip Entity validation
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 text-xl">×</span>
              Avoid direct $_POST/$_GET in Entities
            </li>
          </ul>
        </div>
      </div>

      <div className={`p-6 rounded-xl ${
        darkMode
          ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'
          : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
      }`}>
        <h3 className="text-xl font-bold mb-4">Real-World Example: User Registration</h3>

        <CodeExample
          code={`<?php
// 1. Entity (app/Entities/User.php)
class User extends DbEntity
{
    public int $id = 0;
    public string $email = '';
    public string $password = '';
    public string $name = '';
    public bool $email_verified = false;
    public string $verification_token = '';
    public string $created_at = '';

    public function rules(): array
    {
        return [
            'email' => [
                self::RULE_REQUIRED,
                self::RULE_EMAIL,
                [self::RULE_UNIQUE, 'class' => self::class]
            ],
            'password' => [
                self::RULE_REQUIRED,
                [self::RULE_MIN, 'min' => 8]
            ],
            'name' => [
                self::RULE_REQUIRED,
                [self::RULE_MIN, 'min' => 2]
            ],
        ];
    }

    public function save(): bool
    {
        if ($this->id === 0) {
            $this->created_at = date('Y-m-d H:i:s');
            $this->verification_token = bin2hex(random_bytes(32));
            $this->password = password_hash($this->password, PASSWORD_DEFAULT);
        }
        return parent::save();
    }

    public function verifyEmail(): bool
    {
        $this->email_verified = true;
        $this->verification_token = '';
        return $this->save();
    }
}

// 2. Action (app/Actions/AuthAction.php)
class AuthAction extends Action
{
    public function register()
    {
        $data = $this->request()->getBody();

        $user = new User();
        $user->loadData($data);

        if ($user->validate() && $user->save()) {
            // Send verification email
            $this->sendVerificationEmail($user);

            // Log the user in
            Application::$app->login($user);

            return $this->success([
                'user' => $user,
                'message' => 'Registration successful. Please verify your email.'
            ], 201);
        }

        return $this->error('Registration failed', $user->errors, 400);
    }

    public function verify($token)
    {
        $user = User::findOne(['verification_token' => $token]);

        if (!$user) {
            return $this->error('Invalid verification token', null, 404);
        }

        if ($user->verifyEmail()) {
            return $this->success([
                'user' => $user,
                'message' => 'Email verified successfully'
            ]);
        }

        return $this->error('Verification failed', null, 500);
    }
}

// 3. Screen (screens/auth/register.nova.php)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
        <h1 class="text-2xl font-bold mb-6 text-center">Create Account</h1>

        <form action="/register" method="POST">
            <?php if (!empty($errors)): ?>
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <ul>
                        <?php foreach($errors as $field => $fieldErrors): ?>
                            <?php foreach($fieldErrors as $error): ?>
                                <li><?= htmlspecialchars($error) ?></li>
                            <?php endforeach; ?>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Name</label>
                    <input type="text" name="name" value="<?= htmlspecialchars($name ?? '') ?>"
                           class="w-full border rounded px-3 py-2">
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Email</label>
                    <input type="email" name="email" value="<?= htmlspecialchars($email ?? '') ?>"
                           class="w-full border rounded px-3 py-2">
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Password</label>
                    <input type="password" name="password"
                           class="w-full border rounded px-3 py-2">
                </div>

                <button type="submit"
                        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Register
                </button>
            </div>
        </form>
    </div>
</body>
</html>

// 4. Route (routes/api.php)
use App\Actions\AuthAction;

// Fluent routing API
route('register')
    ->post('/register')
    ->uses(AuthAction::class, 'register')
    ->open(); // Public route

route('verify')
    ->get('/verify/{token}')
    ->uses(AuthAction::class, 'verify')
    ->open(); // Public route`}
          language="php"
          title="Complete User Registration with SEA"
          explanation="This shows how each SEA component handles its specific responsibility while working together."
        />
      </div>

      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <h3 className="text-xl font-bold mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Screen
            </h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <strong>Responsibility:</strong> Presentation
              <br />
              <strong>Technology:</strong> Nova Templates
              <br />
              <strong>Location:</strong> screens/
            </p>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Entities
            </h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <strong>Responsibility:</strong> Data & Business Logic
              <br />
              <strong>Technology:</strong> L ORM
              <br />
              <strong>Location:</strong> app/Entities/
            </p>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Actions
            </h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <strong>Responsibility:</strong> HTTP & Orchestration
              <br />
              <strong>Technology:</strong> Action Helpers
              <br />
              <strong>Location:</strong> app/Actions/
            </p>
          </div>
        </div>

        <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'}`}>
          <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <strong>Key Takeaway:</strong> SEA provides clear boundaries between presentation (Screen),
            data/business logic (Entities), and HTTP/orchestration (Actions). This separation makes your
            code more maintainable, testable, and scalable as your application grows.
          </p>
        </div>
      </div>
    </>
  );
}
