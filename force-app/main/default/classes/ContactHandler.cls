public with sharing class ContactHandler {
    public ContactHandler() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id accId){
        return [SELECT Id, Name, Phone, Title, Email FROM CONTACT WHERE AccountId = :accId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsWithOffSet(Id accId, Integer limitSize, Integer offset){
        return [SELECT Id, Name, Phone, Title, Email FROM CONTACT WHERE AccountId = :accId LIMIT :limitSize OFFSET :offset];
    }
}