import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import WorldMap from './main/WorldMap'
import View2 from './main/view2'
import View3 from './main/view3'
import './App.css';

function App() {
  return (
    <Router>
      <div id='header'>
        <h1>COVID-19 Data Visualiser</h1>
        <nav>
          <Link to={'/'} className="nav-link"> World Map </Link>
          <Link to={'/view2'} className="nav-link">View 2</Link>
          <Link to={'/view3'} className="nav-link">View 3</Link>
        </nav>
      </div>
      <Switch>
        <Route exact path='/' component={WorldMap} />
        <Route path='/map' component={WorldMap} />
        <Route path='/view2' component={View2} />
        <Route path='/view3' component={View3} />
      </Switch>
    </Router>
  );
}

export default App;
