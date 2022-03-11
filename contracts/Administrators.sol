pragma solidity >= 0.5.0 < 0.7.0;


import "./IAdministrator.sol";

contract Administrators is IAdministrator  {


  mapping( address => bool) teachers;
  mapping( address => bool) admins;


  
  constructor() public {
   admins [msg.sender]=true;
  }

  modifier onlyAdmin() {
      require(isAdmin(msg.sender), "only admin can do this action");
      _;
  }

  function addTeacher(address a ) public onlyAdmin{
    teachers[a] = true;
  }

  function isTeacher(address a ) public view returns (bool)  {
    return teachers[a];
  }

  function removeTeacher (address a ) public onlyAdmin{
    teachers[a] = false ;
  }

   function addAdmin(address a) public onlyAdmin {
    admins[a] = true;
  }

  function isAdmin(address a ) public view returns (bool) {
    return admins[a];
  }

  function removeAdmin (address a ) public onlyAdmin{
    admins[a] = false ;
  }

    

  
}