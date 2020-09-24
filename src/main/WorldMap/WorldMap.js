import React, { Component } from 'react';
import Absolute from './Absolute';
import PerMillion from './PerMillion';
import Button from '@material-ui/core/Button';
import './WorldMap.css';

export default class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      metric: 'absolute',
    };
  }

  onClick(name) {
    this.setState({ metric: name });
  }

  render() {
    const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const map =
      this.state.metric === 'absolute' ? <Absolute /> : <PerMillion />;
    return (
      <div id='test'>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <h1 style={{ textAlign: 'center', margin: 0, marginTop: '0.5rem' }}>
            COVID-19 Cases as of{' '}
            {this.state.date.toLocaleDateString('en-GB', formatOptions)}
          </h1>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '1rem',
          }}
        >
          {this.state.metric === 'absolute' ? (
            <Button
              style={{ marginRight: '0.5rem' }}
              variant='contained'
              size='small'
              color='primary'
              onClick={() => this.onClick('absolute')}
            >
              Absolute
            </Button>
          ) : (
            <Button
              style={{ marginRight: '0.5rem' }}
              variant='contained'
              size='small'
              onClick={() => this.onClick('absolute')}
            >
              Absolute
            </Button>
          )}
          {this.state.metric === 'permillion' ? (
            <Button
              style={{ marginRight: '0.5rem' }}
              variant='contained'
              size='small'
              color='primary'
              onClick={() => this.onClick('permillion')}
            >
              Per Million
            </Button>
          ) : (
            <Button
              style={{ marginRight: '0.5rem' }}
              variant='contained'
              size='small'
              onClick={() => this.onClick('permillion')}
            >
              Per Million
            </Button>
          )}
        </div>
        {map}
      </div>
    );
  }
}

// TODO: Link the onclick on menuSelector to here and fetch data
