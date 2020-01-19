import React, { Component } from "react";
import { getUser } from "../../redux/ducks/userReducer";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { REACT_APP_LOGIN, REACT_APP_LOGOUT } = process.env;
    console.log(this.props.userReducer);
    return (
      <div>
        {this.props.userReducer.user.name ? (
          <div>
            <img
              src={this.props.userReducer.user.pic}
              className="logopic"
              alt="profile pic"
            />
            <a href={REACT_APP_LOGOUT}>Logout</a>
          </div>
        ) : (
          <div>
            <a href={REACT_APP_LOGIN}>Login</a>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Home);
