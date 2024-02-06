import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

type FormRegisterValue = {
  nombre: string;
  apellidos: string;
  usuario: string;
  contraseña: string;
  email: string;
  foto: string;
};
type FormLoginValue = {
  email: string;
  contraseña: string;
};
type FormLoginResponse = {
  success: string;
  token: string;
  fatal: string;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  register(values: FormRegisterValue) {
    return firstValueFrom(this.httpClient.post(this.baseUrl, values));
  }
  login(values: FormLoginValue): Promise<FormLoginResponse> {
    return firstValueFrom(
      this.httpClient.post<FormLoginResponse>(`${this.baseUrl}/login`, values)
    );
  }
}
