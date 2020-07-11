import React, {Component, Fragment} from 'react';
import {Input, Radio, Alert, Modal, message} from "antd";
import {LoginOutlined, UserOutlined} from '@ant-design/icons'
import authContext from "./Utils";
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import {Link} from "react-router-dom";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {email: '', first_name: '', last_name: '', password: '', password2: ''},
            value: '',
            is_student: false,
            is_teacher: false,
            loginDetail:{emailAd:'', pass:''},
            errors:{},
            loading:false,
            openModal:false,
            email:''
        }
    }

    componentDidMount() {

    }

    handleValueChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    handleChange = (e) => {
        const account = this.state.account;
        account[e.target.name] = e.target.value;
        this.setState({account})
    };

    handleSubmit = async(e) => {
        e.preventDefault();
        this.setState({loading:true});
        const {account:{email, first_name, last_name, password, password2}, value} = this.state;
        const apiCall = '/api/user/';
        if(value === 'student') {
            const account = {
                email,
                first_name,
                last_name,
                password,
                password2,
                is_student: true,
                is_teacher: false,
            }
        try{
            const response = await axios.post(apiCall, account);
            console.log(response)
        }catch (e) {
            if(e){
                const errors = this.state.errors;
                errors['email'] = e.response.data['email']
                this.setState({errors})
            }
        }
        }else{
            const account ={
                email,
                first_name,
                last_name,
                password,
                password2,
                is_student: false,
                is_teacher: true,
            };
        try{
            const response = await axios.post(apiCall, account);
            console.log(response)
        }catch (e) {
            if(e){
               const errors = this.state.errors;
                errors['email'] = e.response.data['email'];
                this.setState({errors})
            }
        }
        }
    };

    handleLoginChange=(e)=>{
        const loginDetail = this.state.loginDetail;
        loginDetail[e.target.name] = e.target.value;
        this.setState({loginDetail})
    };

    handleSubmitLogin =async(e)=>{
        e.preventDefault();
        const {refreshPage} = this.context;
        this.setState({loading:true});
        const {loginDetail:{emailAd, pass}} = this.state;
        const account ={
            email:emailAd,
            password:pass,
        }
        const apiCall = '/auth/login/';
        try{
            const {data:response} = await axios.post(apiCall, account);
            setTimeout(()=>{
                this.setState({loading:false});
                const token = response.token;
                localStorage.setItem('token', token);
                const user = jwtDecode(token);
                if(user.student){
                    this.props.history.replace('/student')
                }else{
                    this.props.history.replace('/teacher')
                }
                refreshPage()
            },2000)

        }catch (e) {
            if(e){
                console.log(e.response.data);
                const errors = this.state.errors;
                errors['login'] = e.response.data['non_field_errors'];
                this.setState({loading:false})
            }
        }
    };

    transformModal =(e)=>{
        e.preventDefault()
        this.setState({openModal:!this.state.openModal})
    };


    handleSubmitPassword =async(e)=> {
       this.setState({loading:true});
        e.preventDefault();
        const email = {
            email:this.state.email
        };
        const apiCall = '/auth/password/reset/';
        try{
            await axios.post(apiCall, email);
            setTimeout(() => {
                this.setState({loading:false, openModal:false});
                message.success('please check your inbox')
            }, 2000)
        }catch (e) {
            this.setState({loading:false});
            console.log(e.response.data)
        }

    };

    handleResetChange =(e)=>{
        this.setState({email:e.target.value})
    };

    render() {
        const {account: {email, first_name, last_name, password, password2}, errors} = this.state;
        const {loginDetail:{emailAd, pass}, openModal} = this.state;
        return (
            <Fragment>
                <Modal visible={openModal}
                       title='Reset password'
                       footer={null}
                       onCancel={this.transformModal}>
                    {this.state.loading && <div className='loading'/>}
                    <div className='mt-2 mb-2'>
                        <h6>Please enter your email</h6>
                    </div>
                    <form onSubmit={this.handleSubmitPassword}>
                        <label className='mb-2' htmlFor="email">Email</label>
                        <Input placeholder='Email'
                               id='email'
                               value={this.state.email}
                               onChange={this.handleResetChange}/>
                        <button className='btn btn-success'>Reset password</button>
                    </form>
                </Modal>
                {this.state.loading && <div className='loading'/>}
                <div className='row m-auto'>
                    <div className="text-center col-12 col-md-6">
                        <h4 className='register'>REGISTER A NEW ACCOUNT</h4>
                        <div data-aos='fade-up' className="card reg_card py-2 mt-2">
                            <form className='col-12 col-md-6 offset-md-3' onSubmit={this.handleSubmit}>
                                {errors.email && <small style={{color:'red'}}>{errors.email}</small>}
                                <Input className={'mt-2 '}
                                       placeholder={'Email...'}
                                       prefix={<UserOutlined/>}
                                       name='email'
                                       required
                                       value={email}
                                       onChange={this.handleChange}/>
                                <Input className={'mt-2 '}
                                       placeholder={'First name'}
                                       name='first_name'
                                       value={first_name}
                                       onChange={this.handleChange}/>
                                <Input className={'mt-2 '}
                                       placeholder={'Last name'}
                                       name='last_name'
                                       required
                                       value={last_name}
                                       onChange={this.handleChange}/>
                                <Input.Password className={'mt-2 '}
                                                placeholder={'Password'}
                                                name='password'
                                                required
                                                value={password}
                                                onChange={this.handleChange}/>
                                <Input.Password className={'mt-2 mb-2 '}
                                                placeholder={'Confirm password'}
                                                name='password2'
                                                required
                                                value={password2}
                                                onChange={this.handleChange}/>
                                <Radio.Group value={this.state.value} onChange={this.handleValueChange}>
                                    <Radio value={'student'}>Student</Radio>
                                    <Radio value={'teacher'}>Teacher</Radio>
                                </Radio.Group>
                                <div className='mt-2 text-center'>
                                    <button disabled={this.state.value === ''}
                                        className='btn btn-primary btn-sm'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="text-center col-12 col-md-6">
                        <h4 className='login'>LOGIN TO YOUR ACCOUNT</h4>
                        <div data-aos='fade-right' className="card login_card py-2 mt-2">
                            <span><LoginOutlined style={{fontSize:50}}/></span>
                            <form className='col-12 col-md-6 offset-md-3' onSubmit={this.handleSubmitLogin}>
                                {errors.login && <Alert message={errors.login} type={"error"} showIcon/> }
                                <Input className={'mt-3 '}
                                       placeholder={'Email...'}
                                       prefix={<UserOutlined/>}
                                       name='emailAd'
                                       value={emailAd}
                                       onChange={this.handleLoginChange}/>
                                <Input.Password className={'mt-3 '}
                                       placeholder={'Password'}
                                       name='pass'
                                       value={pass}
                                       onChange={this.handleLoginChange}/>
                                <button disabled={emailAd === '' || pass === ''}
                                    className='btn btn-success'>Login</button>
                                <Link onClick={this.transformModal} to='#'>forgot password?</Link>
                            </form>
                        </div>
                    </div>
                </div>
                <div data-aos='fade-in' className="row background m-auto">
                    <div className="col-12 col-md-6">
                        <p>Where does it come from?
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                            piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
                            McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
                            the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
                            the cites of the word in classical literature, discovered the undoubtable source. Lorem
                            Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                            (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
                            on the theory of ethics, very popular during the Renaissance. The first line of Lorem
                            Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                    </div>
                    <div className="col-12 col-md-6">
                        <p>
                            Where does it come from?
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                            piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
                            McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
                            the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
                            the cites of the word in classical literature, discovered the undoubtable source. Lorem
                            Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                            (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
                            on the theory of ethics, very popular during the Renaissance. The first line of Lorem
                            Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
    static contextType = authContext;
}

export default Registration;