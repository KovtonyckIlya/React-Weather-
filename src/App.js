import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchData } from "./actions/weatherStation";
import WeatherForecast from "./components/WeatherForecast";

@connect((store) => {
  return {
    forecast: store.weatherStation.data,
  };
})
export default class App extends Component {
  // Fetches data by using geolocation. If the user blocks, or if the browser does not support the API,
  // fallsback to default location of London

  render() {
    const { forecast } = this.props;

    return (
      <div>
        <WeatherForecast data={forecast} />
      </div>
     );
   }
 }