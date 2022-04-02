import { LightningElement, wire, track } from 'lwc';
import ACCOUNT from '@salesforce/schema/Account';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class ComboboxSample extends LightningElement {

  @track options = [];
  recordType;

  @wire(getObjectInfo, { objectApiName: ACCOUNT })
  opportunityInfo({data, error}) {
    if(data) {
      console.log('◆◆');
      const rtis = data.recordTypeInfos;
      this.recordType = Object.keys(rtis).find(rti => rtis[rti].name === 'マスタ');
    } else if(error) {
      console.log('error');
    } 
  }

  @wire(getPicklistValuesByRecordType, { recordTypeId: '$recordType', objectApiName: ACCOUNT})
  ratingValues({data, error}){
    if(data) {
      this.picklistValue = data.picklistFieldValues.Rating.values;
      for(let i = 0; i < this.picklistValue.length; i++) {
        this.options.push({label: this.picklistValue[i].label, value: this.picklistValue[i].value});
      }
    }
  }

}