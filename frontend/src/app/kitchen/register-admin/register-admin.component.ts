import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})

export class RegisterAdminComponent implements OnInit{
  constructor(
    private http:HttpClient
  ){}
  ngOnInit() {
    this.http.get("")
  }

}

