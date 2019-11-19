
pragma solidity >=0.5.11;

contract TicketSystem {
  
      struct Ticket {
        uint id;
        string eventName;
        string eventPlace;
    }
  
    Ticket[] ticketArray;
    Ticket[] ticketsBooked;
    string lastTicketBookedName;



    function makeTicket(string memory eventName, string memory eventPlace) public {
        Ticket memory ticket = Ticket(ticketArray.length, eventName, eventPlace);
        ticketArray.push(ticket);
    }

    function bookTicket(uint id) public {
        Ticket memory ticket = ticketArray[id];
        ticketsBooked.push(ticket);
    }
    function getLatestTicketBookedDetails() public returns (string memory) {
        uint latestTicket = ticketsBooked.length-1;
        lastTicketBookedName = ticketsBooked[latestTicket].eventName;
        return lastTicketBookedName;
    }

}
