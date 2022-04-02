public with sharing class OpportunityTableController {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOppTable(String accId){
        return  [Select Id, Name, Amount, StageName from Opportunity Where AccountId =: accId Order by Amount desc];
    }

    @AuraEnabled
    public static void updateOpptyStage(Decimal amount, String stage, Id accId) {
        for (List<Opportunity> oppts:
            [SELECT Id, Name, Amount, StageName, CloseDate FROM Opportunity WHERE AccountId =: accId]) {
                for(Opportunity o : oppts) {
                    o.StageName = stage;
                }
                update oppts;
            }
            return;
    }
}