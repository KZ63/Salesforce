import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createRec from '@salesforce/apex/AccountInsertController.createAccRec';

export default class AccountInsert extends LightningElement {
  accountId;
  name = '';

  handleNameChange() {
    this.accountId = undefined;
    this.name = event.target.value;
  }

  createAccount() {
    const recordInput = {sObjectType: 'Account'};
    recordInput.Name = this.name;

    createRec({ acc: recordInput})
      .then(result => {
        this.accountId = result.Id;
        this.dispatchEvent(
          new ShowToastEvent({
            title: '成功',
            message: '取引先',
            variant: 'success',
          }),
        );
      })

      .catch(error => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: '失敗',
            mesage: error.body.message,
            variant: error,
          }),
        );
      });
  }
}