import React, { useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { routes, axios, moment } from "../config/services";
import { useInventoryContext } from "../ContextApi";

const Header = () => {

    const [ profileDropdown, setProfileDropDown ] = useState(false);
    const [ notificationDropdown, setNotificationDropDown ] = useState(false);
    const [ branchDropdown, setBranchDropdown ] = useState(false);

    const navigate = useNavigate();
    const ref = useDetectClickOutside({ onTriggered: () => setProfileDropDown(false) });
    const branchRef = useDetectClickOutside({ onTriggered: () => setBranchDropdown(false) });
    const notificationRef = useDetectClickOutside({ onTriggered: () => setNotificationDropDown(false) });

    const logout = async () => {
        const logout = await axios.get("user/auth/logout");
        return navigate("/");
    }


    const { contextData, setContextData, branches, setCurrentBranch, notifications, user } = useInventoryContext();



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
        <button class="py-3 px-5 border-l center-align space-x-2 relative" ref={branchRef} onClick={() => setBranchDropdown(!branchDropdown) }>
                <i class="las la-map-marker-alt text-2xl"></i>
                
                <span>{ contextData.currentBranchId == 0 ? 'Inventory' : 
                branches.find((item) => item.id == contextData.currentBranchId).name}</span>
                
                <div class={`dropdown-wrapper w-40 ${!branchDropdown && 'hidden'}`}>
                 <button onClick={() => setCurrentBranch(0)} class="dropdown-item left-0">Inventory</button>
                 {branches.map((item, index) => {
                    return <button onClick={() => setCurrentBranch(item.id)} class="dropdown-item left-0">{item.name}</button>
                 })}
                </div>
                <i class="las la-angle-down font-bold"></i>
        </button>

        <button 
            ref={notificationRef}
            onClick={() => setNotificationDropDown(!notificationDropdown) }
            class="header-btn relative">
                <i class="las la-bell text-2xl "></i>
                <span class="text-red-500 text-xs absolute top-3 right-4">{notifications.filter((item) => item.is_read === 0).length}</span>

                <div class={`dropdown-wrapper -left-[250px] w-[300px] text-left ${!notificationDropdown && 'hidden'}`}>
                        <header class="bg-gray-50 p-2 font-bold">
                            Notifications
                        </header>
                        <main class="max-h-[400px] overflow-y-auto">
                            {notifications.map((item, index) => 
                                <Link to={'/notification/' + item.id} class="p-3 border-b text-sm block">
                                        <div>
                                            <div>
                                                <strong>
                                                    {item.notification_type.title}
                                                    {!item.is_read && <span class="text-red-500 text-xl">&bull;</span>}
                                                </strong>
                                            </div>
                                            <div>
                                                {item.notification_type.message}
                                            </div>
                                        </div>
                                        <small class="text-xs">
                                            {moment(item.created_at).format('d MMM, Y')}
                                        </small>
                                </Link> 
                             )}
                            {notifications.length == 0 && <div class="text-center py-3">No notifications found</div>}
                        </main>
                        {/*<header class="bg-gray-50 p-2 text-center">
                            View All Notifications
                        </header>*/}
                </div>

        </button>

        <button class="py-3 px-3 border-l relative" ref={ref} onClick={() => setProfileDropDown(!profileDropdown) }>
            <div class="rounded-full center-align h-10 w-10 bg-gray-300 text-white text-xl">
                {user?.user?.user_group?.split(' ')?.map(item => item[0])}
            </div>

            <div class={`dropdown-wrapper -left-[100px] w-40 ${!profileDropdown && 'hidden'}`} >
                <Link to={routes.profile} class="dropdown-item">Profile</Link>
                <button onClick={() => logout()} class="dropdown-item">Logout</button>
            </div>
        </button>
    </div>
</section>
</div>

	)
}

export default Header;