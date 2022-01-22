import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private quizService:QuizService,private route:Router) { }

  ngOnInit(): void {
    localStorage.clear();

  }


OnSubmit(name:string,id:number,password:string){

  this.quizService.insertParticipant(name,id,password).subscribe(
   ( data:any)=>{
        localStorage.clear();
        localStorage.setItem('returned',data);
      
        this.route.navigate(['/quiz']);

   },
   error=>{
     console.log(error);
     
   }
  )
}

}
