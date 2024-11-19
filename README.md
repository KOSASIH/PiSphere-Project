# PiSphere-Project
PiSphere-Project is the official repository for the PiSphere decentralized ecosystem, designed to empower users through a community-driven, multi-layer blockchain architecture. This repository contains the core codebase, smart contracts, governance mechanisms, and tools necessary for building and maintaining the PiSphere network. Join us in creating a fully decentralized platform that prioritizes user autonomy, security, and innovation in the digital currency space. Contribute, collaborate, and help shape the future of decentralized finance and community engagement!

# PiSphere Project

## Overview
PiSphere is a decentralized ecosystem designed to empower users through a community-driven blockchain platform. This project aims to create a secure, scalable, and user-friendly environment for digital currency and decentralized applications (dApps). 

## Features
- **Decentralized Governance**: Managed through a DAO (Decentralized Autonomous Organization) with voting mechanisms.
- **Multi-Signature Wallet**: Enhanced security for governance proposals and fund management.
- **Upgradable Smart Contracts**: Utilize proxy patterns to allow for seamless contract upgrades.
- **Real-Time Updates**: WebSocket integration for real-time notifications on transactions and proposals.
- **Progressive Web App (PWA)**: Offline capabilities and improved user experience.
- **GraphQL API**: Efficient data fetching and manipulation.
- **Oracles Integration**: Fetch real-world data for smart contracts, enabling features like price feeds.
- **Automated Testing**: Continuous integration with automated testing for both smart contracts and application code.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Truffle (for smart contract development)
- MongoDB (for the backend)

### Installation
1. **Clone the repository:**
   ```bash
   1 git clone https://github.com/KOSASIH/PiSphere-Project.git
   2 cd PiSphere-Project
   ```

2. **Install dependencies**:

- For the client:
   ```bash
   1 cd src/client
   2 npm install
   ```
   
3. **For the server**:
   ```bash
   1 cd ../server
   2 npm install
   ```
   
3. **Set up environment variables**: Create a .env file in the root directory and add the following:

   ```plaintext
   1 DATABASE_URL=mongodb://localhost:27017/pisphere
   2 REACT_APP_SOCKET_URL=http://localhost:5000
   ```
   
4. **Deploy Smart Contracts**:

   ```bash
   1 truffle migrate --network development

5. **Run the Server**:

   ```bash
   1 cd server
   2 npm start
   ```
   
6. **Run the Client**:

   ```bash
   1 cd ../client
   2 npm start
   ```

## Usage

- Access the application at http://localhost:3000.
- Interact with the DAO to create proposals and vote.
- Use the multi-signature wallet for secure governance.

## Testing
- Run tests for smart contracts:
   ```bash
   1 truffle test
   ```

- Run tests for the server:
   ```bash
   1 cd server
   2 npm test
   ```
   
## Documentation

- API documentation is available in the docs/API-docs directory.
- User guides can be found in the docs/user-guide.md.

## Contributing
Contributions are welcome! Please read the CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
Inspired by the principles of decentralization and community governance.
Thanks to the open-source community for their invaluable contributions.

