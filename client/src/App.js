import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 500);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <table>
          <thead>
          <tr>
            <th>temperature</th>
            <th>humidity</th>
            <th>dewpoint</th>
            <th>pressure</th>
            <th>light</th>
            <th>speed</th>
            <th>direction</th>
            <th>rainfall</th>
            <th>battery</th>
          </tr>
          </thead>
          <tbody>
          {data.length <= 0
            ?   <tr><td colSpan="9">no data available</td></tr>
            : data.map((dat) => (
              
                  <tr>
                  <td>{dat.temperature}</td> 
                  <td>{dat.humidity} </td> 
                  <td>{dat.dewpoint} </td> 
                  <td>{dat.pressure} </td> 
                  <td>{dat.light} </td> 
                  <td>{dat.speed} </td> 
                  <td>{dat.direction} </td> 
                  <td>{dat.rainfall} </td> 
                  <td>{dat.battery} </td> 
                  </tr>               
              ))}
          </tbody>   
        </table>
      </div>
    );
  }
}

export default App;