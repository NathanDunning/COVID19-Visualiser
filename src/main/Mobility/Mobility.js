import React, { Component } from 'react'
import { getMobility, getMobilityCountries } from '../../services/covidServices'
import { XAxis, YAxis, CartesianGrid, Tooltip, Brush,
  AreaChart, Area, BarChart, Bar
} from 'recharts';
import Loader from 'react-loader-spinner'
import "./Mobility.css"
import CMap from '../../services/countries.json';
import Select from 'react-select'

export default class Mobility extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      country: '',
      countryOptions: [],
      loading: true
    }
  }

  componentDidMount() {
    this.setCountryOptions();
    this.fetchMobility('NZ');
  }

  setCountryOptions() {
    getMobilityCountries().then(res => {

      const key = res.columns.indexOf('key');
      // Create Objects
      var objectArray = [];
      for(var i = 1; i < 6263; i++){
        var row = res.data[i];
        var value = row[key];
        var text = CMap[value];

        if(value.includes('_')) continue;
        
        var object = '{ "value" : "' + value + 
                  '", "label" : "' + text + 
                  '"}'

        objectArray[objectArray.length] = JSON.parse(object);
      }

      this.setState({
        countryOptions: objectArray,
        loading: false
      })
    })
  }

  fetchMobility(country) {
    getMobility(country).then(res => {

      const dateIndex = res.columns.indexOf('date');
      const recIndex = res.columns.indexOf('mobility_retail_and_recreation');
      const grocIndex = res.columns.indexOf('mobility_grocery_and_pharmacy');
      const parkIndex = res.columns.indexOf('mobility_parks');
      const residentIndex = res.columns.indexOf('mobility_residential');
      
      // Create Objects
      var objectArray = [];
      var dayCount = 30;
      for(var i = res.data.length-1; i > 0; i--){
        const row = res.data[i];

        const dateString = new Date(row[dateIndex]);
        const date = dateString.toDateString();

        if (row[recIndex] == null) continue;
        const text = '{ "date" : "' + date + 
                  '", "rec" : "' + row[recIndex] + 
                  '", "groc" : "' + row[grocIndex] + 
                  '", "park" : "' + row[parkIndex] + 
                  '", "redsident" : "' + row[residentIndex] + 
                  '"}'

        objectArray[dayCount--] = JSON.parse(text);

        if(dayCount > 30) break;
      }

      this.setState({
        data: objectArray
      })
    })
  }

  render() {
    const {data} = this.state;

    const dataMaxRec = Math.max(...data.map((i) => i.rec));
    const dataMinRec = Math.min(...data.map((i) => i.rec));

    const dataMaxGroc = Math.max(...data.map((i) => i.groc));
    const dataMinGroc = Math.min(...data.map((i) => i.groc));

    const dataMaxPark = Math.max(...data.map((i) => i.park));
    const dataMinPark = Math.min(...data.map((i) => i.park));

    const dataMaxResident = Math.max(...data.map((i) => i.redsident));
    const dataMinResident = Math.min(...data.map((i) => i.redsident));

    const total = Math.max(Math.abs(Math.min(dataMinRec, dataMinGroc, dataMinPark, dataMinResident)), Math.abs(Math.max(dataMaxRec, dataMaxGroc, dataMaxPark, dataMaxResident)));

    const loading = this.state.loading
    
    return (
        <div className="main">
          <h2 className="subtitle">Relative Mobility Change</h2>
          {
            loading ?
            <div className="center">
              <Loader
                type="TailSpin"
                color="#00BFFF"
                height={100}
                width={100}
              /> 
            </div>       
            :
            <div>
              <div className="dropdown">
                <Select 
                options={this.state.countryOptions} 
                onChange={(e) => {
                  this.fetchMobility(e.value);
                }}
                />
              </div>
              {data !== null && (              
                <div>
                <div className="graphDiv">
                
                  <div className="graph">
                  <h4 className="subtitle">Retail and Recreation</h4>
                  <AreaChart
                    width={600}
                    height={220}
                    data={data}
                    syncId="anyId"
                    margin={{
                      top: 10, right: 30, left: 30, bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis 
                    domain={[-total, total]} 
                    ticks={[-total, dataMinRec, 0, dataMaxRec, total]}  
                    unit="%"
                    />
                    <Tooltip 
                    formatter={(value) => `${value} %`} 
                    />
                    
                    <Area type="monotone" dataKey="rec" name="Retail and Recreation"  stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                  </div>
                
                  <div className="graph">
                  <h4 className="subtitle">Supermarket and Pharmacy</h4>
                  <AreaChart
                    width={600}
                    height={220}
                    data={data}
                    syncId="anyId"
                    margin={{
                      top: 10, right: 30, left: 30, bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                    dataKey="date" 
                    
                    />
                    <YAxis 
                    domain={[-total, total]} 
                    ticks={[-total, dataMinGroc, 0, dataMaxGroc, total]} 
                    unit="%" 
                    />
                    <Tooltip 
                    formatter={(value) => `${value} %`} 
                    />
                    <Area type="monotone" dataKey="groc" name="Supermarket and Pharmacy" stroke="#ff7300" fill="#ff7300" />
                  </AreaChart>
                  </div>

                  <div className="graph">
                    <h4 className="subtitle">Parks</h4>
                  <AreaChart
                    width={600}
                    height={220}
                    data={data}
                    syncId="anyId"
                    margin={{
                      top: 10, right: 30, left: 30, bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                    dataKey="date" 
                    />
                    <YAxis 
                    domain={[-total, total]} 
                    ticks={[-total, dataMinPark, 0, dataMaxPark, total]}  
                    unit="%" 
                    />
                    <Tooltip 
                    formatter={(value) => `${value} %`} 
                    />
                    <Area type="monotone" dataKey="park" name="Parks" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                  </div>

                <div className="graph">
                  <h4 className="subtitle">Residential</h4>
                  
                  <AreaChart
                    width={600}
                    height={220}
                    data={data}
                    syncId="anyId"
                    margin={{
                      top: 10, right: 30, left: 30, bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                    dataKey="date" 
                    />
                    <YAxis 
                    domain={[-total, total]} 
                    ticks={[-total, dataMinResident, 0, dataMaxResident, total]}  
                    unit="%" 
                    />
                    <Tooltip 
                    formatter={(value) => `${value} %`} 
                    />
                    <Area type="monotone" dataKey="redsident" name="Residential" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </div>

                </div>

                  <div className="timeline">
                  <BarChart
                      width={1000}
                      height={40}
                      data={data}
                      margin={{
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                      }}
                      syncId="anyId"
                    >
                      <Bar dataKey='date' maxBarSize={0} />
                      <Brush
                        height={20}
                        startIndex={5}
                        endIndex={25}
                        dataKey='date'
                        data={data}
                        stroke="#8884d8"
                      />
                    </BarChart>
                  </div>
                  
                </div>
              )}
        </div>
      }
    </div>
    );
  }
}
