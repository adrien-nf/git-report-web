import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "../DataContext/DataContext";
import { useSnack } from "../SnackContext/SnackContext";

interface ScriptUrlContext {
  baseUrl: string,
  identifier: string,
  fullUrl: string,
  isAutomatic: boolean,
  setIsAutomatic: React.Dispatch<React.SetStateAction<boolean>>,
  handleCopy: () => void,
}

const ScriptUrlContext = createContext<ScriptUrlContext | undefined>(undefined);

export function ScriptUrlContextProvider({ children }: { children: React.ReactNode }) {
  const { eventId, isError, isLoading } = useContext(DataContext);
  const { successSnackbar } = useSnack();
  const [isAutomatic, setIsAutomatic] = useState(true);

  const [baseUrl, identifier, fullUrl] = useMemo(() => {
    const baseUrl = `${window.location.origin}/api/script/`
    const identifier = ((isError || isLoading) || !isAutomatic) ? "static" : eventId!;
    const fullUrl = `${baseUrl}${identifier}`;
    return [baseUrl, identifier, fullUrl];
  }, [eventId, isError, isAutomatic]);


	const handleCopy = () => {
		navigator.clipboard.writeText(`sh -c "$(curl -fsSL ${fullUrl})"`);
		successSnackbar('Script successfully copied');
	}

  const contextValue = { baseUrl, identifier, fullUrl, isAutomatic, setIsAutomatic, handleCopy };

  return (
    <ScriptUrlContext.Provider value={contextValue}>
      {children}
    </ScriptUrlContext.Provider>
  )
}

export function useScriptUrl(): ScriptUrlContext {
  const context = useContext(ScriptUrlContext);
  if (!context) throw new Error('Cannot use script url context outside of provider');
  return context;
}
