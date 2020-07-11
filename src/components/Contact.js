import React, {Component, Fragment} from 'react';
import {Input, notification} from "antd";
import axios from 'axios'

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {name: '', email: '', message: ''},
            loading: false,
        }
    }

    handleChange = (e) => {
        const contact = this.state.contact;
        contact[e.target.name] = e.target.value;
        this.setState({contact})
    };

    handleReset = () => {
        this.setState({contact: {name: '', email: '', message: ''}})
    }

    handleSubmit = async (e) => {
        this.setState({loading: true});
        e.preventDefault();
        const {contact: {name, email, message}} = this.state;
        const contactDetails = {
            name,
            email,
            message
        };
        const apiCall = '/api/contacts';
        this.handleReset();
        try {
            await axios.post(apiCall, contactDetails);
            setTimeout(()=>{
                this.setState({loading:false});
                notification.success({
                    title:'message sent',
                    description:'your message has been sent',
                    duration:6
                })
            },1500)
        } catch (e) {
            console.log(e.response.data)
        }

    };

    render() {
        const {contact: {name, email, message}, loading} = this.state;
        return (
            <Fragment>
                {loading && <div className='loading_3'/> }
                <div className="row m-auto contact">
                    <div className='text-white-50'>
                        <p>
                            Please fill the form to send a message and response
                            within 48 hours.
                            Thank you for choosing us.
                        </p>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3">
                        <form onSubmit={this.handleSubmit}>
                            <label className='mt-2' htmlFor="name">Name &nbsp;<span
                                style={{color: 'red'}}>*</span></label>
                            <Input placeholder='Name...' value={name}
                                   name='name'
                                   onChange={this.handleChange}
                                   className='mt-2'/>
                            <label className='mt-2' htmlFor="name">Email &nbsp;<span
                                style={{color: 'red'}}>*</span></label>
                            <Input placeholder='Email...' value={email}
                                   name='email'
                                   onChange={this.handleChange}
                                   className='mt-2'/>
                            <label className='mt-2' htmlFor="name">Message &nbsp;<span
                                style={{color: 'red'}}>*</span></label>
                            <Input.TextArea placeholder='type your message...' value={message}
                                            name='message'
                                            onChange={this.handleChange}
                                            className='mt-2'/>
                            <div className="text-center mt-2">
                                <button className='btn btn-success'>Send message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Contact;