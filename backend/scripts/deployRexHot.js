const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  let rexHotToken;

  const treasuryAddress = "0x72C90da5748739D640DEbBf19280ca51856A0177";

  const RexHot = await hre.ethers.getContractFactory("RexHot");

  //rexHot token
  rexHotToken = await hre.ethers.getContractFactory("RexHotToken");

  console.log("\n========= Deploying RexHotToken Contract ============ \n");

  rexHotToken = await rexHotToken.deploy();
  await rexHotToken.waitForDeployment();

  console.log("rexHotToken deployed to:", rexHotToken.target);

  //deploy rexHot token
  console.log("\n========= Deploying RexHot Contract ============ \n");

  //deploy rexHot core with necessary constructor values
  const rexHot = await RexHot.deploy(rexHotToken.target, treasuryAddress);
  await rexHot.waitForDeployment();

  console.log("RexHot deployed to:", rexHot.target);

  //testing contract functions
  const reg = await rexHot.register();
  await rexHot.createPost("This is my first Post");
  await rexHot.createPost("This is my second Post");
  await rexHot.createPost("This is my third Post");
  await rexHot.createPost("This is my fourth Post");
  await rexHot.createPost("This is my fifth Post");
  const getPost = await rexHot.getPosts(0, 10);

  console.log("getting post onchain");
  console.log(getPost);

  //getting full user details
  //const userDetails = await ink.getUser(
  //  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  // );
  //console.log(userDetails);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
