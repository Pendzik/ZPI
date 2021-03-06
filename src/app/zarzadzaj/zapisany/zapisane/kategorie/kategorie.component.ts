import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Kategorie } from '../../../shared/kategorie.model';
import {KeysPipePipe} from './keys-pipe.pipe'
@Component({
  selector: 'app-kategorie',
  templateUrl: './kategorie.component.html',
  styleUrls: ['./kategorie.component.css']
})
export class KategorieComponent implements OnInit {
  public current = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

  public kategorie: Observable<any[]>;
  public kateCollection: AngularFirestoreCollection<Kategorie>;

  public katu: Observable<any[]>;
  public katuCollection: AngularFirestoreCollection<Kategorie>;


  


  constructor(private db: AngularFirestore) { 
    // this.kateCollection=db.collection<Kategorie>('/turnieje').doc(this.current).collection('zapisani').doc('gi').collection('zawodnicy');
    this.kateCollection=db.collection<Kategorie>('/kategorie');
    this.kategorie=this.kateCollection.snapshotChanges().map(actions =>{
      return actions.map( a=>{
        const data = a.payload.doc.data() as Kategorie;
        const id = a.payload.doc.id;
        return {id,...data};
      })
    })

    this.katuCollection=db.collection<Kategorie>('/turnieje').doc(this.current).collection('zapisani').doc('gi').collection('zawodnicy');
    this.katu=this.katuCollection.snapshotChanges().map(actions =>{
      return actions.map( a=>{
        const data = a.payload.doc.data() as Kategorie;
        const id = a.payload.doc.id;
        return {id,...data};
      })
    })

    


  }

  
  ngOnInit() {
  }

  tryRaj(x){
    return x;
  }




}
