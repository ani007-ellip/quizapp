import React, { Component } from 'react'
import img from '../images/img.jpg';
import popup from '../images/popup.jpg';
import $ from 'jquery';
class Science extends Component {
    componentDidMount = () =>{
                 var loading = $('#loadbar').hide();
                 $('#demo').hide();
                 $(document)
                 .ajaxStart(function () {
                     loading.show();
                 }).ajaxStop(function () {
                     loading.hide();
                     
                 });
                 var questionNo = 0;
             var correctCount = 0;
            var q = [
                  {'Q':'Chandigarah is the capital which of two states:','A':[2,3],'C':['Arunachal Pradesh','Punjab','Haryana','Jummu and Kashmir'],'optionsType':'checkbox'},
                  {'Q':'Which is the World’s largest Continent?', 'A':1,'C':['Asia','Australia','North America','Europe'],'optionsType':'radio'},
                  {'Q':'Which is the national bird of India?','A':4,'C':['Crow','Eagle','Pegion','Peacock'],'optionsType':'radio'},
                  {'Q':'Which is the largest hot desert in the World?', 'A':'SAHARA DESERT','optionsType':'text'},
                  {'Q':'Greenland is part of which European nation?', 'A':'DENMARK','optionsType':'text'},
                  {'Q':'Which is the largest organ in the human body?', 'A':1,'C':['Skin','Nose ','Eyes','Ears'],'optionsType':'radio'},
                  {'Q':'Which is the biggest animal on earth?', 'A':3,'C':['Elephant', 'Shark','Antarctic Blue Whale','Rhinosores' ],'optionsType':'radio'},
                  {'Q':'Nightingale of India is Sarojini Naidu','A':1,'C':['True','False'],'optionsType':'radio'},
                  {'Q':'largest planet in the solar system is pluto','A':2,'C':['True','False'],'optionsType':'radio'}
            ];
              questionsOptions(questionNo);
             var action = q[questionNo].optionsType;
             var result = '';
             var choice = [];
             var anscheck = '';
             var UC;
             /*After Submiting */
             $(document).on('click','#submit_btn',function (e) {
                switch(action){
                    case 'radio' : if(!$("input:radio[name='selector']").is(":checked"))
                                       return false;
                                           result = $('input[type = "radio"]:checked').val();
                                           anscheck =  $(this).checking(questionNo, result);//$( "#answer" ).html(  ); 
                                           
                    break;
                    case 'checkbox' :  var trm = '';
                                       if(!$("input:checkbox[name='selector']").is(":checked"))
                                       return false;
                                       $('input[type = "checkbox"]:checked').each(function () {
                                           choice.push(this.value);
                                       });
                                       result = choice.map(i=>Number(i));
                                       anscheck =  $(this).checking(questionNo, result);//$( "#answer" ).html(  ); 
                    break;
                    case 'text' :      var trm = '';
                                       var ans = q[questionNo].A;
                                       trm = $("input:text[name='selector']").val();
                                       if(trm == "")
                                       return false;
                                       if(trm.length > (ans.length)+5){
                                           alert("Please Enter the Answer only");
                                           return false;
                                       }else{
                                           result = trm.toUpperCase();
                                           anscheck =  $(this).checking(questionNo, result);//$( "#answer" ).html(  );
                                       }
                       break;
                }
                q[questionNo].UC=result;
                    if(anscheck){
                        correctCount++;
                        q[questionNo].result = "Correct";
                    } else {
                        q[questionNo].result = "Incorrect";        
                    }
                    console.log("CorrectCount:" + correctCount);
                 setTimeout(function(){
                     $('#loadbar').show();
                     $('#quiz').fadeOut();
                     questionNo++;
                     if((questionNo + 1) > q.length){
                         alert("Quiz completed, Now click ok to get your answer");
                         $('label.element-animation').unbind('click');
                         $('#form').hide();
                         $('.container').css('background','rgb(62, 62, 100)');
                         setTimeout(function(){
                             var toAppend = '';
                             $.each(q, function(i, a){
                                 toAppend += '<tr>'
                                 toAppend += '<td>'+(i+1)+'</td>';
                                 toAppend += '<td>'+a.A+'</td>';
                                 toAppend += '<td>'+a.UC+'</td>';
                                 toAppend += '<td>'+a.result+'</td>';
                                 toAppend += '</tr>';
                             });
                             $('#quizResult').html(toAppend);
                             $('#totalCorrect').html("Total correct: " + correctCount);
                             $('#quizResult').show();
                             $('#loadbar').fadeOut();
                             $('#result-of-question').show();
                             $('#graph-result').show();
                             setTimeout(function(){
                                 $('#demo').show();
                             }, 100);
                             // chartMake();
                         }, 1000); 
                     }else{
                         setTimeout(function(){
                             $('#quiz').show();
                             $('#loadbar').fadeOut();
                         }, 1500);
                         questionsOptions(questionNo);
                     }
               
                 }, 1000);
                
             });
        
             $.fn.checking = function(qstn, ck) {
                 var ans = q[questionNo].A;
                 switch(action){
                     case 'radio': 
                     case 'text':
                    if (ck != ans)
                                 return false;
                                 else 
                                 return true;
                                 break;
                     case 'checkbox' :   if(JSON.stringify(ck) != JSON.stringify(ans))
                                             return false;
                                         else 
                                             return true;
                     break;
                 }
                
             };
            
         //     function chartMake(){
         //         var chart = AmCharts.makeChart("chartdiv",
         //            {
         //            "type": "serial",
         //            "theme": "dark",
         //            "dataProvider": [{
         //                "name": "Correct",
         //                "points": correctCount,
         //                "color": "#00FF00",
         //                "bullet": "http://i2.wp.com/img2.wikia.nocookie.net/__cb20131006005440/strategy-empires/images/8/8e/Check_mark_green.png?w=250"
         //            }, {
         //                "name": "Incorrect",
         //                "points":q.length-correctCount,
         //                "color": "red",
         //                "bullet": "http://4vector.com/i/free-vector-x-wrong-cross-no-clip-art_103115_X_Wrong_Cross_No_clip_art_medium.png"
         //            }],
         //            "valueAxes": [{
         //                "maximum": q.length,
         //                "minimum": 0,
         //                "axisAlpha": 0,
         //                "dashLength": 4,
         //                "position": "left"
         //            }],
         //            "startDuration": 1,
         //            "graphs": [{
         //                "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
         //                "bulletOffset": 10,
         //                "bulletSize": 52,
         //                "colorField": "color",
         //                "cornerRadiusTop": 8,
         //                "customBulletField": "bullet",
         //                "fillAlphas": 0.8,
         //                "lineAlpha": 0,
         //                "type": "column",
         //                "valueField": "points"
         //            }],
         //            "marginTop": 0,
         //            "marginRight": 0,
         //            "marginLeft": 0,
         //            "marginBottom": 0,
         //            "autoMargins": false,
         //            "categoryField": "name",
         //            "categoryAxis": {
         //                "axisAlpha": 0,
         //                "gridAlpha": 0,
         //                "inside": true,
         //                "tickLength": 0
         //            }
         //        });
         //    }	
        
             function questionsOptions(questionNo){
                 action = q[questionNo].optionsType;
                 var options ="";
                 $('#qid').html(questionNo+1);
                 $('#question').html(q[questionNo].Q);
                 switch(action){
                     case 'radio' :
                         for(var i=0;i<q[questionNo].C.length;i++){
                             options +='<li>';                 
                             options +='<input type="radio" name="selector" value="'+(i+1)+'">';
                             options +='<label for="f-option" class="element-animation1 btn  btn-primary btn-block element-animation">'+q[questionNo].C[i]+'</label>';
                             options +='<div class="check"></div>';
                             options +='</li>';
                         }
                        
                         options += '<input type="button" class="btn btn-warning btn-lg mt-5" id="submit_btn" value="Submit">';
                     break;
                     case 'checkbox':
                         for(var i=0;i<q[questionNo].C.length;i++){
                             options +='<li>';                 
                             options +='<input type="checkbox" name="selector" value="'+(i+1)+'"> ';
                             options +='<label class="element-animation1 btn  btn-primary btn-block element-animation">' +q[questionNo].C[i]+'</label>';
                             options +='<div class="check"></div>';
                             options +='</li>';
                         }
                         options += '<input type="button" class="btn btn-warning btn-lg mt-5" id="submit_btn" value="Submit">';
                     break;
                     case 'text':
                         options+='<li>';
                         options +='<input type="text" class="form-control" name="selector"> ';
                         options +='<div class="check"></div>';
                         options +='</li>';
                         options += '<input type="button" class="btn btn-warning btn-lg mt-5" id="submit_btn" value="Submit">';
                     break;
                 }
                 $('#options').html(options);
                 return true;
             }
         }
    state={}
    render() {
        return (
            <div>
                <div className="container pt-5 pl-5">
                <form id="form">
                    <div className="p-2">
                        <span>Question List</span>
                    </div>
                    <div className="card" >
                        <div className="row">
                            <div className="col-md-6">
                                <div className="ques">
                                    {/* <p id="output"></p>  */}
                                    <div className="loader">
                                    
                                        <div className="quiz" id="quiz">
                                            {/* <div className="col-xs-6 col-xs-offset-6"> */}
                                        <div id="loadbar" style={{display:'none'}}>
                                            <div className="blockG" id="rotateG_01"></div>
                                            <div className="blockG" id="rotateG_02"></div>
                                            <div className="blockG" id="rotateG_03"></div>
                                            <div className="blockG" id="rotateG_04"></div>
                                            <div className="blockG" id="rotateG_05"></div>
                                            <div className="blockG" id="rotateG_06"></div>
                                            <div className="blockG" id="rotateG_07"></div>
                                            <div className="blockG" id="rotateG_08"></div>
                                        </div>
                                        <div id="quiz">
                                
                                            <div className="question">
                                                <h3><span className="label label-warning" id="qid">1</span>
                                                <span id="question" /></h3>
                                            </div>
                                            <div className="pt-5">
                                                <ul id="options">
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div className="text-muted">
                                    <span id="answer"></span>
                                </div>
                            </div>  
                                
                            <div className="col-md-6">
                                <img src={img} className="img" style={{borderRadius:'10px'}} />
                            </div>
                        </div>
                    </div>
                </form>
                    <div className="row">
                            <div className="col-sm-6">
                                    <div id="result-of-question" className="pulse animated" style={{display:'none'}}>
                                        <span id="totalCorrect" ></span>
                                        <table className="table table-hover table-responsive" >
                                            <thead>
                                                <tr>
                                                    <th>Question No.</th>
                                                    <th>Our answer</th>
                                                    <th>Your answer</th>
                                                    <th>Result</th>
                                                </tr>
                                            </thead>
                                            <tbody id="quizResult"></tbody>
                                        </table>      
                                    </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card" id="demo"  style={{borderRadius:'10px'}}>
                                    <div className="card-header bg-danger">
                                        <h4 className="card-title">Level Completed</h4>
                                    </div>
                                    <div className="card-body bg-white">
                                        <div className = "row justify-content-center p-2">
                                            <img src={popup} width='200' height='200'/>   
                                        </div>
                                    </div>
                                    <div className="card-footer bg-danger">
                                        <button className="btn btn-success btn-lg "><a className="text-white" id="nextlevel" onClick={()=> this.props.history.push('/logout')}>Log Out</a></button>  
                                    </div>
                                </div>
                            </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Science