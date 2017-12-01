import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import HeaderLinks from '../Header/HeaderLinks.jsx';

import logo from 'assets/img/reactlogo.png';

import appRoutes from 'routes/app.jsx';

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth
        }
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }
    updateDimensions(){
        this.setState({width:window.innerWidth});
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    render(){
        return (
            <div id="sidebar" className="sidebar" data-color="black">
                <div className="sidebar-background" ></div>
                    <div className="logo">
                        <a href="/" className="simple-text logo-mini">
{/*                            <div className="logo-img">
                                <img src={logo} alt="logo_image"/>
                            </div>*/}
                        </a>
                        <a href="/" className="simple-text calcu-logo">
                            <span className="large-letter">C</span>ALCU<span className="large-letter">R</span>ISK<sup className="calcu-sup">TM</sup>
                        </a>
                    </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        { this.state.width <= 991 ? (<HeaderLinks />):null }
                        {
                            appRoutes.map((prop,key) => {
                                if(!prop.redirect)
                                    return (
                                        <li className={prop.upgrade ? "active active-pro":this.activeRoute(prop.path)} key={key}>
                                            <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                <i className={prop.icon}></i>
                                                <p>{prop.name}</p>
                                            </NavLink>
                                        </li>
                                    );
                                return null;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
