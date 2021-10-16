public with sharing class americanFlightController {

    public static final String endpoint1 = 'https://anypoint.mulesoft.com/mocking/api/v1/links/93f8350e-789f-461c-b62f-6cfe37332a25/flights';

    public static void doinit() {
        System.debug('コンストラクタ');
        callout();
    }

    public static void callout() {
        System.debug('HttpCallout');
        Http h = new Http();

        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint1);
        req.setMethod('GET');

        HttpResponse res = h.send(req);
        System.debug('★★' + res.getStatusCode());
        System.debug('■■' + res.getBody());

        List<Flight> flightList = new List<Flight>();

        if(res.getStatusCode() == 200) {
            
            Flight f1 = new Flight();
            f1.Id = 1;
            f1.code = 'ER38sd';
            f1.price = 400;
            f1.departureDate = '2017/07/26';
            f1.origin = 'CLE';
            f1.destination = 'SFO';
            f1.emptySeats = 0;
            f1.type = 'Boeing 737';
            f1.totalSeats = 150;

            flightList.add(f1);

            Flight f2 = new Flight();
            f2.Id = 2;
            f2.code = 'ER45if';
            f2.price = 540.99;
            f2.departureDate = '2017/07/27';
            f2.origin = 'SFO';
            f2.destination = 'ORD';
            f2.emptySeats = 54;
            f2.type = 'Boeing 777';
            f2.totalSeats = 300;

            flightList.add(f2);
            
        }

    }

    public class Flight {
        public Integer Id {get; set;}
        public String code {get; set;}
        public Decimal price {get; set;}
        public String departureDate {get; set;}
        public String origin {get; set;}
        public String destination {get; set;}
        public Integer emptySeats {get; set;}
        public String type {get; set;}
        public Integer totalSeats {get; set;}

        public Flight() {

        }
    }
}