import { TrendingUp, Target, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PredictionData {
  predicted_points: number;
  confidence_interval: {
    lower: number;
    upper: number;
  };
  confidence_level: number;
}

interface PredictionCardProps {
  prediction: PredictionData;
  playerName: string;
}

export function PredictionCard({ prediction, playerName }: PredictionCardProps) {
  const { predicted_points, confidence_interval, confidence_level } = prediction;

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-secondary/20 to-secondary/40 border-border shadow-orange">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-foreground">
          <Target className="h-5 w-5 text-primary" />
          Next Game Prediction
        </CardTitle>
        <p className="text-sm text-muted-foreground">{playerName}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Prediction */}
        <div className="text-center">
          <div className="relative">
            <div className="text-5xl font-bold text-primary mb-2 animate-slide-up">
              {predicted_points.toFixed(1)}
            </div>
            <div className="text-lg text-muted-foreground">Points</div>
          </div>
        </div>

        {/* Confidence Interval */}
        <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <BarChart3 className="h-4 w-4 text-primary" />
            {confidence_level}% Confidence Interval
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {confidence_interval.lower.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">Lower</div>
            </div>
            
            <div className="flex-1 mx-4">
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full"></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {confidence_interval.upper.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">Upper</div>
            </div>
          </div>
        </div>

        {/* Interpretation */}
        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-foreground font-medium mb-1">Prediction Insight</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                There's a {confidence_level}% probability that {playerName.split(' ')[0]} will score 
                between {confidence_interval.lower.toFixed(1)} and {confidence_interval.upper.toFixed(1)} points 
                in their next game.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}