import { motion } from "framer-motion";
import { Calendar, Brain, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    step: "01",
    title: "Input Details",
    description: "Select your date, state, and market for accurate predictions",
    color: "bg-primary",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Analysis",
    description: "Random Forest & XGBoost models process your request instantly",
    color: "bg-secondary",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Decision Ready",
    description: "Get precise price predictions and demand level forecasts",
    color: "bg-accent",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple <span className="text-gradient">Three-Step</span> Process
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get accurate price predictions in seconds with our streamlined workflow
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-4 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="glass-card p-8 h-full group hover:shadow-glow transition-all duration-500">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;