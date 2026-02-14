import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Buffer } from 'buffer';
window.Buffer = Buffer;
import './index.css'
import App from './App.jsx'
import { WalletConnectionProvider } from './WalletConnectionProvider';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <WalletConnectionProvider>
            <App />
        </WalletConnectionProvider>
    </StrictMode>,
)
