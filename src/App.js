import React from 'react';
import './App.css';
import Weather from "./app_component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Form from "./app_component/form.component"

const API_key = "11890140ba3f1c2307aa07adb16bbcbc";

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

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
      Snow: "wi-day-snow"
    }
  }

  calCelsius = (temp) => {
    let celsius = Math.floor(temp - 273.15)
    return celsius;
  }

  getWeatherIcon(icons, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId<= 232:
        this.setState({icon: icons.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId<= 321:
        this.setState({icon: icons.Drizzle});
        break;
      case rangeId >= 500 && rangeId<= 531:
        this.setState({icon: icons.Rain});
        break;
      case rangeId >= 600 && rangeId<= 622:
        this.setState({icon: icons.Snow});
        break;
      case rangeId >= 700 && rangeId<= 781:
        this.setState({icon: icons.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({icon: icons.Clear});
        break;
      case rangeId >= 801 && rangeId<= 804:
        this.setState({icon: icons.Clouds});
        break;
        default: 
        this.setState({icon: icons.Clouds});
    }
  }

  getWeather = async(e) => {

    e.preventDefault();

    const city = e.target.city.value;
    const country = e.target.country.value;
    
    if(city && country){
      const api_call = await fetch(`https:api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

      const response = await api_call.json();
  
      console.log(response);
  
      if(response.cod !== "404"){
        this.setState({
          city: `${response.name}, ${response.sys.country}`,
          celsius: this.calCelsius(response.main.temp),
          temp_max: this.calCelsius(response.main.temp_max),
          temp_min: this.calCelsius(response.main.temp_min),
          description: response.weather[0].description,
          error: false
        });
      
        this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
      }else{
        this.setState({error: true});
      }
    }else{
      this.setState({error: true});
    }

  }
  render(){
    return (
      <div className="App">
      <Form loadWeather={this.getWeather} error={this.state.error}/>  
      <Weather 
      city={this.state.city} 
      icon={this.state.icon} 
      celsius={this.state.celsius} 
      temp_max={this.state.temp_max} 
      temp_min={this.state.temp_min} 
      description={this.state.description} 
      />
      </div>
    )
  };
};


export default App;
