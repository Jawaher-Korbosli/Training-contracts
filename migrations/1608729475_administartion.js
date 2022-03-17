
const Administrators = artifacts.require("Administrators");
const ReportCard = artifacts.require("ReportCard");

module.exports = async function(_deployer) {
 

   await _deployer.deploy(Administrators);
  
   let admin = await Administrators.deployed();

  await _deployer.deploy(ReportCard , admin.address);
};
