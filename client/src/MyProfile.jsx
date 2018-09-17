import React from 'react';
import Login from './Login';

function MyProfile(props) {
    return(
        <div>
            <Login 
                email={props.email}
                setUserEmail={props.setUserEmail}
                isLoggedIn={props.isLoggedIn}
                switchIsloggedIn={props.switchIsloggedIn}
                switchCurrentViewToRegister={props.switchCurrentViewToRegister}
            />
        </div>
    )
}


export default MyProfile;