import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit,OnDestroy {

  marks:number=0;
  i:number=0;
  sum:number=0;
  timetaken:any;
  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    for(this.i=0;this.i<this.quizService.Qns.length;this.i++){
  this.sum=this.sum+this.quizService.Qns[this.i].questionMarks
    
    }
    this.timetaken=this.quizService.seconds;
    this.marks=this.quizService.result;
    
  }
  ngOnDestroy(){
    localStorage.clear();
    this.marks=0;
    this.quizService.result=0;
  }

}
