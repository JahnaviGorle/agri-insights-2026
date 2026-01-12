import { motion } from "framer-motion";
import { TrendingUp, BarChart2, LineChart, MapPin } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Price Prediction",
    description: "Accurate ML-powered price forecasts for agricultural commodities using ensemble learning models.",
    gradient: "from-primary to-primary/60",
  },
  {
    icon: BarChart2,
    title: "Demand Forecasting",
    description: "Understand market demand levels with our XGBoost-powered classification system.",
    gradient: "from-secondary to-secondary/60",
  },
  {
    icon: LineChart,
    title: "Historical Analytics",
    description: "Access comprehensive historical data and trend analysis for informed decision-making.",
    gradient: "from-accent to-accent/60",
  },
  {
    icon: MapPin,
    title: "Multi-State Support",
    description: "Coverage across multiple states and markets for comprehensive regional insights.",
    gradient: "from-primary to-secondary",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-semibold mb-4">
            Key Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need for
            <br />
            <span className="text-gradient">Smart Farming</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful tools designed to give you an edge in agricultural markets
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="glass-card p-8 h-full relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;