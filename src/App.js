import React, { Component } from 'react';
import './App.css';

class Person extends Component {
  render(){
    let data = this.props.data;
    return (
      <div>
        <div>
          <b>{data.title}</b><br/>
          {data.type}
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
      serverData: "",
      filterString: 'sushi roll'
    };
  }

  componentDidMount() {
    //const key = "8699278b36f1587611b0adfbc56773b5";
    //const proxy = 'https://cors-anywhere.herokuapp.com/';
    const customData = "https://api.jsonbin.io/b/5b5b8601f24d8943d04eebf2/5"
    
    /*
    fetch(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.state.filterString}`)
    .then(response => response.json())
    .then(data => {console.log(data); return this.setState({serverData: data.recipes.slice(1,9)})});
    */

    fetch(`${customData}`)
    .then(response => response.json())
    .then(data => {console.log(data); return this.setState({serverData: data.recipes})});
  }

  render() {
    let serverData = this.state.serverData;
    return (
      <div className="App">
        {serverData !== "" ?
        <div className="content">
          <header className="">
            <button onClick={() => this.setState({filterString: "sushi roll"})}>Sushi</button>
            <button onClick={() => this.setState({filterString: "ramen"})}>Ramen</button>
          </header>
          <main>
            {serverData.map((x, key) => 
              <Person data = {x} key = {key}/>
            )}
          </main>
        </div> : "Loading..."}
      </div>
    );
  }
}

export default App;
