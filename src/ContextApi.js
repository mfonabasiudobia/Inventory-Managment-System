import React, { useState, createContext, useContext } from 'react';

export const ConvertionContext = createContext();

export const ContextProvider = ({children}) => {

	const [contextData, setContextData] = useState({
        loading : false,
        refresh : false,
        data : {},
    });

	return (
		<ConvertionContext.Provider value={{ contextData, setContextData }}>
        	{children}
    	</ConvertionContext.Provider>
	)
}

export const useInventoryContext = () => useContext(ConvertionContext);