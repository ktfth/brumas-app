import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.data = {
      main: {
        temp: '0',
        feels_like: '0',
        humidity: '0',
      },
      weather: [],
      wind: {
        speed: '0',
        deg: '0',
      }
    };

    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.weatherDescription = this.weatherDescription.bind(this);
  }

  fetchWeatherData(opts={}) {
    console.log('Start to load data...');
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${opts.lat}&lon=${opts.lon}&units=metric&lang=pt_br&appid=3590ab562c40856043d36a098484811b`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ data });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    const self = this;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        self.fetchWeatherData({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setInterval(() => self.fetchWeatherData({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }), 1000*60);
      });
    } else {
      alert('No place to check the weather!');
    }
  }

  weatherDescription() {
    return this.state.data.weather.map((v) => {
      return (
        <p key={`${v.id}`}>
        {`${v.description}`}
        </p>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div class="weather-focus">
            <p>
            {`Local: ${this.state.data.name}`}
            </p>
            <p>
            {`Temperatura atual: ${this.state.data.main.temp} °C`}
            </p>
            <p>
            {`Sensação termica: ${this.state.data.main.feels_like} °C`}
            </p>
            {this.weatherDescription()}
            <p>
            {`Umidade: ${this.state.data.main.humidity}%`}
            </p>
            <p>
            {`Velocidade do vento: ${this.state.data.wind.speed} metros/seg`}
            </p>
            <p>
            {`Orientação do vento: ${this.state.data.wind.deg}°`}
            </p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
