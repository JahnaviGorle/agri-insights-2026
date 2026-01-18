import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Package, MapPin, Clock, CheckCircle2, ArrowRight, Filter, Wallet, Loader2, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface LogisticsDashboardProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order["status"]) => void;
}

const statusConfig = {
  pending: { label: "Pending Pickup", color: "bg-yellow-500/20 text-yellow-700", icon: Clock },
  picked_up: { label: "Picked Up", color: "bg-blue-500/20 text-blue-700", icon: Package },
  in_transit: { label: "In Transit", color: "bg-purple-500/20 text-purple-700", icon: Truck },
  delivered: { label: "Delivered", color: "bg-primary/20 text-primary", icon: CheckCircle2 },
};

const LogisticsDashboard = ({ orders, onUpdateStatus }: LogisticsDashboardProps) => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

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
      toast.success("Logistics wallet connected!");
    } catch (error: any) {
      toast.error(error.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const filteredOrders = filterStatus === "all"
    ? orders
    : orders.filter(order => order.status === filterStatus);

  const getNextStatus = (current: Order["status"]): Order["status"] | null => {
    const flow: Order["status"][] = ["pending", "picked_up", "in_transit", "delivered"];
    const currentIndex = flow.indexOf(current);
    return currentIndex < flow.length - 1 ? flow[currentIndex + 1] : null;
  };

  return (
    <div className="space-y-6">
      {/* Logistics Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <Truck className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Logistics Dashboard</h2>
            <p className="text-muted-foreground">Track and manage order deliveries</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            variant={walletAddress ? "outline" : "hero"}
            className={walletAddress ? "border-accent text-accent-foreground" : "bg-accent hover:bg-accent/90 text-accent-foreground"}
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

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="picked_up">Picked Up</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = orders.filter(o => o.status === status).length;
          const Icon = config.icon;
          return (
            <div key={status} className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground">{config.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Truck className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
          <p className="text-muted-foreground">Orders will appear here when buyers make purchases</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => {
            const config = statusConfig[order.status];
            const StatusIcon = config.icon;
            const nextStatus = getNextStatus(order.status);

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{order.productName}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Order #{order.id} • {order.quantity} kg
                      </p>

                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{order.farmerLocation}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span>{order.buyerLocation}</span>
                      </div>

                      <div className="mt-3 inline-flex items-center gap-2 px-2 py-1 rounded bg-muted/50 text-[10px] text-muted-foreground font-mono">
                        <LinkIcon className="w-3 h-3 text-primary" />
                        <span>TX: {order.txHash}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Est. Delivery</p>
                      <p className="font-medium">{order.estimatedDelivery.toLocaleDateString()}</p>
                    </div>

                    {nextStatus && (
                      <Button
                        variant="outline"
                        onClick={() => onUpdateStatus(order.id, nextStatus)}
                        className="shrink-0"
                      >
                        <StatusIcon className="w-4 h-4 mr-2" />
                        Mark as {statusConfig[nextStatus].label}
                      </Button>
                    )}

                    {order.status === "delivered" && (
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Completed</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    {(["pending", "picked_up", "in_transit", "delivered"] as const).map((status, i) => {
                      const stepConfig = statusConfig[status];
                      const StepIcon = stepConfig.icon;
                      const isCompleted = (["pending", "picked_up", "in_transit", "delivered"] as const).indexOf(order.status) >= i;

                      return (
                        <div key={status} className="flex items-center">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center transition-all
                            ${isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                          `}>
                            <StepIcon className="w-4 h-4" />
                          </div>
                          {i < 3 && (
                            <div className={`w-12 md:w-24 h-1 mx-1 rounded ${isCompleted ? "bg-primary" : "bg-muted"}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Pending</span>
                    <span>Picked Up</span>
                    <span>In Transit</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LogisticsDashboard;
