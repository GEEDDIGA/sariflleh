import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <Card className="max-w-xl w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            sariflleh Dyad App
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This is your starter React + TypeScript + shadcn/ui application.
          </p>
          <Button className="gap-2">
            Get started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Index;
