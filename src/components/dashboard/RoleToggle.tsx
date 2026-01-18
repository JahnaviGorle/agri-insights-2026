import { motion } from "framer-motion";
import { Tractor, ShoppingCart, Truck } from "lucide-react";

type Role = "farmer" | "buyer" | "logistics";

interface RoleToggleProps {
  activeRole: Role;
  onRoleChange: (role: Role) => void;
}

const roles = [
  { id: "farmer" as Role, label: "Farmer", icon: Tractor, color: "primary" },
  { id: "buyer" as Role, label: "Buyer", icon: ShoppingCart, color: "secondary" },
  { id: "logistics" as Role, label: "Logistics", icon: Truck, color: "accent" },
];

const RoleToggle = ({ activeRole, onRoleChange }: RoleToggleProps) => {
  return (
    <div className="glass-card p-2 flex gap-2 w-fit mx-auto mb-8">
      {roles.map((role) => {
        const Icon = role.icon;
        const isActive = activeRole === role.id;
        
        return (
          <motion.button
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={`
              relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
              ${isActive 
                ? role.id === "farmer" 
                  ? "bg-primary text-primary-foreground" 
                  : role.id === "buyer"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon className="w-5 h-5" />
            <span>{role.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default RoleToggle;
