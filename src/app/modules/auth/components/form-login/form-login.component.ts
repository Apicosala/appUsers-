import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent {
  formLogin: FormGroup;
  userService = inject(UsersService);
  router = inject(Router);
  errorMessage: string = '';

  constructor() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      contraseña: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(20),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d].{8,}'),
      ]),
    });
  }
  async onSubmit() {
    const response = await this.userService.login(this.formLogin.value);
    if (response.fatal) {
      //Error en el login
      Swal.fire({
        icon: 'error',
        title: 'Error al intentar iniciar sesión',
        text: 'Verifica que las credenciales sean correctas',
        showConfirmButton: false,
        timer: 2000,
      });
      this.errorMessage = response.fatal;
    } else {
      //Login correcto
      localStorage.setItem('auth_token', response.token);
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Has iniciado sesión correctamente.',
        showConfirmButton: false,
        timer: 2000,
      });

      //Navego a la ruta principal
      this.router.navigate(['/']);
    }
  }
}
