import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isDetailSubmit = true;


  constructor(private router: Router ,private toastr:ToastrService) {}

  canActivate(): boolean {
    if (this.isDetailSubmit) {
      return true;

    } else {
      this.toastr.warning("Inaccesible Url")
      this.router.navigate([""])
      return false;
    }
  }
}
