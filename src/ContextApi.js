import React, { useState, createContext, useContext } from 'react';

export const ConvertionContext = createContext();

export const ContextProvider = ({children, data : { suppliers, categories, branches, notifications, user }}) => {

	const [contextData, setContextData] = useState({
        loading : false,
        refresh : false,
        data : {},
        currentBranchId : 0,
        product_type : [{value: 'food',label: 'Food'}, {value: 'non-food',label: 'Non Food'}]
    });

	const openLoader = () => setContextData({...contextData, loading : true});

	const closeLoader = () => setContextData({...contextData, loading : false});

	const setCurrentBranch = (id) => setContextData({...contextData, currentBranchId : id});

	const filterBranch = (row) => {
		if(contextData.currentBranchId === 0)
			return row;
		return row.filter((item) => item.branch_id === contextData.currentBranchId);
	}
	
	return (
		<ConvertionContext.Provider 
		value={{ contextData, setContextData, suppliers, categories, branches, openLoader, closeLoader, setCurrentBranch, notifications, user, filterBranch  }}>
        	{children}
    	</ConvertionContext.Provider>
	)
}

export const useInventoryContext = () => useContext(ConvertionContext);