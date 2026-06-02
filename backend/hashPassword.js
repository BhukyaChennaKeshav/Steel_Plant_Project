const bcrypt = require("bcrypt");

async function generateHashes() {

  console.log("100100:", await bcrypt.hash("12345", 10));

  console.log("100102:", await bcrypt.hash("12321", 10));

  console.log("100103:", await bcrypt.hash("34543", 10));

  console.log("100104:", await bcrypt.hash("12345", 10));

  console.log("200100:", await bcrypt.hash("54321", 10));

}

generateHashes();