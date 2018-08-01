import React, { Component } from 'react';

class Navbar extends Component{
    render(){
      return (
        <div className="header_container">
          <div className="logo nav_text noselect">
            Discover Asia
          </div>
          <div className="about_button nav_font noselect">
              About
          </div>
        </div>
    )}
}

export default Navbar;