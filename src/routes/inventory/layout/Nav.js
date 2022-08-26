import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../../config/services";

const NaV = () => {

    const { pathname } = useLocation();

    const activeRoute = (currentPath) =>  pathname == currentPath && 'active-tab-navigation-item';

	return (
		<div class="tab-navigation-wrapper">
          <Link 
            to={routes.reports.type1}
            class={`tab-navigation-item ${activeRoute(routes.reports.type1)}`}>
              Inventory
          </Link>


          <Link 
            to={routes.inventory.inventoryIn}
            class={`tab-navigation-item ${activeRoute(routes.inventory.inventoryIn)}`}>
              In
          </Link>

          <Link 
            to={routes.inventory.inventoryOut}
            class={`tab-navigation-item ${activeRoute(routes.inventory.inventoryOut)}`}>
             Out
          </Link>

          <Link 
            to={routes.reports.type3}
            class={`tab-navigation-item ${activeRoute(routes.reports.type3)}`}>
             New
          </Link>

    </div>
	)
}

export default NaV;