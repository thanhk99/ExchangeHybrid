import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private csrfToken : string | null = null; 
  constructor(
    private http : HttpClient ,
    private router : Router,
    private tokenService : TokenService,
    private toast :ToastrService
  ) { }

  loginService(email:any,password:any){
    const body={
      email:email,
      password:password
    }
    this.http.post(environment.apiLogin,body).subscribe(
      (res:any)=>{
        this.tokenService.setTokens(res.accessToken, res.refreshToken);
        this.router.navigate(["/home"]) ; 
      },
      (err:any)=>{
        this.toast.error("Login fail","Error",{timeOut:3000})
      }
    )
  }
  refreshToken(): Observable<{ accessToken: string, refreshToken: string }> {
    const refreshToken = this.tokenService.getRefreshToken();
    const body = { 
      refreshToken: refreshToken
    };
    
    return this.http.post<{ accessToken: string, refreshToken: string }>(
      environment.apiRefreshToken,
      body
    ).pipe(
      tap((res: any) => {
        this.tokenService.setTokens(res.accessToken, res.refreshToken);
      })
    );
  }

  // Đăng xuất
  logout(): void {
    this.http.post(environment.apiLogout,{}).subscribe(
      (res:any)=>{
        this.tokenService.clearTokens();
        this.router.navigate(['/login']);
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated(): boolean {
    return this.tokenService.hasTokens();
  }
}
