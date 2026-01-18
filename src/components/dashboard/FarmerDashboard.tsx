import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tractor, TrendingUp, Tag, Package, Plus, Minus, IndianRupee, BarChart3, Loader2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { predictPrice, forecastDemand, type DemandForecastResponse } from "@/services/api";

const marketLocations = ["Adoni", "Alur", "Banaganapalli", "Chintapally", "Kurnool", "Nandyal", "Rapur", "Tuni", "Yemmiganur"];
const commodityGroups = ["Millet", "Oilseed"];
const seasons = ["Kharif", "Rabi", "Summer"];
const cropTypes: Record<string, string[]> = {
  Millet: [
    "Jowar (Sorghum)",
    "Foxtail Millet (Navane)",
    "Bajra (Pearl Millet/Cumbu)",
    "Ragi (Finger Millet)"
  ],
  Oilseed: [
    "Sunflower",
    "Castor Seed",
    "Soyabean",
    "Sesamum (Sesame, Gingelly, Til)"
  ]
};
const states = ["Andhra Pradesh"];

export interface Product {
  id: string;
  cropType: string;
  commodityGroup: string;
  quantity: number;
  price: number;
  suggestedPrice: number;
  qualityGrade: number;
  marketLocation: string;
  state: string;
  season: string;
  farmerAddress: string;
  createdAt: Date;
}

interface FarmerDashboardProps {
  onListProduct: (product: Product) => void;
}

// Ethereum provider type
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  isMetaMask?: boolean;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

const FarmerDashboard = ({ onListProduct }: FarmerDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"price" | "demand" | "sell">("price");
  const [loading, setLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // --- Price Prediction State ---
  const [date, setDate] = useState("2026/01/18");
  const [marketLocation, setMarketLocation] = useState("Adoni");
  const [qualityGrade, setQualityGrade] = useState(3);
  const [commodityGroup, setCommodityGroup] = useState<string>("Millet");
  const [season, setSeason] = useState("Kharif");
  const [transportCost, setTransportCost] = useState(20.0);
  const [cropType, setCropType] = useState("Jowar (Sorghum)");
  const [quantity, setQuantity] = useState(100.0);
  const [demandIndex, setDemandIndex] = useState([1.0]);
  const [state, setState] = useState("Andhra Pradesh");

  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  const [sellingPrice, setSellingPrice] = useState(0);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum === "undefined") {
        toast.error("Please install MetaMask!");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      }) as string[];
      setWalletAddress(accounts[0]);
      toast.success("Wallet connected!");
    } catch (error: any) {
      toast.error(error.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  // --- Demand Forecasting State ---
  const [demandDate, setDemandDate] = useState("2026/01/18");
  const [dCommodityGroup, setDCommodityGroup] = useState("Millet");
  const [dCropType, setDCropType] = useState("Jowar (Sorghum)");
  const [dState, setDState] = useState("Andhra Pradesh");
  const [dMarketLocation, setDMarketLocation] = useState("Adoni");
  const [dSeason, setDSeason] = useState("Kharif");
  const [totalQtySold, setTotalQtySold] = useState(1000.0);
  const [avgPrice, setAvgPrice] = useState(50.0);
  const [histDemand, setHistDemand] = useState(500.0);
  const [priceTrend, setPriceTrend] = useState(50.0);
  const [estProduction, setEstProduction] = useState(10000.0);
  const [policyScore, setPolicyScore] = useState([0.5]);
  const [weatherIndex, setWeatherIndex] = useState([0.5]);
  const [festivalFlag, setFestivalFlag] = useState("0");

  const [demandResult, setDemandResult] = useState<DemandForecastResponse | null>(null);

  const handleGetPriceSuggestion = async () => {
    setLoading(true);
    try {
      const response = await predictPrice({
        date,
        commodity_group: commodityGroup,
        crop_type: cropType,
        state_name: state,
        market_location: marketLocation,
        quantity_kg: quantity,
        quality_grade: qualityGrade,
        season: season,
        transport_cost: transportCost,
        demand_index: demandIndex[0],
      });

      const price = response.predicted_price;
      setSuggestedPrice(price);
      setSellingPrice(price); // Pre-fill selling price
      toast.success(`Price suggestion received: ₹${price}`);
    } catch (error) {
      toast.error("Failed to get price suggestion. Is the backend running?");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetDemandForecast = async () => {
    setLoading(true);
    try {
      const response = await forecastDemand({
        date: demandDate,
        commodity_group: dCommodityGroup,
        crop_type: dCropType,
        state_name: dState,
        market_location: dMarketLocation,
        season: dSeason,
        total_quantity_sold: totalQtySold,
        avg_price_per_kg: avgPrice,
        historical_demand_7d: histDemand,
        price_trend_7d: priceTrend,
        estimated_production_kg: estProduction,
        policy_support_score: policyScore[0],
        festival_flag: parseInt(festivalFlag),
        weather_index: weatherIndex[0],
      });

      setDemandResult(response);
      toast.success(`Demand forecasted: ${response.demand_level}`);
    } catch (error) {
      toast.error("Failed to forecast demand. Is the backend running?");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleListForSale = () => {
    if (!suggestedPrice) {
      toast.error("Please get price suggestion first!");
      return;
    }

    const product: Product = {
      id: `PRD-${Date.now()}`,
      cropType,
      commodityGroup,
      quantity,
      price: sellingPrice,
      suggestedPrice: suggestedPrice,
      qualityGrade,
      marketLocation,
      state,
      season,
      farmerAddress: walletAddress || `0x${Math.random().toString(16).slice(2, 42)}`,
      createdAt: new Date(),
    };

    onListProduct(product);
    toast.success("Product listed for sale!");

    // Reset form partially
    setSuggestedPrice(null);
    setSellingPrice(0);
    setActiveTab("price"); // Go back to start
  };

  const startSelling = () => {
    setActiveTab("sell");
  };

  return (
    <div className="space-y-6">
      {/* Role Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Tractor className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Farmer Dashboard</h2>
            <p className="text-muted-foreground">Manage your crops, get insights, and sell directly</p>
          </div>
        </div>

        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          variant={walletAddress ? "outline" : "hero"}
          className={walletAddress ? "border-primary text-primary" : "bg-primary hover:bg-primary/90"}
        >
          {isConnecting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Wallet className="w-4 h-4 mr-2" />
          )}
          {walletAddress
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : "Connect Wallet"}
        </Button>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Button
          variant={activeTab === "price" ? "default" : "outline"}
          onClick={() => setActiveTab("price")}
          className="flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Price Suggestion
        </Button>
        <Button
          variant={activeTab === "demand" ? "default" : "outline"}
          onClick={() => setActiveTab("demand")}
          className="flex items-center gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          Demand Forecast
        </Button>
        <Button
          variant={activeTab === "sell" ? "default" : "outline"}
          onClick={() => setActiveTab("sell")}
          className="flex items-center gap-2"
        >
          <Tag className="w-4 h-4" />
          Sell Crop
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "price" && (
          <motion.div
            key="price"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">ML-Powered Price Suggestion</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Common Fields */}
              <div>
                <label className="form-label">Date</label>
                <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="form-field" placeholder="YYYY/MM/DD" />
              </div>

              <div>
                <label className="form-label">Commodity Group</label>
                <Select value={commodityGroup} onValueChange={(val) => { setCommodityGroup(val); setCropType(cropTypes[val][0]); }}>
                  <SelectTrigger className="form-field"><SelectValue /></SelectTrigger>
                  <SelectContent>{commodityGroups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div>
                <label className="form-label">Crop Type</label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger className="form-field"><SelectValue /></SelectTrigger>
                  <SelectContent>{cropTypes[commodityGroup].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div>
                <label className="form-label">State</label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger className="form-field"><SelectValue /></SelectTrigger>
                  <SelectContent>{states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div>
                <label className="form-label">Market Location</label>
                <Select value={marketLocation} onValueChange={setMarketLocation}>
                  <SelectTrigger className="form-field"><SelectValue /></SelectTrigger>
                  <SelectContent>{marketLocations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div>
                <label className="form-label">Season</label>
                <Select value={season} onValueChange={setSeason}>
                  <SelectTrigger className="form-field"><SelectValue /></SelectTrigger>
                  <SelectContent>{seasons.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              {/* Specific Fields */}
              <div>
                <label className="form-label">Quantity (kg)</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="form-field" />
              </div>

              <div>
                <label className="form-label">Quality Grade (1-5)</label>
                <input type="number" value={qualityGrade} onChange={(e) => setQualityGrade(Number(e.target.value))} min={1} max={5} className="form-field" />
              </div>

              <div>
                <label className="form-label">Transport Cost (₹)</label>
                <input type="number" value={transportCost} onChange={(e) => setTransportCost(Number(e.target.value))} className="form-field" />
              </div>

              <div className="md:col-span-3">
                <label className="form-label">Demand Index: {demandIndex[0].toFixed(2)}</label>
                <Slider value={demandIndex} onValueChange={setDemandIndex} min={0} max={2} step={0.1} />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button variant="hero" onClick={handleGetPriceSuggestion} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <TrendingUp className="w-4 h-4 mr-2" />}
                Get Price Suggestion
              </Button>

              {suggestedPrice && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-4">
                  <div className="glass-card px-6 py-4 flex items-center gap-4 border-primary/30 bg-primary/5">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <IndianRupee className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Suggested Price</p>
                      <p className="text-2xl font-bold text-primary">₹{suggestedPrice.toLocaleString()}/kg</p>
                    </div>
                  </div>
                  <Button variant="outline" className="h-full border-primary text-primary hover:bg-primary/10" onClick={startSelling}>
                    List for Sale <Package className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "demand" && (
          <motion.div
            key="demand"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold">AI-Driven Demand Forecasting</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Reuse common fields or simplified versions */}
              <div><label className="form-label">Date</label><input type="text" value={demandDate} onChange={(e) => setDemandDate(e.target.value)} className="form-field" placeholder="YYYY/MM/DD" /></div>

              <div>
                <label className="form-label">Commodity Group</label>
                <Select value={dCommodityGroup} onValueChange={(val) => { setDCommodityGroup(val); setDCropType(cropTypes[val][0]); }}>
                  <SelectTrigger className="form-field"><SelectValue /></SelectTrigger>
                  <SelectContent>{commodityGroups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div>
                <label className="form-label">Crop Type</label>
                <Select value={dCropType} onValueChange={setDCropType}>
                  <SelectTrigger className="form-field"><SelectValue /></SelectTrigger>
                  <SelectContent>{cropTypes[dCommodityGroup].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div><label className="form-label">State</label><Select value={dState} onValueChange={setDState}><SelectTrigger className="form-field"><SelectValue /></SelectTrigger><SelectContent>{states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
              <div><label className="form-label">Market</label><Select value={dMarketLocation} onValueChange={setDMarketLocation}><SelectTrigger className="form-field"><SelectValue /></SelectTrigger><SelectContent>{marketLocations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select></div>
              <div><label className="form-label">Season</label><Select value={dSeason} onValueChange={setDSeason}><SelectTrigger className="form-field"><SelectValue /></SelectTrigger><SelectContent>{seasons.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>

              {/* Demand Specifics */}
              <div><label className="form-label">Total Qty Sold</label><input type="number" value={totalQtySold} onChange={(e) => setTotalQtySold(Number(e.target.value))} className="form-field" /></div>
              <div><label className="form-label">Avg Price/kg</label><input type="number" value={avgPrice} onChange={(e) => setAvgPrice(Number(e.target.value))} className="form-field" /></div>
              <div><label className="form-label">Hist. Demand (7d)</label><input type="number" value={histDemand} onChange={(e) => setHistDemand(Number(e.target.value))} className="form-field" /></div>
              <div><label className="form-label">Price Trend (7d)</label><input type="number" value={priceTrend} onChange={(e) => setPriceTrend(Number(e.target.value))} className="form-field" /></div>
              <div><label className="form-label">Est. Production</label><input type="number" value={estProduction} onChange={(e) => setEstProduction(Number(e.target.value))} className="form-field" /></div>
              <div><label className="form-label">Festival Flag (0/1)</label><Select value={festivalFlag} onValueChange={setFestivalFlag}><SelectTrigger className="form-field"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="0">No</SelectItem><SelectItem value="1">Yes</SelectItem></SelectContent></Select></div>

              <div className="md:col-span-1"><label className="form-label">Policy Score: {policyScore[0]}</label><Slider value={policyScore} onValueChange={setPolicyScore} min={0} max={1} step={0.1} /></div>
              <div className="md:col-span-1"><label className="form-label">Weather Index: {weatherIndex[0]}</label><Slider value={weatherIndex} onValueChange={setWeatherIndex} min={0} max={1} step={0.1} /></div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button variant="hero" onClick={handleGetDemandForecast} disabled={loading} className="bg-secondary hover:bg-secondary/90">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BarChart3 className="w-4 h-4 mr-2" />}
                Forecast Demand
              </Button>

              {demandResult && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card px-6 py-4 flex items-center gap-4 border-secondary/30 bg-secondary/5">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Demand Level: <span className="font-bold text-foreground">{demandResult.demand_level}</span></p>
                    <p className="text-2xl font-bold text-secondary">Score: {demandResult.demand_score}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "sell" && (
          <motion.div
            key="sell"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold">List Product for Sale</h3>
            </div>

            {!suggestedPrice ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground mb-4">Get a price suggestion first to list your product</p>
                <Button variant="outline" onClick={() => setActiveTab("price")}>
                  Go to Price Suggestion
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-card p-4 bg-muted/20">
                    <p className="text-sm text-muted-foreground">Crop</p>
                    <p className="font-semibold">{cropType}</p>
                  </div>
                  <div className="glass-card p-4 bg-muted/20">
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-semibold">{quantity} kg</p>
                  </div>
                  <div className="glass-card p-4 bg-muted/20">
                    <p className="text-sm text-muted-foreground">Quality Grade</p>
                    <p className="font-semibold">{qualityGrade}/5</p>
                  </div>
                  <div className="glass-card p-4 bg-muted/20">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{marketLocation}, {state}</p>
                  </div>
                </div>

                <div className="glass-card p-4 bg-primary/5 border-primary/20">
                  <label className="form-label">Your Selling Price (₹/kg)</label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 flex-1">
                      <Button variant="outline" size="icon" onClick={() => setSellingPrice(Math.max(0, sellingPrice - 50))}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} className="form-field text-center text-lg font-bold" />
                      <Button variant="outline" size="icon" onClick={() => setSellingPrice(sellingPrice + 50)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Suggested: <span className="text-primary font-semibold">₹{suggestedPrice?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button variant="hero" size="lg" onClick={handleListForSale} className="w-full bg-secondary hover:bg-secondary/90">
                  <Tag className="w-5 h-5 mr-2" />
                  List for Sale
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarmerDashboard;
