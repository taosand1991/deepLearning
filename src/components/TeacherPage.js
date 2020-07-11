import React, {Component, Fragment} from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom'
import authContext from "./Utils";
import QuestionsForm from "./teacherFolder/QuestionsForm";
import AssignmentForm from "./teacherFolder/AssignmentForm";
import ScoreList from "./teacherFolder/ScoreList";
import Report from "./teacherFolder/Report";
import TeacherProfile from "./teacherFolder/TeacherProfile";

class TeacherPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    openIcon = () => {
        this.setState({open: !this.state.open})
        if (!this.state.open) {
            document.getElementById('sidenavbar').style.width = '200px'
            document.getElementById('sidenavbar').style.zIndex = '5'
        } else {
            document.getElementById('sidenavbar').style.width = '0'
        }
    };

    render() {
        const {open} = this.state;
        const {openIcon} = this;
        const {location} = this.props.history;
        const {pathname} = location;
        return (
            <Fragment>
                <div className='teacher'>
                    <div className="sidenavbar">
                        <Link className={pathname === '/teacher/question' ? 'activebar' : null}
                              to={'/teacher/question'}>
                            <i className='fas fa-plus-circle'/>Create Questions</Link>
                        <Link className={pathname === '/teacher/assignment' ? 'activebar' : null}
                              to={'/teacher/assignment'}>
                            <i className='fas fa-plus-circle'/>Create Assignment</Link>
                        <Link className={pathname === '/teacher/scores' ? 'activebar' : null} to={'/teacher/scores'}>
                            <i className='fas fa-list'/>Check Scores</Link>
                        <Link className={pathname === '/teacher/report' ? 'activebar' : null} to={'/teacher/report'}>
                            <i className='fas fa-bug'/>Make A Report</Link>
                        <Link className={pathname === '/teacher/profile' ? 'activebar' : null} to={'/teacher/profile'}>
                            <i className='fas fa-user'/>Profile</Link>

                    </div>
                    <div className="sidenavbar_mobile" id={'sidenavbar'}>
                        <Link onClick={openIcon} to={'/teacher/question'}>
                            <i className='fas fa-plus-circle'/>Create Questions</Link>
                        <Link onClick={openIcon} to={'/teacher/assignment'}><i className='fas fa-plus-circle'/>Create
                            Assignment</Link>
                        <Link onClick={openIcon} to={'/teacher/scores'}><i className='fas fa-list'/>Check Scores</Link>
                        <Link onClick={openIcon} to={'/teacher/report'}><i className='fas fa-bug'/>Make A Report</Link>
                        <Link onClick={openIcon} to={'/teacher/profile'}><i className='fas fa-user'/>Profile</Link>
                    </div>
                    <div onClick={this.openIcon} className={open ? "hamburger_icon open" : "hamburger_icon"}>
                        <span className="icon"/>
                        <span className="icon"/>
                        <span className="icon"/>
                    </div>
                    <div className="main-page">
                        <Switch>
                            <Route path={'/teacher/question'} component={QuestionsForm}/>
                            <Route path={'/teacher/assignment'} component={AssignmentForm}/>
                            <Route path={'/teacher/scores'} component={ScoreList}/>
                            <Route path={'/teacher/report'} component={Report}/>
                            <Route path={'/teacher/profile'} component={TeacherProfile}/>
                            <Redirect exact to={'/teacher/profile'}/>
                        </Switch>
                    </div>
                </div>

            </Fragment>
        );
    }

    static contextType = authContext;
}

export default TeacherPage;