import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private dataBase: AngularFirestore;
  private itemsCollection !: AngularFirestoreCollection<any>;

  constructor(db: AngularFirestore) {   //모듈에서 만들어진 파이어 베이스 접속관련 객체
    this.dataBase = db;
  }

  getItem(db_name: string) {
    this.itemsCollection = this.dataBase.collection<any>(db_name, (ref: CollectionReference) => {
      //ref.where("hello","==",'hahaha') //일반 질의문
      //ref.where("world","array-contains", "aaa") // 배열인 경우
      //ref.orderBy('number', 'asc').startAt(0).limit(2);  //시작, 한계점 추가
      return ref;
    });  //리턴
    return this.itemsCollection;
  }

  // service.addItem("board",{number:5,hello:'hello',today:new Date()}); 추가할 때
  addItem(db_name : string, data : any){
    if(this.itemsCollection == null){
      this.itemsCollection = this.dataBase.collection<any>(db_name);
    }
    this.itemsCollection.add(data);
  }
}
// constructor(private service : FirebaseService) {   
//   service.getItem("brand").valueChanges().subscribe( arg => {
//     console.log(arg);
//   });
// }