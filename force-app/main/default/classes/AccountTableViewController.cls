public with sharing class AccountTableViewController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        return [Select Id, Name, Website, Phone, LastModifiedDate
                    From Account Limit 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountWithContact(){
        return [Select Id, Name, (Select Id, Name, AccountId From Contacts)
                From Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountListWithRating(){
        return [Select Id, Name, AccountNumber, Phone, Rating
                    From Account Limit 10];
    }
}