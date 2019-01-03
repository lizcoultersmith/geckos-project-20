import React, { Component } from 'react';
import Quote from './components/Quote';
import Clock from './components/Clock/Clock';
import './styles.scss';
import Weather from './components/Weather/Weather';
import Search from './components/Search/Search';
import './styles.scss';

class Home extends Component {
  render() {
    return (
      <div className="app">
        <div className="top-row">
        <div className="top-left">
          <Search />
          </div>
        <div className="top-right">
          <Weather />
          </div>
        </div>
          <Clock />
          <Quote />
      </div>
    );
  }
}

export default Home;
  