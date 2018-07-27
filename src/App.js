import React, { Component } from 'react';
import './App.css';

let fakeServerData = [
  {
    name: "Bill",
    age: 23
  },
  {
    name: "John",
    age: 25
  }
];

class Person extends Component {
  render(){
    return (
      <div>
        Name: {this.props.data.name} Age: {this.props.data.age}
      </div>
    );
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      serverData:[],
      filterString: 'pizza'
    };
  }

  componentDidMount() {
    this.setState({serverData: fakeServerData});

    const key = "8699278b36f1587611b0adfbc56773b5";
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    fetch(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.state.filterString}`)
    .then(response => response.json())
    .then(data => console.log(data));
  }

  render() {
    return (

      <div className="App">
        <header className="">
        </header>
        <main>
          {this.state.serverData.map(x => 
            <Person data = {x}/>
          )}
        </main>
      </div>
    );
  }
}

export default App;
