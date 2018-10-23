import { Component, Input, Output, EventEmitter } from '@angular/core';
import {UploadService} from '../../services/cpsAPI/uploadService/upload.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import {GeneralService} from '../../services/general.service'
import {ImageLinkStorageService} from '../../services/cpsAPI/imageLinkStorageService/imageLinkStorage.service'
@Component({
  selector: 'upload-single-image',
  templateUrl: 'upload-single-image.html'
})
export class UploadSingleImageComponent {
  //web upload image
  noImage:string;
  @Output('imageUploadedEvent') imageUploadedEvent : EventEmitter<string> = new EventEmitter<string>();
  @Input('oid') oid;
  @Input('source') source;
  @Input('path') path;
  @Input('cid') cid;
  @Input('order') order;
  //determine if to display image uploaded or not
  @Input('isdisplay') isdisplay
  constructor(private uS:UploadService, private gData:GlobalDataService, private gS:GeneralService, private ilsS:ImageLinkStorageService) {
    this.noImage=this.gData.noImage;
  }
  isUploading:boolean=false;
  selectedFile=null;
  onFileSelected(event){
    this.selectedFile=event.target.files[0];
    this.Upload(function(id){
      this.imageUploadedEvent.emit(id);
      this.isUploading=false;
    }.bind(this), function(message){
      console.log("UPLOADING IMAGE");
      this.gS.ShowAlert(message);
      this.isUploading=false;
    }.bind(this));
  }
  //#region db func
  Upload(success, failed){
    this.isUploading=true;
    this.uS.UploadImage(this.path, this.selectedFile, function(src){
      this.ilsS.InsertNew(this.oid, src, this.gData.applicationID, this.cid, this.gData.selectedTimezone, ""+Number(this.order+1), success.bind(this), failed.bind(this))
    }.bind(this), failed.bind(this))
  }
  //#endregion


}
