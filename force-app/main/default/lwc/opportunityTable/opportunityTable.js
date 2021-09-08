import { LightningElement, wire, api } from 'lwc';
import getOppTable from '@salesforce/apex/OpportunityTableController.getOppTable';

const columns = [
    { label: '商談名', fieldName: 'Name'},
    { label: '金額', fieldName: 'Amount', type: 'currency'},
    { label: 'フェーズ', fieldName: 'StageName', type: 'text', editable: true}
];

export default class OpportunityTable extends LightningElement {

  columns = columns;
  records;
  @api recordId;

  @wire(getOppTable, {accId: '$recordId'})
  wiredOpps({error, data}) {
    if(data) {
      this.records = data;
    }
  }
}