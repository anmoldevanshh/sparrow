# Sparrow (Still in progress)

**Sparrow** is a decentralized voting application designed to leverage blockchain technology for secure, transparent, and immutable voting processes. With Sparrow, elections and decision-making processes are modernized, ensuring trust and reliability in the results.

## Features

- **Decentralized Voting**: Utilize blockchain technology to ensure each vote is secure, anonymous, and tamper-proof.
- **Real-Time Results**: Track and view results in real-time, with data integrity guaranteed by the blockchain.
- **User-Friendly Interface**: An intuitive and sleek user interface developed with React to provide a seamless user experience.
- **Multi-Platform Support**: Accessible on various devices, from desktops to smartphones.
- **Secure Authentication**: Leverages cryptographic protocols to ensure voter identity and prevent fraud.

## Getting Started

### Prerequisites

To run this project locally, you will need:

- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **MetaMask**: A crypto wallet & gateway to blockchain apps

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/anmoldvh/Sparrow.git
   cd sparrow
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```


## Usage

1. **Connect Your Wallet**: Click on the "Connect Wallet" button to connect your MetaMask wallet.
2. **Create or Join an Election**: As an election organizer, create a new election. As a voter, join an ongoing election using a unique election ID.
3. **Cast Your Vote**: Select your candidate and cast your vote. Rest assured, your vote is secure and anonymous.
4. **View Results**: Once voting is completed, view the results in real-time with full transparency.

## Technology Stack

- **Frontend**: React, Vite
- **Backend**: Solidity (Smart Contracts)
- **Blockchain**: Ethereum (Ropsten Testnet)
- **Storage**: IPFS (InterPlanetary File System) for decentralized data storage

## Smart Contracts

Smart contracts are written in Solidity and deployed on the Ethereum blockchain. For more details on the contracts, check the `contracts/` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the [Ethereum](https://ethereum.org/) and [MetaMask](https://metamask.io/) communities for their support and resources.
