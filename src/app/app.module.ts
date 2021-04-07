import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { TopBarComponent } from './components/top-bar/top-bar.component'

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [AppComponent, HomeComponent, TopBarComponent ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
