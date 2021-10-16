declare module "@salesforce/apex/ContactHandler.getContacts" {
  export default function getContacts(param: {accId: any}): Promise<any>;
}
declare module "@salesforce/apex/ContactHandler.getContactsWithOffSet" {
  export default function getContactsWithOffSet(param: {accId: any, limitSize: any, offset: any}): Promise<any>;
}
