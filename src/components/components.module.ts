import { NgModule } from '@angular/core';
import { UploadSingleImageComponent } from './upload-single-image/upload-single-image';
import { UploadSingleImage1Component } from './upload-single-image1/upload-single-image1';
@NgModule({
	declarations: [UploadSingleImageComponent,
    UploadSingleImage1Component],
	imports: [],
	exports: [UploadSingleImageComponent,
    UploadSingleImage1Component]
})
export class ComponentsModule {}
