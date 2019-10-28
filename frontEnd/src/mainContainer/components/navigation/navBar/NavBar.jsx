import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';
/**
 * This class renders the navigation bar
 */
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className = 'center-div'>
                <ul className ='navBar'>
                    <li className = 'navItem'>
                        <NavLink exact to = {'/patients'} className = 'navText'>Patients</NavLink>
                    </li>
                    <li className = 'navItem'>
                        <NavLink exact to = {'/encounters'} className = 'navText'>Encounters</NavLink>
                    </li>
                </ul>
            </div>
         );
    }
}
 
export default NavBar;