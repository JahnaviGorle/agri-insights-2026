
const API_BASE_URL = "http://localhost:8000";

export interface PricePredictRequest {
    date: string; // YYYY/MM/DD
    commodity_group: string;
    crop_type: string;
    state_name: string;
    market_location: string;
    quantity_kg: number;
    quality_grade: number;
    season: string;
    transport_cost: number;
    demand_index: number;
}

export interface PricePredictResponse {
    predicted_price: number;
}

export interface DemandForecastRequest {
    date: string; // YYYY/MM/DD
    commodity_group: string;
    crop_type: string;
    state_name: string;
    market_location: string;
    season: string;
    total_quantity_sold: number;
    avg_price_per_kg: number;
    historical_demand_7d: number;
    price_trend_7d: number;
    estimated_production_kg: number;
    policy_support_score: number;
    festival_flag: number; // 0 or 1
    weather_index: number;
}

export interface DemandForecastResponse {
    demand_score: number;
    demand_level: "Low" | "Medium" | "High";
}

export const predictPrice = async (data: PricePredictRequest): Promise<PricePredictResponse> => {
    const response = await fetch(`${API_BASE_URL}/predict_price`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to predict price");
    }

    return response.json();
};

export const forecastDemand = async (data: DemandForecastRequest): Promise<DemandForecastResponse> => {
    const response = await fetch(`${API_BASE_URL}/forecast_demand`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to forecast demand");
    }

    return response.json();
};
