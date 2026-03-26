import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CorporationsDirectoryPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Corporation Directory</h1>
      <p className="text-muted-foreground text-sm">Select a corporation to view its profile.</p>
      <Button asChild>
        <Link to="/corporations/acme">Open Acme Corporation</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link to="/">Back to app home</Link>
      </Button>
    </div>
  );
}
