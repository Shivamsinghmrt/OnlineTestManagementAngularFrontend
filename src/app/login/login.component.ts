import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private quizService:QuizService,private route:Router) { }


  OnSubmit(id:number,password:string){

    this.quizService.authParticipant(id,password).subscribe(
      ( data:any)=>{
           localStorage.clear();
           localStorage.setItem('auth',data);
           if(localStorage.getItem('auth')=="Admin"){
           this.route.navigate(['/admin']);}
           else if(localStorage.getItem('auth')=="User"){
             this.quizService.uid=id;
            this.route.navigate(['/quiz']);}
           else if (localStorage.getItem('auth')=="Wrong password" || localStorage.getItem('auth')=="Wrong ID" ){
              alert(localStorage.getItem('auth'))
            }
   
      }
     )
   

  }


}
