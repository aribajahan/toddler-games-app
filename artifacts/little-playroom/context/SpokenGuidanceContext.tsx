import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@little-playroom/spoken-guidance';

type SpokenGuidanceContextValue = {
  isLoaded: boolean;
  spokenGuidanceEnabled: boolean;
  setSpokenGuidanceEnabled: (enabled: boolean) => void;
};

const SpokenGuidanceContext = createContext<SpokenGuidanceContextValue | null>(null);

export function SpokenGuidanceProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [spokenGuidanceEnabled, setEnabled] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((storedValue) => {
        if (storedValue === 'false') setEnabled(false);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const setSpokenGuidanceEnabled = useCallback((enabled: boolean) => {
    setEnabled(enabled);
    void AsyncStorage.setItem(STORAGE_KEY, String(enabled));
  }, []);

  const value = useMemo(
    () => ({ isLoaded, spokenGuidanceEnabled, setSpokenGuidanceEnabled }),
    [isLoaded, setSpokenGuidanceEnabled, spokenGuidanceEnabled],
  );

  return <SpokenGuidanceContext.Provider value={value}>{children}</SpokenGuidanceContext.Provider>;
}

export function useSpokenGuidance() {
  const context = useContext(SpokenGuidanceContext);
  if (!context) throw new Error('useSpokenGuidance must be used inside SpokenGuidanceProvider');
  return context;
}