import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';

import {GridsterModule} from 'angular-gridster2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule, } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button' ;
import { MatIconModule} from '@angular/material/icon' ;
import {MatDialogModule} from '@angular/material/dialog';
import { WidgetSettingsComponent } from './components/widget-settings/widget-settings.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    WidgetSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridsterModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
