import React, { Component } from "react";
import Dropdown from "react-dropdown";
import CanvasJSReact from "./canvasjs.react";
import Loader from "react-loader-spinner";
import { getTimelineByCountry, getCountries } from "../../services/covidServices";
import "react-dropdown/style.css";
import Select from "react-select";
import { interpolateInferno } from "d3";


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class LineChart extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      metric: "cases",
      countries: [
        {
          label: "New Zealand",
          value: "NZ"
        },
        {
          label: "Australia",
          value: "AU"
        }
      ],
      countriesAll: [],
      loading: true,
    };
  }

  async getCountriesLoc() {
    let countriesAll = [];
    await getCountries().then(res => {
      res.forEach((c) => {
        countriesAll.push({
          label: c.name,
          value: c.alpha2
        });
      });
    });

    const values = await Promise.all(
      this.state.countries.map((country) => getTimelineByCountry(country.value))
    ).then(values => {
      return values.map(countryData => {
        return {
          dataPoints: countryData.map((row) => {
            return {
              x: new Date(row.last_update.substring(0, 10)),
              y: row[this.state.metric],
            };
          }),
          name: countryData[0].country, //Get the name
          showInLegend: true,
          type: "line",
          xValueFormatString: "DD MMM YYYY",
        };
      })
    })
    this.setState({
      countriesAll: countriesAll,
      data: values,
      loading: false,
    });
  }

  componentDidMount() {
    this.getCountriesLoc();
  } 

  render() {
    if(this.state.loading){
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
        </div>
      );
    }
    
    const options = [
      {
        label: "Cases",
        value: "cases"
      },
      {
        label: "Deaths",
        value: "deaths"
      }
    ];
    //console.log(this.state.data)

    var chartOptions = {
      
      theme: "dark2",
      backgroundColor: "#15171a",
      animationEnabled: true,
      zoomEnabled: true,
      width: 1000,
      title: {
        text: "Countries COVID-19 Cases Over Time",
      },
      axisY: {
        gridColor: "#525252",
        title: this.state.metric,
      },
      axisX: {
        title: "Date",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "center",
        dockInsidePlotArea: true,
      },
      data: this.state.data,
    };

    const containerProps =  {
      display: "inline-block",
      width: 1000,
      marginTop: 50,
      marginBottom: 50,
    }

    return (
      <div style={{width: "100%", textAlign: "center"}}>
        <CanvasJSChart options={chartOptions} containerProps={containerProps} />
        <Select
          // styles={{placeholder: "Select countries to view"}}
          className="countryPicker"
          isMulti
          name="colors"
          options={this.state.countriesAll}
          defaultValue={this.state.countries}
          onChange={(val) => {
            val != null ? this.setState({ countries: val }) : this.setState({countries: []})
            this.getCountriesLoc();
          }}
        />
      </div>
    );
  }
}