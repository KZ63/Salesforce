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
        return [Select Id, Name, AccountNumber, Phone, Rating, customerNumber__c
                    From Account Limit 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getHotAccount(String rate){
        return [Select Id, Name, AccountNumber, Phone, Rating, Type
                    From Account Where Rating = :rate];
    }

    @AuraEnabled
    public static void updateAccount(String rate){
        List<Account> targetAcc =  [Select Id, Name, AccountNumber, Phone, Rating, Type
                    From Account Where Rating = :rate];
        List<Account> updateAcc = new List<Account>();
        for(Account a: targetAcc) {
            a.Type = 'Prospect';
            updateAcc.add(a);
        }
        
        update updateAcc;
    }
}