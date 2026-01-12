import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Minus, Plus } from "lucide-react";
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
const festivalFlags = ["0", "1"];

const DemandForecastingForm = () => {
  const [date, setDate] = useState("2026/01/12");
  const [season, setSeason] = useState("Kharif");
  const [estProduction, setEstProduction] = useState(10000.0);
  const [commodityGroup, setCommodityGroup] = useState<keyof typeof cropTypes>("Millet");
  const [totalQtySold, setTotalQtySold] = useState(1000.0);
  const [policyScore, setPolicyScore] = useState([0.5]);
  const [cropType, setCropType] = useState("Bajra (Pearl Millet/Cumbu)");
  const [avgPrice, setAvgPrice] = useState(50.0);
  const [weatherIndex, setWeatherIndex] = useState([0.5]);
  const [state, setState] = useState("Andhra Pradesh");
  const [histDemand, setHistDemand] = useState(500.0);
  const [festivalFlag, setFestivalFlag] = useState("0");
  const [marketLocation, setMarketLocation] = useState("Adoni");
  const [priceTrend, setPriceTrend] = useState(50.0);
  const [forecast, setForecast] = useState<string | null>(null);

  const handleForecast = () => {
    // Mock demand level calculation
    const demandLevels = ["Low", "Medium", "High", "Very High"];
    const baseIndex = Math.floor(
      (policyScore[0] + weatherIndex[0] + (estProduction / 20000) + (festivalFlag === "1" ? 0.3 : 0)) / 1.3 * 3
    );
    setForecast(demandLevels[Math.min(3, Math.max(0, baseIndex))]);
  };

  const getDemandColor = (level: string) => {
    switch (level) {
      case "Low": return "text-destructive";
      case "Medium": return "text-secondary";
      case "High": return "text-primary";
      case "Very High": return "text-primary";
      default: return "text-foreground";
    }
  };

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="text-2xl font-bold">Demand Forecasting</h2>
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

        {/* Est. Production */}
        <div>
          <label className="form-label">Est. Production</label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setEstProduction(Math.max(0, estProduction - 1000))}
              className="shrink-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <input
              type="text"
              value={estProduction.toFixed(2)}
              readOnly
              className="form-field text-center"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setEstProduction(estProduction + 1000)}
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

        {/* Total Qty Sold */}
        <div>
          <label className="form-label">Total Qty Sold</label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setTotalQtySold(Math.max(0, totalQtySold - 100))}
              className="shrink-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <input
              type="text"
              value={totalQtySold.toFixed(2)}
              readOnly
              className="form-field text-center"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setTotalQtySold(totalQtySold + 100)}
              className="shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Policy Score */}
        <div>
          <label className="form-label">
            Policy Score{" "}
            <span className="text-secondary font-bold">{policyScore[0].toFixed(2)}</span>
          </label>
          <div className="pt-4 px-1">
            <Slider
              value={policyScore}
              onValueChange={setPolicyScore}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0.00</span>
              <span>1.00</span>
            </div>
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

        {/* Avg Price */}
        <div>
          <label className="form-label">Avg Price</label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setAvgPrice(Math.max(0, avgPrice - 5))}
              className="shrink-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <input
              type="text"
              value={avgPrice.toFixed(2)}
              readOnly
              className="form-field text-center"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setAvgPrice(avgPrice + 5)}
              className="shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Weather Index */}
        <div>
          <label className="form-label">
            Weather Index{" "}
            <span className="text-secondary font-bold">{weatherIndex[0].toFixed(2)}</span>
          </label>
          <div className="pt-4 px-1">
            <Slider
              value={weatherIndex}
              onValueChange={setWeatherIndex}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0.00</span>
              <span>1.00</span>
            </div>
          </div>
        </div>

        {/* State */}
        <div>
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

        {/* Hist. Demand (7d) */}
        <div>
          <label className="form-label">Hist. Demand (7d)</label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setHistDemand(Math.max(0, histDemand - 50))}
              className="shrink-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <input
              type="text"
              value={histDemand.toFixed(2)}
              readOnly
              className="form-field text-center"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setHistDemand(histDemand + 50)}
              className="shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Festival Flag */}
        <div>
          <label className="form-label">Festival Flag (0/1)</label>
          <Select value={festivalFlag} onValueChange={setFestivalFlag}>
            <SelectTrigger className="form-field">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {festivalFlags.map((flag) => (
                <SelectItem key={flag} value={flag}>{flag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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

        {/* Price Trend (7d) */}
        <div>
          <label className="form-label">Price Trend (7d)</label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setPriceTrend(Math.max(0, priceTrend - 10))}
              className="shrink-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <input
              type="text"
              value={priceTrend.toFixed(2)}
              readOnly
              className="form-field text-center"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setPriceTrend(priceTrend + 10)}
              className="shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Submit Button & Result */}
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Button 
          variant="hero" 
          size="lg" 
          onClick={handleForecast}
          className="bg-secondary hover:bg-secondary/90"
        >
          Forecast Demand
        </Button>
        
        {forecast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card px-6 py-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Demand Level</p>
              <p className={`text-2xl font-bold ${getDemandColor(forecast)}`}>{forecast}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DemandForecastingForm;
