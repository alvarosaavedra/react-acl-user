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
      <div className="userBox">
        <h1> User</h1>
   		{ this.state.user ? <h2> {this.state.user.username} </h2> : null }
   		{ this.state.login ? <Logout onLogout={this.handleLogout}/> : <Login onLogin={this.handleLogin} /> }   
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
		console.log("chao");
		return
	},
	render: function() {
		return (
			<form className="loginForm" onSubmit={this.handleSubmit}>
        		<input type="text" placeholder="Email" ref="email" />
        		<input type="password" placeholder="password" ref="password" />
        		<input type="submit" value="Login" />
      		</form>
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

React.render(
  <UserBox url="http://localhost:3000/api/Users"/>,
  document.getElementById('content')
);
