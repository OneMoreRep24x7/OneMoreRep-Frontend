import {  inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

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