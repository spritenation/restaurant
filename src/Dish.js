import React, { Component } from 'react';

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
        <div className="food_container" id={data.id} onMouseEnter={hoverHandlerEnter} onMouseLeave={hoverHandlerLeave}>
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
          <div className={this.state.favorite ? "slide_add" : (this.state.hovering ? "slide_add" : "add_container")} 
            onClick={() => favoriteHangler(data.id, data.title, data.contents)}>
            <i className={this.state.favorite ? "food_add fa fa-heart" : "food_add fa fa-heart-o"} aria-hidden="true"></i>
          </div>
        </div>
      );
    }
  }

  export default Dish;