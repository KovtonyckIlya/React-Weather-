import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions/weatherStation";



@connect((store) => {
  return {
    status: store.weatherStation.status
  }
})
export default class Dashboard extends Component {
  
  _updateCity() {
    const city = this.__cityInput.value;
    city.length !== 0 ? this.props.dispatch(fetchData(city)) : null;
  }
  _updateCity = () => {
    const city = this.__cityInput.value;
    city.length !== 0 ? this.props.dispatch(fetchData(city)) : null;
  }
  _onkeyPress = e => {
    e.key === "Enter" ? this._updateCity() : null
  }
  requestPosition() {
    const detectLocation = new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position.coords);
        }, (error) => {
          if(error.code === error.PERMISSION_DENIED) {
            reject();
            console.error("Error detecting location.");
          }
        });
      }
    });

    detectLocation.then((location) => {
      this.props.dispatch(fetchData(location));
    }).catch(() => {
      this.props.dispatch(fetchData("london"));
    });
   }

  render() {
    const { city = {}, status } = this.props;
    const wrapperClass = (status === "failed") ? "weather-dashboard invalid-city" : "weather-dashboard";

    return (
      <div className={wrapperClass}>
        <header>
          <h1 className="heading">Weather Forecast</h1>
        </header>
        <section className="controls">
          <div>
            <input
              type="text"
              className="city-input"
              id="city-name"
              ref={input => {
                this.__cityInput = input;
                return this.__cityInput;
              }}
              onKeyPress={this._onkeyPress}
              placeholder={city}
            />
             <input
              type="button"
              value="&gt;"
              className="search"
              onClick={this._updateCity}
              id="change-city-btn"
            />
            <input
              type="button"
              value="CurrentWeather"
              className="button"
              onClick={this.requestPosition.bind(this)}
            />
        
          </div>
        </section>
        <span className="error">Please enter valid city name!</span>
      </div>
    );
  }
}
