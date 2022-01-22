import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

//------------properties----------------


readonly rootUrl='http://localhost:9094';
uid:number=0;
result:number=0;
Qns:any[];
seconds:number;
timer;
qnProgress:number
userId:number=0;
testId:number=0;

  constructor(private http:HttpClient) { }




  //-----Http Methods--------------------

displayTimeTaken(){
  return Math.floor(this.seconds/3600)+':'+ Math.floor(this.seconds/60)+':'+ Math.floor(this.seconds%60)
}




insertParticipant(name:string,id:number,password:string){
var body={
 userId:id,
  userName:name,
  userPassword:password
}
return this.http.post('http://localhost:9094/User/addUser',body,{responseType:'text'});
}


authParticipant(id:number,password:string){

  var body={
    userId:id,
    userPassword:password
  }
  return this.http.post('http://localhost:9094/User/authenticateUser',body,{responseType:'text'});
  }
  
getQuestions(){

  return this.http.get('http://localhost:9094/ques/allQuestions');

}

getUserTest(){

  return this.http.get('http://localhost:9094/User/getTest/'+this.uid);

}


deleteQuestion(qid:number){

  return this.http.delete('http://localhost:9094/ques/deleteQuestion/'+qid,{responseType:'text'});

}

insertQuestion(title:string,id:number,option:any[],marks:number,answer:number){

  var body={

    questionId:id,
    questionTitle:title,
    questionAnswer:answer,
    questionMarks:marks,
    questionOptions:option

      }
  
  return this.http.put('http://localhost:9094/ques/updateQuestions',body,{responseType:'text'});
  }
  



addQuestion(id:number,testid:number,title:string,answer:number,marks:number,option:any[]){
this.testId=testid;
  var body={
    questionId:id,
    questionTitle:title,
    questionAnswer:answer,
    questionMarks:marks,
    questionOptions:option
  }
  return this.http.post('http://localhost:9094/ques/addQuestion/'+this.testId,body,{responseType:'text'});
  


}

callTest(){
  return this.http.get('http://localhost:9094/test/allTest');  
}
callUsers(){
  return this.http.get('http://localhost:9094/User/allUsers');
}
assignTheTest(userId1:number,testId1:number){
  this.userId=userId1;
  this.testId=testId1;
  console.log(this.testId);

return this.http.put('http://localhost:9094/User/assignTesttoUser/'+this.testId+'/'+this.userId,{responseType:'text'});
}

DeleteTest(tid:number){

  this.testId=tid;

  return this.http.delete('http://localhost:9094/test/deleteTest/'+this.testId,{responseType:'text'});
}

addTest(tid:number,testTitle:Text,testDuration:Text,testQuestions:any[]){
  var body=[{

    testId:tid,
    testTitle:testTitle,
    testDuration:testDuration,
    testQuestions:testQuestions

      }]
      console.log(body)
  
  return this.http.put('http://localhost:9094/test/addTest', body,{responseType:'text'});
}
DeleteUser(userId:number){
  this.userId=userId;
  return this.http.delete('http://localhost:9094/User/deleteUser/'+this.userId,{responseType:'text'});
}
}
