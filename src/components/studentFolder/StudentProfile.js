import React, {Component, Fragment} from 'react';
import {Avatar, Descriptions, Tooltip, Modal, Input, message} from "antd";
import {UserOutlined} from "@ant-design/icons";
import jwtDecode from 'jwt-decode'
import axios from 'axios';
import authContext from "../Utils";

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDetails: {},
            profile: {},
            openModal: false,
            account: {first_name: "", last_name: '', email: '', phone_number: ''},
            loading:false,
        }
    }

    setModal = () => {
        this.setState({openModal: !this.state.openModal})
    };

    async componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);
            const apiCall = `/api/user/${user.user_id}/`;
            try {
                const {data: profileDetails} = await axios.get(apiCall);
                const {profile} = profileDetails;
                this.setState({profileDetails, profile: profileDetails.profile,
                account:{first_name: profileDetails.first_name, last_name: profileDetails.last_name,
                email:profileDetails.email, phone_number: profile.phone_number
                }
                })
            } catch (e) {
                if (e) {
                    console.log(e.response.data)
                }
            }
        }

    }

    handleChange =(e)=>{
        const account = this.state.account;
        account[e.target.name] = e.target.value;
        this.setState({account})
    };

    componentWillUnmount() {
        this.setState = ((state, callback) =>{

        })
    }

    handleSubmit =async(e) =>{
        e.preventDefault();
        this.setState({loading:true});
        const {user} = this.context;
        const {account:{first_name, last_name, email, phone_number}} = this.state;
        const accountDetails = {
            first_name,
            last_name,
            email,
        };
        const profileStuff ={
            phone_number,
        };
        const apiCall = `/api/user/${user.user_id}/`;
        const profile = `/api/profile/${this.state.profile.id}/`;
        try{
            await axios.patch(profile, profileStuff);
            const {data:profileDetails} = await axios.patch(apiCall, accountDetails);
            console.log(profileDetails);
            setTimeout(() => {
                this.setState({profileDetails, profile:profileDetails.profile, loading:false,
                openModal:false})
                message.success('Profile updated successfully')
            }, 1500)

        }catch (e) {
            if(e){
                console.log(e.response.data)
            }
        }

    };

    render() {
        const {
            profileDetails, profile, openModal, account: {
                first_name,
                last_name, email, phone_number
            }, loading
        } = this.state;
        return (
            <Fragment>
                <Modal visible={openModal}
                       title='Edit Profile'
                       onCancel={this.setModal}
                       footer={null}>
                    <form onSubmit={this.handleSubmit}>
                        {loading && <div className='loading_2'/> }
                        <label className='mt-2' htmlFor="f_name">First Name</label>
                        <Input placeholder='first name...'
                               id='f_name'
                               name='first_name'
                               onChange={this.handleChange}
                               value={first_name}/>

                        <label className='mt-2' htmlFor="l_name">Last Name</label>
                        <Input placeholder='Last name...'
                               id='l_name'
                               name='last_name'
                               onChange={this.handleChange}
                               value={last_name}/>
                        <label className='mt-2' htmlFor="email">Email</label>
                        <Input placeholder='Email....'
                               id='email'
                               name='email'
                               onChange={this.handleChange}
                               disabled
                               value={email}/>
                        <label className='mt-2' htmlFor="phone">Phone Number</label>
                        <Input placeholder='phone number...'
                               id='phone'
                               name='phone_number'
                               onChange={this.handleChange}
                               value={phone_number}/>
                        <div className='text-center'>
                            <button className='btn btn-success'>Update</button>
                        </div>
                    </form>
                </Modal>
                <div className='flex-1'>
                    <div className='card'>
                        <div className="card-header">
                            <h5 className='text-center'>Student profile</h5>
                        </div>
                        <div className='edit-icon'>
                    <span onClick={this.setModal} className={'icon-edit'}><Tooltip title='Edit profile'><i
                        className='far fa-edit'/>
                    </Tooltip></span>
                        </div>
                        <div className="card-body text-center">
                            {profile.thumbnail === null ? <Avatar size={120} icon={<UserOutlined/>}/>
                                : <Avatar className='icon-edit' src={profile.thumbnail}/>
                            }
                            <Descriptions className='mt-2' bordered>
                                <Descriptions.Item label='First Name'>{profileDetails.first_name}</Descriptions.Item>
                                <Descriptions.Item span={2}
                                                   label='Last Name'>{profileDetails.last_name}</Descriptions.Item>
                                <Descriptions.Item label='Email'>{profileDetails.email}</Descriptions.Item>
                                <Descriptions.Item span={2}
                                                   label='Status'>{profileDetails.is_student ? "Student" : "Teacher"}</Descriptions.Item>
                                <Descriptions.Item label='Phone Number'>{profile.phone_number}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
    static contextType = authContext;
}

export default StudentProfile;