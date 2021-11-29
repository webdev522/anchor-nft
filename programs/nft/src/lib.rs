use borsh::{BorshSerialize, BorshDeserialize};
use {
    anchor_lang:: {
        prelude::*,
        solana_program:: {
            program_pack::Pack
        }
    },
    spl_token:: state
};

declare_id!("2x19pA4kj6yVaz9ESY9DtHtLvNz3fzpWrBamDXnfcqsY");

pub const POOL_SIZE: usize = 32 + 1 + 32;

#[program]
pub mod nft {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }

    pub fn init_pool(ctx: Context<InitPool>) -> ProgramResult {
        let pool = &mut ctx.accounts.pool;
        let sale_mint: state::Mint = state::Mint::unpack_from_slice(&ctx.accounts.sale_mint.data.borrow())?;
        pool.owner = *ctx.accounts.owner.key;
        pool.presale_live = false;
        pool.sale_mint = *ctx.accounts.sale_mint.key;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct InitPool<'info> {
    #[account(init, payer = owner, space = 8 + POOL_SIZE)]
    pool: ProgramAccount<'info, Pool>,
    
    #[account(mut, signer)]
    owner: AccountInfo<'info>,
    
    #[account(owner=spl_token::id())]
    sale_mint: AccountInfo<'info>,

    system_program: Program<'info, System>
}

#[account]
pub struct Pool {
    pub owner: Pubkey,
    pub presale_live: bool,
    pub sale_mint: Pubkey
}