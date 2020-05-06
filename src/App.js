import React from 'react';
import './App.css';
import Weather from "./app_component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

const API_key = "072c8aa3d1c9610ac7c352590c4621a9";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    this.getWeather();


  }

  calCelsius = (temp) => {
    let celsius = Math.floor(temp - 273.15)
    return celsius;
  }

  getWeather = async() => {
    const api_call = await fetch(`https:api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);

    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: response.name,
      country: response.sys.country,
      celsius: this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description,
      
      
    })
  }
  render(){
    return (
      <div className="App">
      <Weather 
      city={this.state.city} 
      country={this.state.country} 
      icon={this.state.icon} 
      celsius={this.state.celsius} 
      temp_max={this.state.temp_max} 
      temp_min={this.state.temp_min} 
      description={this.state.description} 
      />
      </div>
    )
  }
}

export default App;
