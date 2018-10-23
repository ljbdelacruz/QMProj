export class SelectChoiceVM{
    public text:string;
    public value:string;
    constructor(){
        this.empty();
    }
    empty(){
        this.text="";
        this.value="";
    }
    setM(text, value){
        this.text=text;
        this.value=value;
    }

}