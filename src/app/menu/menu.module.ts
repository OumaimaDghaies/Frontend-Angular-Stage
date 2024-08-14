import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { StyleClassModule } from 'primeng/styleclass';
import { AppMenuComponent } from './menu.component';
import { AppMenuItemComponent } from './menuitem.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    imports: [CommonModule, StyleClassModule, RouterModule, AutoCompleteModule,BrowserModule],
    exports: [AppMenuComponent],
    declarations: [AppMenuComponent, AppMenuItemComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppMenuModule {}
