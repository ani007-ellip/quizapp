import React, { Component } from 'react'

import { BrowserRouter, Route,Switch} from 'react-router-dom';
import Home from './components/Home';
import Javascript from './components/javascript';
import Maths from './components/maths';
import Science from './components/science';
import Login from './components/loginPage';
import Logout from './components/logout';

class App extends Component {
    render() {
        return (
            <div className='App'>
               <BrowserRouter>
                    <Switch>
                        <Route exact={true} path="/" component={Login} />
                        <Route exact={true} path="/home" component={Home} />
                        <Route exact={true} path="/javascript" component={Javascript} />
                        <Route exact={true} path="/maths" component={Maths} />
                        <Route exact={true} path="/science" component={Science} />
                        <Route exact={true} path="/logout" component={Logout} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;



