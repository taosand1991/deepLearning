import React, {Component, Fragment} from 'react';
import {Progress,message, Alert} from "antd";
import axios from 'axios';

class Result extends Component {
    _isMounted  = false;
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            errors:{},
        }
    }

    componentDidMount() {
        this._isMounted  = true;
        window.addEventListener('beforeunload', this.goBack);
        const {location} = this.props.history;
        console.log(location);

    }

     componentWillUnmount() {
         this._isMounted  = false;
    }
    goBack =()=>{
        return this.props.history.replace('/student/question')
    };

    saveResult = async() => {
        const token = localStorage.getItem('token');
        const {location} = this.props.history;
        const {subject:{subject, title_text}} = location;
        const correctScore = location.correctScore;
        const totalQuestion = location.questionIndex;
        const totalScore = Math.ceil((correctScore / totalQuestion) * 100);
        const apiCall = '/api/score';
        this.setState({loading:true});
        try{


            await axios.post(apiCall, {subject, title_text, totalScore}, {
                headers:{'Authorization': `JWT ${token}`}
            });
            setTimeout(() => {
                message.success('Result has been saved');
                this.props.history.replace('/student/question')
            }, 1500)
        }catch (e) {
            if(e){
                const errors = this.state.errors;
                errors['message'] = e.response.data['message'];
                this.setState({loading:false, errors})
            }
        }

    };

    restartQuestion =()=>{
        this.setState({loading:true});
        setTimeout(()=> {
            this.props.history.replace('/student/question')
        }, 1500)
    };



    render() {
        const {location} = this.props.history;
        console.log(location);
        const {subject:{subject, title_text}} = location;
        const {loading, errors} = this.state;

        const calculateScore =()=>{
            let totalScore = 0;
            if(location.correctScore === 0 ){
                totalScore = 0;
                return <h5>{totalScore}%</h5>
            }else{
                const correctScore = location.correctScore;
                const totalQuestion = location.questionIndex;
                totalScore = Math.ceil((correctScore / totalQuestion) * 100);
                console.log(totalScore);
                return <div>
                     <h5>{totalScore}%</h5>
                     <div className="text-center">
                                <Progress percent={totalScore} success={50}
                                          strokeColor={totalScore < 50 ? 'red' : 'blue'}
                                          type='circle'/>
                            </div>
                </div>
            }
        };
        return (
            <Fragment>
                <div className='mb-3'>{errors.message && <Alert message={errors.message} closable showIcon type='error'/>}</div>
                {loading && <div className='loading_2'/> }
                <div className="card">
                    <div className="card-header text-center">
                        <h3><u>Result Details</u></h3>
                    </div>
                    <div className="card-body">
                            <h5>Subject: <span className='float-md-right italic'>{subject}</span></h5>
                            <h5>Topic: <span className='float-md-right italic'>{title_text}</span></h5>
                             <h5>Total Question: <span className='float-md-right italic'>{location.questionIndex}</span></h5>
                            <h5>Correct Question(s): <span className='float-md-right italic'>{location.correctScore}</span></h5>
                            <h3>SCORE: <span className='float-md-right italic'>{calculateScore()}</span></h3>
                        <div className='text-center'>
                            <button onClick={this.saveResult} className='btn btn-success btn-group'>save result</button>
                            <button onClick={this.restartQuestion} className='btn btn-warning btn-group'>try again</button>
                        </div>
                        </div>
                </div>
            </Fragment>
        );
    }
}

export default Result;