import React, { createContext, useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

type DataContextType = {}; // a definir
type DataType = [];

function App() {
  const DataContext = createContext<DataContextType | null>({
    data: null,
    setDataContext: (data: DataType) => {},
  });

  useEffect(() => {
    window.addEventListener("storage", onLocalStorageChange);

    return () => {
      window.addEventListener("storage", onLocalStorageChange);
    };
  }, []);

  const onLocalStorageChange = (e: Event): void => {
    const { setDataContext } = useContext(DataContext);
    setDataContext(e?.target.value);
  };

  /* onst handleLocalStorage = () => {
    window.localStorage.setItem("isThisInLocalStorage", "true");
    window.dispatchEvent(new Event("storage"));
  }; */

  return <DataContext.Provider value={}></DataContext.Provider>;
}

export default App;
