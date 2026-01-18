import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tractor, TrendingUp, Tag, Package, Plus, Minus, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

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

const FarmerDashboard = ({ onListProduct }: FarmerDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"price" | "sell">("price");
  
  // Form states
  const [date, setDate] = useState("2026/01/18");
  const [marketLocation, setMarketLocation] = useState("Adoni");
  const [qualityGrade, setQualityGrade] = useState(3);
  const [commodityGroup, setCommodityGroup] = useState<keyof typeof cropTypes>("Millet");
  const [season, setSeason] = useState("Kharif");
  const [transportCost, setTransportCost] = useState(20.0);
  const [cropType, setCropType] = useState("Bajra (Pearl Millet/Cumbu)");
  const [quantity, setQuantity] = useState(100.0);
  const [demandIndex, setDemandIndex] = useState([1.0]);
  const [state, setState] = useState("Andhra Pradesh");
  
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  const [sellingPrice, setSellingPrice] = useState(0);

  const handleGetPriceSuggestion = () => {
    // Mock ML price suggestion
    const basePrice = 2500 + Math.random() * 1000;
    const seasonFactor = season === "Kharif" ? 1.1 : season === "Rabi" ? 1.05 : 0.95;
    const qualityFactor = 1 + (qualityGrade - 1) * 0.08;
    const demandFactor = 0.8 + demandIndex[0] * 0.2;
    const suggested = Math.round(basePrice * seasonFactor * qualityFactor * demandFactor);
    setSuggestedPrice(suggested);
    setSellingPrice(suggested);
    toast.success("Price suggestion generated!");
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
      farmerAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
      createdAt: new Date(),
    };

    onListProduct(product);
    toast.success("Product listed for sale!");
    
    // Reset form
    setSuggestedPrice(null);
    setSellingPrice(0);
    setQuantity(100);
  };

  return (
    <div className="space-y-6">
      {/* Farmer Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Tractor className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Farmer Dashboard</h2>
          <p className="text-muted-foreground">Get price suggestions and list your crops for sale</p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={activeTab === "price" ? "default" : "outline"}
          onClick={() => setActiveTab("price")}
          className="flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Price Suggestion
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
        {activeTab === "price" ? (
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

              {/* Quantity */}
              <div>
                <label className="form-label">Quantity (kg)</label>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(Math.max(10, quantity - 10))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <input
                    type="text"
                    value={quantity.toFixed(0)}
                    readOnly
                    className="form-field text-center"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(quantity + 10)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Transport Cost */}
              <div>
                <label className="form-label">Transport Cost (₹)</label>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setTransportCost(Math.max(0, transportCost - 5))}
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
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Demand Index */}
              <div>
                <label className="form-label">
                  Demand Index <span className="text-secondary font-bold">{demandIndex[0].toFixed(2)}</span>
                </label>
                <div className="pt-4 px-1">
                  <Slider
                    value={demandIndex}
                    onValueChange={setDemandIndex}
                    min={0}
                    max={2}
                    step={0.01}
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

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button variant="hero" onClick={handleGetPriceSuggestion}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Get Price Suggestion
              </Button>

              {suggestedPrice && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card px-6 py-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Suggested Price</p>
                    <p className="text-2xl font-bold text-primary">₹{suggestedPrice.toLocaleString()}/quintal</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
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
                  <label className="form-label">Your Selling Price (₹/quintal)</label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 flex-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setSellingPrice(Math.max(0, sellingPrice - 50))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <input
                        type="number"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(Number(e.target.value))}
                        className="form-field text-center text-lg font-bold"
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setSellingPrice(sellingPrice + 50)}
                      >
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
