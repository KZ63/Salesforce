import { LightningElement, wire, api, track } from 'lwc';
import getOppTable from '@salesforce/apex/OpportunityTableController.getOppTable';
import { NavigationMixin } from 'lightning/navigation';
import OPPORTUNITY from '@salesforce/schema/Opportunity';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValuesByRecordType, getPicklistValues } from 'lightning/uiObjectInfoApi';


const columns = [
    { label: '商談名', fieldName: 'Name'},
    { label: '金額', fieldName: 'Amount', type: 'currency'},
    // {
    //   label: 'フェーズ', fieldName: 'StageName', type: 'picklist', typeAttributes: {
    //       placeholder: 'Choose rating', options: this.options
    //       , value: { fieldName: 'StageName' } // default value for picklist
    //       , context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
    //   }
    // },
];

export default class OpportunityTable extends NavigationMixin(LightningElement) {

  columns = columns;
  records;
  @api recordId;
  @track recordType;
  options = [];

  @wire(getObjectInfo, { objectApiName: OPPORTUNITY})
  opportunityInfo({data, error}) {
    if(data) {
      console.log('2');
      const rtis = data.recordTypeInfos;
      console.log(Object.keys(rtis).find(rti => rtis[rti].name === '民間企業向けレコード'));
      this.recordType = Object.keys(rtis).find(rti => rtis[rti].name === '民間企業向けレコード');
    } else if(error) {
      console.log('error');
    } 
  }

  // get recordTypeId() {
  //   // Returns a map of record type Ids 
  //   console.log('2');
  //   const rtis = this.opportunityInfo.data.recordTypeInfos;
  //   console.log(Object.keys(rtis).find(rti => rtis[rti].name === '民間企業向けレコード'));
  //   return Object.keys(rtis).find(rti => rtis[rti].name === '民間企業向けレコード')
  // }
    

  @wire(getPicklistValuesByRecordType, { recordTypeId: '$recordType', objectApiName: OPPORTUNITY})
  ratingValues({data, error}){
      if(data) {
        console.log('Picklist:' + data.picklistFieldValues.StageName.values);
        this.picklistValue = data.picklistFieldValues.StageName.values;
        for(let i = 0; i < this.picklistValue.length; i++) {
            console.log('選択' + JSON.stringify(this.picklistValue[i]));
            console.log('ラベル' + this.picklistValue[i].label);
            console.log('value' + this.picklistValue[i].value);
            this.options.push({label: this.picklistValue[i].label, value: this.picklistValue[i].value});
        }
        console.log('option' + JSON.stringify(this.options));
      } else if(error) {
          console.log('error');
      }
  }

  @wire(getOppTable, {accId: '$recordId'})
  wiredOpps({error, data}) {
    if(data) {
      console.log('data1');
      this.records = data;
    }
  }

}