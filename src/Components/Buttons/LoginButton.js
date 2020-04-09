import React from 'react'
import {connect} from 'react-redux'

const LoginButton = props =>{ 
    let {REACT_APP_LOGIN}=process.env  
        return(
            <div>
                <a href={REACT_APP_LOGIN}><button>Login</button></a>
            </div>
        )
}

const mapStateToProps = state => state;
export default connect (mapStateToProps)(LoginButton)