import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Nft } from "../target/types/nft";

describe("nft", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Nft as Program<Nft>;
  const creator = anchor.web3.Keypair.generate();
  const pool = anchor.web3.Keypair.generate();
  const saleMint = new anchor.web3.PublicKey(
    "So11111111111111111111111111111111111111112"
  );

  it("Is initialized!", async () => {
    // Add your test here.
    // const tx = await program.rpc.initialize({});
    // console.log("Your transaction signature", tx);
    const tx = await program.rpc.initPool({
      accounts: {
        pool: pool.publicKey,
        owner: creator.publicKey,
        saleMint,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [creator, pool],
    });
    console.log("Your transaction signature", tx);
  });
});
