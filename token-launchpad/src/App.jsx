import './App.css'
import { TokenLaunchpad } from './TokenLaunchpad';
// wallet adapter imports
// wallet adapter imports
import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  return (
    <div style={{ width: "100vw" }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 20
      }}>
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
      <TokenLaunchpad />
    </div>
  )
}

export default App