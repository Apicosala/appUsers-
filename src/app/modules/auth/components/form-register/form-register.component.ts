import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
  formRegister: FormGroup;
  userService = inject(UsersService);

  constructor() {
    this.formRegister = new FormGroup(
      {
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        apellidos: new FormControl('', [Validators.required]),
        usuario: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12),
        ]),
        contraseña: new FormControl('', [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(20),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d].{8,}'),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
        foto: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/),
        ]),
        confirmarContraseña: new FormControl(''),
      },
      [this.checkContraseña]
    );
  }
  checkContraseña(formValue: AbstractControl): ValidationErrors | null {
    const contraseñaControl = formValue.get('contraseña');
    const repeatContraseñaControl = formValue.get('confirmarContraseña');
    if (contraseñaControl && repeatContraseñaControl) {
      const contraseña: string = contraseñaControl.value;
      const confirmarContraseña: string = repeatContraseñaControl.value;
      if (
        contraseña &&
        confirmarContraseña &&
        contraseña !== confirmarContraseña
      ) {
        return { checkcontraseña: true };
      } else {
        return null;
      }
    }
    return null;
  }
  checkControl(
    formcontrolName: string,
    validator: string
  ): boolean | undefined {
    return (
      this.formRegister.get(formcontrolName)?.hasError(validator) &&
      this.formRegister.get(formcontrolName)?.touched
    );
  }
  async onSubmit() {
    //console.log(this.formRegister.value);
    const response = await this.userService.register(this.formRegister.value);
    console.log(response);
  }
}
