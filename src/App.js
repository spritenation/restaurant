import React, { Component } from 'react';
import './App.css';
import Favorites from './Favorites';
import Footer from './Footer';
import Dish from './Dish';
import Navbar from './Navbar';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: "",
      filterString: "sushi",
      favoriteData: new Favorites()
    };
    this.state.favoriteData.readStorage();
    this.updateFavorites = this.updateFavorites;  
  }

  updateFavorites = (id, title, contents) => {
    if(!this.state.favoriteData.isFavorite(id)){
      this.state.favoriteData.addFavorite(id, title, contents);
    }else{
      this.state.favoriteData.deleteFavorite(id);
    }

    this.setState(this.state.favoriteData);
  }

  componentDidMount() {
    const customData = "https://api.jsonbin.io/b/5b5b8601f24d8943d04eebf2/18"
    
    fetch(`${customData}`)
    .then(response => response.json())
    .then(data => this.setState({serverData: data.recipes}))
  }

  render() {
    return (
      <div className="App">
        {this.state.serverData !== "" ?
        <div className="content">
          <div className="landing_container">
            <div className="navbar">
              <Navbar favoriteData={this.state.favoriteData}/>
            </div>

            <div className="menu">
              <span className="menu_word">Menu</span>
              <div className="option_container">
                <div className="menu_option noselect" 
                  onClick={() => this.setState({filterString: "sushi"})}>SUSHI</div>
                <div className="menu_option noselect" 
                  onClick={() => this.setState({filterString: "nigiri"})}>NIGIRI</div>
                <div className="menu_option noselect" 
                  onClick={() => this.setState({filterString: "ramen"})}>RAMEN</div>
                <div className="menu_option noselect" 
                  onClick={() => this.setState({filterString: "miso soup"})}>SOUP</div>
              </div>
                {
                  this.state.serverData.filter(x => x.type === this.state.filterString).map((x, key) => {
                  let favorite;
                  this.state.favoriteData.favorites.findIndex(y => y.id === x.id ? favorite = true : favorite = false);
                  
                  return (<Dish 
                      data={x} 
                      key={x.id} 
                      updateFavoritesCB={this.updateFavorites} 
                      isFavorite={favorite}
                      favoriteDataCB={this.state.favoriteData}/>)})
                }        
              <div className="icons_content">
                <hr/>
                <i className="food_add icons_item fa fa-twitter" aria-hidden="true"></i>
                <i className="food_add icons_item fa fa-instagram" aria-hidden="true"></i>
                <i className="food_add icons_item fa fa-facebook" aria-hidden="true"></i>
                <hr/>
              </div>
            </div>
            <div className="hero noselect">
              ASIAN FOOD
            </div>
          </div>
          <main>
            
          </main>  
          <Footer/>
        </div> : "Loading..."}
      </div>
    );
  }
}

export default App;
