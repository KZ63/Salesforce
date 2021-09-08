import { LightningElement, api, wire } from 'lwc';
import getAccountWithContact from '@salesforce/apex/AccountTableViewController.getAccountWithContact';

export default class SampleTreeGrid extends LightningElement {
  columns = [
    { label: 'Account Name', fieldName: 'Name', type: 'text'},
    { label: 'Id', fieldName: 'Id', type: 'text'},
    // { label: 'Phone', fieldName: 'Phone', type: 'text'},
  ]
  
  accounts;

  // コメントを追加
  connectedCallback() {
    getAccountWithContact()
    .then(data => {
      console.log('data');
      let accountData = JSON.parse(JSON.stringify(data));
      for(let i = 0; i < accountData.length; i ++) {
        let cons = accountData[i]['Contacts'];
        if(cons) {
          accountData[i]._children = cons;
          delete accountData[i].Contacts;
        }
      }
      this.accounts = accountData;
      
    })
    .catch(error => 
      console.log(error))
  }
}
      
