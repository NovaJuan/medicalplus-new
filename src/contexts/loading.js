import { createContext, useContext, useState } from "react";

import LoadingSpinner from "../components/shared/LoadingSpinner";

export const LoadingContext = createContext();

export const useLoading = () => {
  const { setLoading } = useContext(LoadingContext);

  return setLoading;
};

export function LoadingContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <LoadingSpinner />}
    </LoadingContext.Provider>
  );
}
