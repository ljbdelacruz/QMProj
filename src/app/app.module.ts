//#region 3rd party modules
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http'
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { ImagePicker } from '@ionic-native/image-picker';
import { IonicStorageModule } from '@ionic/storage';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//#endregion
//#region Pages
import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login'
import {DashboardPage} from '../pages/dashboard/dashboard'
import {ToolsPage} from '../pages/TeacherTools/Tools/tools'
import {ViewQuizInfoListPage} from '../pages/TeacherTools/view-quiz-info-list/view-quiz-info-list'
import {QuizInfoDetailsPage} from '../pages/TeacherTools/quiz-info-details/quiz-info-details'
import {ModifyChoicesPage} from '../pages/TeacherTools/modify-choices/modify-choices'
import {ModifyQuestionPage} from '../pages/TeacherTools/modify-question/modify-question'
import {CheckQuizPage} from '../pages/check-quiz/check-quiz'
import {UserListPage} from '../pages/user-list/user-list'
//#endregion
//#region components
import {PopupMenuComponent} from '../components/popupMenu1/popMenu1.components'
import {UploadSingleImageComponent} from '../components/upload-single-image/upload-single-image'
import {PopupImageDisplayComponent} from '../components/popupImage/popMenu1.components'
import {UploadSingleImage1Component} from '../components/upload-single-image1/upload-single-image1'
//#endregion
//#region Services

  //#region userInfo
import {UsersServices} from '../services/cpsAPI/userInfoService/user.service'
import {UserAccessLevelService} from '../services/cpsAPI/userInfoService/userAccessLevel.service'
import {SignalRDataService} from '../services/cpsAPI/userInfoService/signalRData.service'
//#endregion
  //#region common
  import {GeneralService} from '../services/general.service'
  import {RequestService} from '../services/request.service'
  import {GlobalDataService} from '../services/singleton/global.data'
  //#endregion
  //#region SecurityCode
    import {SecurityGeneratorService} from '../services/cpsAPI/securityGeneratorService/securityGenerator.service'
  //#endregion
  //#region QuizMaker
  import {QuizInfoService} from '../services/cpsAPI/quizMakerService/quizInfo.service'
  import {QuizQuestionService} from '../services/cpsAPI/quizMakerService/quizQuestion.service'
  import {QuizQuestionAnswerService} from '../services/cpsAPI/quizMakerService/quizQuestionAnswer.service'
  import {QuizTakersService} from '../services/cpsAPI/quizMakerService/quizTakers.service'
  import {QuizUserAnswerService} from '../services/cpsAPI/quizMakerService/quizUserAnswer.service'
  //#endregion
  //#region DateTimeAPI
  import {DateTimeStorageService} from '../services/cpsAPI/dateTimeAPI/dateTimeStorage.service'
  //#endregion
  //#region General
  import {MyGeneralService} from '../services/cpsAPI/general/general.service'
  //#endregion
  //#region upload
  import {UploadService} from '../services/cpsAPI/uploadService/upload.service'
  //#endregion
  //#region imageLinkStorage
  import {ImageLinkStorageService} from '../services/cpsAPI/imageLinkStorageService/imageLinkStorage.service'
  //#endregion
//#endregion
@NgModule({
  declarations: [
    MyApp,
    //#region page
    LoginPage,
    DashboardPage,
    ToolsPage,
    ViewQuizInfoListPage,
    QuizInfoDetailsPage,
    ModifyChoicesPage,
    ModifyQuestionPage,
    CheckQuizPage,
    UserListPage,
    //#endregion
    //#region components
    PopupMenuComponent,
    UploadSingleImageComponent,
    PopupImageDisplayComponent,
    UploadSingleImage1Component,
    //#endregion
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //#region pages
    LoginPage,
    DashboardPage,
    ToolsPage,
    ViewQuizInfoListPage,
    QuizInfoDetailsPage,
    ModifyChoicesPage,
    ModifyQuestionPage,
    CheckQuizPage,
    UserListPage,
    //#endregion
    //#region components
    PopupMenuComponent,
    UploadSingleImageComponent,
    PopupImageDisplayComponent,
    UploadSingleImage1Component,
    //#endregion
  ],
  providers: [
    StatusBar,
    //#region 3rd party
    HttpModule,
    Geolocation,
    BackgroundMode,
    PhonegapLocalNotification,
    ImagePicker,
    InAppBrowser,
    //#endregion
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //#region userInfo
    UsersServices,
    UserAccessLevelService,
    SignalRDataService,
    //#endregion
    //#region SecurityCode
    SecurityGeneratorService,
    //#endregion
    //#region QuizMaker
    QuizInfoService,
    QuizQuestionService,
    QuizQuestionAnswerService,
    QuizTakersService,
    QuizUserAnswerService,
    //#endregion
    //#region DateTime
    DateTimeStorageService,
    //#endregion
    //#region common
    GeneralService,
    RequestService,
    GlobalDataService,
    //#endregion
    //#region general
    MyGeneralService,
    //#endregion
    //#region upload
    UploadService,
    //#endregion
    //#region imageLinkStorage
    ImageLinkStorageService,
    //#endregion
  ]
})
export class AppModule {}
