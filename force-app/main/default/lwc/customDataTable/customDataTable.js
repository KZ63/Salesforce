import LightningDatatable from 'lightning/datatable';
//import the template so that it can be reused
// import DatatablePicklistTemplate from './picklist-template.html';
import DatatablePicklistTemplate from './customDataTable.html';
import DatatableInputTextTemplate from './inputText.html';
import {
    loadStyle
} from 'lightning/platformResourceLoader';
import CustomDataTableResource from '@salesforce/resourceUrl/customDataTable';

export default class CustomDataTable extends LightningDatatable {
  static customTypes = {
    picklist: {
        template: DatatablePicklistTemplate,
        typeAttributes: ['label', 'placeholder', 'options', 'value', 'context'],
    },
    inputtext: {
      template: DatatableInputTextTemplate,
      typeAttributes: ['label', 'placeholder', 'value', 'context'],
  },
  };

  constructor() {
    super();
    Promise.all([
        loadStyle(this, CustomDataTableResource),
    ]).then(() => {})
  }
}