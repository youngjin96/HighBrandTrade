import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent implements OnInit {
  private itemCollection !: AngularFirestoreCollection<any>;
  collections = new Array();
  brandImageUrl !: string;

  constructor(
    private db : AngularFirestore,
    public router : Router,
    ) {  
    if (JSON.parse(localStorage.getItem('emailVerified')) && localStorage.getItem('user')){
      this.getItem('brand').subscribe((res) => {     
        this.collections = res;
      });
    } else{
      alert("이메일 인증을 해주세요.");
      router.navigate(['/my-page']);
    }
  }

  getItem(db_name : string){  // getItem() 의 인자로 들어가는 이름의 collection에 접근을 할 거라고 설정
    this.itemCollection = this.db.collection<any>(db_name, (ref : CollectionReference) => {
      return ref.where('product', 'array-contains', 'shoes').orderBy('brand_name');
    });
    return this.itemCollection.valueChanges();  //리턴
  }
  
  getUrl(url : any){
    this.brandImageUrl = url;
  }

  ngOnInit(): void {
  }

}
