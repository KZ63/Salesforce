import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactHandler.getContacts';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import SampleMC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class ContactDetail extends LightningElement {
  subscription = null;
  recordId;

  @wire(getContacts, {accId : '$recordId'})
  contacts;

  @wire(MessageContext)
  messageContext;

  subscribeToMessageChannel() {
    if(!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        SampleMC,
        (message) => this.recordId = message.recordId,
        {scope: APPLICATION_SCOPE}
      );
    }
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }
}