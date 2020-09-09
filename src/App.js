import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import View1 from './main/view1'
import View2 from './main/view2' 
import View3 from './main/view3' 
import BarChart from './components/barchart';

function App() {
  return (
      <Router>
        <div>
          <h1>COVID-19 Data Visualiser</h1>
          <nav>
            <ul>
              <li><Link to={'/'} className="nav-link"> View 1 </Link></li>
              <li><Link to={'/view2'} className="nav-link">View 2</Link></li>
              <li><Link to={'/view3'} className="nav-link">View 3</Link></li>
            </ul>
          </nav>
        </div>
        <hr/>
        <Switch>
          <Route exact path='/' component={View1}/>
          <Route path='/view1' component={View1}/>
          <Route path='/view2' component={View2}/>
          <Route path='/view3' component={View3}/>
        </Switch>
      </Router>
  );
}

export default App;
