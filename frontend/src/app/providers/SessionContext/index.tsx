import { useState, createContext, ReactNode, useContext } from "react";

const SessionContext = createContext({} as SessionContextInterface);

const Provider = SessionContext.Provider;

interface SessionContextInterface {
  session: ObjSessionContextInterface;
  setSession: (a: any) => void;
}

interface ObjSessionContextInterface {
  token: string;
  userName: string;
  ADM: boolean;
}

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<ObjSessionContextInterface>(
    JSON.parse(window.localStorage.getItem("sessionData") as string) || {
      token: "",
      userName: "",
      ADM: false,
    }
  );

  return <Provider value={{ session, setSession }}>{children}</Provider>;
};

export const useSession = () => useContext(SessionContext);
