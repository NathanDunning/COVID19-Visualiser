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
    const countryData = this.state.data.get(code)
    label.html(
      '<b>' + label.html() + '</b></br>' +
      '<b>Confirmed Cases: </b>' + numberWithCommas(countryData.confirmed) + '</br>' +
      '<b>Deaths: </b>' + numberWithCommas(countryData.deaths) + '</br>'
    );
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