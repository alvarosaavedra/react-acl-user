var UserBox = React.createClass({displayName: "UserBox",
  getInitialState: function() {
  	return {login : false, user: nil}
  },
  handleLogin: function(user){
  	$.ajax({
      url: this.props.url+"/login",
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data) {
        this.setState({login: true});
        this.setState({user: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleLogout: function(){
  	$.ajax({
      url: this.props.url+"/login",
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data) {
        this.setState({login: false});
        this.setState({user: nil});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      React.createElement("div", {className: "userBox"}, 
        React.createElement("h1", null, " User"), 
   		 this.state.login ? React.createElement(Logout, {user: this.state.user, onLogout: this.handleLogout}) : React.createElement(Login, {onLogin: this.handleLogin})
      )
    );
  }
});
var Login = React.createClass({displayName: "Login",
	handleSubmit: function(e) {
		e.preventDefault();
		var email = React.findDOMNode(this.refs.email).value.trim();
    	var password = React.findDOMNode(this.refs.password).value.trim();
		this.props.onLogin({email: email, password: password});
		console.log("chao");
		return
	},
	render: function() {
		return (
			React.createElement("form", {className: "loginForm", onSubmit: this.handleSubmit}, 
        		React.createElement("input", {type: "text", placeholder: "Email", ref: "email"}), 
        		React.createElement("input", {type: "password", placeholder: "password", ref: "password"}), 
        		React.createElement("input", {type: "submit", value: "Login"})
      		)
		);
	}
});

var Logout = React.createClass({displayName: "Logout",
	handleSubmit: function(e) {
		e.preventDefault();
		this.props.onLogout();
		return
	},
	render: function() {
		return (
			React.createElement("form", {className: "loginForm", onSubmit: this.handleSubmit}, 
        		React.createElement("input", {type: "submit", value: "Logout"})
      		)
		);
	}
});

React.render(
  React.createElement(UserBox, {url: "http://localhost:3000/api/Users"}),
  document.getElementById('content')
);
