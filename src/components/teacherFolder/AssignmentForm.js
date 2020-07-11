import React, {Component, Fragment} from 'react';
import {Input, Select, message} from "antd";
import axios from 'axios';

class AssignmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments:{subject:'', topic:'', question:'', score:''},
            students:[],
            selectedStudent:'',
            loading:false,
            errors:{},
            open:false,
            assignment:[],
            loadAss:false,
        }
    }

    async componentDidMount() {
        const apiCall = '/api/user/get_student/';
        const assCall = '/api/assignments/get_submit_ass/';
        try{
            const {data:students} = await axios.get(apiCall);
            const {data:assignment} = await axios.get(assCall);
            this.setState({students, assignment})
        }catch (e) {
            if(e){
                console.log(e.response.data)
            }
        }
    }

    loadAssignment =()=>{
        this.setState({loadAss:!this.state.loadAss})
    };


    handleChange =(e)=>{
        const assignments = this.state.assignments;
        assignments[e.target.name] = e.target.value;
        this.setState({assignments})
    };

    handleSelectChange =(value)=> {
        this.setState({selectedStudent:value})
    };
    handleReset =()=>{
        this.setState({assignments:{subject:'', topic:'', question:'', score:''}})
    };


    handleSubmit =async(e) => {
        e.preventDefault();
        this.setState({loading:true});
        const apiCall = '/api/assignments/';
        const {assignments:{subject,topic, question, score}, selectedStudent} = this.state;
        const assObject = {
            subject,
            topic,
            assignment_question:question,
            assignment_score:score,
            is_submitted:false,
            user:selectedStudent,
        };
        try{
          await axios.post(apiCall, assObject);
            this.handleReset();
            setTimeout(() => {
                this.setState({open:false, loading:false});
                message.success('Assignment has been created')
            }, 2000)
        }catch (e) {
            if(e){
                this.setState({loading:true});
                console.log(e.response.data)
            }
        }
    };
    openCreate =()=>{
        this.setState({open:true})
    };


    componentWillUnmount() {
        this.setState = ((state, callback) => {
            return null;
        })
    }

    render() {
        const {assignments:{subject, topic, question, score}, students, open,
        selectedStudent, loading, assignment, loadAss} = this.state;
        return (
            <Fragment>
                {loading && <div className='loading_2'/> }
              <div className="card">
                  <div className="card-header text-center">
                      <h5>Set Assignment</h5>
                  </div>
                  <div className="card-body">
                      <div className="ml-2">
                          <h6>
                              <u>Instructions</u>
                          </h6>
                          <p>
                              The assignment to be set must be very reasonable and must
                              be inline with the committee rules and regulations, any
                              assignment set for students outside the curriculum will be
                              discarded and the teacher in charge will be queried.
                          </p>
                      </div>
                      {!open && <button onClick={this.openCreate} className='btn btn-outline-amber'>Create assignment</button>}
                      <div className='row'>
                          <div className='col-12 col-md-6'>
                      {open && <form onSubmit={this.handleSubmit}>
                             <label className='mt-2' htmlFor="subject">Subject</label>
                             <Input placeholder="subject...." required
                                    value={subject} name='subject'
                                    onChange={this.handleChange}/>
                             <label className='mt-2' htmlFor="topic">Topic</label>
                             <Input placeholder="Topic...." required
                                    value={topic} name='topic'
                                    onChange={this.handleChange}/>
                             <label className='mt-2' htmlFor="question">Assignment question</label>
                             <Input.TextArea placeholder="write question....." required
                                    value={question} name='question'
                                    onChange={this.handleChange}/>
                              <label className='mt-2' htmlFor="score">Assigment score</label>
                             <Input placeholder="Assignment score" required
                                    value={score} name='score'
                                    onChange={this.handleChange}/>
                                <label className='mt-2' htmlFor="student">Assign to student</label><br/>
                                <Select style={{width:200}} onChange={this.handleSelectChange}>
                                    {students.map(st => {
                                        return <Select.Option key={st.id} value={st.id}>{st.email}</Select.Option>
                                    })}
                                </Select><br/>
                             <button disabled={selectedStudent === ''}  className='btn btn-success'>set assignment</button>
                         </form>}
                         </div>
                          <div className="col-12 col-md-6">
                             <div className="card-header text-center success-color text-white">
                                 <h6>Submitted Assignment</h6>
                             </div>
                              <ul className='list-group mt-2 assignment'>
                                  {assignment.map(ass => {
                                      return <li onClick={this.loadAssignment} className='list-group-item list-group-item-action' key={ass.id}>
                                          {ass.subject}&nbsp; <span className='text-light float-md-right'>{ass.user}</span>
                                          {loadAss && <div>
                                              <h6>Topic: &nbsp; {ass.topic}</h6>
                                              <h6>Question: &nbsp; {ass.assignment_question}</h6>
                                              <h6><u>Solution</u></h6>
                                              <p>{ass.assignment_solution}</p>
                                          </div>}
                                      </li>
                                  })}
                              </ul>
                          </div>
                         </div>
                  </div>
              </div>
            </Fragment>
        );
    }
}

export default AssignmentForm;