import React from 'react';
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint } from "@solana/spl-token";

export function TokenLaunchpad() {
    const { connection } = useConnection();
    const wallet = useWallet();

    const [mintAddress, setMintAddress] = React.useState(null);

    async function createToken() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }

        const name = document.getElementById('name').value;
        const symbol = document.getElementById('symbol').value;
        const imageUrl = document.getElementById('imageUrl').value;
        const initialSupply = document.getElementById('initialSupply').value;

        try {
            const lamports = await getMinimumBalanceForRentExemptMint(connection);
            const mintKeypair = Keypair.generate();
            const programId = TOKEN_PROGRAM_ID;

            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintKeypair.publicKey,
                    space: MINT_SIZE,
                    lamports,
                    programId,
                }),
                createInitializeMint2Instruction(
                    mintKeypair.publicKey,
                    9,
                    wallet.publicKey,
                    wallet.publicKey,
                    programId
                )
            );

            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            transaction.partialSign(mintKeypair);

            await wallet.sendTransaction(transaction, connection);
            console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
            setMintAddress(mintKeypair.publicKey.toBase58());
        } catch (error) {
            console.error(error);
            alert("Error creating token: " + error.message);
        }
    }

    return <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input id='name' className='inputText' type='text' placeholder='Name'></input> <br />
        <input id='symbol' className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input id='imageUrl' className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input id='initialSupply' className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken} className='btn'>Create a token</button>

        {mintAddress && (
            <div className="success-message" style={{ marginTop: '20px', padding: '20px', background: 'rgba(0, 255, 0, 0.1)', borderRadius: '10px', border: '1px solid #00ff00', textAlign: 'center' }}>
                <h3 style={{ color: '#00ff00', margin: 0 }}>Token Created!</h3>
                <p style={{ color: '#fff', wordBreak: 'break-all', marginTop: '10px' }}>Mint: {mintAddress}</p>
            </div>
        )}
    </div>
}
