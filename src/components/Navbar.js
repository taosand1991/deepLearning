import React,{Fragment, useState} from 'react';
import {withRouter, Link} from 'react-router-dom'
import authContext from "./Utils";

function Navbar({history}) {
    const [icon, setIcon] = useState(false);
    const context = React.useContext(authContext);
    const {user} = context;
    const {pathname} = history.location;
    const handleIcon =()=>{
        setIcon(!icon)
        if(!icon){
            document.getElementById('sidenav').style.width ='240px';
            document.getElementById('sidenav').style.zIndex ='4';
        }else{
            document.getElementById('sidenav').style.width ='0';
        }
    };
    return (
        <Fragment>
            <div id='sidenav'>
             <span className={'close'}>&times;</span>
            <Link onClick={handleIcon} className={'nav-link'} to={'/academics'}>Academics</Link>
            <Link onClick={handleIcon} className={'nav-link'} to={'/teachers'}>For Teachers</Link>
            <Link onClick={handleIcon} className={'nav-link'} to={'/students'}>For Students</Link>
            <Link onClick={handleIcon} className={'nav-link'} to={'/contact'}>Contact</Link>
            </div>
        <div className='navItem'>
            <span id='key' className='fas fa-key'/>
            <img className={'brander'} src={'static/learning app.png'} alt=""/>
            {!user.email ?
            <Link className={pathname ==='/register' ? 'login_nav active' : "login_nav"} to={'/register'}>Login</Link>:
            <Link className={"login_nav"} to={'/logout'}>Logout</Link>}
            <Link className={pathname === '/contact' ? 'nav-link active' : 'nav-link'} to={'/contact'}>Contact Us</Link>
            <Link className={pathname === '/academics' ? 'nav-link active' : 'nav-link'} to={'/academics'}>Academics</Link>
            <Link className={pathname === '/teachers' ? 'nav-link active' : 'nav-link'} to={'/teachers'}>For Teachers</Link>
            <Link className={pathname === '/students' ? 'nav-link active' : 'nav-link'} to={'/students'}>For Students</Link>
            <div onClick={handleIcon} className={icon ? "hamburger open" : "hamburger" }>
                <span className="icon"/>
                <span className="icon"/>
                <span className="icon"/>
            </div>
        </div>
            </Fragment>
    );
}

export default withRouter(Navbar);