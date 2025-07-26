import { useEffect } from 'react';

export default function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-greenAccent text-black px-6 py-3 rounded shadow-lg animate-fadeInOut z-50">
      {message}
      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
        .animate-fadeInOut {
          animation: fadeInOut ${duration}ms ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
