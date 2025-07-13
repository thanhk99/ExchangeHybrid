import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private csrfToken : string | null = null; 

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http : HttpClient ,
    private router : Router,
    private tokenService : TokenService,
    private toast :ToastrService
  ) {
    const hasToken = this.tokenService.hasTokens();
    this.isLoggedInSubject.next(hasToken); 
   }

   private hasValidTokens(): boolean {
    return !!this.tokenService.getAccessToken();
  }

  loginService(email:any,password:any){
    const body={
      email:email,
      password:password
    }
    this.http.post(environment.apiLogin,body).subscribe(
      (res:any)=>{
        this.tokenService.setTokens(res.accessToken, res.refreshToken);
       setTimeout(() => {
          this.isLoggedInSubject.next(true);
          this.router.navigate(["/home"])
        }, 500);
       
      //  .then(() => { window.location.reload();})
      ;
      },  
      (err:any)=>{
        this.toast.error("Login fail","Error",{timeOut:3000})
      }
    )
  }
  refreshToken(): Observable<{}> {
    const refreshToken = this.tokenService.getRefreshToken();
    const body = { 
      refreshToken: refreshToken
    };
    
    return this.http.post (
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
        setTimeout(() => {
          this.isLoggedInSubject.next(false);
          this.router.navigate(['/login']);
          }, 500);
        
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }

//   logout(): Observable<any> {
//   return this.http.post(environment.apiLogout, {}).pipe(
//     tap(() => {
//       this.tokenService.clearTokens();
//     })
//   );
// }

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated(): boolean {
    return this.tokenService.hasTokens();
  }

  getUser(): Observable<any> {
    return this.http.get(environment.apiGetUser);
    // this.http.get(environment.apiGetUser).subscribe(
    //   (res:any)=>{
    //     console.log(res)
    //   },
    //   (err:any)=>{
    //     console.log(err)
    //   }
    // )
  }
}