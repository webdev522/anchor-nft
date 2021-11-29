const anchor = require("@project-serum/anchor");
const fs = require("fs");

async function test1() {
  console.log("starting test...");
  const { Wallet, Provider, Program } = anchor;
  const { Connection, Keypair, PublicKey, SystemProgram } = anchor.web3;
  const conn = new Connection("https://api.devnet.solana.com", "confirmed");
  const owner = Keypair.fromSecretKey(
    Uint8Array.from([
      235, 203, 126, 118, 109, 5, 152, 32, 47, 85, 210, 182, 73, 119, 229, 223,
      78, 48, 202, 84, 150, 20, 243, 92, 63, 253, 213, 48, 58, 10, 254, 79, 13,
      39, 19, 213, 137, 146, 180, 20, 34, 214, 163, 51, 243, 118, 165, 51, 148,
      100, 163, 232, 189, 145, 175, 96, 33, 78, 69, 235, 181, 163, 55, 197,
    ])
  );

  const pool = Keypair.generate();
  const saleMint = new PublicKey("So11111111111111111111111111111111111111112");

  const wallet = new Wallet(owner);
  const provider = new Provider(conn, wallet, Provider.defaultOptions());

  const idl = JSON.parse(fs.readFileSync("./target/idl/nft.json", "utf8"));
  const programId = new PublicKey(
    "H1JzaL883988sVHxDTwMek7yi57hF8Xoaj5ktHizcJVT"
  );
  const program = new Program(idl, programId, provider);

  await program.rpc.initPool({
    accounts: {
      pool: pool.publicKey,
      owner: owner.publicKey,
      saleMint,
      systemProgram: SystemProgram.programId,
    },
    signers: [owner, pool],
  });

  console.log("end");
}

test1();
