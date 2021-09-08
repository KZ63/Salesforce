public with sharing class CaseTableViewController {
    
    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseList(){
        return [Select Id, Subject, Reason, Origin, Status
                    From Case Limit 10];
    }
}
