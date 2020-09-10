import React, { Component } from 'react'
import {VectorMap} from 'react-jvectormap'

export default class View2 extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef()
  }

  render() {
    

    return (
      <div id="test">
        <div><h1>Title for view</h1></div>
        <VectorMap map={'world_mill'}
                    backgroundColor="#15171a"
                    ref={this.mapRef}
                    containerStyle={{
                        height: '90%',
                        width: '90%'
                    }}
                    containerClassName="map"
                    zoomOnScroll={false}
        />
      </div>
    );
  }
}