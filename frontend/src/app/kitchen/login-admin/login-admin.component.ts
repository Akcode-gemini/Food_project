import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,

  ){}
  form!: FormGroup;

  ngOnInit(){
    this.form = this.formBuilder.group({
      SuperAdminEmail: ['', Validators.required],
      SuperAdminPassword: ['', Validators.required]
    });
  }
  onSubmit(){
    
  }

  }
