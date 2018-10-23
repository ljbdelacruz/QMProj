import { DateTimeStorageVM } from "../dateTimeAPI/model.model";
import { StatusTypeReferenceVM } from "../statusTypeService/model.model";

export class GroupingsDataVM{
    public ID:string;
    public SourceID:string;
    public OwnerID:string;
    public DateTimeData:DateTimeStorageVM;
    public CategoryStatus:StatusTypeReferenceVM;
}