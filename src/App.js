import React, { Component } from 'react';
import './App.css';
import Favorites from './Favorites';

class Dish extends Component {
  constructor(){
    super();
    this.state = {
      hovering: false,
      favorite: ''
    };
  }

  render(){
    let data = this.props.data;
    
    const favoriteHangler = (id, title, contents) => {
      this.props.updateFavoritesCB(id, title, contents);

      /*
      if(this.props.favoriteDataCB.favorites.filter(x => x.id === data.id).length === 1){
        this.setState({favorite: true});
      }else{
        this.setState({favorite: false});
      }*/
    }

    const hoverHandlerEnter = () => {
      this.setState({hovering:true});
    }

    const hoverHandlerLeave = () => {
      this.setState({hovering:false});
    }

    return (
      <div className="food_container shadow" onMouseEnter={hoverHandlerEnter} onMouseLeave={hoverHandlerLeave}>
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
        <div className={this.state.hovering ? "slide_add" : "add_container"} onClick={() => favoriteHangler(data.id, data.title, data.contents)}>
          <i className={this.state.favorite ? "food_add fa fa-star fa-lg" : "food_add fa fa-star-o fa-lg"} aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

class Favorite extends Component{
  render(){
    let data = this.props.data;
    let ingredients = data.contents.map((el, key) => key !== data.contents.length - 1 ? `${el.toLowerCase()}, ` : el.toLowerCase()).join(' ');
    let ingredientsFormatted = ingredients.toString().replace(/^\w/, c => c.toUpperCase());
    return (
      <div className="favorite_item">
        <div className="favorite_item_title">{data.title}</div>
        <div className="favorite_item_contents">{ingredientsFormatted}.</div>
      </div>
    )
  }
}

class Navbar extends Component{
  render(){
    return (
      <div className="header_container">
        <div className="">
          
        </div>
        <div className="about_button">
            About
        </div>
        {/* FIX THIS BUTTON */}
        <div className="favorites_button">
          Favorites
        </div>
        {/*
        <div className="favorites_button">
          <span><div className="test"></div>Favorites</span>
          <div className="favorites_list">
              {this.props.favoriteData.favorites.map((x, key) => 
                <Favorite data={x} key={key}/>
              )}
          </div>
        </div>
        */}
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: "",
      filterString: "sushi",
      favoriteData: new Favorites()
    };
    this.updateFavorites = this.updateFavorites;
  }

  //UPDATE FAVORITES HERE
  updateFavorites = (id, title, contents) => {
    
    
    if(!this.state.favoriteData.isFavorite(id)){
      this.state.favoriteData.addFavorite(id, title, contents);
    }else{
      this.state.favoriteData.deleteFavorite(id);
    }

    this.setState(this.state.favoriteData);

    console.log(this.state.favoriteData)
  }

  componentDidMount() {
    const customData = "https://api.jsonbin.io/b/5b5b8601f24d8943d04eebf2/17"
    
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
          <Navbar favoriteData={this.state.favoriteData}/>
          <div className="landing_container">
          
          </div>
          <div className="option_container shadow">
            <div className="menu_option" onClick={() => this.setState({filterString: "sushi"})}>Sushi</div>
            <div className="menu_option" onClick={() => this.setState({filterString: "nigiri"})}>Nigiri</div>
            <div className="menu_option" onClick={() => this.setState({filterString: "ramen"})}>Ramen</div>
            <div className="menu_option" onClick={() => this.setState({filterString: "miso soup"})}>Miso Soup</div>
          </div>
          <div className="menu">
            {serverData.map((x, key) => 
              <Dish data={x} key={key} updateFavoritesCB={this.updateFavorites} favoriteDataCB={this.state.favoriteData}/>
            )}
          </div>
        </div> : "Loading..."}
      </div>
    );
  }
}

export default App;
