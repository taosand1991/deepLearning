import React, {Component, Fragment} from 'react';
import {Input, notification} from "antd";
import axios from 'axios'

class Report extends Component {
    constructor(props) {
        super(props);
        this.state ={
        reports:{subject:'', report:'', student:'', teacher:''},
            loading:false,
        }
    }
    handleChange =(e)=>{
        const reports = this.state.reports;
        reports[e.target.name] = e.target.value;
        this.setState({reports})
    };

    handleReset =()=>{
        this.setState({reports:{subject:'', report:'', student:'', teacher:''}})
    };
    handleSubmit =async(e)=> {
        this.setState({loading:true});
        e.preventDefault();
        const {reports:{subject, report, student, teacher}} = this.state;
        const reportData = {
            subject,
            report,
            student,
            teacher
        };
        const apiCall = '/api/reports';
        try{
            await axios.post(apiCall, reportData);
            this.handleReset();
            setTimeout(() => {
                this.setState({loading:false})
                notification.success({
                    title: 'Report has been sent',
                    description:'Your report has been sent. The committee will review and get back to you',
                    duration:6
                }, 1500)
            })

        }catch (e) {
            this.setState({loading:false});
            if(e){
                console.log(e.response.data)
            }
        }

    };

    render() {
        const {reports:{subject, report, student, teacher}, loading} = this.state;
        return (
            <Fragment>
                {loading && <div className='loading_3'/> }
             <div className="card">
                 <div className="card-header text-center">
                     <h5>Report a Student</h5>
                 </div>
                 <div className="card-body">
                     <div className="mt-3">
                         <p>
                             Please make a report of student that does not follow instructions,
                             or cheating.<br/>
                             If a student does not submit his/her assignment on time, a report has
                             to be made with the name of the student and the committee will take a
                             disciplinary action on it.
                             So fill in the required details and submit.
                         </p>
                         <form onSubmit={this.handleSubmit} className='col-12 col-md-7'>
                             <label className='mt-2' htmlFor="teacher">Teacher's Name</label>
                             <Input placeholder="Teacher's name"
                                    required
                                    value={teacher} name='teacher'
                                    onChange={this.handleChange}/>
                             <label className='mt-2' htmlFor="student">Student's Name</label>
                             <Input placeholder="student's name"
                                    required
                                    value={student} name='student'
                                    onChange={this.handleChange}/>
                             <label className='mt-2' htmlFor="report">Report</label>
                             <Input.TextArea placeholder="write report...."
                                    value={report} name='report'
                                     required
                                    onChange={this.handleChange}/>
                              <label className='mt-2' htmlFor="subject">Subject</label>
                             <Input placeholder="Subject"
                                    required
                                    value={subject} name='subject'
                                    onChange={this.handleChange}/>
                             <button
                                 className='btn btn-success'>send report</button>
                         </form>
                     </div>
                 </div>
             </div>
            </Fragment>
        );
    }
}

export default Report;