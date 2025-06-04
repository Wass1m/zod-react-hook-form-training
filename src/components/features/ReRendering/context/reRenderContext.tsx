import { createContext, useContext, useMemo, useState } from "react";

type ReRenderingContextType = {
  firstName: string;
  setFirstName: (name: string) => void;
};

const defaultValue: ReRenderingContextType = {
  firstName: "",
  setFirstName: () => {},
};

const ReRenderingContext = createContext<ReRenderingContextType>(defaultValue);

export function ReRenderingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [firstName, setFirstName] = useState("");

  const value = useMemo(() => ({ firstName, setFirstName }), [firstName]);

  return (
    <ReRenderingContext.Provider value={value}>
      {children}
    </ReRenderingContext.Provider>
  );
}

export function useFirstName(): ReRenderingContextType {
  const context = useContext(ReRenderingContext);
  if (!context) {
    throw new Error("useFirstName must be used within a FirstNameProvider");
  }
  return context;
}
