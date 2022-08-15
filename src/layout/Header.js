import React from 'react'
// import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div>
<section class="flex justify-between items-center bg-gray-50 w-full h-14 ">
    <div class="flex items-center">

        <button class="header-btn"  title="Mass Execution">
                <i class="las la-save text-2xl"></i>
        </button>

        <button class="header-btn" 
                title="Automatic Transfer">
                <i class="las la-exchange-alt text-2xl"></i>
        </button>
 

        <button class="header-btn" title="Archive">
               <i class="las la-archive text-2xl"></i>
        </button>
       
        <button class="header-btn" title="Refresh">
                <i class="las la-redo-alt text-2xl"></i>
        </button>

    </div>

    <div class="flex items-center">
        

        <button class="py-3 px-5 border-l center-align space-x-2 relative" >
                <i class="las la-map-marker-alt text-2xl"></i>
                    {/*<span>Inventory</span>
                
                <div class="dropdown-wrapper w-40">
                 <Link to="/" class="dropdown-item left-0" >Inventory</Link>
                </div>*/}
                <i class="las la-angle-down font-bold"></i>
        </button>

        <button 
            class="header-btn relative">
                <i class="las la-bell text-2xl "></i>
                <span class="text-red-500 text-xs absolute top-3 right-4">5</span>
        </button>

        <button class="py-3 px-3 border-l relative">
            <div class="rounded-full center-align h-10 w-10 bg-gray-300 text-white text-xl">
                SA
            </div>

            {/*<div> 
                <Link to="/" class="dropdown-item">Profile</Link>
                <Link to="/" class="dropdown-item">Logout</Link>
            </div>*/}
        </button>
    </div>
</section>
</div>

	)
}

export default Header;