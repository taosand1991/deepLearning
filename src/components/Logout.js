import React from 'react';
import {SyncOutlined} from "@ant-design/icons";

function Logout(props) {
    localStorage.clear();
   setTimeout(() => {
        window.location = '/register';
   }, 1500);
    const options ={
        fontSize:60,
        color:'white',
    };
    return (
        <div className='text-center'>
            <span><SyncOutlined style={options} spin/></span>
            <p className='logout'>LOGGING YOU OUT....</p>
        </div>
    );
}

export default Logout;