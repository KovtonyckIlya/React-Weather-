import React, { Component } from "react";
import DetailedInfo from "./DetailedInfo";

export default class ForecastTiles extends Component {
  _groupByDays = data => {
    return (data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0,10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);

      return list;
    }, {}));
  };

  _getDayInfo = data => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
  };

  _getIcon = data => `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;

  _getInfo = (data, min=[], max=[], pressure=[], humidity=[],wind=[]) => {
    data.map(item => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      pressure.push(item.main.pressure);
      humidity.push(item.main.humidity);
      wind.push(item.wind.speed);
   
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);
    const avgPressure = Math.round(pressure.reduce((curr, next) => curr + next) / pressure.length);
    const avgWind = Math.round(wind.reduce((curr, next) => curr + next) / wind.length);

    

    return (
      <div className="weather-info">
        <div className="min-max">
          <strong>{`${minMax.max}°C`}</strong> / {`${minMax.min}°C`}
        </div>
        <div className="more-info">
        <p>{`Avg. Pressure: ${avgPressure}%`}</p>
        <p>{`Avg. Humidity: ${avgHumdity}%`}</p>
        <p>{`WindSpeed: ${avgWind}%`}</p>
        
        
        </div>  
      </div>
    );
  };

  _showMoreInfo = (index) => {
    const elm = this.refs[`div-${index}`];
    const expandedElment = document.querySelector(".expanded");

    elm.classList.add("expanded");
    expandedElment !== null && expandedElment.classList.remove("expanded");
  }



  render() {
    const { forecasts } = this.props;
    const tiles = Object.values(this._groupByDays(forecasts));
    const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

    return (
      <div className="forecast-tiles">
        {forecastTiles.map((item, i) => (
          <div
            className={`forecast-tile tile-${i}`}
            key={i}
            ref={`div-${i}`}
            onClick={() => {this._showMoreInfo(i)}}
          >
            <div className="primary-info">
              <div className="icon">
                <img src={this._getIcon(item)} />
                {this._getDayInfo(item)}
              </div>
              {this._getInfo(item)}
            </div>
            <div className="detailed-info" key={i}>
            <DetailedInfo data={item} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

