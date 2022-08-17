import React from 'react';
import { Link } from "react-router-dom";
import { routes } from "../config/services";

const Sidebar = () => {
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
            <Link to={routes.suppliers} title="New Items">
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
            <Link to="{{route('notification.create')}}" title="Notification">
                <i class="las la-bell"></i>
            </Link>
        </li>


         <li>
            <Link to={routes.logs} title="Error Logs">
               <i class="las la-exclamation-circle"></i>
            </Link>
        </li>


          {/*<li class="relative" x-data="{show : false}">
            <Link to="javascript:void(0)" title="Archive" x-on:click="show = !show">
               <i class="las la-archive"></i>
            </Link>
            <div x-cloak class="absolute bg-white shadow-xl top-0 z-50 -right-[150px] rounded p-2 whitespace-nowrap" x-show="show" @click.away="show = false">
                <div>
                    <Link to="{{route('archive_in')}}" title="Error Logs" class="block text-black text-sm py-2 hover:bg-gray-50">
                       Inventory Archive
                    </Link>
                </div>
                 <div>
                    <Link to="{{route('orders.internal.archives')}}" title="Error Logs" class="block text-black text-sm py-2 hover:bg-gray-50">
                       Order Archive
                    </Link>
                </div>
            </div>
        </li>*/}

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
            <Link to="{{route('settings')}}" title="Settings">
                <i class="las la-cog"></i>
            </Link>
        </li>
    </ul>
</section>
	)
}

export default Sidebar