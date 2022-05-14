import { LightningElement } from 'lwc';

export default class InputTextWithModal extends LightningElement {

  inputvalue = '';

  modalOpen() {
    console.log('modalopen');
    this.inputvalue = this.template.querySelector('lightning-input').value;
    this.template.querySelector('c-modal').openModal();
  }

}