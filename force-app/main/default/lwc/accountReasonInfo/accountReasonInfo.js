import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import RATING from '@salesforce/schema/Account.Rating';

export default class AccountReasonInfo extends LightningElement {
  @api recordId;
  @track isHigh;

  @wire(getRecord, {recordId: '$recordId' ,fields: [RATING]})
  wiredAccount({data, error}) {
    if(data) {
      console.log('data' + getFieldValue(data, RATING));
      this.isHigh = ('Hot' === getFieldValue(data, RATING));
    } else if(error) {
      console.log('error');
    }
  }

}