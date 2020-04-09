import React, { Component } from "react";
import {connect} from 'react-redux'
import {getUser} from '../../redux/ducks/userReducer'
import io from "socket.io-client"
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      socket: io.connect('http://localhost:3001'),
      message: '',
      mes: [],
    };
  }
  async componentDidMount(){
    await this.props.getUser()
  }
  render() {
    console.log(this.props)
    let {displayName}=this.props.userReducer.user
    return (
      <div>
        {displayName ? <h1> Welcome {displayName}</h1>:'na'}
      </div>
    );
  }
}


const mapStateToProps=state => state;
export default connect(mapStateToProps,{getUser})(Home)