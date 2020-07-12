import React, {Component, Fragment} from 'react';
import {Input, notification} from 'antd';
import {MDBIcon, MDBBtn} from "mdbreact";
import axios from 'axios';

class ResetPassword extends Component {
    state = {
        account:{password1:'', password2:''},
        loading:false,
    };

    handleChange =(e)=>{
        const account = this.state.account;
        account[e.target.name] = e.target.value;
        this.setState({account})
    };

    handleSubmit =async(e)=>{
        e.preventDefault();
        this.setState({loading:true});
        const {account:{password1, password2}} = this.state;
        const options = {
            uid: this.props.match.params.uid64,
            token:this.props.match.params.token,
            new_password1:password1,
            new_password2:password2
        };
        const apiCall = '/auth/password/reset/confirm/';
        try{
            await axios.post(apiCall, options);
            setTimeout(() => {
                notification.success({
                    title:'Password Reset',
                    description:'Your password has been changed successfully',
                    duration:6,
                })
                this.props.history.replace('/register')
            }, 2000)
        }catch (e) {
            console.log(e.response.data)
        }
    };

    render() {
        const {account:{password1, password2}, loading} = this.state;
        return (
            <Fragment>
                {loading && <div className='loading_3'/> }
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="card">
                           <div className="card-body text-center">
                               <h3 className='text-center mb-3'>Reset Password</h3>
                               <form onSubmit={this.handleSubmit}>
                                   <label className='mb-3' htmlFor="password">New password</label>
                                   <Input.Password placeholder='Password...'
                                          id='password'
                                          value={password1}
                                          name='password1'
                                          onChange={this.handleChange}/>
                                   <label className='mb-4 mt-3' htmlFor="password2">Confirm password</label>
                                   <Input.Password placeholder='Confirm password...'
                                          value={password2}
                                          id='password2'
                                          name='password2'
                                          onChange={this.handleChange}/>
                                   <MDBBtn type='submit' color='unique' >
                                       Submit
                                    <MDBIcon far icon='paper-plane' className='ml-2'/>
                                   </MDBBtn>
                               </form>
                           </div>
                        </div>
                        <p className='text-white-50'>
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                        interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                        are also reproduced in their exact original form, accompanied by English versions from
                        the 1914 translation by H. Rackham.
                    </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ResetPassword;