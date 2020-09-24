import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import WorldMap from './main/WorldMap/WorldMap';
import LineChart from './main/LineChart/LineChart';
import View3 from './main/view3';
import './App.css';

function App() {
  return (
    <Router>
      <nav className='nav-container'>
        <h1 className='nav-element'>COVID-19 Data Visualiser</h1>
        <div className='navlink-container'>
          <Link to={'/'} className='nav-link'>
            {' '}
            World Map{' '}
          </Link>
          <Link to={'/linechart'} className='nav-link'>
            Line Chart
          </Link>
          <Link to={'/view3'} className='nav-link'>
            View 3
          </Link>
        </div>
        <h1 className='nav-element' style={{ color: '#DDF2FF' }}>
          Team DON
        </h1>
      </nav>
      <Switch>
        <Route exact path='/' component={WorldMap} />
        <Route path='/map' component={WorldMap} />
        <Route path='/linechart' component={LineChart} />
        <Route path='/view3' component={View3} />
      </Switch>
    </Router>
  );
}

export default App;
