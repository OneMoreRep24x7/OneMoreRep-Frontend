import {  inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { PaymentComponent } from "../pages/user/payment/payment.component";
import Swal from "sweetalert2";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const router = inject(Router);
    const allowedEndpoints = ['/trainer/register']; // Add other allowed endpoints if needed

    if (sessionStorage.getItem('user')) {
        return true;
    }

    if (allowedEndpoints.includes(state.url)) {
        return true;
    }

    router.navigate(['/login']);
    return false;
}

export const canDeactivateGuard: CanDeactivateFn<PaymentComponent> = (component: PaymentComponent) => {
    return new Promise<boolean>((resolve) => {
      const condition = component.checkCondition();
      if (condition) {
        resolve(true);
      } else {
        Swal.fire({
          title: 'Warning',
          text: 'You cannot leave this page until the condition is met.',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          resolve(false);
        });
      }
    });
  };