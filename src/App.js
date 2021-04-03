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
      }
    };

    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }

  fetchWeatherData(opts={}) {
    console.log('Start to load data...');
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${opts.lat}&lon=${opts.lon}&units=metric&appid=3590ab562c40856043d36a098484811b`)
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
          {`Temperatura atual: ${this.state.data.main.temp} °C`}
          </p>
          <p>
          {`Sensação termica: ${this.state.data.main.feels_like} °C`}
          </p>
          <p>
          {`Humidade: ${this.state.data.main.humidity}%`}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
