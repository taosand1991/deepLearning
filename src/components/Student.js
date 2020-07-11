import React, {Component,Fragment} from 'react';
import {Link} from 'react-router-dom';
import authContext from "./Utils";

class Student extends Component {
    render() {
        const {user} = this.context;
        return (
            <Fragment>
                <section className='page-1'>
                    <div className="row m-auto">
                        <div  className="col-12 col-md-6">
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

                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                                interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                                are also reproduced in their exact original form, accompanied by English versions from
                                the 1914 translation by H. Rackham.
                            </p>
                        </div>
                        <div  className="col-12 col-md-6">
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

                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                                interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                                are also reproduced in their exact original form, accompanied by English versions from
                                the 1914 translation by H. Rackham.
                            </p>
                        </div>
                    </div>
                </section>
                <section className='page-2'>
                <div  className="row">
                    <div data-aos='fade-right' className="col-12 col-md-4">
                        <img src="/static/student.png" alt="student_1"/>
                    </div>
                    <div data-aos='fade-in' className="col-12 col-md-4">
                         <img src="/static/student_2.png" alt="student_1"/>
                    </div>
                    <div data-aos='fade-left' className="col-12 col-md-4">
                         <img src="/static/student_3.png" alt="student_1"/>
                    </div>
                    <div className="text-center link-page">
                        <Link to={
                            user.email === undefined ? '/register' : user.student ? '/student' :
                                '/academics'
                        }>
                            <button className='btn btn-success btn-lg'>student page</button>
                        </Link>
                        <Link to={
                            user.email === undefined ? '/register' : '/logout'
                        }>
                            <button className='btn btn-success btn-lg'>
                                {!user.email ? 'Login/Register' : 'logout'}</button>
                        </Link>
                    </div>
                </div>
                </section>
            </Fragment>
        );
    }
    static contextType = authContext;
}

export default Student;