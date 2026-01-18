import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";
import RoleToggle from "@/components/dashboard/RoleToggle";
import FarmerDashboard from "@/components/dashboard/FarmerDashboard";
import BuyerDashboard from "@/components/dashboard/BuyerDashboard";
import LogisticsDashboard from "@/components/dashboard/LogisticsDashboard";
import FloatingBlobs from "@/components/FloatingBlobs";
import type { Product } from "@/components/dashboard/FarmerDashboard";

type Role = "farmer" | "buyer" | "logistics";

interface Order {
  id: string;
  productName: string;
  quantity: number;
  buyerAddress: string;
  farmerLocation: string;
  buyerLocation: string;
  status: "pending" | "picked_up" | "in_transit" | "delivered";
  createdAt: Date;
  estimatedDelivery: Date;
  txHash: string;
}

const Dashboard = () => {
  const [activeRole, setActiveRole] = useState<Role>("farmer");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleListProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handlePurchase = (productId: string, txHash: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Create order for logistics
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      productName: product.cropType,
      quantity: product.quantity,
      buyerAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
      farmerLocation: `${product.marketLocation}, ${product.state}`,
      buyerLocation: "Buyer Location",
      status: "pending",
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      txHash,
    };

    setOrders((prev) => [...prev, newOrder]);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

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
          className="max-w-6xl mx-auto"
        >
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Agri Market <span className="text-gradient">Insights</span> Platform
            </h1>
            <p className="text-muted-foreground">
              Choose your role to access specialized features
            </p>
          </div>

          {/* Role Toggle */}
          <RoleToggle activeRole={activeRole} onRoleChange={setActiveRole} />

          {/* Role-specific Dashboard */}
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeRole === "farmer" && (
              <FarmerDashboard onListProduct={handleListProduct} />
            )}
            {activeRole === "buyer" && (
              <BuyerDashboard products={products} onPurchase={handlePurchase} />
            )}
            {activeRole === "logistics" && (
              <LogisticsDashboard orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
