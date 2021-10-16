import { LightningElement, wire, api } from 'lwc';
import getOppTable from '@salesforce/apex/OpportunityTableController.getOppTable';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
  {label: 'Details', name: 'details'},
  {label: 'Delete', name: 'delete'},
];

const columns = [
    { label: '商談名', fieldName: 'Name'},
    { label: '金額', fieldName: 'Amount', type: 'currency'},
    { label: 'フェーズ', fieldName: 'StageName', type: 'text', editable: true},
    { type: 'action', typeAttributes: {rowActions: actions, menuAlignment: 'right'}},
];

export default class OpportunityTable extends NavigationMixin(LightningElement) {

  columns = columns;
  records;
  @api recordId;

  @wire(getOppTable, {accId: '$recordId'})
  wiredOpps({error, data}) {
    if(data) {
      this.records = data;
    }
  }

  handleRowAction(event) {
    console.log('■' + event.detail.action.name);
    let actionName = event.detail.action.name;
    let row = event.detail.row;
    switch(actionName) {
      case 'details':
        this[NavigationMixin.Navigate]({
          type: 'standard__recordPage',
          attributes: {
            recordId: row.Id,
            actionName: 'view'
          }
        });
        break;
      case 'delete':
        alert('delete but not really');
        break;
    }
  }
}