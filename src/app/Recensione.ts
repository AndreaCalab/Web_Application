export class Recensione{
    'idRecensione': string;
    'utente':string;
    'immobile':string;
    'descrizione':string;
    constructor(id:string,ut:string,imm:string,des:string){
        this.idRecensione=id;
        this.utente=ut;
        this.immobile=imm;
        this.descrizione=des;
    }
}
export class Immobile {
    'categoria':string;
    'descrizione':string;
    'prezzo':number;
    'metri_quadri':number;
    'posizione':string;
    'id':string;
    'proprietario':string
    constructor(c:string,d:string,p:number,mq:number,pos:string,i:string,pr:string){
        this.categoria=c;
        this.descrizione=d;
        this.prezzo=p;
        this.metri_quadri=mq;
        this.posizione=pos;
        this.id=i;
        this.proprietario=pr;
    }
    getImmobile(){
        return this.id+";"+this.descrizione+";"+this.posizione;
    }
  }

export class Utente{
    'username':string;
    'tipo':string;
    'email':string;
    'password':string;
    'nome':string;
    'cognome':string;
    'banned':string;
    getNome(){
        return this.nome;
    }
    getTipo(){
        return this.tipo as String;
    }
    getCognome(){
        return this.cognome;
    }
}