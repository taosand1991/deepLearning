import React, {Component, Fragment} from 'react';
import {ArrowRightOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom';
import authContext from "./Utils";

class Academics extends Component {
    render() {
        const {user} = this.context;
        return (
            <Fragment>
                <div className="row m-auto academic">
                    <div className="col-12 col-md-6">
                        <p>
                            Deciding upon a thesis can generate considerable anxiety. Students may think,
                            "How can I have a new idea about a subject scholars have spent their whole lives exploring?
                            I just read a few books in the last few days, and now I'm supposed to be an expert?"
                            But you can be original on different scales. We can't possibly know everything that has
                            been, or is being, thought or written by everyone in the world—even given the vastness and
                            speed of the Internet. What is required is a rigorous, good faith effort to establish
                            originality, given the demands of the assignment and the discipline. It is a good
                            exercise throughout the writing process to stop periodically and reformulate your
                            thesis as succinctly as possible so someone in another field could understand its
                            meaning as well as its importance. A thesis can be relatively complex,
                            but you should be able to distill its essence. This does not mean you have to
                            give the game away right from the start. Guided by a clear understanding of
                            the point you wish to argue, you can spark your reader's curiosity by
                            first asking questions—the very questions that may have guided you in your
                            research—and carefully building a case for the validity of your idea.
                            Or you can start with a provocative observation, inviting your audience to
                            follow your own path of discovery.
                        </p>
                    </div>
                    <div data-aos='fade-left' className="col-12 col-md-6">
                        <img src="/static/academic.jpg" alt="academic"/>
                    </div>
                </div>
                <div className="row m-auto academic">
                    <div data-aos='fade-right' className="col-12 col-md-6">
                        <img src="/static/academic_2.jpg" alt="academic"/>
                    </div>
                    <div className="col-12 col-md-6">
                        <p>
                            There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour, or randomised words which don't
                            look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need
                            to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem
                            Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this
                            the first true generator on the Internet. It uses a dictionary of over 200 Latin words,
                            combined with a handful of model sentence structures, to generate Lorem Ipsum which looks
                            reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected
                            humour, or non-characteristic words etc.
                        </p>
                        <Link to={
                            user.email === undefined ? '/register' : user.student ? '/student':
                                '/teacher'
                        }>
                        <button className='btn btn-warning mybtn'>
                            Proceed to profile &nbsp;<ArrowRightOutlined style={{fontSize:20, display:'inline-block'}}/></button>
                            </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
    static contextType = authContext;
}

export default Academics;