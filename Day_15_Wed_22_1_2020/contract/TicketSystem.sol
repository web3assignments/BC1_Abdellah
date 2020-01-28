
pragma solidity >=0.5.11;
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

/// @title A ticket system
/// @author Abdellah Choukod
/// @notice You can make and book tickets with this contract
/// @dev There is one oracle used, the source is listed in the import-stament above
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

    function __callback(string memory result ) public {
        require(msg.sender == oraclize_cbAddress());
        name = result;
    }

    Ticket[] public ticketArray;
    mapping (address => Ticket) public lastTicketBooked;
    event ticketIsBooked(address receiver, uint id, string eventName);
    event ticketIsMade(address receiver, uint id, string eventName);

/// @author Abdellah Choukod
/// @notice You can make a ticket with this function that will be stored within the array
/// @dev You can set a timer on this function, so that there will be not made much tickets at the same moment
/// @param eventName The name of the event
/// @param eventPlace The name of the place where the event will take place
/// @return nothing
    function makeTicket(string memory eventName, string memory eventPlace) public {
        Ticket memory ticket = Ticket(ticketArray.length, eventName, eventPlace, false);
        ticketArray.push(ticket);
        emit ticketIsMade(msg.sender, ticket.id, ticket.eventName);
    }

/// @author Abdellah Choukod
/// @notice You can book a ticket with this function
/// @dev This function is enabled every minute, so after a booking, you will need to wait a minute for the next booking
/// @param id id of the ticket
/// @return nothing
    function bookTicket(uint id) public enabledEvery(1 minutes) {
        require(id >= 0, "id must be equal or larger than 0");
        Ticket storage ticket = ticketArray[id];
        ticket.booked = true;
        emit ticketIsBooked(msg.sender, ticket.id, ticket.eventName);
        lastTicketBooked[msg.sender] = ticket;
    }

/// @author Abdellah Choukod
/// @notice You can see the details of the lasted booked ticket with this function
/// @dev This function is a view, because it is just returning an attribute
/// @return The name of the event
    function getLatestTicketBookedDetails() public view returns (string memory eventName)  {
        Ticket memory ticket = lastTicketBooked[msg.sender];
        return (ticket.eventName);
    }

/// @author Abdellah Choukod
/// @notice The length of the TicketArray will be returned
/// @dev It is just a view
/// @return the length of the array
     function getLengthOfArray() public view returns (uint length) {
        return (ticketArray.length);
    }
    }

