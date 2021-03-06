import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './components/result/result.component';
import { ResultsServiceService } from './Services/results-service.service';
import { GoogleAnalyticsEventsService } from './Services/analytics/analytic-sercice/analytic-sercice.component';
import { InsightsServiceComponent } from './Services/analytics/insights-service/insights-service.component';
import {MatDialogModule} from "@angular/material";
import { ErrorDialogBoxComponent } from './components/error-dialog-box/error-dialog-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AboutUsComponent } from './components/about-us/about-us.component';


const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'results', component:  ResultComponent},
  {path: 'aboutus', component: AboutUsComponent},
  { path: '**', component: LandingComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ResultComponent,
    ErrorDialogBoxComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    Ng4LoadingSpinnerModule.forRoot() 
  ],
  providers: [
    ResultsServiceService,
    GoogleAnalyticsEventsService,
    InsightsServiceComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogBoxComponent]
})
export class AppModule { }
