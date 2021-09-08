import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountTableViewController.getAccountList';
import { publish, MessageContext } from 'lightning/messageService';
import SampleMC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class AccountList extends LightningElement {
  @wire(getAccountList)
  account;

  @wire(MessageContext)
  messageContext;

  handleAccountSelect(event) {
    console.log('select');
    const payload = { recordId: event.target.account.Id };
    publish(
      this.messageContext, 
      SampleMC, 
      payload
    )
  }
}