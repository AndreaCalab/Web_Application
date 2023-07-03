import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Recensione,Immobile,Utente } from './Recensione';


@Injectable({
  providedIn: 'root'
})
export class ServerserviceService {
  private url : string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getImmobili(jsessionid: string):Observable<Immobile[]>{
    var list:Observable<Immobile[]> = this.http.post<Immobile []>(this.url + "/immobili?jsessionid="+jsessionid,{});
    return list;
  }
  
  
  addAnnuncio(jsessionid: string,immobile: Immobile):Observable<Immobile[]>{
    var list:Observable<Immobile[]>=this.http.post<Immobile[]>(this.url+ "/annuncio?jsessionid="+jsessionid,immobile);
    return list;
  }
    setFilter(jsessionid:string,filtro:string):Observable<Immobile[]>{
      var list:Observable<Immobile []> = this.http.post<Immobile[]>(this.url + "/filter?jsessionid=" + jsessionid, {filtro:filtro});
      return list;
    }
    getRecensioni(jsessionid: string):Observable<Recensione[]>{
      var list:Observable<Recensione []> = this.http.post<Recensione[]>(this.url + "/dammiRecensioni?jsessionid=" + jsessionid, {});
      return list;
    }
    getImmobiliUtente(jsessionid:string):Observable<Immobile[]>{
      var list:Observable<Immobile[]> = this.http.post<Immobile[]>(this.url+"/immobiliUtente?jsessionid=" + jsessionid,{});
      return list;
    }
    deleteAnnuncio(jsessionid:string,id:string):Observable<Boolean>{
      return this.http.post<Boolean>(this.url+"/deleteAnnuncio?jsessionid=" + jsessionid,{id:id});
    }
    updateAnnuncio(jsessionid:string,immobile:Immobile):Observable<Immobile[]>{
      var list:Observable<Immobile []> = this.http.post<Immobile[]>(this.url + "/updateAnnuncio?jsessionid=" + jsessionid, immobile);
      return list;
    }
    getAdminUsers(jsessionid:string):Observable<Utente[]>{
      var list:Observable<Utente[]>=this.http.post<Utente[]>(this.url + "/users?jsessionid=" + jsessionid,{});
      return list;
    }
    promoteOrBanUsers(jsessionid:string,params:string):Observable<Utente[]>{
      /*let queryParams = new HttpParams();
      queryParams=queryParams.append('username',username);
     queryParams=queryParams.append('opzione',opzione);*/
      var list:Observable<Utente[]> = this.http.post<Utente[]>(this.url + "/promoteOrBan?jsessionid=" + jsessionid,{params});
      return list;
    }
    getUtenteTipo(jsessionid:string,tipo:string):Observable<String[]>{
      var list:Observable<String[]>=this.http.post<String[]>(this.url+"/utenteTipo?jsessionid="+ jsessionid,{tipo});
      return list;
    }

  addRecensione(jsessionid: string, recensione: Recensione):Observable<Recensione[]>{
    var list:Observable<Recensione[]>= this.http.post<Recensione[]>(this.url+"/addReview?jsessionid="+jsessionid,recensione);
    return list;
}

  checkLogin(jsessionid: string): Observable<Boolean>{
    //let queryParams = new HttpParams();
    //queryParams.append("jsessionid", jsessionid);
   return  this.http.get<Boolean>(this.url+"/checkAuth",{params: {jsessionid: jsessionid}});
    
  }
}
//{params: {jsessionid: jsessionid}}