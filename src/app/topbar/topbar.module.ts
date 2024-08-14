import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { TopBarComponent } from './topbar.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
  }

@NgModule({
    imports: [CommonModule,
        FormsModule,
        StyleClassModule,
        SplitButtonModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          })
    ],
    exports: [TopBarComponent],
    declarations: [TopBarComponent],
    providers: [TranslatePipe]
})
export class AppTopbarModule {}