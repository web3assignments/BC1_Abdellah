pragma solidity >=0.5.11;
import "github.com/provable-things/ethereum-api/provableAPI.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/ownership/Ownable.sol";

contract TicketSystem is usingProvable, Ownable {
    string name;
    uint256 public priceOfUrl;
    constructor() public Ownable payable {}

      struct Ticket {
        uint id;
        string eventName;
        string eventPlace;
        bool booked;
    }

    function __callback(bytes32 myid, stirng memory result ) public {
        if (msg.sender != provable_cbAddres()) revert();
        name = result[0].name;
    }

    Ticket[] public ticketArray;
    mapping (address => Ticket) public lastTicketBooked;
    event ticketIsBooked(address receiver, uint id, string eventName);
    event ticketIsMade(address receiver, uint id, string eventName);

    function makeTicket(string memory eventName, string memory eventPlace) public onlyOwner {
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

    function getRandomTicketOwnerName() public payable {
        priceOfUrl = provable_getPrice("URL");
        require( address(this).balance >= priceOfUrl,
        "please add some ETH to cover for the query fee");
        provable_query("URL",
        "json(https://uinames.com/api/?amount=1)");        
    }
}
