import React, {Component, Fragment} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import authContext from "./Utils";
import Questions from "./studentFolder/Questions";
import Assignments from "./studentFolder/Assignments";
import Scores from "./studentFolder/Scores";
import StudentProfile from "./studentFolder/StudentProfile";
import Test from "./studentFolder/Test";
import Result from "./studentFolder/Result";
import axios from 'axios';
import {BellFilled} from '@ant-design/icons'
import {Badge} from "antd";

class StudentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            const apiCall = '/api/assignments/get_user_ass/';
            try {
                const {data: assignments} = await axios.get(apiCall, {
                    headers: {'Authorization': `JWT ${token}`}
                });
                this.setState({assignments});
            } catch (e) {
                if (e) {
                    console.log(e.response.data)
                }
            }
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
        };
    }

    render() {
        const {assignments} = this.state;
        const {location} = this.props.history;
        const {pathname} = location;
        const question = pathname === '/student/question';
        const assignment = pathname === '/student/assignment';
        const scores = pathname === '/student/scores';
        const profile = pathname === '/student/profile';
        return (
            <Fragment>
                <div className="row m-auto">
                    <div className="col-12 col-md-4">
                        <div className="link-thing">
                            <Link className={question ? 'student_active' : null}
                                  to={"/student/question"}>Questions</Link>
                            <Link className={assignment ? 'student_active' : null} to={{
                                pathname: "/student/assignment",
                                state: {assignments}
                            }}
                            >Assignments <span><BellFilled style={{fontSize: 20}}/><Badge
                                count={assignments.length}/></span></Link>
                            <Link className={scores ? 'student_active' : null} to={"/student/scores"}>Check
                                Scores</Link>
                            <Link className={profile ? 'student_active' : null} to={"/student/profile"}>Profile</Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 details-page">

                                <Switch >
                                    <Route path='/student/test' component={Test}/>
                                    <Route path='/student/question' component={Questions}/>
                                    <Route path='/student/assignment' component={Assignments}/>
                                    <Route path='/student/scores' component={Scores}/>
                                    <Route path='/student/profile' component={StudentProfile}/>
                                    <Route path='/student/result' component={Result}/>
                                    <Redirect to={'/student/profile'}/>
                                </Switch>
                    </div>
                </div>
            </Fragment>
        );
    }

    static contextType = authContext;
}

export default StudentPage;