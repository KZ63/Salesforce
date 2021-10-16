public with sharing class OpportunityTableController {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOppTable(String accId){
        return  [Select Id, Name, Amount, StageName from Opportunity Where AccountId =: accId Order by Amount desc];
    }
}