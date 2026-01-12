import { motion } from "framer-motion";
import { Activity, BarChart3, Cpu, Globe } from "lucide-react";

const stats = [
  {
    icon: BarChart3,
    value: "98%",
    label: "Accuracy",
    color: "text-primary",
  },
  {
    icon: Globe,
    value: "10+",
    label: "Commodities",
    color: "text-secondary",
  },
  {
    icon: Cpu,
    value: "Nano-second",
    label: "Processing",
    color: "text-accent",
  },
  {
    icon: Activity,
    value: "Open",
    label: "Access",
    color: "text-primary",
  },
];

const StatsBar = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex p-3 rounded-2xl bg-muted mb-4 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBar;