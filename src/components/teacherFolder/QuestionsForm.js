import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Select, Input, message} from "antd";
import jwtDecode from 'jwt-decode'

class QuestionsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            selectedSubject: '',
            topics: [],
            topic_text: '',
            title:'',
            topicSubject:'',
            questions:{question:'', answer:''},
            choices:{choice_1:'', choice_2:'', choice_3:'', choice_4:''},
            errors:{},
            loading:false,
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

    handleChangeTopic = (e) => {
        this.setState({topic_text: e.target.value})
    };

    handleSelect = async (value) => {
        this.setState({selectedSubject: value, topics: []});
        const apiCall = `/api/title/${value}/`;
        try {
            const {data: topics} = await axios.get(apiCall);
            setTimeout(() => {
                this.setState({topics})
            }, 1500)
        } catch (e) {
            console.log(e.response.data)
        }
    };

    alertSubject =()=> {
        const errors = this.state.errors;
        if (this.state.topicSubject === '') errors['topic'] = 'please select a subject to create a topic'
        else delete errors['topic'];
        this.setState({errors})


            };

    handleSubmit =async(e)=>{
        e.preventDefault();
        this.setState({loading:true});
        const  topic = {
            title_text: this.state.topic_text.toUpperCase(),
            subject:this.state.topicSubject,
        };
        const apiCall = '/api/title/create';
        try{
            await axios.post(apiCall, topic);
            setTimeout(()=>{
                this.setState({loading:false, topic_text:''});
                message.success('Topic has been added')
            }, 1500)

        }catch (e) {
            if(e){
                console.log(e.response.data);
                this.setState({loading:false})
            }
        }
    };

    handleSelectTopic =(value)=>{
        this.setState({topicSubject:value})
    };

    handleChangeQuestion=(e)=>{
        const questions = this.state.questions;
        questions[e.target.name] = e.target.value;
        this.setState({questions})
    };

    handleChangeChoice =(e)=>{
        const choices = this.state.choices;
        choices[e.target.name] = e.target.value;
        this.setState({choices})
    };

    handleTitleSelect =(value)=>{
        this.setState({title:value})
    };
    handleSubmitQuestion =async(e)=>{
        e.preventDefault();
        this.setState({loading:true});
        const token = localStorage.getItem('token');
        const user = jwtDecode(token)
        const {questions:{question, answer},
            choices:{choice_1,choice_2, choice_3, choice_4 }, title} = this.state;
        const questionCall = '/api/question/';
        const choiceCall = '/api/choice/';
        const questions = {
                question_text:question,
                answer_text:answer,
                title:title,
                user:user.user_id
        };

        try{
            const {data:question} = await axios.post(questionCall, questions, {
                headers:{'Authorization': `JWT ${token}`}
            });
            if (choice_3 === "" && choice_4 === '') {
                const choices = [
                    {choice_text: choice_1, question: question.id},
                    {choice_text: choice_2, question: question.id},
                ];
                await axios.post(choiceCall, choices);
            }else{
                const choices = [
                    {choice_text: choice_1, question: question.id},
                    {choice_text: choice_2, question: question.id},
                    {choice_text: choice_3, question: question.id},
                    {choice_text: choice_4, question: question.id},
                ];
                await axios.post(choiceCall, choices);
            }

            this.setState({questions:{question:'', answer:''}, choices:{choice_1:'',
                choice_2:'', choice_3:'', choice_4:''}});
        setTimeout(()=>{
            this.setState({loading:false});
            message.success('Question has been added')
        }, 1500)
        }catch (e) {
            if(e){
                this.setState({loading:false})
                console.log(e.response.data)
            }
        }
        console.log(user.user_id)
    };

    render() {
        const {subjects, topics, topic_text, questions:{question, answer},
        choices:{choice_1, choice_2, choice_3, choice_4}, errors, topicSubject, loading}
        = this.state;
        return (
            <Fragment>
                {loading && <div className='loading_2'/>}
                <div className="card">
                    <div className="card-header text-center">
                        <h5>Set Questions</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <label htmlFor="subject">Choose Subject</label><br/>
                                <Select id='subject' style={{width: 200}} onChange={this.handleSelect}>
                                    {subjects.map(subject => {
                                        return <Select.Option key={subject.id}
                                                              value={subject.id}>{subject.name}</Select.Option>
                                    })}
                                </Select>
                                <br/>
                                <label className='mt-2' htmlFor="topic">Choose Topic</label><br/>
                                <Select onChange={this.handleTitleSelect} id='topic' style={{width: 300}} disabled={topics.length === 0}>
                                    {topics.map(topic => {
                                        return <Select.Option key={topic.id}
                                                              value={topic.id}>{topic.title_text}</Select.Option>
                                    })}
                                </Select>
                            </div>
                            <div className="col-md-2 mt-2 mt-md-0">
                                <h2 className='mt-5 text-md-left text-center'>OR</h2>
                            </div>
                            <div className="col-12 col-md-4">
                                <h5 className='mb-2 topic'>Create a Topic</h5>
                                <label htmlFor="subject_2">Choose Subject</label><br/>
                                <Select id='subject_2' style={{width: 200}} onChange={this.handleSelectTopic}>
                                    {subjects.map(subject => {
                                        return <Select.Option key={subject.id}
                                                              value={subject.id}>{subject.name}</Select.Option>
                                    })}
                                </Select>
                                <br/>
                                {errors.topic && <small style={{color:'red'}}>{errors.topic}</small>}
                                <form onSubmit={this.handleSubmit}>
                                    <label className='mt-2' htmlFor="topic_text">Topic</label>
                                    <Input id='topic_text' value={topic_text} required
                                           onChange={this.handleChangeTopic}
                                            onFocus={this.alertSubject}/>
                                    <div className="text-center">
                                        <button disabled={topicSubject === '' || topic_text === ''} className='btn btn-success'>create topic</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <h4 className='text-center question-form'>Add Questions</h4>
                    <div className='ml-2 text-bold'>
                    <p><u>Instructions</u></p>
                    <p>please select the subject and topic you wanna add questions to,
                        without this, you wont be able to proceed further.
                    </p>
                        </div>
                    <form onSubmit={this.handleSubmitQuestion} className='col-12 col-md-7'>
                        <label className='mt-2 mb-2' htmlFor="question">Question</label>
                        <Input.TextArea id='question' placeholder='Add Question' value={question}
                               name='question' required
                               onChange={this.handleChangeQuestion}/>
                         <label className='mt-2 mb-2' htmlFor='answer'>Answer</label>
                         <Input id='answer' placeholder='Input an answer' value={answer}
                                name='answer' required
                                onChange={this.handleChangeQuestion}/>
                         <label className='mt-2 mb-2' htmlFor='choice_1'>Choice 1</label>
                         <Input id='choice_1' placeholder='first choice' value={choice_1}
                                name='choice_1' required
                                onChange={this.handleChangeChoice}/>
                          <label className='mt-2 mb-2' htmlFor='choice_1'>Choice 2</label>
                         <Input id='choice_2' placeholder='second choice' value={choice_2}
                                name='choice_2' required
                                onChange={this.handleChangeChoice}/>
                          <label className='mt-2 mb-2' htmlFor='choice_3'>Choice 3</label>
                         <Input id='choice_3' placeholder='third choice' value={choice_3}
                                name='choice_3'
                                onChange={this.handleChangeChoice}/>
                          <label className='mt-2 mb-2' htmlFor='choice_4'>Choice 4</label>
                         <Input id='choice_4' placeholder='fourth choice' value={choice_4}
                                name='choice_4'
                                onChange={this.handleChangeChoice}/>
                        <button disabled={this.state.title === ''}
                            className='btn btn-success btn-block mt-3 mb-2'>submit question</button>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default QuestionsForm;