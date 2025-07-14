import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject,of } from 'rxjs';
import { TokenService } from './token.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from './device.service';
@Injectable({
  providedIn: 'root'
})
export class Auth {

  private csrfToken : string | null = null; 

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private staticOtp = '000000'; // otp mặc định
  constructor(
    private http : HttpClient ,
    private router : Router,
    private tokenService : TokenService,
    private deviceService : DeviceService,
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
        this.deviceService.setDeviceStorage(res.deviceInfo.deviceId)
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
    const body = {
      deviceId:this.deviceService.getDeviceId()
    }
    this.http.post(environment.apiLogout,body).subscribe(
      (res:any)=>{
        this.tokenService.clearTokens();
        this.deviceService.setDeviceStorage(res.deviceInfo.deviceId)
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
// send otp
  sendOtp(email: string): Observable<any> {
    return of({
      success: true,
      message: `Mã OTP đã được gửi đến ${email}`,
      otp: this.staticOtp
    }).pipe(
      tap(() => {
        this.toast.success(`Mã OTP đã được gửi đến ${email}`, 'Thành công', { timeOut: 3000 });
      })
    );
  }
  // verify otp
  verifyOtp(otp: string): Observable<any> {
    if (otp === this.staticOtp) {
      return of({
        success: true,
        message: 'Xác thực OTP thành công'
      });
    } else {
      return of({
        success: false,
        message: 'Mã OTP không hợp lệ'
      });
    }
  }
  signup(username: string, password: string, email: string, nation: string = 'vi-en'): Observable<any> {
    const body = {
      username,
      password,
      email,
      nation
    };
    return this.http.post(environment.apiRegister, body).pipe(
      tap((res: any) => {
        if (res.success) {
          this.toast.success(res.message, 'Thành công', { timeOut: 3000 });
          // Lưu token nếu API trả về token (giả sử API trả về accessToken và refreshToken)
          if (res.data.accessToken && res.data.refreshToken) {
            this.tokenService.setTokens(res.data.accessToken, res.data.refreshToken);
            this.isLoggedInSubject.next(true);
          }
        }
      })
    );
  }






}


