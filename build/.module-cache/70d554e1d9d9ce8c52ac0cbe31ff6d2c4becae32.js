var UserBox = React.createClass({displayName: "UserBox",
  getInitialState: function() {
  	return {login : false, user: null, singup: false}
  },

  loadUserFromServer: function() {
  	$.ajax({
  		url: this.props.url+"/"+this.state.user.id,
  		dataType: 'json',
  		data: {access_token: this.state.user.access_token},
  		success: function(data){
  			var fulluser = this.state.user;
  			fulluser.username = data.username;
  			this.setState({user: fulluser});
  			console.log(this.state.user)
  		}.bind(this),
  		error: function(xhr, status, err) {
        	console.error(this.props.url, status, err.toString());
    	}.bind(this)
  	});
  },
  handleLogin: function(user){
  	$.ajax({
      url: this.props.url+"/login",
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data) {
        this.setState({login: true});
        this.setState({user: {id: data.userId, access_token: data.id }});
        this.loadUserFromServer();
        console.log(this.state.user);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleSingUp: function(user){
  	$.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data) {
        this.setState({singup: true});
        this.handleLogin(user);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleLogout: function(){
  	$.ajax({
      url: this.props.url+"/logout?access_token="+this.state.user.access_token,
      dataType: 'json',
      type: 'POST',
      success: function(data) {
        this.setState({login: false});
        this.setState({user: null});
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
   		 this.state.user ? React.createElement("h2", null, " ", this.state.user.username, " ") : null, 
   		 this.state.login ? React.createElement(Logout, {onLogout: this.handleLogout}) : React.createElement(Login, {onLogin: this.handleLogin}), 
   		 this.state.singup ? null : React.createElement(SingUp, {onSingUp: this.handleSingUp})
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
			React.createElement("div", null, 
				React.createElement("h2", null, " Login "), 
				React.createElement("form", {className: "loginForm", onSubmit: this.handleSubmit}, 
	        		React.createElement("input", {type: "text", placeholder: "Email", ref: "email"}), 
	        		React.createElement("input", {type: "password", placeholder: "password", ref: "password"}), 
	        		React.createElement("input", {type: "submit", value: "Login"})
	      		)
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

var SingUp = React.createClass({displayName: "SingUp",
	handleSubmit: function(e) {
		e.preventDefault();
		var username = React.findDOMNode(this.refs.username).value.trim();
		var email = React.findDOMNode(this.refs.email).value.trim();
    	var password = React.findDOMNode(this.refs.password).value.trim();
		var confirm_password = React.findDOMNode(this.refs.confirm_password).value.trim();
		if (password == confirm_password) {
			this.props.onSingUp({username: username, email: email, password: password});

		};
		
		return
	},
	render: function() {
		return (
			React.createElement("div", {className: "singUp"}, 
				React.createElement("h2", null, " SingUp "), 
				React.createElement("form", {className: "singUpForm", onSubmit: this.handleSubmit}, 
	        		React.createElement("input", {type: "text", placeholder: "User Name", ref: "username"}), 
	        		React.createElement("input", {type: "text", placeholder: "Email", ref: "email"}), 
	        		React.createElement("input", {type: "password", placeholder: "password", ref: "password"}), 
	        		React.createElement("input", {type: "password", placeholder: "Confirm password", ref: "confirm_password"}), 
	        		React.createElement("input", {type: "submit", value: "SingUp"})
	      		)
	      	)
		);
	}
});

React.render(
  React.createElement(UserBox, {url: "http://localhost:3000/api/Friends"}),
  document.getElementById('content')
);
