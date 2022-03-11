

const Administrators = artifacts.require("Administrators");
const ReportCard = artifacts.require("ReportCard");


const truffleAssert = require('truffle-assertions');



contract("ReportCard"  , function(accounts) {


    describe("test functions for ReportCard" , function() {

    var AdministratorsContract ;
    var ReportCardContract ;

        beforeEach( async function() {

            AdministratorsContract =  await Administrators.new({from: accounts[0]});
            await AdministratorsContract.addTeacher(accounts[1] ,  {from: accounts[0]})
          
           ReportCardContract = await ReportCard.new(AdministratorsContract.address , {from: accounts[0]})
        });


         it("test add ReportCard by teacher" , async function() {
             let report = "alice xxx blockchain 20"
             let  result = await ReportCardContract.addReportCard(report,{from: accounts[1]})
             let getReport = await ReportCardContract.getReportCard(result.logs[0].args.sequence.toString());
             assert.equal(getReport, report);
        });

       
            it("test add ReportCard by non teacher" , async function() {
                let report = "alice xxx blockchain 20"
                await truffleAssert.reverts(
                    ReportCardContract.addReportCard(report ,{from: accounts[2]})
                ,"only teachers can do this action");
                
            });



            
         it("test update ReportCard by teachers" , async function() {
            let report = "alice xxx blockchain 20 ";
            let nbreBloc = 1254212355;
            let  result = await ReportCardContract.updateReportCard(report , nbreBloc , {from: accounts[1]})
            let getReport = await ReportCardContract.getReportCard(result.logs[0].args.sequence.toString());
            assert.equal(getReport, report);
       });

      
           it("test update ReportCard by non teacher" , async function() {
               let report = "alice xxx blocckhain 18";
               let nbreBloc = 1254212355 ;
               await truffleAssert.reverts(
                ReportCardContract.updateReportCard(report , nbreBloc, {from: accounts[2]})
               ,"only teachers can do this action");
               
           });



    })
});


