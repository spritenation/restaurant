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
    let data = this.props.data;
    return (
      <div>
        <div>
          <b>{data.title}</b>
        </div>
        <div>
          <img src={data.image_url} alt={data.title}/>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      serverData:[],
      realServerData:{},
      filterString: 'pizza'
    };
  }

  componentDidMount() {
    this.setState({serverData: fakeServerData});

    const key = "8699278b36f1587611b0adfbc56773b5";
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    fetch(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.state.filterString}`)
    .then(response => response.json())
    .then(data => this.setState({serverData: data.recipes.slice(0,8)}));
  }

  render() {
    return (

      <div className="App">
        <header className="">
        </header>
        <main>
          {this.state.serverData.map((x, key) => 
            <Person data = {x} key = {key}/>
          )}
        </main>
      </div>
    );
  }
}

export default App;
