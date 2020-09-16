import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import { VectorMap } from 'react-jvectormap'
import { getDataAllCountries } from '../services/covidServices'
import "./WorldMap.css"

export default class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef()
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    // API Call and processing
    getDataAllCountries().then(res => {
      let countryCases = {}
      let data = new Map()
      res.forEach(country => {
        let active = country.confirmed - country.recovered - country.deaths
        active >= 0 ? country.active = active : country.active = 0

        countryCases[country.code] = country.confirmed
        data.set(country.code, country)
      })

      // Pass to map object
      const series = {
        regions: [{
          values: countryCases,
          scale: ['#C8EEFF', '#0071A4'],
          normalizeFunction: 'polynomial'
        }]
      }

      this.setState({ data: data, countryCases: countryCases, series: series, loading: false })
    })
  }

  onRegionTipShow(e, label, code) {
    // Format numbers to have commas
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Our main data object
    var countryData = this.state.data.get(code)
    if (countryData === undefined) {
      countryData = {
        confirmed: 'unknown',
        recovered: 'unknown',
        active: 'unknown',
        critical: 'unknown',
        deaths: 'unknown'
      }
    }
    label.html(`
        <div class="title text-center h5"><span>${label.html()}</span></div>
        <table>
          <tbody>
            <tr>
              <td><b>Confirmed:</b></td>
              <td><span class="text--green">${numberWithCommas(countryData.confirmed)}</span></td>
            </tr>
            <tr>
              <td><b>Recovered:</b></td>
              <td><span class="text--blue">${numberWithCommas(countryData.recovered)}</span></td>
            </tr>
            <tr>
              <td><b>Active:</b></td>
              <td><span class="text--yellow">${numberWithCommas(countryData.active)}</span></td>
            </tr>
            <tr>
              <td><b>Critical:</b></td>
              <td><span class="text--orange">${numberWithCommas(countryData.critical)}</span></td>
            </tr>
            <tr>
              <td><b>Deaths:</b></td>
              <td><span class="text--red">${numberWithCommas(countryData.deaths)}</span></td>
            </tr>
          </tbody>
        </table>
    `);
    // Can add more here if we want (check the countryData object, contains juicy stuff)
  }

  render() {
    const loading = this.state.loading
    let element;
    loading ?
      element = <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
      />
      :
      element = <VectorMap
        map={'world_mill'}
        backgroundColor="#15171a"
        ref={this.mapRef}
        containerStyle={{
          height: '90%',
          width: '90%'
        }}
        containerClassName="map"
        series={this.state.series}
        onRegionTipShow={this.onRegionTipShow.bind(this)}
        zoomOnScroll={false}
      />

    return (
      <div id="test">
        {/** Can change this to a drop arrow in future if we want
         * TODO: Can also add legends
         */}
        <div id="title"><h2>Cases and Deaths per Country</h2></div>
        <div id="mapElem" className="block center">
          {element}
        </div>
      </div>
    );
  }
}