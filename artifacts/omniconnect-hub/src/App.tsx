import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Tracking from "@/pages/Tracking";
import Analytics from "@/pages/Analytics";
import Sustainability from "@/pages/Sustainability";
import Themes from "@/pages/Themes";

const queryClient = new QueryClient();

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Component to handle routing with separate layout for 404
function RouterWithLayoutLogic() {
  const [location] = useLocation();
  
  // صفحات صحيحة
  const validRoutes = ["/", "/tracking", "/analytics", "/sustainability", "/themes"];
  const isValidRoute = validRoutes.some(route => {
    // مطابقة دقيقة مع المسارات الكاملة، مع تجاهل BASE_URL
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
    const normalizedLocation = basePath ? location.replace(basePath, "") || "/" : location;
    return route === normalizedLocation;
  });

  return (
    <>
      {isValidRoute ? (
        <Layout>
          <Router />
        </Layout>
      ) : (
        <NotFound />
      )}
    </>
  );
}

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/">
          <PageWrapper>
            <Dashboard />
          </PageWrapper>
        </Route>
        <Route path="/tracking">
          <PageWrapper>
            <Tracking />
          </PageWrapper>
        </Route>
        <Route path="/analytics">
          <PageWrapper>
            <Analytics />
          </PageWrapper>
        </Route>
        <Route path="/sustainability">
          <PageWrapper>
            <Sustainability />
          </PageWrapper>
        </Route>
        <Route path="/themes">
          <PageWrapper>
            <Themes />
          </PageWrapper>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <RouterWithLayoutLogic />
            <Toaster />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
