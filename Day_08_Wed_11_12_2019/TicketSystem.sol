
pragma solidity >=0.5.11;
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract TicketSystem is usingOraclize  {
    string name;
    uint256 public priceOfUrl;
    constructor() public payable {}

      struct Ticket {
        uint id;
        string eventName;
        string eventPlace;
        bool booked;
    }

    uint enabledAt = now;
    
    modifier enabledEvery(uint t) {
    if (now >= enabledAt) {
      enabledAt = now + t;
      _;      
    }
    }
    
    function __callback(bytes32 myid, string memory result ) public {
        require(msg.sender == oraclize_cbAddress());
        name = result;
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

    function bookTicket(uint id) public enabledEvery(1 minutes) {
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

    function getRandomTicketOwnerName() public payable {
        require(address(this).balance >= oraclize_getPrice("URL"), "add ETH");
        oraclize_query("URL", "json(https://uinames.com/api/?amount=1)");
        }
    }

