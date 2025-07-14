import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/pages/Index";
import NotFound from "./components/pages/NotFound";
import ProfileWrapper from "./components/ProfileWrapper";
import { AuthProvider } from "./context/AuthContext";
import Library from "./components/pages/Library";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/perfil" element={<ProfileWrapper />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/biblioteca" element={<Library />} />
            <Route path="/mis-libros" element={<Library />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
