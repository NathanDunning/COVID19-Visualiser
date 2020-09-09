import React, { Component } from 'react'
import {VectorMap} from 'react-jvectormap'

export default class View2 extends Component {
  render() {
    

    return (
      <div id="test">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.css" type="text/css" media="screen"/>
        <VectorMap map={'world_mill'}
                    backgroundColor="#15171a"
                    ref="map"
                    containerStyle={{
                        height: '100%'
                    }}
                    containerClassName="map"
        />
      </div>
    );
  }
}