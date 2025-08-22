import { ReactNode } from "react";
import { BarChart3, TrendingUp, Users, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const upcomingFeatures = [
    { icon: Users, title: "Player Comparison", description: "Compare multiple players" },
    { icon: TrendingUp, title: "Season Trends", description: "Historical performance" },
    { icon: BarChart3, title: "Team Analytics", description: "Team-wide insights" },
    { icon: Settings, title: "Custom Models", description: "Personalized predictions" },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-basketball rounded-full flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-background" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Next Game Points Predictor</h1>
                <p className="text-sm text-muted-foreground">AI-powered NBA predictions</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
              <span>Powered by Machine Learning</span>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Prediction Area */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  Predict Player Performance
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Get AI-powered predictions for NBA player scoring in their next game. 
                  Our model analyzes recent performance, matchups, and key factors.
                </p>
              </div>
              
              {children}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="bg-secondary/20 border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Model Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-medium text-success">85.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Predictions Made</span>
                    <span className="font-medium text-foreground">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Players Tracked</span>
                    <span className="font-medium text-foreground">450+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon Features */}
            <Card className="bg-secondary/20 border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Coming Soon</h3>
                <div className="space-y-3">
                  {upcomingFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors">
                      <feature.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-foreground text-sm">{feature.title}</div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tip */}
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">💡 Pro Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Predictions work best for players with consistent recent playing time. 
                  Results may vary for injured or irregularly playing athletes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Next Game Points Predictor. Data updates in real-time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}