import { LightningElement } from 'lwc';

export default class ValidationCheck extends LightningElement {

  // 各lightning-inputのvalidationチェック
  isInputValid() {
    let isValid = true;
    let input = this.template.querySelectorAll('lightning-input');
    input.forEach(inputField => {
      if(!inputField.checkValidity()) {
        inputField.reportValidity();
        isValid = false;
      }
    });

    return isValid;
  }

  // 保存押下時に呼び出し
  validationCheck() {
    if(this.isInputValid()) {
      let input = this.template.querySelectorAll('lightning-input');
      input.forEach(inputField => {
        console.log('入力値：' + inputField.value);
      })
    }
  }

  register(event) {
    let input = event.target;
    let value = input.value;
    if(value === 'Salesforce') {
      input.setCustomValidity('Salesforceとは入力できません。')
    } else {
      input.setCustomValidity('');
    }
    input.reportValidity();
  }

}