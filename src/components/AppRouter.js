import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import {
  Heatmaps,
} from "./../pages"

import {
  Header,
  Footer,
} from '.'

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
              pathname: "/heatmap/two_year",
            }}
          />
          </Route>
          <Route path="/heatmap/one_month">
            <Heatmaps timePeriod='one_month' />
          </Route>
          <Route path="/heatmap/three_month">
            <Heatmaps timePeriod='three_month' />
          </Route>
          <Route path="/heatmap/six_month">
            <Heatmaps timePeriod='six_month' />
          </Route>
          <Route path="/heatmap/one_year">
            <Heatmaps timePeriod='one_year' />
          </Route>
          <Route path="/heatmap/two_year">
            <Heatmaps timePeriod='two_year' />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}
