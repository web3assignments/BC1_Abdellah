
pragma solidity >=0.5.11;

contract TicketSystem {

      struct Ticket {
        uint id;
        string eventName;
        string eventPlace;
        bool booked;
    }

    Ticket[] public ticketArray;
    mapping (address => Ticket) public lastTicketBooked;
    event ticketIsBooked(address receiver, uint id, string eventName);
    event ticketIsMade(address receiver, uint id, string eventName);

    function makeTicket(string memory eventName, string memory eventPlace) public {
        Ticket memory ticket = Ticket(ticketArray.length, eventName, eventPlace, false);
        ticketArray.push(ticket);
        emit ticketIsMade(msg.sender, ticket.id, ticket.eventName);
    }

    function bookTicket(uint id) public {
        require(id >= 0, "id must be equal or larger than 0");
        Ticket storage ticket = ticketArray[id];
        ticket.booked = true;
        emit ticketIsBooked(msg.sender, ticket.id, ticket.eventName);
        lastTicketBooked[msg.sender] = ticket;
    }

    function getLatestTicketBookedDetails() public view returns (uint id, string memory eventName, string memory eventPlace)  {
        Ticket memory ticket = lastTicketBooked[msg.sender];
        return (ticket.id, ticket.eventName, ticket.eventPlace);
    }

}
