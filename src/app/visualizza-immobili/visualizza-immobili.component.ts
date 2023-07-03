import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Immobile, Recensione,Utente } from '../Recensione';
import { ServerserviceService } from '../serverservice.service';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';



@Component({
  selector: 'app-visualizza-immobili',
  templateUrl: './visualizza-immobili.component.html',
  styleUrls: ['./visualizza-immobili.component.css']
})
export class VisualizzaImmobiliComponent implements OnInit{
sessionId:string="";
immobili:Immobile[]=[];
recensioni:Recensione[]=[];
rec:Observable<Recensione[]>=new Observable<Recensione[]>;
immobile:Observable<Immobile[]>=new Observable<Immobile[]>;
opzioni:String[]=[];
imm?:Immobile;
utente?:Utente;
constructor(
  private servizi: ServerserviceService,
  private route: ActivatedRoute
  ) {
    
  }

  setFiltro(opzione:String){
    //var value=document.getElementById("filtro") ;
    //let getData=value?.item(0) as unknown as string;
    this.immobile=this.servizi.setFilter(this.sessionId,opzione as string);
    this.immobile.subscribe(imm=>this.immobili=imm)
  }
  
  


  ngOnInit(): void {
    var sessionId = this.route.queryParams.subscribe(
      params => {
        var sessionId = params['jsessionid'];
        if (sessionId != null){
          this.sessionId = sessionId;
          this.immobile=this.servizi.getImmobili(sessionId);
          this.rec=this.servizi.getRecensioni(sessionId);
          this.rec.subscribe(recs=>this.recensioni=recs);
          this.immobile.subscribe(imm=>this.immobili=imm);
          this.opzioni=["Prezzo","Metri quadri"];
        }
      } );
    
    
  }
 

/*ngOnInit(): void {
  console.log('immobili',immjson);
  var sessionId=this.route.queryParams.subscribe(
    params=>{
      var sessionId = params['jsessionid'];
                if (sessionId != null){
                  this.sessionId=sessionId;
                  var obs:Observable<Immobile[]> = this.servizi.getImmobili(sessionId);
                  obs.subscribe(recs => this.immobili=recs);
                 for(let i of this.immobili){
                    console.log('immobile:',i.getImmobile());
                 }
                }
    }
  );
  
}*/
/*Type '{ immobile: { categoria: string; descrizione: string; prezzo: number; metri_quadri: number; posizione: string; id: string; proprietario: string; }[]; }' is not assignable to type '{ immobile: { categoria: string; descrizione: string; prezzo: BigInt; metri_quadri: BigInt; posizione: string; id: string; proprietario: string; 
}; }'. */

}
/* var imm:{Immobile:{categoria:string,
      descrizione:string,
      prezzo:number,
      metri_quadri:number,
      posizione:string,
      id:string,
      proprietario:string}[]}=JSON.parse(immjson);*/
      /*var imm={
            "categoria" : "appartamento",
            "descrizione" : "2 bagni",
            "prezzo" : 200000,
            "metri_quadri" : 180,
            "posizione" : "Via Ettore Majorana,CS",
            "id" : "id3",
            "proprietario" : "Kristian Reale"
        };
      this.immobili.push(imm);*/