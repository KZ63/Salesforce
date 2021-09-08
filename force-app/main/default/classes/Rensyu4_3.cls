public with sharing class Rensyu4_3 {

    public void Rensyu4_3() {
        
        List<AggregateResult> result = [select AccountId, count(Id) cnt from Contact where Account.Name = '株式会社TAZAWA' or Account.Name = '株式会社なかむら' group by AccountId];

        List<Account> acc = new List<Account>();
        for(AggregateResult agr: result) {
            Id id = (Id)agr.get('AccountId');
            Integer num = (Integer)agr.get('cnt');
            acc.add(new Account(Id=id, NumberOfEmployees=num));
        }
        update acc;
    }
    


}