import { useState } from 'react';

interface CounterProps {
  initialValue?: number;
}

export default function Counter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">React Counter Demo</h2>
      <div className="text-4xl font-bold mb-4">{count}</div>
      <div className="space-x-4">
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          -
        </button>
        <button
          onClick={() => setCount(initialValue)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
