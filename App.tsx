import React, { useState, useCallback } from 'react';
import AskDate from './components/AskDate';
import Success from './components/Success';
import { generateDateIdea } from './services/geminiService';
import { AppState, CelebrationConfig } from './types';

const PARTNER_NAME = "Sakshi";

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ASKING);
  const [celebrationConfig, setCelebrationConfig] = useState<CelebrationConfig | null>(null);

  const handleYes = useCallback(async () => {
    setAppState(AppState.LOADING_AI);
    
    // We start the AI generation but show the success screen immediately in a loading state
    // to keep the UX snappy.
    try {
      const config = await generateDateIdea(PARTNER_NAME);
      setCelebrationConfig(config);
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error("Failed to generate AI content", error);
      // Fallback in case of error
      setCelebrationConfig({
        message: `I knew you'd say yes, ${PARTNER_NAME}! ❤️`,
        dateIdea: "Ramen date followed by ice cream it is!"
      });
      setAppState(AppState.SUCCESS);
    }
  }, []);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 overflow-hidden relative">
        {/* Floating Background Hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute text-rose-300 opacity-30 animate-pulse"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 2 + 1}rem`,
                        animationDelay: `${Math.random() * 5}s`,
                        transform: `rotate(${Math.random() * 360}deg)`
                    }}
                >
                    ♥
                </div>
            ))}
        </div>

        <div className="relative z-10">
            {appState === AppState.ASKING && (
                <AskDate onYes={handleYes} partnerName={PARTNER_NAME} />
            )}
            
            {(appState === AppState.LOADING_AI || appState === AppState.SUCCESS) && (
                <Success 
                    config={celebrationConfig} 
                    loading={appState === AppState.LOADING_AI} 
                />
            )}
        </div>
    </main>
  );
};

export default App;