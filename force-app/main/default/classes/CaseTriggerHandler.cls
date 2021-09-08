public with sharing class CaseTriggerHandler {
    
    public void changePriority(List<Case> newCases) {
        Set<Id> accIdSet = new Set<Id>();

        for(Case cs: newCases) {
            if(cs.AccountId != null) {
                accIdSet.add(cs.AccountId);
            }
        }

        Map<Id, Account> accountMap = new Map<Id, Account>([select Id, Rating From Account Where Id in: accIdSet]);

        for(Case cs: newCases) {
            Account parent = accountMap.get(cs.AccountId);
            if(parent != null && parent.Rating == 'Hot') {
                cs.Priority = 'High';
            }
        }
    }

    public void validationCheck(List<Case> newCase, Map<Id, Case> oldMap) {
        for(Case newRec: newCase) {
            Case oldRec = oldMap.get(newRec.Id);
            if(oldRec.Status == 'New' && newRec.Status == 'Working' && String.isBlank(newRec.Type)) {
                newRec.Type.addError('「状況」がNewからWorkingに変わった時は必須です');
            }
        }
    }

    public void createEvent(List<Case> newCases, Map<Id, Case> oldMap) {
        List<Case> targetCase = new List<Case>();

        for(Case newRec: newCases) {
            Case oldRec = null;
            if(oldMap != null) {
                oldRec = oldMap.get(newRec.Id);
            }

            if(newRec.isClosed && newRec.Origin == 'Web' && (Trigger.isInsert || !oldRec.isClosed )) {
                targetCase.add(newRec);
            }
        }

        List<Event> newEvent = new List<Event>();

        Datetime eventDate = Datetime.now().addDays(1);
        eventDate = Datetime.newInstance(eventDate.year(),
                                        eventDate.month(),
                                        eventdate.day(), 10,0,0);
        if(eventDate.format('EEE') == 'Sat'){
            eventDate = eventDate.addDays(2);
        } else if(eventDate.format('EEE') == 'Sun'){
            eventDate = eventDate.addDays(1);
        }

        for(Case cs: targetCase) {
            Event ev = new Event(StartDateTime = eventDate, OwnerId = cs.OwnerId, Subject = 'Webチーム検討会', DurationInMInutes = 60, WhatId = cs.Id);
            newEvent.add(ev);
        }
        insert newEvent;
    }
}