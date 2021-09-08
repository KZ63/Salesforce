public with sharing class ContactHandler {
    public ContactHandler() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id accId){
        return [SELECT Id, Name, Phone, Title, Email FROM CONTACT WHERE AccountId = :accId];
    }
}
