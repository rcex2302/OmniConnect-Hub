import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      dir="ltr"
      className="relative min-h-screen w-full bg-[#020617] text-white font-sans selection:bg-cyan-500/30"
    >
      {/* Background ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 start-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 end-0 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 start-0 w-[350px] h-[350px] bg-indigo-500/15 rounded-full blur-[120px]" />
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ps-72 relative z-10 min-h-screen flex flex-col">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
