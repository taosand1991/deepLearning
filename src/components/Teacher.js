import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import authContext from "./Utils";

class Teacher extends Component {
    render() {
        const {user} = this.context;
        return (
            <Fragment>
            <div className="row m-auto teacher-page">
                <div data-aos='fade-in' className="col-12 col-md-4">
                    <img src="/static/teacher_1.png" alt="teacher"/>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                                piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
                                McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
                                the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
                                the cites of the word in classical literature, discovered the undoubtable source. Lorem
                                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                                (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
                                on the theory of ethics, very popular during the Renaissance. The first line of
                                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                </div>
                <div data-aos='fade-in' className="col-12 col-md-4">
                    <img src="/static/teacher_2.png" alt="teacher"/>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                                piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
                                McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
                                the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
                                the cites of the word in classical literature, discovered the undoubtable source. Lorem
                                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                                (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
                                on the theory of ethics, very popular during the Renaissance. The first line of
                                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                </div>
                <div data-aos='fade-in' className="col-12 col-md-4">
                    <img src="/static/teacher_3.png" alt="teacher"/>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                                piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
                                McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
                                the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
                                the cites of the word in classical literature, discovered the undoubtable source. Lorem
                                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                                (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
                                on the theory of ethics, very popular during the Renaissance. The first line of
                                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                </div>
                <div className="text-center link-page">
                        <Link to={
                            user.email === undefined ? '/register' : user.teacher ? '/teacher' :
                                '/academics'
                        }>
                            <button className='btn btn-success btn-lg'>teacher page</button>
                        </Link>
                        <Link to={
                            user.email === undefined ? '/register' : '/logout'
                        }>
                            <button className='btn btn-success btn-lg'>
                                {!user.email ? 'Login/Register' : 'logout'}</button>
                        </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
    static contextType = authContext;
}

export default Teacher;