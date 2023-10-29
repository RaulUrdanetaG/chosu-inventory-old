import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const loginGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem('id')) {
    return true;
  } else {
    router.navigate(['/users/login']);
    return false;
  }
};

export const adminGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem('token')) {
    return true;
  } else {
    router.navigate(['/users/login']);
    return false;
  }
};
