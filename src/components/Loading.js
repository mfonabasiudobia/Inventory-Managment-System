import React from 'react';
import { useInventoryContext } from "../ContextApi";

const Loading = () => {

	const { contextData } = useInventoryContext();

	return (
		<div className={`${!contextData.loading ? 'hidden' : '' } fixed z-[2000] h-screen w-screen top-0 left-0 after:z-[2000] after:top-0 after:left-0 after:bg-black after:absolute after:h-screen after:w-screen after:opacity-70`}>

	    <div className="flex items-center justify-center h-full w-full">
	        
	        <div style={{borderTopColor: 'transparent'}} className="w-16 h-16 border-4 border-green-500 border-double rounded-full animate-spin relative z-[3000]"></div>

	    </div>

	</div>
	)
}

export default Loading;