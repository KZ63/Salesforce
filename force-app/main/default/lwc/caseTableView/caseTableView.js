import { LightningElement, wire } from 'lwc';
import getCaseList from
'@salesforce/apex/CaseTableViewController.getCaseList';

const columns = [
  { label: '件名', fieldName: 'Subject' },
  //{ label: '原因', fieldName: 'Reason'},
  //{ label: '起源', fieldName: 'Origin'},
  //{ label: '状況', fieldName: 'Status'},
];

export default class CaseTableView extends LightningElement {

  columns = columns;
  cases;

  @wire(getCaseList)
  wiredCases({error, data}) {
    if(data) {
      this.cases = data;
    } else if(error) {

    }
  }
}