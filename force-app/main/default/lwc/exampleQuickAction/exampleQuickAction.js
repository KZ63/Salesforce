import { LightningElement } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import  ACCOUNT_OBJECT  from '@salesforce/schema/Account';
import  NAME_FIELD  from '@salesforce/schema/Account.Name';
import  KANA_FIELD  from '@salesforce/schema/Account.AccountKana__c';

export default class ExampleQuickAction extends LightningElement {

  name;
  kana;

  handleSubjectChange(event) {
    this.name = event.target.value;
  }

  handleLimitChange(event) {
    this.kana = event.target.value;
  }

  handleSave() {
    const fields = {};
    fields[NAME_FIELD.fieldApiName] = this.name;
    fields[KANA_FIELD.fieldApiName] = this.kana;
    const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields};
    createRecord(recordInput)
      .then(Account => {
        this.dispatchEvent(
          new ShowToastEvent({
          title: 'Success',
          message: 'Task Created',
          variant: 'success',
          }),
        );
        this.closeModal();
      })
      .catch(error => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Error',
            message: error.body.message,
            variant: 'error',
          }),
        );
      });
  }

  closeModal(event) {
    this.dispatchEvent(new CloseActionScreenEvent());
  }
}