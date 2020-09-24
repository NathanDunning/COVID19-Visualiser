import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { VectorMap } from 'react-jvectormap';
import { getDataAllCountries } from '../../services/covidServices';
import population from './population.json';
import './WorldMap.css';

export default class PerMillion extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      loading: true,
      date: new Date(),
    };
  }

  componentDidMount() {
    let populationMillion = {};
    population.forEach((country) => {
      populationMillion[country.cca2] = (country.pop2020 * 1000) / 1000000;
    });

    // API Call and processing
    getDataAllCountries().then((res) => {
      let countryCases = {};
      res.forEach((country) => {
        let active = country.confirmed - country.recovered - country.deaths;
        active >= 0 ? (country.active = active) : (country.active = 0);

        let result = country.cases / populationMillion[country.country];
        //console.log(result);
        if (isNaN(result)) result = 0;
        result === undefined
          ? (countryCases[country.country] = undefined)
          : (countryCases[country.country] = result);
        // countryCases[country.country] = data.set(country.country, country);
      });
      // Pass to map object
      const series = {
        regions: [
          {
            attribute: 'fill',
            values: countryCases,
            scale: ['#62ff54', '#ff5462'],
            normalizeFunction: 'polynomial',
          },
        ],
      };

      this.setState({
        countryCases: countryCases,
        series: series,
        loading: false,
      });
    });
  }

  switchSelectorHandler(dynamic) {
    this.setState({ dynamic: dynamic });
  }

  onRegionTipShow(e, label, code) {
    // Format numbers to have commas
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Our main data object
    const value = this.state.countryCases[code];
    if (value === undefined) {
      label.html(`
          <div class="title text-center h5"><span>${label.html()}</span></div>
          <table>
            <tbody>
              <tr>
                <td><b>No Data</b></td>
              </tr>
            </tbody>
          </table>
      `);
      return;
    }
    label.html(`
            <div class="title text-center h5"><span>${label.html()}</span></div>
            <table>
              <tbody>
                <tr>
                  <td><b>Cases / million:</b></td>
                  <td><span class="text--green">${numberWithCommas(
                    Math.round((value + Number.EPSILON) * 100) / 100
                  )}</span></td>
                </tr>
              </tbody>
            </table>
        `);
  }

  render() {
    let element;
    this.state.loading
      ? (element = (
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loader type='TailSpin' color='#00BFFF' height={100} width={100} />
          </div>
        ))
      : (element = (
          <div id='mapElem' className='block center'>
            <VectorMap
              map={'world_mill'}
              backgroundColor='#15171a'
              ref={this.mapRef}
              containerStyle={{
                height: '90%',
                width: '90%',
              }}
              containerClassName='map'
              series={this.state.series}
              onRegionTipShow={this.onRegionTipShow.bind(this)}
              zoomOnScroll={false}
            />
          </div>
        ));

    return element;
  }
}

// TODO: Link the onclick on menuSelector to here and fetch data
