import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { VectorMap } from 'react-jvectormap';
import { getDataAllCountries } from '../../services/covidServices';
import './WorldMap.css';

export default class Absolute extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      loading: true,
      date: new Date(),
    };
  }

  componentDidMount() {
    // API Call and processing
    getDataAllCountries().then((res) => {
      let countryCases = {};
      let data = new Map();
      res.forEach((country) => {
        let active = country.confirmed - country.recovered - country.deaths;
        active >= 0 ? (country.active = active) : (country.active = 0);

        countryCases[country.country] = country.cases;
        data.set(country.country, country);
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
        data: data,
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
    var countryData = this.state.data.get(code);
    if (countryData === undefined) {
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
              <td><b>Cases:</b></td>
              <td><span class="text--green">${numberWithCommas(
                countryData.cases
              )}</span></td>
            </tr>
            <tr>
              <td><b>Recovered:</b></td>
              <td><span class="text--blue">${numberWithCommas(
                countryData.recovered
              )}</span></td>
            </tr>
            <tr>
              <td><b>Deaths:</b></td>
              <td><span class="text--yellow">${numberWithCommas(
                countryData.deaths
              )}</span></td>
            </tr>
          </tbody>
        </table>
    `);
    // Can add more here if we want (check the countryData object, contains juicy stuff)
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
