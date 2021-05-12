import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from 'react-bootstrap/Alert'
import SimpleReactValidator from "simple-react-validator";
import { toast } from 'react-toastify';
import { login } from "../../actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        password: "",
      },
      loading: false,
      errors: {},
      visible: false
    };

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  getInitialState = () => {
    return {
      data: {
        email: "",
        password: "",
      },
      loading: false,
      errors: {},
      visible: false
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    if (this.validator.allValid()) {
      this.setState({
        loading: true,
      });
      this.props
        .login(data)
        .then((user) => {
          if (user.success) {
            toast.success("Login successfully!");
            this.props.history.push("/tickets");
          } else {
            this.setState({
              data: this.state.data,
              loading: false,
              errors: user.message ? user.message : 'Server Error',
            });
            toast.error("Login successfully!");
            this.setState({ visible: true }, () => {
              window.setTimeout(() => {
                this.setState({ visible: false })
              }, 5000)
            });
          }
        })
        .catch(() => {
          this.setState({
            loading: false,
            errors: 'Server Error',
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
      errors: {},
    });
  };

  /**
   * Render page
   */
  render() {

    return (
      <div className="inner">
        <div className="login"><form onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          <Alert color="info" variant='danger' show={this.state.visible} >
            {this.state.errors}
          </Alert>
          <div className="form-group ">
            <label>Username</label>
            <input
              className="form-control"
              placeholder="Enter username"
              name="username"
              autoComplete="off"
              onChange={this.handleChange}
              value={this.state.username}
              ref={(username) => (this.input = username)}
            />
            {this.validator.message(
              "username",
              this.state.data.username,
              "required|email"
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              autoComplete="off"
              placeholder="Enter password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            {this.validator.message(
              "password",
              this.state.data.password,
              "required"
            )}
          </div>
          <button
            type="submit"
            className="btn btn btn-primary btn-block"
          >Sign In</button>
        </form>
        </div>
      </div>
    );
  }
}

export default connect(
  () => ({
  }),
  (dispatch) => ({
    dispatch,
    login: (credentials) => dispatch(login(credentials)),
  })
)(Login);
