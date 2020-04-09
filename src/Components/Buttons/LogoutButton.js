import React, { Component } from 'react'
import { connect } from 'react-redux'

const LoginButton = props => {
    let {REACT_APP_LOGOUT}= process.env
    return (
        <div>
            <a href={REACT_APP_LOGOUT}><button>Login</button></a>
        </div>
    )
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(LoginButton)