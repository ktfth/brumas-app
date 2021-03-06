import React from 'react';
import './App.css';

import {FacebookShareButton, FacebookIcon} from "react-share";

import { ThemeProvider, createTheme, Arwes, Frame } from 'arwes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
		this.state.show = true;
    this.state.data = {
      name: '',
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
		let url = ``;
		if ('location' in opts) {
			url = `https://api.openweathermap.org/data/2.5/weather?q=${opts.location}&units=metric&lang=pt_br&appid=3590ab562c40856043d36a098484811b`;
		} else if ('lat' in opts && 'lon' in opts) {
			url = `https://api.openweathermap.org/data/2.5/weather?lat=${opts.lat}&lon=${opts.lon}&units=metric&lang=pt_br&appid=3590ab562c40856043d36a098484811b`;
		}
		fetch(url)
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
				<img src={`http://openweathermap.org/img/wn/${v.icon}.png`} alt="Representação das condições do tempo atualmente"></img>
				<br />
        {`${v.description}`}
        </p>
      );
    });
  }

	socialMediaButtons(props) {
		return (
		 <FacebookShareButton
		    url={"https://brumas-app.vercel.app"}
		    quote={"Brumas App - Acompanhe o tempo da qualquer lugar"}
		    hashtag="#keephacking"
		    className={"shareButton"}>
		     <FacebookIcon size={36} />
		  </FacebookShareButton>
		);
	}

	locationHandler(event) {
		const self = this;
		if (event.key === 'Enter') {
			self.fetchWeatherData({
				location: event.target.value,
			});
			setInterval(() => self.fetchWeatherData({
				location: event.target.value,
			}), 1000*60);
		}
	}

  render() {
    return (
			<ThemeProvider theme={createTheme()}>
				<Arwes>
					<div className={`App`}>
						<div className={`App-header`}>
							<input
								className="location"
								type="text"
								placeholder="Localização"
								onKeyPress={(e) => this.locationHandler(e)}
							/>

							<div style={{ display: 'inline-block', padding: '20px' }}>
                    <Frame
                        show={this.state.show}
                        animate={true}
                        level={3}
                        corners={4}
                        layer='primary'
                    >
                        <div style={{ padding: '20px 40px', fontSize: '32px' }}>
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

													<p>
													{this.socialMediaButtons()}
													</p>
                        </div>
                    </Frame>
                </div>
						</div>
					</div>
				</Arwes>
			</ThemeProvider>
    );
  }
}

export default App;
