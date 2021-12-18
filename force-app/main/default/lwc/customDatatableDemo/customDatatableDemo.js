import { LightningElement, track, wire } from 'lwc';
import getAccountListWithRating from '@salesforce/apex/AccountTableViewController.getAccountListWithRating';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import RATING from '@salesforce/schema/Account.Rating';
import { getPicklistValuesByRecordType, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT from '@salesforce/schema/Account';

export default class CustomDatatableDemo extends LightningElement {
  @track data = [];
  @track draftValues = [];

  lastSavedData = [];
  picklistValue;
  options = [];
  recordType;

    @wire(getObjectInfo, { objectApiName: ACCOUNT})
    opportunityInfo({data, error}) {
    if(data) {
        const rtis = data.recordTypeInfos;
        //console.log(Object.keys(rtis).find(rti => rtis[rti].name === 'マスタ'));
        this.recordType = Object.keys(rtis).find(rti => rtis[rti].name === 'マスタ');
    } else if(error) {
        console.log('error');
    } 
    }

  @wire(getPicklistValuesByRecordType, { recordTypeId: '$recordType', objectApiName: ACCOUNT})
  ratingValues({data, error}){
      if(data) {
        // console.log('Picklist:' + data.picklistFieldValues.Rating.values);
        this.picklistValue = data.picklistFieldValues.Rating.values;
        for(let i = 0; i < this.picklistValue.length; i++) {
            // console.log('選択' + JSON.stringify(this.picklistValue[i]));
            // console.log('ラベル' + this.picklistValue[i].label);
            // console.log('value' + this.picklistValue[i].value);
            this.options.push({label: this.picklistValue[i].label, value: this.picklistValue[i].value});
        }
        //console.log('option' + JSON.stringify(this.options));
        this.setColumns();
        getAccountListWithRating()
            .then(data => {
            this.data = data;
            })
            this.lastSavedData = JSON.parse(JSON.stringify(this.data));

      } else if(error) {
          console.log('error');
      }
  }

  setColumns() {
    this.columns = [
        { label: 'Name', fieldName: 'Name', editable: true },
        { label: 'Account Number', fieldName: 'AccountNumber', editable: true },
        { label: '顧客番号', fieldName: 'customerNumber__c', type: 'inputtext',
            typeAttributes: {
                placeholder: '', value: { fieldName: 'customerNumber__c' } // default value for picklist
                , context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
            } 
        },
        {
            label: 'Rating', fieldName: 'Rating', type: 'picklist', typeAttributes: {
                placeholder: 'Choose rating', options: this.options
                , value: { fieldName: 'Rating' } // default value for picklist
                , context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
            }
        }
    ];
  }

  updateDataValues(updateItem) {
    let copyData = [... this.data];
    copyData.forEach(item => {
        if (item.Id === updateItem.Id) {
            for (let field in updateItem) {
                item[field] = updateItem[field];
            }
        }
    });

    //write changes back to original data
    this.data = [...copyData];
  }

  updateDraftValues(updateItem) {
    let draftValueChanged = false;
    let copyDraftValues = [...this.draftValues];
    //store changed value to do operations
    //on save. This will enable inline editing &
    //show standard cancel & save button
    copyDraftValues.forEach(item => {
        if (item.Id === updateItem.Id) {
            for (let field in updateItem) {
                item[field] = updateItem[field];
            }
            draftValueChanged = true;
        }
    });

    if (draftValueChanged) {
        this.draftValues = [...copyDraftValues];
    } else {
        this.draftValues = [...copyDraftValues, updateItem];
    }
  }

  picklistChanged(event) {
    event.stopPropagation();
    let dataRecieved = event.detail.data;
    console.log('◆' + dataRecieved.context);
    console.log('◆' + dataRecieved.value);
    let updatedItem = { Id: dataRecieved.context, Rating: dataRecieved.value };
    this.updateDraftValues(updatedItem);
    // this.updateDataValues(updatedItem);
  }

  inputtextChanged(event) {
    event.stopPropagation();
    let dataRecieved = event.detail.data;
    console.log('◆' + dataRecieved.context);
    console.log('◆' + dataRecieved.value);
    let updatedItem = { Id: dataRecieved.context, customerNumber__c: dataRecieved.value };
    this.updateDraftValues(updatedItem);
  }

  //handler to handle cell changes & update values in draft values
  handleCellChange(event) {
      this.updateDraftValues(event.detail.draftValues[0]);
  }

  handleSave(event) {
    console.log('Updated items', this.draftValues);
    //save last saved copy
    //this.lastSavedData = JSON.parse(JSON.stringify(this.data));
    const recordInputs =  event.detail.draftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });

    const promises = recordInputs.map(recordInput => updateRecord(recordInput));
    Promise.all(promises).then(accounts => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Accounts updated',
                variant: 'success'
            })
        );
        // Clear all draft values
        this.draftValues = [];

        // Display fresh data in the datatable
        return refreshApex(this.data);
    }).catch(error => {
        // Handle error
        console.log('errorMsg:' + JSON.stringify(error.body.output.fieldErrors.customerNumber__c));
    });
  }

  handleCancel(event) {
      //remove draftValues & revert data changes
      this.data = JSON.parse(JSON.stringify(this.lastSavedData));
      this.draftValues = [];
  }
}