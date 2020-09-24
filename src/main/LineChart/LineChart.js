import React, { Component } from 'react';
import { render } from 'react-dom';
import { scaleLinear, scaleBand } from 'd3-scale';
import XYAxis from './xy-axis';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


import Line from './Line';

export default class LineChart extends Component {

  constructor() {
    super();
    this.state = {
      data: [
        { name: 'Jan', value: 30 },
        { name: 'Feb', value: 10 },
        { name: 'Mar', value: 50 },
        { name: 'Apr', value: 20 },
        { name: 'May', value: 80 },
        { name: 'Jun', value: 30 },
        { name: 'July', value: 0 },
        { name: 'Aug', value: 20 },
        { name: 'Sep', value: 100 },
        { name: 'Oct', value: 55 },
        { name: 'Nov', value: 60 },
        { name: 'Dec', value: 80 },
      ],
      data2: [
        { name: 'Jan', value: 40 },
        { name: 'Feb', value: 60 },
        { name: 'Mar', value: 30 },
        { name: 'Apr', value: 10 },
        { name: 'May', value: 90 },
        { name: 'Jun', value: 70 },
        { name: 'July', value: 60 },
        { name: 'Aug', value: 20 },
        { name: 'Sep', value: 90 },
        { name: 'Oct', value: 80 },
        { name: 'Nov', value: 90 },
        { name: 'Dec', value: 20 },
      ],
    }
  }

  render() {
    const { data, data2 } = this.state;
    const parentWidth = 1200;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 500 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.value))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x(d => xScale(d.name))
      .y(d => yScale(d.value))
      .curve(curveMonotoneX);

    const options = ['Cases', 'Deaths']
    const options2 = ['New', 'Total']
    const options3 = ['Absolute', 'Per Million']

    return (
      <div>
        <h2>Line Chart</h2>
        {/* Toggles for countries */}

{/* https://material-ui.com/components/ MAKE IT CLEANs */}
        {/* Drop down for data type [cases, deaths (new/total(absolute/per_million))] */}
        <Dropdown options={options} onChange={this._onSelect} value={options[0]} placeholder="Select an option" />

        {/* Slider / date pickers for time range */}
        <div>
          <svg
            className="lineChartSvg"
            width={width + margins.left + margins.right}
            height={height + margins.top + margins.bottom}
          >
            <g transform={`translate(${margins.left}, ${margins.top})`}>
              <XYAxis {...{ xScale, yScale, height, ticks, t }} />
              <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
            </g>
          </svg>
        </div>
      </div>
    );
  }
}
