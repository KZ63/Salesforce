import { LightningElement, wire, api } from 'lwc';
import getHotAccount from '@salesforce/apex/AccountTableViewController.getHotAccount';
import updateAccount from '@salesforce/apex/AccountTableViewController.updateAccount';
import { refreshApex } from '@salesforce/apex';

export default class RefreshData extends LightningElement {
  @api recordId;
  rate = 'Hot';

  @wire(getHotAccount, { rate: '$rate'})
  wiredAccount;

  handleClick(event) {
    updateAccount({
        rate: 'Hot'
    })
    .then(() => {
      console.log('success');
      return refreshApex(this.wiredAccount);

    })
    .catch((error) => {
        this.message = 'Error received: code' + error.errorCode + ', ' +
            'message ' + error.body.message;
    });
}
}