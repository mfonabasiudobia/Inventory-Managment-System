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
              <i class="las la-greater-than-equal"></i> 50 Boxes
          </Link>


          <Link 
            to={routes.reports.type2}
            class={`tab-navigation-item ${activeRoute(routes.reports.type2)}`}>
              <i class="las la-greater-than-equal"></i> 50 Boxes (nExp)
          </Link>

          <Link 
            to={routes.reports.type3}
            class={`tab-navigation-item ${activeRoute(routes.reports.type3)}`}>
              Near Expiry
          </Link>

          <Link 
            to={routes.reports.type4}
            class={`tab-navigation-item ${activeRoute(routes.reports.type4)}`}>
              Near Expiry - Food
          </Link>

          <Link 
            to={routes.reports.type5}
            class={`tab-navigation-item ${activeRoute(routes.reports.type5)}`}>
              Near Expiry - Non Food
          </Link>

          <Link 
            to={routes.reports.type6}
            class={`tab-navigation-item ${activeRoute(routes.reports.type6)}`}>
               Last Out
          </Link>

          <Link 
            to={routes.reports.type7}
            class={`tab-navigation-item ${activeRoute(routes.reports.type7)}`}>
              No Out
          </Link>

          <Link 
            to={routes.reports.type8}
            class={`tab-navigation-item ${activeRoute(routes.reports.type8)}`}>
              Average Qty
          </Link>

          <Link 
            to={routes.reports.type9}
            class={`tab-navigation-item ${activeRoute(routes.reports.type9)}`}>
              Availability + Expiry
          </Link>


          <Link 
            to={routes.reports.type10}
            class={`tab-navigation-item ${activeRoute(routes.reports.type10)}`}>
              Availability + No Expiry
          </Link>
    </div>
	)
}

export default NaV;