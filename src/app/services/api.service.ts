import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl = 'http://127.0.0.1:8000/api/v1'; // Base API URL from your backend

    constructor(private http: HttpClient) { }

    // Helper to get authorization headers
    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    /**
     * Fetches the exchange rate for a given crypto asset.
     * @param cryptoData The crypto data to get the rate for.
     */
    getCoinRate(cryptoData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/p2p/getCoin`, cryptoData);
    }

    /**
     * Fetches the user's profile information, including balances.
     */
    getUserProfile(): Observable<any> {
        return this.http.get(`${this.apiUrl}/user/getProfile`, { headers: this.getAuthHeaders() });
    }

    /**
      * Fetches the list of P2P advertisements to determine transaction limits.
      */
    getP2PAds(params: any = {}): Observable<any> {
        return this.http.get(`${this.apiUrl}/p2pads/getList`, { params });
    }

    /**
     * Places a P2P order.
     * @param orderData The transaction data for the order.
     */
    placeOrder(orderData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/p2pmarket/placeOrder`, orderData, { headers: this.getAuthHeaders() });
    }

    /**
     * Fetches the current user's transaction history.
     */
    getMyTransactions(): Observable<any> {
        return this.http.get(`${this.apiUrl}/p2pmarket/my-transaction`, { headers: this.getAuthHeaders() });
    }
}
