import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import { theme } from './themes/theme';
import './App.css';

import Main from './pages/Main';
import Login from './components/Dialog/Login/Login';
import SignUp from './components/Dialog/SignUp/SignUp';
import ProfilePage from './pages/Profile/ProfilePage.js';

import PostPage from './pages/Post/PostPage';
import { getToken } from './actions/user';

import BoardPage from './pages/Profile/BoardPage';
import NavBar from './components/Navbar/Navbar';
import FollowingPage from './pages/Following/FollowingPage';
import Confirm from './components/Dialog/Confirm';
import SnackBar from './components/SnackBar/SnackBar';

class App extends Component {
    constructor (props) {
        super(props);
        this.props.getToken();
    }

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <NavBar />
                    <div>
                        <Switch>
                            <Route exact path='/' component={withRouter(Main)} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/signup' component={SignUp} />
                            <Route path='/posts/:id' component={PostPage} />
                            <Route path='/profile/:username/following' component={FollowingPage}/>
                            <Route
                                path='/profile/:username'
                                render={props => (
                                    <ProfilePage key={props.match.params.username} {...props} />
                                )}
                            />
                            <Route path='/board/:id' component={BoardPage}/>
                        </Switch>
                    </div>
                </BrowserRouter>
                <Confirm/>
                <SnackBar/>
            </MuiThemeProvider>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            getToken
        },
        dispatch
    );
}

export default connect(
    null,
    mapDispatchToProps
)(App);
