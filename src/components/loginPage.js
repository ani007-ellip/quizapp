
import React, {Component } from 'react';
import jsonfile from'jsonfile';

var file = 'data.json'
var obj = {name: 'JP'}
class loginPage extends Component {
  userData;
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {}
    }; 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
  
    this.setState({
      input
    });
  } 
  handleSubmit(event) {
    event.preventDefault();
  
    if(this.validate()){
        console.log(this.state);
  
        let input = {};
        input["username"] = " ";
        input["password"] = " ";
        this.setState({input:input});        
    }
  }

  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
   
      if (!input["username"]) {
        isValid = false;
        errors["username"] = "Please enter your username.";
      }
  
      if (typeof input["username"] !== "undefined") {
        const re = /^\S*$/;
        if(input["username"].length < 6 || !re.test(input["username"])){
            isValid = false;
            errors["username"] = "Please enter valid username.";
        }
      }
      
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }
  
  
      if (typeof input["password"] !== "undefined") {
        if(input["password"].length < 6){
            isValid = false;
            errors["password"] = "Please add at least 6 charachter.";
        }
      }
      if((input["username"] == 'Admin')&&(input['password'] == 'Welcome')){
        alert('Login Successfully');
        const token = '123456abcdef';
        sessionStorage.setItem('auth-token', token);
        this.props.history.push('/home')
      }
      else{
        alert('Invalid Username and Password');
      }
      
      this.setState({
        errors: errors
      });
  
      return isValid;
  }
    render() {
        return (
            <div className="container-fluid">
                <div className="bg bg_1" >
                    <div className="row justify-content-center">
                    <form style={{'margin':'13em 15em 15em 15em'}} onSubmit={this.handleSubmit}>
                    <div class="form-group">
                    <label for="username">Username:</label>
                    <input 
                      type="text" 
                      name="username" 
                      value={this.state.input.username}
                      onChange={this.handleChange}
                      class="form-control" 
                      placeholder="Enter username" 
                      id="username" />

                      <div className="text-danger">{this.state.errors.username}</div>
                  </div>

                  <div class="form-group">
                    <label for="password">Password:</label>
                    <input 
                      type="password" 
                      name="password" 
                      value={this.state.input.password}
                      onChange={this.handleChange}
                      class="form-control" 
                      placeholder="Enter password" 
                      id="password" />

                      <div className="text-danger">{this.state.errors.password}</div>
                  </div>
                    
                  <input type="submit" value="Submit" class="btn btn-success" />
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default loginPage;




    
