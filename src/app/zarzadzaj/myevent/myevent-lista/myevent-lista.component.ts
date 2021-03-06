import { Component, OnInit } from '@angular/core';
import {ZarzadService} from '../../shared/zarzad.service'
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Modeloo} from '../../shared/modeloo.model'
import { DatePipe } from '@angular/common';
import { JsonPipe } from '@angular/common';




@Component({
  selector: 'myevent-lista',
  templateUrl: './myevent-lista.component.html',
  styleUrls: ['./myevent-lista.component.css']
})
export class MyeventListaComponent implements OnInit {

  public tworca:string='Andre';
  
  public value:boolean=true;

  public turnieCollection: AngularFirestoreCollection<Modeloo>;
  public turnieje: Observable<any[]>;

  
  constructor(public zarzadService: ZarzadService,private db: AngularFirestore) { 
    
    this.turnieCollection=db.collection<Modeloo>('/turnieje',ref => {return ref.where('tworca','==',this.tworca)});

    // this.turnieCollection = db.collection<Modeloo>('KATegorie').doc('man').
    // collection('gi',);

    this.turnieje=this.turnieCollection.snapshotChanges().map(actions =>{
      return actions.map( a=>{
        const data = a.payload.doc.data() as Modeloo;
        const id = a.payload.doc.id;
        return {id,...data};
      })
    })


  }


  addItem(item: Modeloo) {
    this.turnieCollection.add(item);
  }


  ngOnInit() {
    
  }

}
