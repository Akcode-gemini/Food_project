import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id!: number;
  form!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, this.validateName]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, this.validateMobile]],
    });
  }

  // Custom validation functions
  validateName(control: any): { [key: string]: any } | null {
    const pattern = /^[a-zA-Z ]*$/;
    if (control.value && !pattern.test(control.value)) {
      return { invalidName: true };
    }
    return null;
  }

  validateMobile(control: any): { [key: string]: any } | null {
    const pattern = /^[0-9]{10}$/;
    if (control.value && !pattern.test(control.value)) {
      return { invalidMobile: true };
    }
    return null;
  }

  // Rest of the component code


  onSubmit() {
    if (this.form && this.form.valid) {
      const postData = {
        tableID: this.id,
        name: this.form.value.name,
        email: this.form.value.email,
        mobile: this.form.value.mobile
      };
      this.http
        .post(
          `http://localhost:9000/customer/home/tableNo=${this.id}`,
          postData
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.toastr.success('Detail Saved Successfully');
            this.goToMenu();
            this.form.reset();
          },
          (error) => {
            console.log(error);
          }
        );

      // Reset the form fields after submission if needed

    } else {
      this.toastr.error("Enter valid Details")
      console.log('Invalid form');
    }
  }
  goToMenu() {
    this.router.navigate(['/customer/menu'], { queryParams: { id: this.id } });
  }


}
