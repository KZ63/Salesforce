import { LightningElement, api } from 'lwc';

export default class AccountListItem extends LightningElement {
  @api account;

  handleSelect(event) {
    console.log('handleSelect');
    event.preventDefault();
    const selectEvent = new CustomEvent('accountselect', {
      bubbles: true
    });
    this.dispatchEvent(selectEvent);
  }
}