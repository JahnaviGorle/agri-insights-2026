@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 48 40% 97%;
    --foreground: 150 40% 12%;

    --card: 0 0% 100%;
    --card-foreground: 150 40% 12%;

    --popover: 0 0% 100%;
    --popover-foreground: 150 40% 12%;

    --primary: 150 70% 22%;
    --primary-foreground: 48 40% 97%;

    --secondary: 38 92% 50%;
    --secondary-foreground: 150 40% 12%;

    --muted: 45 30% 92%;
    --muted-foreground: 150 20% 40%;

    --accent: 38 92% 50%;
    --accent-foreground: 150 40% 12%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 45 25% 85%;
    --input: 45 25% 85%;
    --ring: 150 70% 22%;

    --radius: 0.75rem;

    /* Custom tokens */
    --glass: 48 30% 98% / 0.75;
    --glass-border: 48 20% 90% / 0.5;
    --gradient-blob-1: 150 50% 85%;
    --gradient-blob-2: 38 70% 88%;
    --gradient-blob-3: 45 60% 90%;
    --text-gradient-start: 150 70% 22%;
    --text-gradient-end: 38 92% 50%;
    
    --sidebar-background: 48 30% 96%;
    --sidebar-foreground: 150 30% 20%;
    --sidebar-primary: 150 70% 22%;
    --sidebar-primary-foreground: 48 40% 97%;
    --sidebar-accent: 45 40% 94%;
    --sidebar-accent-foreground: 150 30% 20%;
    --sidebar-border: 45 25% 88%;
    --sidebar-ring: 150 70% 35%;
  }

  .dark {
    --background: 150 30% 8%;
    --foreground: 48 30% 95%;

    --card: 150 25% 12%;
    --card-foreground: 48 30% 95%;

    --popover: 150 25% 12%;
    --popover-foreground: 48 30% 95%;

    --primary: 150 60% 40%;
    --primary-foreground: 150 30% 8%;

    --secondary: 38 80% 50%;
    --secondary-foreground: 150 30% 8%;

    --muted: 150 20% 18%;
    --muted-foreground: 48 15% 65%;

    --accent: 38 70% 45%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 150 20% 20%;
    --input: 150 20% 20%;
    --ring: 150 60% 40%;

    --glass: 150 25% 15% / 0.7;
    --glass-border: 150 20% 25% / 0.5;
    --gradient-blob-1: 150 40% 25%;
    --gradient-blob-2: 38 50% 30%;
    --gradient-blob-3: 45 40% 28%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-outfit antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-outfit font-bold tracking-tight;
  }
}

@layer components {
  .glass-card {
    @apply bg-glass backdrop-blur-xl border border-glass-border rounded-2xl shadow-glass;
  }

  .glass-nav {
    @apply bg-glass backdrop-blur-xl border-b border-glass-border;
  }

  .text-gradient {
    @apply bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent;
  }

  .floating-blob {
    @apply absolute rounded-full blur-3xl opacity-50 animate-float;
  }

  .form-field {
    @apply w-full h-12 px-4 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground;
  }

  .form-label {
    @apply text-sm font-medium text-foreground mb-2 block;
  }
}

@layer utilities {
  .bg-glass {
    background: hsl(var(--glass));
  }

  .border-glass-border {
    border-color: hsl(var(--glass-border));
  }

  .shadow-glass {
    box-shadow: 
      0 8px 32px hsl(150 70% 22% / 0.06),
      inset 0 1px 0 hsl(0 0% 100% / 0.3);
  }

  .shadow-glow {
    box-shadow: 0 0 40px hsl(150 70% 30% / 0.25);
  }
}
