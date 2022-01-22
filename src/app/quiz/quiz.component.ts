import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit,OnDestroy {
   
lenghtQues:number=0;  
  constructor(public quizService:QuizService,private route:Router) { }

  ngOnInit(): void {
  this.quizService.seconds=0;
  this.quizService.qnProgress=0;
this.quizService.getUserTest().subscribe(
  (data:any)=>{
    if(data==null){
      this.route.navigate(["/welcome"])
      alert("no test assingned yet to you")
      
  }
    else{
    this.quizService.Qns=data.testQuestions;
  this.lenghtQues=this.quizService.Qns.length;

    this.startTimer();
    }
  }
)
  }



startTimer(){
  this.quizService.timer=setInterval(()=>{
this.quizService.seconds++;

  },1000);
}

Answer(qid,choice){
  this.quizService.Qns[this.quizService.qnProgress].chosenAnswer=choice;
  if(choice===(this.quizService.Qns[this.quizService.qnProgress].questionAnswer-1)){
    this.quizService.result=this.quizService.result+this.quizService.Qns[this.quizService.qnProgress].questionMarks;    
  }
  this.quizService.qnProgress++;
  if(this.quizService.qnProgress==this.quizService.Qns.length){
    clearInterval(this.quizService.timer);
    
    this.route.navigate(['/result']);
  }

}


ngOnDestroy(): void{
  localStorage.clear();
  
  } 
  

}
