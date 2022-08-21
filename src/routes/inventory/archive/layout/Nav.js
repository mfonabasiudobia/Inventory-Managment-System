import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../../../config/services";

const NaV = () => {

    const { pathname } = useLocation();

    const activeRoute = (currentPath) =>  pathname == currentPath && 'active-tab-navigation-item';

	return (
		<div class="tab-navigation-wrapper">
          <Link 
            to={routes.inventory.archiveIn}
            class={`tab-navigation-item ${activeRoute(routes.inventory.archiveIn)}`}>
              In
          </Link>

          <Link 
            to={routes.inventory.archiveOut}
            class={`tab-navigation-item ${activeRoute(routes.inventory.archiveOut)}`}>
              Out
          </Link>
    </div>
	)
}

export default NaV;