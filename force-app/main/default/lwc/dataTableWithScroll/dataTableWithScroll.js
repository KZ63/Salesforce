import { LightningElement, api, wire, track } from 'lwc';
import getContactsWithOffSet from '@salesforce/apex/ContactHandler.getContactsWithOffSet';

const columns = [
  { label: '氏名', fieldName: 'Name', type: 'url', typeAttributes: {label: {fieldName: 'Name'}, tooltip: {fieldName: 'Name'}}},
  { label: '電話', fieldName: 'Phone'},
  { label: '役職', fieldName: 'Title'},
]

export default class DataTableWithScroll extends LightningElement {
  @api recordId;
  @track contacts = [];
  rowLimit = 20;
  rowOffSet = 0;
  loadMoreStatus;
  totalNumberOfRows = 50;
  targetDatatable;
  columns = columns;

  connectedCallback() {
    console.log('読み込み');
    this.loadData();
  }

  loadData() {
    getContactsWithOffSet({accId: this.recordId, limitSize: this.rowLimit, offset: this.rowOffSet})
    .then(result => {
      console.log('データロード');
      let tempContactList = [];
      for(let i = 0; i < result.length; i++) {
        let tempRecord = Object.assign({}, result[i]);
        tempRecord.recordLink = '/lightning/r/' + tempRecord.Id + '/view';
        tempContactList.push(tempRecord);
      }
      let updateRecords = [...this.contacts, ...tempContactList];
      this.contacts = updateRecords;
      this.loadMoreStatus = '';
      console.log('サイズ：' + this.contacts.length);
      if(this.contacts.length >= this.totalNumberOfRows) {
        console.log('スクロール終了');
        this.targetDatatable.enableInfiniteLoading = false;
        this.loadMoreStatus = 'これ以上データはありません';
      }
      if(this.targetDatatable) {
        this.targetDatatable.isLoading = false;
      }
    })
    .catch(error => {
      console.log('エラー：' + error);
    });
  }

  loadMoreData(event) {
    event.preventDefault();
    event.target.isLoading = true;
    this.targetDatatable = event.target;
    this.loadMoreStatus = 'Loading';

    this.rowOffSet = this.rowOffSet + this.rowLimit;
    this.loadData();

  }
}