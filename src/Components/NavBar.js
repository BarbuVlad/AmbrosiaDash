import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./NavBar.css"
import Volunteers from "./Volunteers";
import GMaps from "./GMaps"
import mapsIcon from "../Icons/maps-icon.png"
import volIcon from "../Icons/vol-icon.png"
import logoAmb from "../Logo/AmbrosiaLogo.png"
import Login from "./Login"
import {DropDownMenu}  from "./GMaps"
import { useHistory } from "react-router-dom";

import logoAmb1 from "../Logo/logo.png"
import Redirect from "react-router-dom/es/Redirect";

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.
const routes = [

    {
        path: "/Components/GMaps",
        sidebar: () => <div> </div>,
        main: () => <GMaps/>,
        exact:true
    },
    {
        path: "/Components/Volunteers",
        sidebar: () => <div> </div>,
        main: () => <Volunteers/>
    },
    {
        path: "/Components/Login",
        sidebar: () => <div> </div>,
        main: () => <Login/>
    }
];
let handleLoggOff = () => {
    localStorage.setItem('logged', 'unregistered')
    const logged = localStorage.getItem('logged')
    console.log(logged)


}

let NavBar =()=> {

    return (

        <Router>
            <div className={"PanelPos"}>
                <div className={"Panel"} >
                    <div className={"ambrosia-title"}>
                        <img className={"logo"} src={logoAmb} alt ={"logoAmb"}/>
                        Ambrosia Alert
                    </div>
                    <ul style={{ listStyleType: "none", padding: 0 }}>

                        <li>
                            <div className={'b'}>
                                <img className={"maps-icon"} src={mapsIcon} alt ={"mapsIcon"}/>
                                <Link to="/Components/GMaps"> Maps</Link>
                            </div>

                        </li>
                        <li>
                            <div className={'b'}>
                                <img className={"vol-icon"} src={volIcon} alt ={"volIcon"}/>
                                <Link to="/Components/Volunteers"> Volunteers</Link>
                            </div>

                        </li>

                        <li>
                            <div className={'b'}>

                                <button className={'loggOff-buton'} onClick={ () =>
                                    {
                                        handleLoggOff();
                                        window.location.reload(false);
                                    }
                                }
                                > Logg OFF</button>


                            </div>
                        </li>


                    </ul>

                    <DropDownMenu/>

                    <Switch>
                        <Redirect from="/" to="/Components/Maps"/>
                        {routes.map((route, index) => (
                            // You can render a <Route> in as many places
                            // as you want in your app. It will render along
                            // with any other <Route>s that also match the URL.
                            // So, a sidebar or breadcrumbs or anything else
                            // that requires you to render multiple things
                            // in multiple places at the same URL is nothing
                            // more than multiple <Route>s.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.sidebar />}
                            />
                        ))}
                    </Switch>
                </div>

                <div style={{ flex: 1, padding: "10px" }}>
                    <Switch>
                        {routes.map((route, index) => (
                            // Render more <Route>s with the same paths as
                            // above, but different components this time.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.main />}
                            />
                        ))}
                    </Switch>
                </div>

            </div>
        </Router>
    );
}

export default NavBar;
