pragma solidity >=0.4.22 <0.9.0;

import "./IAdministrator.sol";


contract ReportCard {



    mapping ( uint => string) ReportCards ; 

  uint sequence;
  address AdministratorAddress;
  event reportCardAdded(uint sequence);
  event reportCardUpdated(uint sequence );


  constructor(address admin ) public {
  
    AdministratorAddress = admin;
    sequence = 1254212354;
  }


  modifier onlyTeacher() {
      require(IAdministrator(AdministratorAddress).isTeacher(msg.sender), "only teachers can do this action");
      _;
  }



  function addReportCard(string memory a ) public onlyTeacher {
    sequence = sequence + 1;
    ReportCards[sequence] = a ;
    emit reportCardAdded(sequence);
  }

  function getReportCard (uint b ) public view returns (string memory ){
      return ReportCards[b];
  }

  function updateReportCard(string memory a , uint s) public onlyTeacher {
    ReportCards[s] = a ;
    emit reportCardUpdated(s);
  }

  
}