var UserBox = React.createClass({displayName: "UserBox",
  render: function() {
    return (
      React.createElement("div", {className: "userBox"}, 
        React.createElement("h1", null, " User "), 
   		React.createElement(Login, null)
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
React.render(
  React.createElement(UserBox, null),
  document.getElementById('content')
);
