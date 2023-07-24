import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-c-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  id!: number;

  constructor(private route: ActivatedRoute, private router: Router) { }
//activated url is used to get id from params from activate url
//Router is used to navigate from one page to another and is to push id in next page url as query params 
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  redirectToDetail() {
    this.router.navigate(['/customer/detail'], { queryParams: { id: this.id } });
  }
}
