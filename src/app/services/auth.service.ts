import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from './device.service';
@Injectable({
  providedIn: 'root'
})
export class Auth {

  private csrfToken : string | null = null; 
  constructor(
    private http : HttpClient ,
    private router : Router,
    private tokenService : TokenService,
    private deviceService : DeviceService,
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
        this.deviceService.setDeviceStorage(res.deviceInfo.deviceId)
       this.router.navigate(["/home"]).then(() => {
        window.location.reload();
      });
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
    const body = {
      deviceId:this.deviceService.getDeviceId()
    }
    this.http.post(environment.apiLogout,body).subscribe(
      (res:any)=>{
        this.tokenService.clearTokens();
        this.deviceService.clearDeviceId();
        this.router.navigate(['/login']);
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