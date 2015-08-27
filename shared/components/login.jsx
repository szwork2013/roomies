import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isAuthLoaded} from '../reducers/AuthReducer';
import * as authActions from '../actions/AuthActions';
import {load as loadAuth} from '../actions/AuthActions';

class Login extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    login: React.PropTypes.func,
    logout: React.PropTypes.func
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const inputName = this.refs.username.getDOMNode()
    const inputPassword = this.refs.password.getDOMNode()
    const credentials = {
      username: inputName.value,
      password: inputPassword.value
    }
    this.props.login(credentials)
    inputName.value = '';
    inputPassword.value = '';
  }

  initialize() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="username" ref="username"/>
        <input type="password" placeholder="password" ref="password"/>
        <input type="submit" onClick={this.handleSubmit.bind(this)}/>
      </form>
    );
  }
}

@connect(state => ({
  user: state.auth.user
}))

export default class LoginContainer extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired
  }

  static fetchData(store) {
    if(!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }

  render() {
    const { user, dispatch } = this.props;
    return <Login user={user} {...bindActionCreators(authActions, dispatch)}>
      {this.props.children}
    </Login>
  }
}