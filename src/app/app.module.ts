import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreModule, SharedModule, ReactiveFormsModule],
  bootstrap: [],
})
export class AppModule {}
