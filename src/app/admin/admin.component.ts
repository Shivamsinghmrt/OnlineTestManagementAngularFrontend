import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy{
  tid:number=0;  testQuestions:any[];
  testDuration:any;
 question1Options1:any; question1Options2:any; question1Options3:any; question1Options4:any; question1Answer:number; question1Marks:number;
 question2Options1:any; question2Options2:any; question2Options3:any; question2Options4:any; question2Answer:number; question2Marks:number;
  options1:any[]=['','','',''];options2:any[]=['','','',''];
  testTitle:Text;allowed:boolean=true;
  userId:number=0;id:number;
  testIdAssingned:any=0;
  Ques1title:Text;Ques2title:Text;
  userData:any[];testData:any[];
select4:boolean;  select3:boolean=false;select2:boolean=false;select:boolean=false;select1:boolean=false;
  Q2id:number;Q1id:number;  
  
  
  constructor(private router: Router,private quizService: QuizService) {
   
  }
  
  ngOnInit(): void {
    console.log(localStorage.getItem("auth"));
  }

  OnCrud(){
this.select=!this.select;
if(this.select){
this.select1=false;
this.select4=false;
this.select3=false;
this.select2=false;
}
  }
  openTest(){
    this.quizService.callTest().subscribe((data:any)=>{

      this.testData=data;
      console.log(data)
    }
    )
    this.select1=!this.select1;
    if(this.select1){
    this.select=false;
    this.select3=false;
    this.select2=false;
    this.select4=false;
    }
  }
  
showUsers(){
  this.quizService.callUsers().subscribe((data:any)=>{
    this.userData=data;
    for (let i = 0; i < this.userData.length; i++) {
      if(this.userData[i].userTest===null)
      this.allowed=false;

    }
    

  })

this.select2=!this.select2;
if(this.select2){
  this.select3=false;
  this.select=false;
  this.select1=false;
  this.select4=false;
}
}
assignTest(data,userId:number){
  this.select3=!this.select3;
if(this.select2){
  this.select2=false;
  this.select=false;
  this.select1=false;
  this.select4=false;
}

  
  this.testIdAssingned=data.TestID;
  this.userId=userId;
  this.quizService.assignTheTest(this.userId,this.testIdAssingned).subscribe((data:any)=>{
    console.log(data);
  })

}

DeleteTest(tid:number){
 this.tid=tid;
  this.quizService.DeleteTest(this.tid).subscribe((data)=>{
    console.log(data);
  })

}



onAdd(){
  this.options1[0]=this.question1Options1;
  this.options1[1]=this.question1Options2;
  this.options1[2]=this.question1Options3;
  this.options1[3]=this.question1Options4;
  
  this.options2[0]=this.question2Options1;
  this.options2[1]=this.question2Options2;
  this.options2[2]=this.question2Options3;
  this.options2[3]=this.question2Options4;
  
  var body1={
    questionId:this.Q1id,
    questionOptions:this.options1,
    questionTitle:this.Ques1title,
    questionAnswer:this.question1Answer,
    questionMarks:this.question1Marks
  }

  var body2={

    questionId:this.Q2id,
    questionOptions:this.options2,
    questionTitle:this.Ques2title,
    questionAnswer:this.question2Answer,
    questionMarks:this.question2Marks
  }

  this.testQuestions=[body1,body2]

    this.quizService.addTest(this.tid,this.testTitle,this.testDuration,this.testQuestions).subscribe(
  (data)=>{
    console.log(data)

    this.quizService.callTest().subscribe(
      (data1:any)=>{
    
        this.testData=data1;
    }
    )
  }
)

}

addTest(){
  this.select4=!this.select4;
  if(this.select4)
  this.select3=false;this.select2=false;this.select1=false;this.select=false;
  this.tid=0;
  this.testDuration=null;
  this.testTitle=null;
  this.Ques1title=null;
this.question1Options1=null;
this.question1Options2=null;
this.question1Options3=null;
this.question1Options4=null;
this.question1Answer=null;
this.question1Marks=null;
this.options1=['','','',''];
this.Q1id=null;

this.Ques2title=null;
this.question2Options1=null;
this.question2Options2=null;
this.question2Options3=null;
this.question2Options4=null;
this.question2Answer=null;
this.question2Marks=null;
this.options2=['','','',''];
this.Q2id=null;

  
}


DeleteUser(userId:number)

{
  this.userId=userId;
  this.quizService.DeleteUser(this.userId).subscribe((data)=>{
    this.showUsers();
  })

}

ngOnDestroy(): void{

  localStorage.clear();
  }
  
}