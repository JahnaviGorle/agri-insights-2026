from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os
import datetime

app = FastAPI()

# --- CORS Configuration ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all. In production, specify the frontend URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_DIR = 'models'
PRICE_MODEL_PATH = os.path.join(MODEL_DIR, 'price_model.pkl')
PRICE_ENCODERS_PATH = os.path.join(MODEL_DIR, 'price_encoders.pkl')
DEMAND_MODEL_PATH = os.path.join(MODEL_DIR, 'demand_model.pkl')
DEMAND_ENCODERS_PATH = os.path.join(MODEL_DIR, 'demand_encoders.pkl')

# --- Shared Configuration ---
PRICE_FEATURES = [
    'commodity_group', 'crop_type', 'state_name', 'market_location', 
    'quantity_kg', 'quality_grade', 'season', 'transport_cost', 
    'demand_index', 'month', 'day_of_week'
]

DEMAND_FEATURES = [
    'commodity_group', 'crop_type', 'state_name', 'market_location', 'season', 
    'total_quantity_sold', 'avg_price_per_kg', 'historical_demand_7d', 'price_trend_7d', 
    'estimated_production_kg', 'policy_support_score', 'festival_flag', 'weather_index', 
    'month', 'day_of_week'
]

# --- Models and Encoders loading ---
def load_artifacts(model_path, encoder_path):
    try:
        model = joblib.load(model_path)
        encoders = joblib.load(encoder_path)
        return model, encoders
    except Exception as e:
        print(f"Error loading {model_path}: {e}")
        return None, None

p_model, p_encoders = load_artifacts(PRICE_MODEL_PATH, PRICE_ENCODERS_PATH)
d_model, d_encoders = load_artifacts(DEMAND_MODEL_PATH, DEMAND_ENCODERS_PATH)

def safe_transform(encoder, value):
    try:
        return encoder.transform([value])[0]
    except:
        # Fallback for unknown categories
        return 0

def map_demand_level(value):
    if value <= 100:
        return "Low"
    elif value <= 3960:
        return "Medium"
    else:
        return "High"

# --- Request Models ---
class PricePredictRequest(BaseModel):
    date: str  # YYYY/MM/DD
    commodity_group: str
    crop_type: str
    state_name: str
    market_location: str
    quantity_kg: float
    quality_grade: int
    season: str
    transport_cost: float
    demand_index: float

class DemandForecastRequest(BaseModel):
    date: str # YYYY/MM/DD
    commodity_group: str
    crop_type: str
    state_name: str
    market_location: str
    season: str
    total_quantity_sold: float
    avg_price_per_kg: float
    historical_demand_7d: float
    price_trend_7d: float
    estimated_production_kg: float
    policy_support_score: float
    festival_flag: int
    weather_index: float

@app.get("/")
def read_root():
    return {"message": "Agri Predict API is running"}

@app.post("/predict_price")
def predict_price(req: PricePredictRequest):
    if not p_model or not p_encoders:
        raise HTTPException(status_code=500, detail="Price model not loaded")
    
    try:
        dt = datetime.datetime.strptime(req.date, "%Y/%m/%d")
    except:
        dt = datetime.date.today()

    input_data = {
        'commodity_group': safe_transform(p_encoders['commodity_group'], req.commodity_group),
        'crop_type': safe_transform(p_encoders['crop_type'], req.crop_type),
        'state_name': safe_transform(p_encoders['state_name'], req.state_name),
        'market_location': safe_transform(p_encoders['market_location'], req.market_location),
        'quantity_kg': req.quantity_kg,
        'quality_grade': req.quality_grade,
        'season': safe_transform(p_encoders['season'], req.season),
        'transport_cost': req.transport_cost,
        'demand_index': req.demand_index,
        'month': dt.month,
        'day_of_week': dt.weekday()
    }
    
    features = pd.DataFrame([input_data])[PRICE_FEATURES]
    prediction = p_model.predict(features)[0]
    return {"predicted_price": round(float(prediction), 2)}

@app.post("/forecast_demand")
def forecast_demand(req: DemandForecastRequest):
    if not d_model or not d_encoders:
        raise HTTPException(status_code=500, detail="Demand model not loaded")
    
    try:
        dt = datetime.datetime.strptime(req.date, "%Y/%m/%d")
    except:
        dt = datetime.date.today()

    input_data = {
        'commodity_group': safe_transform(d_encoders['commodity_group'], req.commodity_group),
        'crop_type': safe_transform(d_encoders['crop_type'], req.crop_type),
        'state_name': safe_transform(d_encoders['state_name'], req.state_name),
        'market_location': safe_transform(d_encoders['market_location'], req.market_location),
        'season': safe_transform(d_encoders['season'], req.season),
        'total_quantity_sold': req.total_quantity_sold,
        'avg_price_per_kg': req.avg_price_per_kg,
        'historical_demand_7d': req.historical_demand_7d,
        'price_trend_7d': req.price_trend_7d,
        'estimated_production_kg': req.estimated_production_kg,
        'policy_support_score': req.policy_support_score,
        'festival_flag': req.festival_flag,
        'weather_index': req.weather_index,
        'month': dt.month,
        'day_of_week': dt.weekday()
    }
    
    features = pd.DataFrame([input_data])[DEMAND_FEATURES]
    prediction = d_model.predict(features)[0]
    category = map_demand_level(prediction)
    
    return {
        "demand_score": round(float(prediction), 2),
        "demand_level": category
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
