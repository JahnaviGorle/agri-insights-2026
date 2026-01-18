import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Package, Wallet, CheckCircle, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Product } from "./FarmerDashboard";

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

interface BuyerDashboardProps {
  products: Product[];
  onPurchase: (productId: string, txHash: string) => void;
}

const BuyerDashboard = ({ products, onPurchase }: BuyerDashboardProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTransacting, setIsTransacting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        toast.error("Please install MetaMask to make transactions!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      }) as string[];

      setWalletAddress(accounts[0]);
      toast.success("Wallet connected successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleBuy = async (product: Product) => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first!");
      return;
    }

    setSelectedProduct(product);
    setIsTransacting(true);
    setTxHash(null);

    try {
      // Convert INR price to ETH (mock conversion rate)
      const ethPrice = (product.price * product.quantity / 100) / 200000; // Mock: 1 ETH = 200000 INR
      const weiValue = BigInt(Math.floor(ethPrice * 1e18));

      // Send transaction
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: walletAddress,
          to: product.farmerAddress,
          value: `0x${weiValue.toString(16)}`,
          gas: "0x5208", // 21000 gas
        }],
      }) as string;

      setTxHash(txHash);
      onPurchase(product.id, txHash);
      toast.success("Transaction submitted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Transaction failed");
      setSelectedProduct(null);
    } finally {
      setIsTransacting(false);
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setTxHash(null);
  };

  return (
    <div className="space-y-6">
      {/* Buyer Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Buyer Marketplace</h2>
            <p className="text-muted-foreground">Browse and purchase crops directly from farmers</p>
          </div>
        </div>

        <Button
          variant={walletAddress ? "outline" : "hero"}
          onClick={connectWallet}
          disabled={isConnecting}
          className={walletAddress ? "border-secondary text-secondary" : "bg-secondary hover:bg-secondary/90"}
        >
          {isConnecting ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Wallet className="w-4 h-4 mr-2" />
          )}
          {walletAddress
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : "Connect Wallet"
          }
        </Button>
      </div>

      <div className="glass-card p-6 border-secondary/20 bg-secondary/5 mb-8">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-secondary" />
          Blockchain-Enabled Secured Process
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-secondary font-bold text-xs uppercase tracking-wider">Verification (Provenance)</div>
          </div>
          <div className="space-y-1 text-center md:text-left">
            <div className="text-secondary font-bold text-xs uppercase tracking-wider">Settlement (Smart Contracts)</div>
          </div>
          <div className="space-y-1 text-center md:text-left">
            <div className="text-secondary font-bold text-xs uppercase tracking-wider">Transparency (Shared Ledger)</div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Package className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Products Available</h3>
          <p className="text-muted-foreground">Check back later when farmers list their crops for sale</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {product.commodityGroup}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2">{product.cropType}</h3>

              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-medium text-foreground">{product.quantity} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality:</span>
                  <span className="font-medium text-foreground">{product.qualityGrade}/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium text-foreground">{product.marketLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Season:</span>
                  <span className="font-medium text-foreground">{product.season}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-foreground">Selling Price:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">per kg</p>
                  </div>
                </div>
              </div>

              <Button
                variant="hero"
                className="w-full bg-secondary hover:bg-secondary/90"
                onClick={() => handleBuy(product)}
                disabled={isTransacting && selectedProduct?.id === product.id}
              >
                {isTransacting && selectedProduct?.id === product.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Transaction Modal */}
      <AnimatePresence>
        {selectedProduct && txHash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Transaction Submitted!</h3>
                <p className="text-muted-foreground mb-6">
                  Your purchase of {selectedProduct.cropType} has been submitted to the blockchain.
                </p>

                <div className="glass-card p-4 bg-muted/20 mb-6">
                  <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                  <p className="text-sm font-mono break-all">{txHash}</p>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={closeModal}>
                    Close
                  </Button>
                  <Button
                    variant="hero"
                    className="flex-1"
                    onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Etherscan
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuyerDashboard;
