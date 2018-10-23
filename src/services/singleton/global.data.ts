import { Injectable } from '@angular/core';
import {UsersViewModel, UserAccessLevelVM} from '../cpsAPI/userInfoService/model.model'
import {PositionViewModel}  from '../cpsAPI/locationServices/model.model'
@Injectable()
export class GlobalDataService {
    public cpsURL:string="http://192.168.0.101:80/";
    public uURL:string="http://192.168.0.101:80/";
    public userInfo:UsersViewModel=new UsersViewModel();
    public userAccessLevel:UserAccessLevelVM[]=[];
    //change this key to quizMaker API key
    public applicationID:string="cecfeb65-3cf8-492d-975d-a06bb2d3fd29";
    public myLocation:PositionViewModel=new PositionViewModel();
    public server:any[]=[{Name:'PH UTC+08:00', Timezone:'Taipei Standard Time'}, {Name:'US UTC-08:00', Timezone:'Pacific Standard Time'}]
    public selectedTimezone:string="Taipei Standard Time";
    public quizMakerImages="42491c3d-47c4-45df-8e4b-f478d761e077";
    //default accessLevel
    public defAL:string="a2e2d83d-dd8d-4a66-bacf-94ad90344ca7";
    //accessLevelCategoryID
    public alcid:string="c4926f90-2be8-4c62-94ed-5399be276f11"
    public noImage:string="";
    imgPath:string="Quiz";
    copyString:string;
    signUpURL:string="http://192.168.0.101:81/#/signup/"+this.selectedTimezone+"/"+this.applicationID;
}
