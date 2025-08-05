import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
}

// Mock NBA players data - replace with real API later
const mockPlayers: Player[] = [
  { id: "1", name: "LeBron James", team: "LAL", position: "SF" },
  { id: "2", name: "Stephen Curry", team: "GSW", position: "PG" },
  { id: "3", name: "Kevin Durant", team: "PHX", position: "SF" },
  { id: "4", name: "Giannis Antetokounmpo", team: "MIL", position: "PF" },
  { id: "5", name: "Jayson Tatum", team: "BOS", position: "SF" },
  { id: "6", name: "Luka Dončić", team: "DAL", position: "PG" },
  { id: "7", name: "Joel Embiid", team: "PHI", position: "C" },
  { id: "8", name: "Nikola Jokić", team: "DEN", position: "C" },
  { id: "9", name: "Damian Lillard", team: "MIL", position: "PG" },
  { id: "10", name: "Ben Simmons", team: "BKN", position: "PG" },
  { id: "11", name: "Anthony Davis", team: "LAL", position: "PF" },
  { id: "12", name: "Kawhi Leonard", team: "LAC", position: "SF" },
];

interface PlayerSearchProps {
  onPlayerSelect: (player: Player) => void;
  selectedPlayer: Player | null;
}

export function PlayerSearch({ onPlayerSelect, selectedPlayer }: PlayerSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Player[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = mockPlayers.filter(player =>
      player.name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(true);
  }, [query]);

  const handlePlayerSelect = (player: Player) => {
    onPlayerSelect(player);
    setQuery(player.name);
    setShowSuggestions(false);
  };

  const clearSelection = () => {
    setQuery("");
    onPlayerSelect(null as any);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search NBA players (e.g., 'ben sim')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-secondary/50 border-border focus:ring-primary focus:border-primary"
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSelection}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-secondary"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 bg-card border-border shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((player) => (
            <button
              key={player.id}
              onClick={() => handlePlayerSelect(player)}
              className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0 focus:outline-none focus:bg-secondary/50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-foreground">{player.name}</div>
                  <div className="text-sm text-muted-foreground">{player.position}</div>
                </div>
                <div className="text-sm font-medium text-primary">{player.team}</div>
              </div>
            </button>
          ))}
        </Card>
      )}

      {selectedPlayer && (
        <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-border relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{selectedPlayer.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedPlayer.position} • {selectedPlayer.team}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}