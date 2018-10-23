import { Component, Input, Output, EventEmitter } from '@angular/core';
import {UploadService} from '../../services/cpsAPI/uploadService/upload.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import {GeneralService} from '../../services/general.service'
import {ImageLinkStorageService} from '../../services/cpsAPI/imageLinkStorageService/imageLinkStorage.service'
@Component({
  selector: 'upload-single-image1',
  templateUrl: './upload-single-image1.html'
})
export class UploadSingleImage1Component {
  noImage:string;
  @Output('imageUploadedEvent') imageUploadedEvent : EventEmitter<string> = new EventEmitter<string>();
  @Input('oid') oid;
  @Input('source') source;
  @Input('path') path;
  @Input('cid') cid;
  @Input('order') order;
  //determine if to display image uploaded or not
  @Input('isdisplay') isdisplay
  text: string;
  constructor(private uS:UploadService, private gData:GlobalDataService, private gS:GeneralService, private ilsS:ImageLinkStorageService) {
    this.noImage=this.gData.noImage;
  }
  isUploading:boolean=false;
  SelectImage(){
    this.isUploading=true;
    this.uS.UploadSingleImage(this.path, function(src){
      this.ilsS.InsertNew(this.oid, src, this.gData.applicationID, this.cid, this.gData.selectedTimezone, ""+Number(this.order+1), function(id){
        this.imageUploadedEvent.emit(id);
        this.isUploading=false;
      }.bind(this), function(message){
        this.gS.ShowAlert(message);
        this.isUploading=false;  
      }.bind(this))
    }.bind(this), function(message){
      this.gS.ShowAlert(message);
      this.isUploading=false;
    }.bind(this))
  }

}
