import React, { Component } from 'react';
import './App.css';

class Person extends Component {
  constructor(){
    super();
    this.state = {
      hovering: false
    };
  }

  render(){
    const hoverHandlerEnter = () => {
      this.setState({hovering:true});
    }

    const hoverHandlerLeave = () => {
      this.setState({hovering:false});
    }

    let data = this.props.data;
    return (
      <div className="food_container" onMouseEnter={hoverHandlerEnter} onMouseLeave={hoverHandlerLeave}>
        <div className="food_title">
          {data.title}
        </div>
        <div  className="food_info">
          <div className="small_info">
            {data.amount > 1 ? `${data.amount} pieces`: ""}
          </div>
          <div className="main_info">
            Ingredients: {data.contents.map((el, key) => key !== data.contents.length - 1 ? `${el}, ` : el)}.
          </div>
          <div className="small_info">
          {`Price: ${data.price} `} &euro;
          </div>
        </div>
        <div className={this.state.hovering ? "addcontainer slide_add" : "add_container"}>
          <i className="food_add fa fa-star fa-lg" aria-hidden="true"></i>
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
    const customData = "https://api.jsonbin.io/b/5b5b8601f24d8943d04eebf2/16"
    
    fetch(`${customData}`)
    .then(response => response.json())
    .then(data => this.setState({serverData: data.recipes}))
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
          <div className="option_container">
            <div className="menu_option" onClick={() => this.setState({filterString: "sushi"})}>Sushi</div>
            <div className="menu_option" onClick={() => this.setState({filterString: "nigiri"})}>Nigiri</div>
            <div className="menu_option" onClick={() => this.setState({filterString: "ramen"})}>Ramen</div>
            <div className="menu_option" onClick={() => this.setState({filterString: "miso soup"})}>Miso Soup</div>
          </div>
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
