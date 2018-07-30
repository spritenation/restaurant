import React, { Component } from 'react';
import './App.css';
import Favorites from './Favorites';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Dish extends Component {
  constructor(props){
    super(props);
    this.state = {
      hovering: false,
      favorite: props.isFavorite
    };
  }

  render(){
    let data = this.props.data;
    
    const favoriteHangler = (id, title, contents) => {
      this.props.updateFavoritesCB(id, title, contents);

      
      if(this.props.favoriteDataCB.favorites.filter(x => x.id === data.id).length === 1){
        this.setState({favorite: true});
      }else{
        this.setState({favorite: false});
      }
    }

    const hoverHandlerEnter = () => {
      this.setState({hovering:true});
    }

    const hoverHandlerLeave = () => {
      this.setState({hovering:false});
    }

    let ingredients = data.contents.map((el, key) => key !== data.contents.length - 1 ? `${el.toLowerCase()}, ` : el.toLowerCase()).join(' ');
    let ingredientsFormatted = ingredients.toString().replace(/^\w/, c => c.toUpperCase());

    return (
      <div className={`${this.props.class}`} onMouseEnter={hoverHandlerEnter} onMouseLeave={hoverHandlerLeave}>
        <div className="food_title">
          {data.title}
        </div>
        <div  className="food_info">
          
          <div className="main_info">
            Ingredients: {ingredientsFormatted}.
          </div>
          <div>
            <span className="small_info small_info_bold">{`Price: ${data.price} `} &euro; </span>
            <span className="small_info">{data.amount > 1 ? `(${data.amount} pieces)`: ""}</span>
          </div>
        </div>
        <div className={this.state.hovering ? "slide_add" : "add_container"} onClick={() => favoriteHangler(data.id, data.title, data.contents)}>
          <i className={this.state.favorite ? "food_add fa fa-heart" : "food_add fa fa-heart-o"} aria-hidden="true"></i>
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
        <div className="logo nav_text noselect">
          Discover Asia.
        </div>
        <div className="about_button nav_font noselect">
            About
        </div>
        {/* FIX THIS BUTTON */}
        <div className="favorites_button nav_font noselect">
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
      favoriteData: new Favorites(),
      animate: false
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
              <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
              >
                {serverData.map((x, key) => {
                  let favorite = false;
                  this.state.favoriteData.favorites.findIndex(y => y.id === x.id ? favorite = true : favorite = false);
                  
                return (<Dish class=
                    {!this.state.animate ? "food_container" : "food_container food_container_animate"} 
                    data={x} 
                    key={key} 
                    updateFavoritesCB={this.updateFavorites} 
                    isFavorite={favorite}
                    favoriteDataCB={this.state.favoriteData}/>)})
                }
              </ReactCSSTransitionGroup>
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
            main
          </main>  
          <footer>
            footer
          </footer>   
        </div> : "Loading..."}
      </div>
    );
  }
}

export default App;
