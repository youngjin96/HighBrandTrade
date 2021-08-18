import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FirebaseService } from './firebase.service';
import { EnrollComponent } from './enroll/enroll.component';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { ClothMenComponent } from './cloth-men/cloth-men.component';
import { ClothWomenComponent } from './cloth-women/cloth-women.component';
import { ShoesComponent } from './shoes/shoes.component';
import { BagComponent } from './bag/bag.component';
import { PerfumeComponent } from './perfume/perfume.component';
import { WalletComponent } from './wallet/wallet.component';
import { AccessoryComponent } from './accessory/accessory.component';
import { WatchComponent } from './watch/watch.component';

const fireEnvironment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyDvOSLojnTIBxkhIdCShXRpixitN7QgP4U",
    authDomain: "world-brand.firebaseapp.com",
    projectId: "world-brand",
    storageBucket: "world-brand.appspot.com",
    messagingSenderId: "480025274550",
    appId: "1:480025274550:web:49b48a5e106e9f8ab91e17",
    measurementId: "G-3YHB7BV5X8"
  }
}

const routes : Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path : 'home', component : HomeComponent },
  { path : 'login', component : LoginComponent },
  { path : 'enroll', component : EnrollComponent },
  { path : 'buy', component : BuyComponent },
  { path : 'cloth_men', component : ClothMenComponent },
  { path : 'cloth_women', component : ClothWomenComponent },
  { path : 'shoes', component : ShoesComponent },
  { path : 'bag', component : BagComponent },
  { path : 'perfume', component : PerfumeComponent },
  { path : 'wallet', component : WalletComponent },
  { path : 'accessory', component : AccessoryComponent },
  { path : 'watch', component : WatchComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EnrollComponent,
    BuyComponent,
    SellComponent,
    ClothMenComponent,
    ClothWomenComponent,
    ShoesComponent,
    BagComponent,
    PerfumeComponent,
    WalletComponent,
    AccessoryComponent,
    WatchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(fireEnvironment.firebase, '/'),   //파이어 베이스 모듈 사용
    AngularFirestoreModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatMenuModule,
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
