import { LightningElement, api, wire } from 'lwc';
import getAccountListWithRating from '@salesforce/apex/AccountTableViewController.getAccountListWithRating';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import RATING_FIELD from '@salesforce/schema/Account.Rating';

const columns = [
  { label: '企業名', fieldName: 'Name'},
  { label: '電話', fieldName: 'Phone'},
  { label: '優先度', fieldName: 'Rating'},
];

export default class DatatableWithPaging extends LightningElement {
  @api recordId;
  accounts = [];
  page = 1; //this will initialize 1st page
  items = []; //it contains all the records.
  columns = columns; //holds column info.
  startingRecord = 1; //start record position per page
  endingRecord = 0; //end record position per page
  pageSize = 5; //default value we are assigning
  totalRecountCount = 0; //total record count received from all retrieved records
  totalPage = 0; //total number of page is needed to display all records

  get isFirstPage() {
    return this.page === 1;
  }

  get isLastPage() {
    return this.page === this.totalPage;
  }

  @wire(getAccountListWithRating)
  wiredAccount({data, error}) {
    if(data) {
      this.items = data;
      this.totalRecountCount = data.length;
      this.totalPage = Math.ceil(this.totalRecountCount/this.pageSize);
      this.accounts = this.items.slice(0, this.pageSize);
      this.endingRecord = this.pageSize;
    } else if(error) {
      console.log('error' + error);
    }
  }

  previousHandler() {
    if(this.page > 1) {
      this.page -= 1;
      this.changePageHandler(this.page);
    }
  }

  nextHandler() {
    if(this.page < this.totalPage) {
      this.page += 1;
      this.changePageHandler(this.page);
    }
  }

  changePageHandler(page) {
    this.startingRecord = ((page - 1) * this.pageSize);
    this.endingRecord = (page * this.pageSize);
    if((page * this.pageSize) > this.totalRecountCount) {
      this.endingRecord = this.totalRecountCount;
    } else {
      this.endingRecord = page * this.pageSize;
    }

    this.accounts = this.items.slice(this.startingRecord, this.endingRecord);

    this.startingRecord += 1;
  }
}