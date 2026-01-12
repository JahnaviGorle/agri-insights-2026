import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, ArrowLeft, TrendingUp, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricePredictionForm from "@/components/dashboard/PricePredictionForm";
import DemandForecastingForm from "@/components/dashboard/DemandForecastingForm";
import FloatingBlobs from "@/components/FloatingBlobs";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("price");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingBlobs />
      
      {/* Header */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            </div>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                Agri<span className="text-primary">Predict</span>
              </span>
            </Link>
            
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Agri Market <span className="text-gradient">Insights</span> Platform
            </h1>
            <p className="text-muted-foreground">
              Predict <span className="font-semibold text-primary">Crop Prices</span> and{" "}
              <span className="font-semibold text-secondary">Market Demand</span> using Machine Learning.
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="glass-card p-1.5 mb-8 w-fit">
              <TabsTrigger 
                value="price" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl px-6 py-3 transition-all"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Price Prediction</span>
              </TabsTrigger>
              <TabsTrigger 
                value="demand" 
                className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground rounded-xl px-6 py-3 transition-all"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Demand Forecasting</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="price">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PricePredictionForm />
              </motion.div>
            </TabsContent>

            <TabsContent value="demand">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DemandForecastingForm />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
