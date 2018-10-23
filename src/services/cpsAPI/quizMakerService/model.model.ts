import { StatusTypeReferenceVM } from "../statusTypeService/model.model";
import { DateTimeStorageVM } from "../dateTimeAPI/model.model";
import { ImageLinkStorageVM } from "../imageLinkStorageService/model.model";
import { UsersViewModel } from "../userInfoService/model.model";

//#region quizInfo
export class QuizInfoVM{
    public ID:string;
    public Name:string;
    public QuizCode:string;
    public hasTimeLimit:boolean;
    public QuizStatus:StatusTypeReferenceVM;
    public Status:StatusTypeReferenceVM;
    public isOpen:boolean;
    public DateTimeStorage:DateTimeStorageVM;
    constructor(){
        this.ID="";
        this.Name="";
        this.QuizCode="";
        this.hasTimeLimit=false;
        this.QuizStatus=new StatusTypeReferenceVM();
        this.Status=new StatusTypeReferenceVM();
        this.isOpen=false;
        this.DateTimeStorage=new DateTimeStorageVM();
    }
    empty(){
        this.ID="";
        this.Name="";
        this.QuizCode="";
        this.hasTimeLimit=false;
        this.QuizStatus=new StatusTypeReferenceVM();
        this.Status=new StatusTypeReferenceVM();
        this.DateTimeStorage=new DateTimeStorageVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Name=object.Name;
            this.QuizCode=object.QuizCode
            this.hasTimeLimit=object.hasTimeLimit;
            this.QuizStatus.set(object.QuizStatus);
            this.Status.set(object.Status);
            this.DateTimeStorage.set(object.DateTimeStorage);
        }
    }

}
//#endregion
//#region quizQuestion
export class QuizQuestionsVM{
    public ID:string;
    public Questions:string;
    public Order:number;
    public Points:number;
    public Status:StatusTypeReferenceVM;
    public Images:ImageLinkStorageVM[];
    public Choices:QuizQuestionAnswerVM[];
    public UserAnswers:QuizUserAnswerVM[]=[];
    public UserAnswer:QuizUserAnswerVM;

    constructor(){
        this.empty();
    }
    empty(){
        this.ID="";
        this.Questions="";
        this.Order=0;
        this.Points=0;
        this.Status=new StatusTypeReferenceVM();
        this.Images=[];
        this.Choices=[];
        this.UserAnswers=[];
        this.UserAnswer=new QuizUserAnswerVM();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Questions=object.Questions;
            this.Order=object.Order;
            this.Points=object.Points;
            this.Status=object.Status;
            object.Choices.forEach(el => {
                var temp=new QuizQuestionAnswerVM();
                temp.set(el);
                this.Choices.push(temp);
            });
            object.Images.forEach(el => {
                var temp=new ImageLinkStorageVM();
                temp.set(el);
                this.Images.push(temp);
            });
            if(object.UserAnswers!=null){
                object.UserAnswers.forEach(el => {
                    var temp=new QuizUserAnswerVM();
                    temp.set(el);
                    this.UserAnswers.push(temp);
                });
                this.UserAnswer.set(object.UserAnswers[0]);
            }

        }
    }
}
//#endregion
//#region QuizQuestionAnswer
export class QuizQuestionAnswerVM{
    public ID:string;
    public Description:string;
    public Points:number;
    public Percent:number;
    public isCorrect:boolean;
    public Images:ImageLinkStorageVM[]=[];
    public isSelected:boolean;
    constructor(){
        this.empty();
    }
    empty(){
        this.ID="";
        this.Description="";
        this.Points=0;
        this.isCorrect=false;
        this.Images=[];
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.Description=object.Description;
            this.Points=object.Points;
            this.isCorrect=object.isCorrect;
            this.Percent=object.Percent;
            if(object.Images!=null){
                object.Images.forEach(el => {
                    var temp=new ImageLinkStorageVM();
                    temp.set(el);
                    this.Images.push(temp);
                });
            }
        }
    }
}
//#endregion
//#region QuizTakers
export class QuizTakersVM{
    public ID:string;
    public UserID:string;
    public TotalPoints:number;
    public DateTime:DateTimeStorageVM;
    public User:UsersViewModel;
    constructor(){
        this.empty();
    }
    empty(){
        this.ID="";
        this.UserID="";
        this.TotalPoints=0;
        this.DateTime=new DateTimeStorageVM();
        this.User=new UsersViewModel();
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.UserID=object.UserID;
            this.TotalPoints=object.TotalPoints;
            this.DateTime.set(object.DateTime);
            this.User.set(object.User);
        }
    }
}
//#endregion
//#region QuizUserAnswer
export class QuizUserAnswerVM{
    public ID:string;
    public QuizQuestionID:string;
    public QuizAnswerID:string;
    public OtherAnswer:string;
    public PointsEarned:number;
    constructor(){
        this.empty();
    }
    empty(){
        this.ID="";
        this.QuizQuestionID="";
        this.QuizAnswerID="";
        this.OtherAnswer="";
        this.PointsEarned=0;
    }
    set(object){
        if(object!=null){
            this.ID=object.ID;
            this.QuizQuestionID=object.QuizQuestionID;
            this.QuizAnswerID=object.QuizAnswerID;
            this.OtherAnswer=object.OtherAnswer;
            this.PointsEarned=object.PointsEarned;
        }
    }
}
//#endregion





