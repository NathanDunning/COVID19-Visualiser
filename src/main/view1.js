import React, { Component } from 'react'
import BarChart from "../components/barchart"

export default class View1 extends Component {

  render() {
    return (
        <div>
          <h2>View 1</h2>
          <BarChart
            data={[1,2,3,2,1]}
            size={[500,500]}
          />
        </div>
    );
  }
}