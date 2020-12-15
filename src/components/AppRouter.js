import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { Heatmaps } from './../pages'

import { Header, Footer } from '.'

import './AppRouter.css'

export default function AppRouter() {
  return (
    <div id="root-container">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect
              to={{
                pathname: '/heatmap/TWO_YEAR'
              }}
            />
          </Route>
          <Route path="/heatmap/ONE_MONTH">
            <Heatmaps timePeriod="ONE_MONTH" />
          </Route>
          <Route path="/heatmap/THREE_MONTH">
            <Heatmaps timePeriod="THREE_MONTH" />
          </Route>
          <Route path="/heatmap/SIX_MONTH">
            <Heatmaps timePeriod="SIX_MONTH" />
          </Route>
          <Route path="/heatmap/ONE_YEAR">
            <Heatmaps timePeriod="ONE_YEAR" />
          </Route>
          <Route path="/heatmap/TWO_YEAR">
            <Heatmaps timePeriod="TWO_YEAR" />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}
