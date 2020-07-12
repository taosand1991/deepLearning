import React, {Fragment, Component} from 'react';
import axios from 'axios';
import {Radio} from "antd";

class Test extends Component {
   constructor(props) {
       super(props);
       this.state = {
           test:false,
           answer:{},
           currentQuestion:0,
           subject:{},
           correctScore:0,
           questionIndex:1,
           loading:false,
           questions:[],
       }
   }

   handleTiming =()=> {
        const number = document.querySelector('.counter');
        let startingMinutes = 60 * 30;
         const timer = setInterval(() => {
             updateTime();
         }, 1000);
        setTimeout(() => {
            clearInterval(timer)
            number.classList.remove('time-color');
            this.handleResult()
        }, startingMinutes * 1000);
        const updateTime =()=>{
           let minutes = Math.floor(startingMinutes/60);
        let seconds = Math.floor(startingMinutes % 60);
        minutes = ('0' + minutes).slice(-2);
        seconds = ('0' + seconds).slice(-2);
            startingMinutes--;
             number.innerText = `${minutes} : ${seconds}`;
            if(minutes < 0){
                number.classList.add('time-color')
            }
        }
   };

    handleTest = async () => {
        this.setState({test:true});
        const {state: {topic, questions}} = this.props.history.location;
        const apiCall = `/api/titles/${topic}/`;
        const {data: subject} = await axios.get(apiCall);
       this.setState({subject, questions});
       if(questions.length > 0) this.handleTiming()
    };



    handleAnswer = async (id, e) => {
        console.log(e.target.value);
        const answerId = this.state.answer;
        answerId[id] = e.target.value;
        this.setState({
            answer:answerId
        });

    };

    getPage =(number)=>{
        this.setState({currentQuestion:number, questionIndex: number + 1})
    };

    next = () => {
        this.setState({
            currentQuestion:this.state.currentQuestion + 1,
            questionIndex:this.state.questionIndex + 1
        })
    };

     prev = () => {
        this.setState({
            currentQuestion:this.state.currentQuestion - 1,
            questionIndex:this.state.questionIndex - 1
        })
    };

    handleResult =()=>{
        let correctScore = 0;
        this.state.questions.forEach((q, index) => {
            if(this.state.answer[index] === q.answer_text){
                correctScore++
            }
            this.setState({correctScore})
        });
        this.setState({loading:true});
        setTimeout(() => {
            this.props.history.replace({
                pathname:'/student/result',
                ...this.state,
            });
        }, 1500);
    };
    render() {
        const {answer, currentQuestion, subject, test, questionIndex, loading} = this.state;
        const {state: {questions}} = this.props.history.location;
        const radioStyles = {
        display: 'block',
        marginTop: 3
    };
        return (
            <Fragment>
                {loading && <div className='loading_2'/> }
                <div className="card">
                    <div className="card-header text-center">
                        <h5>Test</h5>
                    </div>
                    <div className="card-body">
                        <p><u><em>Instructions</em></u></p>
                        <p>
                            1. In at any point of your test, do not refresh the page as this will restart
                            the test and you have to start afresh. <br/>
                            2. Do not use external sources for the answers. <br/>
                            3. Their will be 30 minutes allocated for the test and must be done within time limit. <br/>
                            4. Good luck with your test. <br/>
                        </p>
                        {!test && <button onClick={this.handleTest} className="btn btn-success">Click to begin Test</button>}
                        {test && <Fragment>
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <p>Subject:&nbsp;<span className='text-black-50'>{subject.subject}</span></p>
                                </div>
                                <div className="col-12 col-md-4 ">
                                    <p>Topic:&nbsp;<span className='text-black-50'>{subject.title_text}</span></p>
                                </div>
                                {questions.length > 0 &&
                                <div  className="item-color col-12 col-md-4 text-center text-md-center counter ">

                                </div>}
                            </div>
                            {questions !== undefined && questions.length > 0 ?
                                <Fragment>
                                    <h5>{questionIndex}.&nbsp;{questions[currentQuestion].question_text}</h5>
                                    <Radio.Group value={answer[currentQuestion]}
                                                 onChange={(e) => this.handleAnswer(currentQuestion, e)}>
                                        {questions[currentQuestion].choices.map((choice, i) => {
                                            return <Radio name={questions[currentQuestion]} style={radioStyles}
                                                          key={choice.id}
                                                          value={choice.choice_text}
                                            >
                                                {choice.choice_text}
                                            </Radio>
                                        })}
                                    </Radio.Group><br/>
                                </Fragment> : <h5 className="text-center">No questions for this subject yet</h5>
                            }
                            {currentQuestion > 0 &&
                            <button className='btn btn-danger btn-group' onClick={this.prev}>prev</button>}
                            {currentQuestion < questions.length - 1 &&
                            <button className='btn btn-success btn-group' onClick={this.next}>next</button>}
                            {currentQuestion === questions.length - 1 &&
                                <button onClick={this.handleResult} className='btn btn-warning btn-group'>Submit test</button>
                                }

                        {/*<Steps current={currentQuestion}>*/}
                        {/*        {questions.map((item, i) => (*/}
                        {/*            <Steps.Step key={item.title}/>*/}
                        {/*        ))}*/}
                        {/*    </Steps>*/}
                        <div className='page-number'>
                            {questions.map((q, i) => {
                                return <div className='btn-group' key={i}>
                                    {/*<ul   >*/}
                                    {/*    <li className={answer[i] === '' && answer === {} ? 'blank' : null} onClick={()=>this.getPage(i)}>{i + 1}</li>*/}
                                    {/*</ul>*/}
                                    <button  onClick={()=>this.getPage(i)}
                                             className={answer[i] === undefined || answer[i] === '' ? 'btn btn-outline-success btn-group btn-sm':
                                                 'btn btn-success btn-group btn-sm' }>{i + 1}</button>
                                </div>
                            })}
                            </div>
                        </Fragment>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Test;