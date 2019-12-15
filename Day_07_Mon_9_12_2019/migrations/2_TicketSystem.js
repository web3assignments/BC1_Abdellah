const Migrations = artifacts.require("TicketSystem");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
