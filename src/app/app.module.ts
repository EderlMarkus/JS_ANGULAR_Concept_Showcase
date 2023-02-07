import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { appRoutes } from './routes/routes';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { material } from './material/material.imports';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { ItemComponent } from './components/item/item.component';
import { FormsModule } from '@angular/forms';
import { itemReducer } from './store/reducers/item.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AddComponent,
    ItemComponent,
  ],
  imports: [
    ...material,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ items: itemReducer }, {}),
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
