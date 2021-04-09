    import React, { Component } from 'react'
    import '../css/example.css';
    import '../css/test.css';
    import  background from '../images/background.jpg';
    import $ from 'jquery';
   
    class Home extends Component {
        componentDidMount = () =>{
                 $('#two,#three').prop('disabled', true);
                 var url = document.location.href;
                 var param = url.substring(url.indexOf("?")+1);
                 switch(param){
                     case 'level=2' :
                         $('#one').prop('disabled',false);
                         $('#two').prop('disabled',false);
                         $('#three').prop('disabled',true);
                     break;
                     case 'level=3' :
                         $('#one').prop('disabled',false);
                         $('#two').prop('disabled',false);
                         $('#three').prop('disabled',false);
                     break;
                 }
            }
        render() {
            return (
                 <div>
                    <div className="container-fluid">
                        <div className="bg bg_1" >
                                <div className="row justify-content-center demo">
                                <button className="btn btn-lg btn-warning m-3" id="one" onClick={()=> this.props.history.push('/javascript')}>Level 1</button>
                                <button className="btn btn-lg btn-success m-3" id="two" onClick={()=> this.props.history.push('/maths')}>Level 2</button>
                                <button className="btn btn-lg btn-info m-3" id="three" onClick={()=> this.props.history.push('/science')}>Level 3</button>
                                </div>
                        </div>
                    </div>
                 </div>
            )
        }
    }
    
    export default Home;
