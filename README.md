# AgriPredict - Blockchain-Enabled Agricultural Marketplace

A comprehensive platform that combines **AI-powered price prediction**, **demand forecasting**, and **blockchain transparency** to revolutionize agricultural supply chains. This system connects farmers, buyers, and logistics providers through a secure, immutable ledger.

---

## 🌟 Project Overview

**AgriPredict** is a full-stack agricultural insights and marketplace platform that leverages:
- **Machine Learning** for price prediction and demand forecasting
- **Blockchain Technology** (MetaMask integration) for secure, transparent transactions
- **Real-time Analytics** to help farmers make data-driven decisions
- **End-to-End Traceability** from farm to buyer

### Key Features

#### 🌾 For Farmers
- **AI Price Suggestions**: Get ML-powered price recommendations based on crop type, quality, location, and market conditions
- **Demand Forecasting**: Predict market demand to optimize planting and harvesting decisions
- **Direct Listing**: List crops for sale with blockchain-verified provenance
- **Wallet Integration**: Connect MetaMask to authenticate listings with your on-chain address

#### 🛒 For Buyers
- **Transparent Marketplace**: Browse crops with AI-suggested prices and farmer-set selling prices
- **Secure Payments**: Use MetaMask for blockchain-verified transactions
- **Provenance Tracking**: Verify crop origin and quality through immutable blockchain records
- **Smart Contract Settlement**: Payments secured in escrow until delivery verification

#### 🚚 For Logistics
- **Order Management**: Track deliveries from pickup to final delivery
- **Blockchain Verification**: View transaction hashes (TX Hash) to verify order authenticity
- **Status Updates**: Update order status through the delivery pipeline
- **Wallet Authentication**: Connect MetaMask for verified logistics operations

---

## 🏗️ Architecture

### High-Level System Design
The platform follows a three-layer blockchain architecture:

1. **Blockchain Core Layer**: Immutable storage of crop listings, quality grades, and transaction records
2. **Interaction Layer**: Smart contracts govern payment escrow and settlement conditions
3. **Shared Ledger**: Real-time synchronization of all stakeholder interactions

### Technology Stack

#### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn-ui** for UI components
- **Framer Motion** for animations
- **MetaMask** for Web3 wallet integration

#### Backend
- **FastAPI** for RESTful API endpoints
- **Python 3.x** for ML model serving
- **Scikit-learn** for machine learning models
- **Pandas & NumPy** for data processing
- **Uvicorn** as ASGI server

#### Machine Learning
- **Price Prediction Model**: Trained on historical agricultural pricing data
- **Demand Forecasting Model**: Predicts market demand based on seasonal and historical trends

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **Python 3.8+** with pip
- **MetaMask** browser extension - [Download here](https://metamask.io/download/)

### Installation

#### 1. Clone the Repository
```bash
git clone <YOUR_GIT_URL>
cd agri-insights-2026
```

#### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will be available at `http://localhost:5173`

#### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
python main.py
```
The backend API will be available at `http://localhost:8000`

---

## 🔐 Blockchain Integration

### MetaMask Setup
1. Install the MetaMask browser extension
2. Create or import a wallet
3. Connect to a test network (e.g., Sepolia, Goerli) for testing

### Wallet Features by Role

#### Farmers
- Connect wallet to authenticate crop listings
- Real wallet address is stored with each product listing
- Provides proof of origin for buyers

#### Buyers
- Connect wallet to initiate purchases
- Simulated blockchain transactions with real MetaMask interaction
- Transaction hash (TX Hash) generated for each purchase

#### Logistics
- Connect wallet for verified operations
- View TX Hash for each order to verify blockchain record
- Ensures delivery of authentic, verified products

---



For questions or issues, please open an issue in the GitHub repository.

---

**Built with ❤️ for farmers, by innovators**
