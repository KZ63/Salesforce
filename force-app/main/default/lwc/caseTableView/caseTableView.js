import { LightningElement, wire } from 'lwc';
import getCaseList from
'@salesforce/apex/CaseTableViewController.getCaseList';

const columns = [
  { label: '件名', fieldName: 'Subject'},
  // { label: '原因', fieldName: 'Reason', type: 'picklist'},
  // { label: '起源', fieldName: 'Origin', type: 'picklist'},
  // { label: '状況', fieldName: 'Status', type: 'picklist'}, //この３つを有効にするとDeploy出来ない。typeが原因？
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