import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Simple Store Implementation (simulating Zustand)
interface StoreState {
  count: number;
  user: { name: string; email: string } | null;
  settings: { theme: string; notifications: boolean };
  todos: Array<{ id: string; text: string; completed: boolean }>;
}

interface StoreActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setUser: (user: { name: string; email: string }) => void;
  clearUser: () => void;
  updateSettings: (settings: Partial<StoreState['settings']>) => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

// Mock store implementation
class MockStore {
  private state: StoreState = {
    count: 0,
    user: null,
    settings: { theme: 'light', notifications: true },
    todos: [],
  };

  private listeners: Array<() => void> = [];

  getState(): StoreState {
    return this.state;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  private setState(newState: Partial<StoreState>) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  actions: StoreActions = {
    increment: () => {
      this.setState({ count: this.state.count + 1 });
    },
    decrement: () => {
      this.setState({ count: this.state.count - 1 });
    },
    reset: () => {
      this.setState({ count: 0 });
    },
    setUser: (user) => {
      this.setState({ user });
    },
    clearUser: () => {
      this.setState({ user: null });
    },
    updateSettings: (settings) => {
      this.setState({ 
        settings: { ...this.state.settings, ...settings } 
      });
    },
    addTodo: (text) => {
      const newTodo = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        completed: false,
      };
      this.setState({ 
        todos: [...this.state.todos, newTodo] 
      });
    },
    toggleTodo: (id) => {
      this.setState({
        todos: this.state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      });
    },
    deleteTodo: (id) => {
      this.setState({
        todos: this.state.todos.filter(todo => todo.id !== id),
      });
    },
  };
}

const mockStore = new MockStore();

// Custom hook to use the store
const useStore = () => {
  const [state, setState] = useState(mockStore.getState());

  React.useEffect(() => {
    const unsubscribe = mockStore.subscribe(() => {
      setState(mockStore.getState());
    });
    return unsubscribe;
  }, []);

  return { ...state, ...mockStore.actions };
};

// Data Store Package Demo Component
export const DataStorePackageDemo: React.FC = () => {
  const {
    count,
    user,
    settings,
    todos,
    increment,
    decrement,
    reset,
    setUser,
    clearUser,
    updateSettings,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useStore();

  const [newTodoText, setNewTodoText] = useState('');
  const [userForm, setUserForm] = useState({ name: '', email: '' });

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const handleSetUser = () => {
    if (userForm.name && userForm.email) {
      setUser(userForm);
      setUserForm({ name: '', email: '' });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">@koios/data-store Package Demo</h1>
          <p className="text-muted-foreground">
            State management with Zustand and persistence support
          </p>
        </div>

        <Tabs defaultValue="counter" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="counter">Counter</TabsTrigger>
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="todos">Todos</TabsTrigger>
          </TabsList>

          <TabsContent value="counter" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Counter Store</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4">Count: {count}</div>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={increment}>+</Button>
                    <Button onClick={decrement}>-</Button>
                    <Button onClick={reset} variant="outline">Reset</Button>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Store State:</h4>
                  <pre className="text-sm">{JSON.stringify({ count }, null, 2)}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Store</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200">Logged In User</h4>
                      <p className="text-green-700 dark:text-green-300">Name: {user.name}</p>
                      <p className="text-green-700 dark:text-green-300">Email: {user.email}</p>
                    </div>
                    <Button onClick={clearUser} variant="outline">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={userForm.name}
                        onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                      />
                    </div>
                    <Button onClick={handleSetUser} disabled={!userForm.name || !userForm.email}>
                      Login
                    </Button>
                  </div>
                )}
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Store State:</h4>
                  <pre className="text-sm">{JSON.stringify({ user }, null, 2)}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Settings Store</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={settings.theme === 'light' ? 'default' : 'outline'}
                        onClick={() => updateSettings({ theme: 'light' })}
                        size="sm"
                      >
                        Light
                      </Button>
                      <Button
                        variant={settings.theme === 'dark' ? 'default' : 'outline'}
                        onClick={() => updateSettings({ theme: 'dark' })}
                        size="sm"
                      >
                        Dark
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Notifications</Label>
                    <Button
                      variant={settings.notifications ? 'default' : 'outline'}
                      onClick={() => updateSettings({ notifications: !settings.notifications })}
                      size="sm"
                    >
                      {settings.notifications ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Store State:</h4>
                  <pre className="text-sm">{JSON.stringify({ settings }, null, 2)}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="todos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todo Store</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    placeholder="Add a new todo..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                  />
                  <Button onClick={handleAddTodo} disabled={!newTodoText.trim()}>
                    Add Todo
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {todos.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No todos yet</p>
                  ) : (
                    todos.map(todo => (
                      <div
                        key={todo.id}
                        className={`flex items-center gap-3 p-3 border rounded-lg ${
                          todo.completed ? 'bg-muted' : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="rounded"
                        />
                        <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {todo.text}
                        </span>
                        <Badge variant={todo.completed ? 'secondary' : 'default'}>
                          {todo.completed ? 'Completed' : 'Pending'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Store State:</h4>
                  <pre className="text-sm">{JSON.stringify({ todos }, null, 2)}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Lightweight state management</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>TypeScript support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Persistence support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Immer integration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Custom hooks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Store composition</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import { createStore, useStore } from '@koios/data-store';

const useCounterStore = createStore({
  name: 'counter',
  initialState: { count: 0 },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
  },
});

function Counter() {
  const { count, increment, decrement } = useStore(useCounterStore);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
