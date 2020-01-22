pragma solidity >=0.4.0 <0.6.0;
      import "remix_tests.sol"; // this import is automatically injected by Remix.
      import "TicketSystem.sol";
      
      // file name has to end with '_test.sol'
      contract test_1 {
        TicketSystem ticketsystem;

        function beforeAll() public {
          ticketsystem = new TicketSystem();
        }

        function testLengthOfArray() public {
        Assert.equal(ticketsystem.getLengthOfArray(), uint(0), "This array should contain no elements");
        }
        
        function testIfTicketIsBooked() public {
        ticketsystem.makeTicket("TestEvent", "HHS");
        ticketsystem.bookTicket(0);
        Assert.equal(ticketsystem.getLatestTicketBookedDetails(), string("TestEvent"), "This name of the event should be: 'TestEvent'.");
        }
        
        function testLengthAfterCreation() public {
        Assert.equal(ticketsystem.getLengthOfArray(), uint(1), "This array should contain only one element");
        }
        
        function makeTwoTicketsAndCheckTheLatest() public {
        ticketsystem.makeTicket("TestEvent2", "HHS2");
        ticketsystem.makeTicket("TestEvent3", "HHS3");
        ticketsystem.bookTicket(2);
        Assert.equal(ticketsystem.getLatestTicketBookedDetails(), string("TestEvent"), "This name of the event should be: 'TestEvent2', because you can only book 1 ticket every minute.");
        }
        
        function bookTheSecondAndCheckTheLengthAgain() public {
        ticketsystem.bookTicket(2);
        Assert.equal(ticketsystem.getLengthOfArray(), uint(3), "This array should contain only one element");
      
        }
        
        
    
    
      }

