var UserBox = React.createClass({
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
  handleClick: function(){
  	this.setState({singup: !this.state.singup});
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
        this.setState({singup: false});
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
      <div className="userBox">
        <h1> User</h1>
   		{ this.state.user ? <h2> {this.state.user.username} </h2> : null }
   		{ this.state.login ? <Logout onLogout={this.handleLogout}/> : <div><Login onLogin={this.handleLogin} singup={this.state.singup} handleClick={this.handleClick}/> <SingUp onSingUp={this.handleSingUp} singup={this.state.singup} handleClick={this.handleClick}/></div>}
      </div>
    );
  }
});

var Login = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var email = React.findDOMNode(this.refs.email).value.trim();
    	var password = React.findDOMNode(this.refs.password).value.trim();
		this.props.onLogin({email: email, password: password});
		return
	},
	handleClick: function  (e) {
		e.preventDefault();
		this.props.handleClick();
		return
	},
	render: function() {
		var form = <form className="loginForm" onSubmit={this.handleSubmit}>
	        		<input type="text" placeholder="Email" ref="email" />
	        		<input type="password" placeholder="password" ref="password" />
	        		<input type="submit" value="Login" />
	      		</form>;
	    var link = <a href="#" onClick={this.handleClick}>Login</a>;
		return (
			<div>
				<h2> Login </h2>
				
				{ this.props.singup ? link : form }
	      	
	      	</div>
		);
	}
});



var Logout = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		this.props.onLogout();
		return
	},
	render: function() {
		return (
			<form className="loginForm" onSubmit={this.handleSubmit}>
        		<input type="submit" value="Logout" />
      		</form>
		);
	}
});

var SingUp = React.createClass({
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
	handleClick: function  (e) {
		e.preventDefault();
		this.props.handleClick();
		return
	},
	render: function() {
		var form =<form className="singUpForm" onSubmit={this.handleSubmit}>
	        		<input type="text" placeholder="User Name" ref="username" />
	        		<input type="text" placeholder="Email" ref="email" />
	        		<input type="password" placeholder="password" ref="password" />
	        		<input type="password" placeholder="Confirm password" ref="confirm_password" />
	        		<input type="submit" value="SingUp" />
	      		</form>;
	    var link = <a href="#" onClick={this.handleClick}>Singup</a>; 
		return (
			<div className="singUp">
				<h2> Singup </h2>
				{ this.props.singup ? form : link }
				
	      	</div>
		);
	}
});

React.render(
  <UserBox url="http://localhost:3000/api/Friends"/>,
  document.getElementById('content')
);
