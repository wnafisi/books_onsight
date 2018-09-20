import React from 'react';
import Login from './Login';

function MyProfile(props) {
    return(
        <div className="welcomeContainer">
            <div className="welcomeText">
                <h3>Welcome to </h3>
                
                <h1>Books 
                    onSight</h1>
            
                </div>

                <div className="welcomeTextSide">
                <p>Share your personal library, </p>
                <p>    get access to books and reviews 
                from our collective-user-libraries </p>
                    <div className="frontPageButtonsContainer">
                        <div onClick={()=>props.switchCurrentViewToRegister()}
                            className="frontPageButtons"><h2>sign me up!</h2>
                        </div>
                        <div onClick={()=>props.switchCurrentViewToLibrary()}
                            className="frontPageButtons"><h2>see the collection</h2>
                        </div>
                    </div>
                </div>

                <Login 
                    email={props.email}
                    setUserEmail={props.setUserEmail}
                    isLoggedIn={props.isLoggedIn}
                    switchIsloggedIn={props.switchIsloggedIn}
                />
        </div>
    )
}


export default MyProfile;