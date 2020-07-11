import React, {Component, Fragment} from 'react';
import {List, Avatar, Input, message} from 'antd'
import {BookFilled} from "@ant-design/icons";
import {Link} from "react-router-dom";
import axios from 'axios'

class Assignments extends Component {
    state = {
        showPage:false,
        answer:'',
        loading:false,
    };

    showAss =(e)=>{
        e.preventDefault();
        this.setState({showPage:true})
    };

    handleChange =(e)=>{
        this.setState({answer:e.target.value})
    };

    handleSubmit =async(id, e)=>{
        this.setState({loading:true});
        e.preventDefault();
        const assignment ={
            assignment_solution:this.state.answer,
            is_submitted: true,
        };
        const apiCall = `/api/assignments/${id}/`;

        try{
            await axios.patch(apiCall, assignment);
            setTimeout(() => {
                this.setState({loading:false, answer:'', showPage:false});
                message.success('Your assignment has been submitted');
            }, 1500);
        }catch (e) {
            if(e){
                this.setState({loading:false});
                console.log(e.response.data)
            }
        }
    };

    render() {
        const {state: {assignments}} = this.props.history.location;
        const {showPage, answer, loading} = this.state;
        return (
            <Fragment>
                {loading && <div className='loading_2'/> }
                <div className="card">
                    <div className="card-header text-center">
                        <h4>Assignment Question(s)</h4>
                    </div>
                    <div className="card-body">
                        {assignments.length > 0 ?
                        <List
                            itemLayout="horizontal"
                            dataSource={assignments}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            icon={<BookFilled/>}/>}
                                        title={<Link onClick={this.showAss} to={'#'}><h4>{item.subject}</h4></Link>}
                                        description={item.topic}
                                    />
                                </List.Item>
                            )}
                        /> : <h5 className='text-center'>You have no assignment at this moment</h5>}
                        {showPage ? <><hr/> {assignments.map(ass => {
                            return <div key={ass.id}>
                                <h6>Assignment Subject:&nbsp; <span className='italic'>{ass.subject}</span></h6>
                                <h6>Assignment Topic:&nbsp; <span className='italic'>{ass.topic}</span></h6>
                                <h6>Assignment Score:&nbsp; <span className='italic'>{ass.assignment_score}</span></h6>
                                <h6><u>Assignment Question</u></h6>
                                <p>{ass.assignment_question}</p>
                                <form onSubmit={(e) => this.handleSubmit(ass.id, e)}>
                                <label htmlFor="answer">Assignment answer <span style={{color:'red'}}>*</span></label>
                                <Input.TextArea cols={5} rows={5}
                                                value={answer}
                                                onChange={this.handleChange}/>
                                 <button disabled={answer === ''} className='btn btn-success mt-2'>Submit</button>
                                 </form>
                            </div>
                        })}</>: null }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Assignments;