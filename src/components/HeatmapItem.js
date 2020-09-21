import React, { Component } from 'react'

import './HeatmapItem.css'

// the % saturation of colour at full saturation
const FULL_SATURATION_PERCENT = 50

// the % change required to reach full saturation
const FULL_SATURATION_THRESHOLD = 30

// the size of the buckets that will result in the same colour
const SATURATION_BUCKET_WIDTH = 5

class HeatmapItem extends Component {
  // returns the change to 2 decimal places
  generateTruncatedChange(change) {
    return Math.round(parseFloat(change) * 100) / 100
  }

  // returns the background colour string for a positive % change
  _generatePositiveBackgroundString(percentChange) {
    return `hsl(120, 100%, ${percentChange}%)`
  }

  // returns the background colour string for a negative % change
  _generateNegativeBackgroundString(percentChange) {
    return `hsl(0, 100%, ${percentChange}%)`
  }

  // generates the colour for an individual heatmap item
  generateBackgroundColour(change) {
    const absoluteChange = parseInt(Math.abs(change))

    if (absoluteChange > FULL_SATURATION_THRESHOLD) {
      // anything over the limit will be fully green
      return change > 0
        ? this._generatePositiveBackgroundString(FULL_SATURATION_PERCENT)
        : this._generateNegativeBackgroundString(FULL_SATURATION_PERCENT)
    } else {
      // anything under the limit will be scaled using hsl css
      const bucketedSaturationPercent =
        parseInt(absoluteChange / SATURATION_BUCKET_WIDTH) *
        SATURATION_BUCKET_WIDTH
      const saturationPercent =
        FULL_SATURATION_PERCENT +
        (FULL_SATURATION_THRESHOLD - bucketedSaturationPercent) *
          (FULL_SATURATION_PERCENT / FULL_SATURATION_THRESHOLD)

      return change > 0
        ? this._generatePositiveBackgroundString(saturationPercent)
        : this._generateNegativeBackgroundString(saturationPercent)
    }
  }

  render() {
    const styles = {
      backgroundColor: this.generateBackgroundColour(this.props.change)
    }

    if (
      !(
        typeof this.props.ticker !== 'undefined' &&
        typeof this.props.change !== 'undefined'
      )
    ) {
      throw new Error(
        'Did not pass all required args for rendering HeatmapItem'
      )
    }

    return (
      <div style={styles} className="HeatmapItem">
        <p className="HeatmapItem-content">
          <span className="HeatmapItem-ticker">{this.props.ticker}</span>
          <br />
          <span className="HeatmapItem-change">
            {this.generateTruncatedChange(this.props.change)}%
          </span>
        </p>
      </div>
    )
  }
}

export default HeatmapItem
