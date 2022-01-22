import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-ques-crud',
  templateUrl: './ques-crud.component.html',
  styleUrls: ['./ques-crud.component.css']
})
export class QuesCrudComponent implements OnInit {
data3:boolean=false;
data1:boolean=false;
data2:boolean=false;
title:any;
TestId:number=0;
questionOptions1:any;
questionOptions2:any;
questionOptions3:any;
questionOptions4:any;
questionAnswer:number;
questionMarks:number;
options:any[]=['','','',''];
id:number;


  constructor(public quizService:QuizService) { }


onClick(){

this.quizService.getQuestions().subscribe(
  (data:any)=>{

    this.quizService.Qns=data;
    this.data1=!this.data1;   


}
)
}

onDelete(qid:number){

  this.quizService.deleteQuestion(qid).subscribe(
    (data:any)=>{
      this.quizService.getQuestions().subscribe(
        (data:any)=>{
      
          this.quizService.Qns=data;
  
      
      
      }
      )
      
      
    }
  )
}
onUpdate(q:any){
this.data3=false;
this.title=q.questionTitle;
this.questionAnswer=q.questionAnswer;
this.questionMarks=q.questionMarks;
this.questionOptions1=q.questionOptions[0];
this.questionOptions2=q.questionOptions[1];
this.questionOptions3=q.questionOptions[2];
this.questionOptions4=q.questionOptions[3];
this.id=q.questionId;
this.data2=!this.data2;


}


onDone(){
  this.options[0]=this.questionOptions1;
  this.options[1]=this.questionOptions2;
  this.options[2]=this.questionOptions3;
  this.options[3]=this.questionOptions4;
  this.quizService.insertQuestion(this.title,this.id,this.options,this.questionMarks,this.questionAnswer).subscribe(
    (data:any)=>{
      this.quizService.getQuestions().subscribe(
        (data:any)=>{
      
          this.quizService.Qns=data;
      }
      )
    }
  )
  this.data2=!this.data2;


}

onAdd(){
  this.data3=false
  this.options[0]=this.questionOptions1;
  this.options[1]=this.questionOptions2;
  this.options[2]=this.questionOptions3;
  this.options[3]=this.questionOptions4;
  
this.quizService.addQuestion(this.id,this.TestId,this.title,this.questionAnswer,this.questionMarks,this.options).subscribe(
  (data)=>{
    console.log(data)

    this.quizService.getQuestions().subscribe(
      (data1:any)=>{
    
        this.quizService.Qns=data1;
    }
    )
  }
)
this.data3=!this.data2;

}

onAddQuestion(){
  this.TestId=0;
  this.title=null;
this.questionOptions1=null;
this.questionOptions2=null;
this.questionOptions3=null;
this.questionOptions4=null;
this.questionAnswer=null;
this.questionMarks=null;
this.options=['','','',''];
this.id=null;

  this.data2=false;
  this.data3=!this.data3;
}

  ngOnInit(): void {
  }

}
