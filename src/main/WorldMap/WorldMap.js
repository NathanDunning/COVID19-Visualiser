import React, { Component } from 'react';
import SwitchSelector from '../../components/switchSelector';
import DynamicMap from './DynamicMap';
import StaticMap from './StaticMap';
import './WorldMap.css';

export default class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      dynamic: false,
    };
  }

  switchSelectorHandler() {
    this.setState((prev) => ({ dynamic: !prev.dynamic }));
  }

  render() {
    const element = this.state.dynamic ? <DynamicMap /> : <StaticMap />;
    return (
      <div>
        <SwitchSelector
          label='Dynamic'
          checked={this.state.dynamic}
          onChange={this.switchSelectorHandler.bind(this)}
        />
        {element}
      </div>
    );
  }
}

// TODO: Link the onclick on menuSelector to here and fetch data
