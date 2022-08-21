import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { routes } from "../config/services";
import { useDetectClickOutside } from 'react-detect-click-outside';

const Sidebar = () => {

    const [ archiveDropdown, setArchiveDropDown ] = useState(false);

    const archiveRef = useDetectClickOutside({ onTriggered: () => setArchiveDropDown(false) });


	return (
		<section class="h-screen bg-black p-4 space-y-5">
    <header>
        <img src="/logo.svg" alt="" />
    </header>

    <ul class="sidebar">
        <li>
            <Link to="{{route('inventory')}}" title="Inventory">
                <i class="las la-store"></i>
            </Link>
        </li>

         <li>
            <Link to="{{route('orders.internal')}}" title="Orders">
               <i class="las la-shopping-bag"></i>
            </Link>
        </li>

        <li>
            <Link to={routes.addNewItem} title="New Items">
               <i class="las la-plus"></i>
            </Link>
        </li>

         <li>
            <Link to={routes.suppliers} title="Suppliers">
                <i class="las la-male"></i>
            </Link>
        </li>

        <li>
            <Link to={routes.categories} title="Product Category">
                <i class="las la-icons"></i>
            </Link>
        </li>

        <li>
            <Link to={routes.notifications} title="Notification">
                <i class="las la-bell"></i>
            </Link>
        </li>


         <li>
            <Link to={routes.logs} title="Error Logs">
               <i class="las la-exclamation-circle"></i>
            </Link>
        </li>

        <li class="relative">
            <button  title="Archive" ref={archiveRef} onClick={() => setArchiveDropDown(!archiveDropdown) }>
               <i class="las la-archive text-3xl text-white"></i>
            </button>
            <div 
            class={`absolute bg-white shadow-xl top-0 z-50 -right-[150px] rounded p-2 whitespace-nowrap ${!archiveDropdown && 'hidden'}`}>
                <div>
                    <Link to={routes.inventory.archiveIn} title="Error Logs" class="block text-black text-sm py-2 hover:bg-gray-50">
                       Inventory Archive
                    </Link>
                </div>
                 <div>
                    <Link to={routes.inventory.archiveIn} title="Error Logs" class="block text-black text-sm py-2 hover:bg-gray-50">
                       Order Archive
                    </Link>
                </div>
            </div>
        </li>

         <li>
            <Link to={routes.reports.type1} title="Reports">
               <i class="las la-file-invoice"></i>
            </Link>
        </li>

        <li>
            <Link to={routes.users.home} title="User Management">
               <i class="las la-users"></i>
            </Link>
        </li>

        <li>
            <Link to={routes.settings} title="Settings">
                <i class="las la-cog"></i>
            </Link>
        </li>
    </ul>
</section>
	)
}

export default Sidebar