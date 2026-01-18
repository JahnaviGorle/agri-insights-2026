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

## 📊 API Endpoints

### Price Prediction
**POST** `/predict_price`

Request body:
```json
{
  "date": "2026/01/18",
  "commodity_group": "Millet",
  "crop_type": "Jowar (Sorghum)",
  "state_name": "Andhra Pradesh",
  "market_location": "Adoni",
  "quantity_kg": 100.0,
  "quality_grade": 3,
  "season": "Kharif",
  "transport_cost": 20.0,
  "demand_index": 0.5
}
```

Response:
```json
{
  "predicted_price": 45.67
}
```

### Demand Forecasting
**POST** `/forecast_demand`

Request body:
```json
{
  "date": "2026/01/18",
  "commodity_group": "Millet",
  "crop_type": "Jowar (Sorghum)",
  "state_name": "Andhra Pradesh",
  "market_location": "Adoni",
  "season": "Kharif",
  "total_quantity_sold": 5000.0,
  "avg_price_per_kg": 45.0,
  "historical_demand_7d": 4500.0,
  "price_trend_7d": 2.5
}
```

Response:
```json
{
  "demand_score": 0.75,
  "demand_level": "High"
}
```

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

## 📁 Project Structure

```
agri-insights-2026/
├── src/
│   ├── components/
│   │   └── dashboard/
│   │       ├── FarmerDashboard.tsx    # Farmer interface
│   │       ├── BuyerDashboard.tsx     # Buyer marketplace
│   │       └── LogisticsDashboard.tsx # Logistics tracking
│   ├── services/
│   │   └── api.ts                     # API service layer
│   ├── pages/
│   │   └── Dashboard.tsx              # Main dashboard router
│   └── App.tsx                        # Application entry point
├── backend/
│   ├── main.py                        # FastAPI server
│   ├── app.py                         # Streamlit app (optional)
│   ├── price_model.pkl                # Trained price prediction model
│   ├── demand_model.pkl               # Trained demand forecasting model
│   └── requirements.txt               # Python dependencies
└── README.md
```

---

## 🎯 Key Accomplishments

### ✅ Completed Features
1. **Backend Integration**: Connected React frontend to FastAPI backend for real-time ML predictions
2. **Price Prediction**: Farmers receive AI-powered price suggestions based on multiple factors
3. **Demand Forecasting**: Market demand predictions help optimize crop planning
4. **Seamless Workflow**: Farmers can get price suggestions and immediately list crops for sale
5. **Data Synchronization**: All dropdown options synchronized with backend datasets
6. **Global MetaMask Integration**: Wallet connectivity across all three user roles
7. **Blockchain Transparency**: TX Hash visibility for logistics verification
8. **Responsive UI**: Premium design with smooth animations and intuitive navigation

### 🔄 Data Flow
1. Farmer inputs crop details → Backend ML model predicts price
2. Farmer lists crop with suggested/custom price → Stored with wallet address
3. Buyer views listing → Connects wallet → Initiates purchase via MetaMask
4. Transaction creates TX Hash → Order sent to logistics
5. Logistics views order with TX Hash → Verifies on blockchain → Updates delivery status

---

## 🧪 Testing the Application

### End-to-End Test Flow
1. **Start both servers** (frontend and backend)
2. **Open browser** to `http://localhost:5173`
3. **Install MetaMask** if not already installed
4. **Test as Farmer**:
   - Connect wallet
   - Get price suggestion
   - List crop for sale
5. **Test as Buyer**:
   - Connect wallet
   - View listed crops
   - Purchase a crop (approve MetaMask transaction)
6. **Test as Logistics**:
   - Connect wallet
   - View order with TX Hash
   - Update delivery status

---

## 🛠️ Development

### Available Scripts

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

#### Backend
```bash
python main.py       # Start FastAPI server
uvicorn main:app --reload  # Alternative with auto-reload
```

---

## 🌐 Deployment

### Frontend
Simply open your Lovable project and click on **Share → Publish**.

### Backend
Deploy the FastAPI backend to platforms like:
- **Heroku**
- **AWS EC2**
- **Google Cloud Run**
- **DigitalOcean App Platform**

Ensure environment variables are set for production:
- API endpoints
- CORS origins
- Model file paths

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Machine Learning Models**: Trained on agricultural pricing datasets
- **Blockchain Architecture**: Inspired by supply chain transparency best practices
- **UI/UX Design**: Built with modern web design principles

---

## 📞 Support

For questions or issues, please open an issue in the GitHub repository.

---

**Built with ❤️ for farmers, by innovators**
