trigger CaseTrigger on Case (before insert, after insert, before update) {

    CaseTriggerHandler cth = new CaseTriggerHandler();
    
    if(Trigger.isInsert && Trigger.isBefore) {
        cth.changePriority(Trigger.new);
    }
    if(Trigger.isUpdate && Trigger.isBefore) {
        cth.validationCheck(Trigger.new, Trigger.oldMap);
    }
    if(Trigger.isUpdate && Trigger.isAfter) {
        cth.createEvent(Trigger.new, Trigger.oldMap);
    }
}