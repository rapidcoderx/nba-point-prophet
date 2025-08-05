import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PlayerSearch } from "@/components/PlayerSearch";
import { PredictionCard } from "@/components/PredictionCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";

interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
}

interface PredictionData {
  predicted_points: number;
  confidence_interval: {
    lower: number;
    upper: number;
  };
  confidence_level: number;
}

const Index = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock API call - replace with real Flask backend later
  const mockPredictAPI = async (playerName: string): Promise<PredictionData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500));
    
    // Simulate occasional errors
    if (Math.random() < 0.1) {
      throw new Error("Model temporarily unavailable. Please try again.");
    }
    
    // Generate realistic mock data based on player
    const basePoints = 15 + Math.random() * 20; // 15-35 points base
    const variance = 3 + Math.random() * 4; // 3-7 points variance
    
    return {
      predicted_points: basePoints,
      confidence_interval: {
        lower: Math.max(0, basePoints - variance),
        upper: basePoints + variance
      },
      confidence_level: 80
    };
  };

  const handlePredict = async () => {
    if (!selectedPlayer) {
      toast({
        title: "No Player Selected",
        description: "Please select a player first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // This would be your actual API call to Flask backend
      // const response = await fetch('/api/predict', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ player_name: selectedPlayer.name })
      // });
      // const data = await response.json();
      
      const data = await mockPredictAPI(selectedPlayer.name);
      setPrediction(data);
      
      toast({
        title: "Prediction Generated",
        description: `Successfully predicted points for ${selectedPlayer.name}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate prediction";
      setError(errorMessage);
      toast({
        title: "Prediction Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (selectedPlayer) {
      handlePredict();
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Player Search */}
        <PlayerSearch 
          onPlayerSelect={setSelectedPlayer}
          selectedPlayer={selectedPlayer}
        />

        {/* Predict Button */}
        <div className="text-center">
          <Button
            onClick={handlePredict}
            disabled={!selectedPlayer || loading}
            size="lg"
            className="bg-gradient-primary hover:shadow-orange transition-all duration-300 px-8 py-6 text-lg font-semibold"
          >
            {loading ? "Predicting..." : "Predict Next Game Points"}
          </Button>
        </div>

        {/* Results Area */}
        <div className="min-h-[200px] flex items-center justify-center">
          {loading && <LoadingSpinner />}
          
          {error && !loading && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}
          
          {prediction && !loading && !error && selectedPlayer && (
            <div className="animate-slide-up">
              <PredictionCard 
                prediction={prediction} 
                playerName={selectedPlayer.name}
              />
            </div>
          )}
          
          {!loading && !error && !prediction && (
            <div className="text-center space-y-4 text-muted-foreground">
              <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto">
                🏀
              </div>
              <p>Select a player and click "Predict" to see AI-powered point predictions</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
