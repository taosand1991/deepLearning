import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Select} from "antd";
import authContext from "../Utils";


class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            topics: [],
            postPerPage: 1,
            activePage: 1,
            selectedAnswer: '',
            marks: 0,
            selectedSubject: '',
            selectedTopic: '',
            questions: [],
        }
    }

    async componentDidMount() {
        const apiCall = '/api/subject/';
        try {
            const {data: subjects} = await axios.get(apiCall);
            this.setState({subjects})
        } catch (e) {
            if (e) {
                console.log(e.response.data)
            }
        }

    }

     componentWillUnmount() {
    }

    handleChange = async (value) => {
        this.setState({selectedSubject: value});
        const apiCall = `/api/title/${value}/`;
        try {
            const {data: topics} = await axios.get(apiCall)
            setTimeout(() => {
                this.setState({topics})
            }, 1500)
        } catch (e) {
            if (e) {
                console.log(e.response.data)
            }
        }
    };

    handleChangeTopic = async (value) => {
        this.setState({selectedTopic: value});
        const apiCall = `/api/questions/${value}/`;
        try {
            const {data: questions} = await axios.get(apiCall);
            this.setState({questions})

        } catch (e) {
            if (e) {
                console.log(e.response.data)
            }
        }
    };


    render() {
        const {user} = this.context;
        const {subjects, topics, selectedSubject, selectedTopic} = this.state;
        const {Option} = Select;
        return (
            <Fragment>
                <div className="card">
                    <div className="card-header text-center">
                        <h5>Question Preparation</h5>
                    </div>
                    <div className="card-body">
                        <p><u><em>Instructions</em></u></p>
                        <p>
                            Hello {user.first_name},<br/>
                            Welcome to your question portal where you will be able to choose
                            your subject, topic and start your test. Time will be allocated
                            for the test, which you have be time conscious when you answering
                            the questions.
                            No cheating or use of external sources is allowed as you will be disqualified
                            as such.
                            Follow the instructions and if encountered any problem, do not hesitate to inform
                            your teacher.
                        </p>
                        <hr/>
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <label htmlFor="subject">Select Subject</label><br/>
                                <Select id='subject' style={{width: 200}} onChange={this.handleChange}>
                                    {subjects.map(subject => {
                                        return <Option key={subject.id} value={subject.id}>{subject.name}</Option>
                                    })}
                                </Select>
                            </div>
                            <div className="col-12 col-md-4">
                                <label htmlFor='topic'>Select Topic</label><br/>
                                <Select onChange={this.handleChangeTopic}
                                        id='topic' disabled={topics.length === 0} style={{width: 300}}>
                                    {topics.map(topic => {
                                        return <Option key={topic.id} value={topic.id}>{topic.title_text}</Option>
                                    })}
                                </Select>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <Link disabled={selectedSubject === "" || selectedTopic === ''} to={{pathname:'/student/test',  state:{questions:this.state.questions,
                            topic:selectedTopic}
                            }}>
                                <button disabled={selectedSubject === "" || selectedTopic === ''}
                                        className="btn btn-success btn-block">Start Test
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
    static contextType = authContext;
}

export default Questions;