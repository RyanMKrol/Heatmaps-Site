import React, { Component } from 'react'
import fetch from 'node-fetch'

import { HeatmapItem, LoadingIcon, Error } from './../components'
import baseEndpoint from './../utils'

import './Heatmaps.css'

const HEATMAPS_ENDPOINT = `${baseEndpoint()}/heatmap/`

// A certain amount of the data is corrupt resulting in large % changes, so
// i'm filtering these out
const ERRONEOUS_CHANGE = 1000

class Heatmaps extends Component {
  constructor(props) {
    super()

    this.state = {
      heatmapData: undefined
    }

    this.updateHeatmapData(props.timePeriod)
  }

  // compare function for sorting heatmap items
  heatmapItemComparator(heatmapItemA, heatmapItemB) {
    return heatmapItemA.change < heatmapItemB.change ? 1 : -1
  }

  // generates heatmap items to display the data
  generateHeatmapItems() {
    if (typeof this.state.heatmapData === 'undefined') {
      return <LoadingIcon />
    }
    if (this.state.heatmapData.error !== undefined) {
      return <Error />
    }

    const heatmapDataSorted = this.state.heatmapData.sort(
      this.heatmapItemComparator
    )
    const heatmapsFiltered = heatmapDataSorted.filter(
      item => item.change < ERRONEOUS_CHANGE
    )

    return heatmapsFiltered.map(heatmapItem => (
      <HeatmapItem
        key={`${heatmapItem.ticker}-${this.props.timePeriod}`}
        ticker={heatmapItem.ticker}
        change={heatmapItem.change}
      />
    ))
  }

  // makes the api calls to fetch heatmap data
  updateHeatmapData(timePeriod) {
    fetch(`${HEATMAPS_ENDPOINT}/${timePeriod}`)
      .then(response => {
        return response.json()
      })
      .then(heatmapData => {
        this.setState({
          heatmapData
        })
      })
  }

  // only update the page if there's a new time period, or heatmap items have been updated
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.timePeriod !== this.props.timePeriod) {
      const timePeriod = nextProps.timePeriod
      this.updateHeatmapData(timePeriod)

      return true
    }
    if (JSON.stringify(nextState) !== JSON.stringify(this.state)) {
      return true
    }

    return false
  }

  render() {
    const content = this.generateHeatmapItems()

    return <div className="Heatmaps-page-body">{content}</div>
  }
}

export default Heatmaps
