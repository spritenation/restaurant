import React, { Component } from 'react';

class Footer extends Component{
    render(){
      return (
        <footer>
            <div className="footer_cell">
                <span>TITLE</span>
                <ul>
                    <li className="list_option">Lorem ipsum</li>
                    <li className="list_option">Lorem ipsum</li>
                    <li className="list_option">Lorem ipsum</li>
                    <li className="list_option">Lorem ipsum</li>
                    <li className="list_option">Lorem ipsum</li>
                </ul>
            </div>
            <div className="footer_cell">
                <span>TITLE</span>
                <ul>
                    <li className="list_option">Lorem ipsum</li>
                    <li className="list_option">Lorem ipsum</li>
                    <li className="list_option">Lorem ipsum</li>
                </ul>
            </div>
            <div className="footer_cell">
                <span>TITLE</span>
                <ul>
                    <li className="list_option">Lorem ipsum</li>
                    <li className="list_option">Lorem ipsum</li>
                    <li className="list_option">Lorem ipsum</li>
                </ul>
            </div>
            <div className="footer_cell_logo noselect">ASIAN FOOD</div>
        </footer>   
    )}
}

export default Footer;