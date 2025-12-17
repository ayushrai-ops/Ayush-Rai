import React from 'react';
import { CelebrationConfig } from '../types';

interface SuccessProps {
  config: CelebrationConfig | null;
  loading: boolean;
}

const Success: React.FC<SuccessProps> = ({ config, loading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50 px-6 text-center">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-4 border-rose-200 animate-fade-in-up">
        <div className="mb-6">
           <img 
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
            alt="Celebration" 
            className="w-48 h-48 mx-auto object-contain"
           />
        </div>

        <h1 className="text-4xl font-handwriting text-rose-600 font-bold mb-4">
          YAYYY! 🎉
        </h1>
        
        {loading ? (
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-rose-400 font-medium">Asking the love cupid for a plan...</p>
            </div>
        ) : (
            <div className="space-y-6">
                <p className="text-xl text-gray-700 font-bold">
                    {config?.message}
                </p>
                
                <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                    <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-2">Our Date Plan</h3>
                    <p className="text-gray-600 italic font-medium">
                        "{config?.dateIdea}"
                    </p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Success;