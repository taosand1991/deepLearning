import React, {Component, Fragment} from 'react';
import authContext from "./Utils";
import {Route, Switch, Redirect} from 'react-router-dom';
import Registration from "./Registration";
import Navbar from "./Navbar";
import Student from "./Student";
import Teacher from "./Teacher";
import Academics from "./Academics";
import Contact from "./Contact";
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";
import jwtDecode from 'jwt-decode'
import Logout from "./Logout";
import Footer from './Footer';
import AOS from 'aos';
import ResetPassword from "./ResetPassword";


class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);
            this.setState({user});
            setInterval(() => {
                const today = Math.ceil(new Date().getTime() / 1000);
                if (today > user.exp) {
                    console.log('time elapsed');
                    alert('Your session has expired');
                    localStorage.clear();
                    window.location = '/register'
                }
            })
        }


        AOS.init()

    }


    refreshPage = () => {
        this.componentDidMount()
    };


    render() {
        const {user} = this.state;
        const {refreshPage} = this;

        return (
            <Fragment>
                <authContext.Provider value={{user, refreshPage}}>
                    <Navbar/>
                            <Switch >
                                <Route path='/reset/:uid64/:token' component={ResetPassword}/>
                                <Route path={'/register'} component={Registration}/>
                                <Route path={'/students'} component={Student}/>
                                <Route path={'/teachers'} component={Teacher}/>
                                <Route path={'/academics'} component={Academics}/>
                                <Route path={'/contact'} component={Contact}/>
                                <Route path={'/student'} component={StudentPage} />
                                <Route path={'/teacher'} component={TeacherPage} />
                                <Route path={'/logout'} component={Logout}/>
                                <Redirect to={'/register'}/>
                            </Switch>
                    <Footer/>
                </authContext.Provider>
            </Fragment>
        );
    }

    static contextType = authContext;
}

export default MainComponent;