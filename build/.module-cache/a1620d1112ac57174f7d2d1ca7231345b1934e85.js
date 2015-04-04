var UserBox = React.createClass({displayName: "UserBox",
  getInitialState: function() {
  	return {login : false}
  },
  handleLogin: function(){
  	this.setState({login: true});
  },
  render: function() {
    return (
      React.createElement("div", {className: "userBox"}, 
        React.createElement("h1", null, " User "), 
   		 this.state.login ? React.createElement(Logout, null) : React.createElement(Login, {onLogin: this.handleLogin})
      )
    );
  }
});
var Login = React.createClass({displayName: "Login",
	handleSubmit: function(e) {
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
	render: function() {
		return (
			React.createElement("form", {className: "loginForm", onSubmit: this.handleSubmit}, 
        		React.createElement("input", {type: "submit", value: "Logout"})
      		)
		);
	}
});

React.render(
  React.createElement(UserBox, null),
  document.getElementById('content')
);
