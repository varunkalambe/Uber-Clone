import { createContext, useState, useContext } from 'react';

// Create the context
export const CaptainDataContext = createContext();

// Create the context provider component
const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };
    // Context values and functions
    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;
