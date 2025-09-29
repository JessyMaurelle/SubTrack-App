import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from './subscriptions.model';

@Injectable({
  providedIn: 'root'
})
export class Subscriptions {

  private http = inject(HttpClient);  
  private apiUrl: string = 'http://localhost:3001/subscriptions';

  
  public getAllSubscriptions(): Observable<Subscription[]>{
    return this.http.get<Subscription[]>(this.apiUrl);
  }

  public createSubscription(subscription:Subscription):Observable<Subscription>{
    return this.http.post<Subscription>(`${this.apiUrl}`,subscription);
  }

  public updateSubscription(id:string, subscription:Subscription):Observable<Subscription>{
    return this.http.put<Subscription>(`${this.apiUrl}/${id}`,subscription);
  }

  public deleteSubscription(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
