import React, { Component } from 'react';
import './App.css';

class Person extends Component {
  render(){
    let data = this.props.data;
    return (
      <div className="food_container">
        <div className="food_title">
          {data.title}
        </div>
        <div  className="food_info">
          <div className="small_info">
            {data.amount > 1 ? `${data.amount} pieces`: ""}
          </div>
          <div className="">
            {data.contents.map(x => x)}<br/>
            {`Price: ${data.price}`}
          </div>
        </div>
        <div className="add_container">
          <div  className="food_add">
            ADD
          </div>
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
      filterString: "sushi"
    };
  }

  

  componentDidMount() {
    /*
    const key = "8699278b36f1587611b0adfbc56773b5";
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    
    fetch(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.state.filterString}`)
    .then(response => response.json())
    .then(data => {console.log(data); return this.setState({serverData: data.recipes.slice(1,9)})});
    */

    const customData = "https://api.jsonbin.io/b/5b5b8601f24d8943d04eebf2/14"
    
    fetch(`${customData}`)
    .then(response => response.json())
    .then(data => this.setState({serverData: data.recipes}))
  }

  componentDidUpdate() {
    
  }
  

  render() {
    let serverData = this.state.serverData;

    if(this.state.serverData !== ""){
      serverData = this.state.serverData.filter(x => x.type === this.state.filterString);
    }
      
    return (
      <div className="App">
        {serverData !== "" ?
        <div className="content">
          <header className="">
            <button onClick={() => this.setState({filterString: "sushi"})}>Sushi</button>
            <button onClick={() => this.setState({filterString: "nigiri"})}>Nigiri</button>
            <button onClick={() => this.setState({filterString: "ramen"})}>Ramen</button>
            <button onClick={() => this.setState({filterString: "miso soup"})}>Miso Soup</button>
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
