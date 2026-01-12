import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const marketLocations = ["Adoni", "Kurnool", "Anantapur", "Guntur", "Vijayawada", "Raichur", "Bellary"];
const commodityGroups = ["Millet", "Oilseed", "Pulses", "Cereals"];
const seasons = ["Kharif", "Rabi", "Summer"];
const cropTypes = {
  Millet: ["Bajra (Pearl Millet/Cumbu)", "Ragi (Finger Millet)", "Jowar (Sorghum)", "Foxtail Millet"],
  Oilseed: ["Groundnut", "Sunflower", "Sesame", "Safflower", "Castor"],
  Pulses: ["Red Gram", "Black Gram", "Green Gram", "Bengal Gram"],
  Cereals: ["Rice", "Wheat", "Maize"],
};
const states = ["Andhra Pradesh", "Karnataka", "Tamil Nadu", "Telangana", "Maharashtra"];

const PricePredictionForm = () => {
  const [date, setDate] = useState("2026/01/12");
  const [marketLocation, setMarketLocation] = useState("Adoni");
  const [qualityGrade, setQualityGrade] = useState(1);
  const [commodityGroup, setCommodityGroup] = useState<keyof typeof cropTypes>("Millet");
  const [season, setSeason] = useState("Kharif");
  const [transportCost, setTransportCost] = useState(20.0);
  const [cropType, setCropType] = useState("Bajra (Pearl Millet/Cumbu)");
  const [quantity, setQuantity] = useState(100.0);
  const [demandIndex, setDemandIndex] = useState([1.0]);
  const [state, setState] = useState("Andhra Pradesh");
  const [prediction, setPrediction] = useState<number | null>(null);

  const handlePredict = () => {
    // Mock prediction calculation
    const basePrice = 2500 + Math.random() * 1000;
    const seasonFactor = season === "Kharif" ? 1.1 : season === "Rabi" ? 1.05 : 0.95;
    const qualityFactor = 1 + (qualityGrade - 1) * 0.05;
    const demandFactor = 0.8 + demandIndex[0] * 0.2;
    setPrediction(Math.round(basePrice * seasonFactor * qualityFactor * demandFactor));
  };

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Price Prediction</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Date */}
        <div>
          <label className="form-label">Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-field"
            placeholder="YYYY/MM/DD"
          />
        </div>

        {/* Market Location */}
        <div>
          <label className="form-label">Market Location</label>
          <Select value={marketLocation} onValueChange={setMarketLocation}>
            <SelectTrigger className="form-field">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {marketLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quality Grade */}
        <div>
          <label className="form-label">Quality Grade (1-5)</label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setQualityGrade(Math.max(1, qualityGrade - 1))}
              className="shrink-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <input
              type="text"
              value={qualityGrade}
              readOnly
              className="form-field text-center"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setQualityGrade(Math.min(5, qualityGrade + 1))}
              className="shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Commodity Group */}
        <div>
          <label className="form-label">Commodity Group</label>
          <Select 
            value={commodityGroup} 
            onValueChange={(val) => {
              setCommodityGroup(val as keyof typeof cropTypes);
              setCropType(cropTypes[val as keyof typeof cropTypes][0]);
            }}
          >
            <SelectTrigger className="form-field">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {commodityGroups.map((group) => (
                <SelectItem key={group} value={group}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Season */}
        <div>
          <label className="form-label">Season</label>
          <Select value={season} onValueChange={setSeason}>
            <SelectTrigger className="form-field">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {seasons.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Transport Cost */}
        <div>
          <label className="form-label">Transport Cost</label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setTransportCost(Math.max(0, transportCost - 5))}
              className="shrink-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <input
              type="text"
              value={transportCost.toFixed(2)}
              readOnly
              className="form-field text-center"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setTransportCost(transportCost + 5)}
              className="shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Crop Type */}
        <div>
          <label className="form-label">Crop Type</label>
          <Select value={cropType} onValueChange={setCropType}>
            <SelectTrigger className="form-field">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cropTypes[commodityGroup].map((crop) => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quantity */}
        <div>
          <label className="form-label">Quantity (kg)</label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setQuantity(Math.max(0, quantity - 10))}
              className="shrink-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <input
              type="text"
              value={quantity.toFixed(2)}
              readOnly
              className="form-field text-center"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setQuantity(quantity + 10)}
              className="shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Demand Index */}
        <div>
          <label className="form-label">
            Demand Index{" "}
            <span className="text-secondary font-bold">{demandIndex[0].toFixed(2)}</span>
          </label>
          <div className="pt-4 px-1">
            <Slider
              value={demandIndex}
              onValueChange={setDemandIndex}
              min={0}
              max={2}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0.00</span>
              <span>2.00</span>
            </div>
          </div>
        </div>

        {/* State */}
        <div className="md:col-span-2">
          <label className="form-label">State</label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="form-field">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {states.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button & Result */}
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Button variant="hero" size="lg" onClick={handlePredict}>
          Predict Price
        </Button>
        
        {prediction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card px-6 py-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Predicted Price</p>
              <p className="text-2xl font-bold text-primary">₹{prediction.toLocaleString()}/quintal</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PricePredictionForm;
