import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cloth-men',
  templateUrl: './cloth-men.component.html',
  styleUrls: ['./cloth-men.component.css']
})
export class ClothMenComponent implements OnInit {
  private itemCollection : AngularFirestoreCollection<any>;
  collections = new Array();
  brandImageUrl : string;
  dataSource : MatTableDataSource<brands_data>;

  displayColumn = [
    'brand_name',
  ]

  constructor(
    private db : AngularFirestore,
    public router : Router,
    ) {  
    if (JSON.parse(localStorage.getItem('emailVerified')) && localStorage.getItem('user')){
      this.getItem('brand').subscribe((res) => {     
        this.collections = res;
        this.dataSource = new MatTableDataSource(this.collections);
      });
    } else{
      alert("이메일 인증을 해주세요.");
      router.navigate(['/my-page']);
    }
  }

  getItem(db_name : string){
    this.itemCollection = this.db.collection<any>(db_name, (ref : CollectionReference) => {
      return ref.where('product', 'array-contains', 'cloth_men').orderBy('brand_name');
    });
    return this.itemCollection.valueChanges();
  }
  
  getUrl(url : any){
    this.brandImageUrl = url;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  ngOnInit(): void {
  }

}

export interface brands_data{
  brand_name : string;
}