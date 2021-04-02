import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.data = {
      main: {
        temp: '0',
      }
    };
  }

  componentDidMount() {
    console.log('Start to load data...');
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=São Paulo&units=metric&appid=3590ab562c40856043d36a098484811b`)
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
          {`Temperatura atual: ${this.state.data.main.temp} °C`}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
