

const Administrators = artifacts.require("Administrators");


const truffleAssert = require('truffle-assertions');


contract("Administrators" , function(accounts) {

    describe("test functions of administrator" , function() {

        var AdministratorsContract;

        beforeEach( async function() {

            AdministratorsContract = await Administrators.new({from: accounts[0]});
  
        });


         it("test add admin from admin" , async function() {
            await AdministratorsContract.addAdmin(accounts[1] ,  {from: accounts[0]})
           let isAdmin = await AdministratorsContract.isAdmin(accounts[1]);
           assert.equal(isAdmin, true);
        });


        it("test add admin from non admin user" , async function() {
            await truffleAssert.reverts(
               AdministratorsContract.addAdmin(accounts[1] ,  {from: accounts[2]})
               ,"only admin can do this action");
            
        });

          it("test remove Admin from admin" , async function() {
            await AdministratorsContract.removeAdmin(accounts[1] ,  {from: accounts[0]})
            let isAdmin = await AdministratorsContract.isAdmin(accounts[1]);
           assert.equal(isAdmin, false);
        });


            it("test remove Admin from non admin" , async function() {
                await truffleAssert.reverts(
                AdministratorsContract.removeAdmin(accounts[1] ,  {from: accounts[2]})
                ,"only admin can do this action");
            });
        

        it("test add teacher from admin" , async function() {
            await AdministratorsContract.addTeacher(accounts[1] ,  {from: accounts[0]})
            let isTeacher = await AdministratorsContract.isTeacher(accounts[1]);
            assert.equal(isTeacher, true);
        });

        it("test add teacher from non admin user" , async function() {
            await truffleAssert.reverts(
            AdministratorsContract.addTeacher(accounts[1] ,  {from: accounts[2]})
            ,"only admin can do this action");
        });


        it("test remove teacher from admin" , async function() {
            await AdministratorsContract.removeTeacher(accounts[1] ,  {from: accounts[0]})
            let isTeacher = await AdministratorsContract.isTeacher(accounts[1]);
           assert.equal(isTeacher, false);
        });

        it("test remove teacher from non admin" , async function() {
            await truffleAssert.reverts(
            AdministratorsContract.removeTeacher(accounts[1] ,  {from: accounts[2]})
            ,"only admin can do this action");
        });


    })
});



