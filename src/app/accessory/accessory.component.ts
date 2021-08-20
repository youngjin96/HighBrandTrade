import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.css']
})
export class AccessoryComponent implements OnInit {
  private itemCollection !: AngularFirestoreCollection<any>;
  collections = new Array();
  brandImageUrl !: string;

  constructor(private db : AngularFirestore) {  
    this.getItem('brand').subscribe((res) => {     
      this.collections = res;
    });
  }

  getItem(db_name : string){  // getItem() 의 인자로 들어가는 이름의 collection에 접근을 할 거라고 설정
    this.itemCollection = this.db.collection<any>(db_name, (ref : CollectionReference) => {
      return ref.where('product', 'array-contains', 'accessory').orderBy('brand_name');
    });
    return this.itemCollection.valueChanges();  //리턴
  }
  
  getUrl(url : any){
    this.brandImageUrl = url;
  }

  ngOnInit(): void {
  }

}
