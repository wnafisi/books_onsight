import React from 'react';

function Users(props) {

    //list of users display
    function showList(){
        if (props.users !== '') {
            return(
                <div>
                    {
                    props.users.map(user=> {
                        return(
                            <div 
                                className="oneBooke"
                                key={user.id}>
                                {user.email}
                            </div>
                        )
                    })
                    }
                </div>
            )
        }
    }

    return(
        <div className="columnContainer">
        <div className="title">
            <h2>Users list:</h2>
        </div>
        <br></br>
        <div className="info">
            <div className="bbyListBooks">
                {showList()}
            </div>

            <div className="bbyOneBook">
                one user
            </div>
        </div>

    </div>
    )
}

export default Users;