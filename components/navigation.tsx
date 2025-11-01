"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PieChart,
  Newspaper,
  TrendingUp,
  Activity,
  Search,
  Moon,
  Sun,
  Clock,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

const navigation = [
  { name: "Market", href: "/", icon: LayoutDashboard },
  { name: "Sectors", href: "/sectors", icon: PieChart },
  { name: "ETFs", href: "/etfs", icon: Layers },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Analysis", href: "/analysis", icon: TrendingUp },
  { name: "Fear & Greed", href: "/fear-greed", icon: Activity },
  { name: "Hours", href: "/market-hours", icon: Clock },
];

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    // Update the timestamp every minute
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return lastUpdate.toLocaleTimeString();
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl hidden sm:inline-block">
                Trading Intelligence
              </span>
              <span className="font-bold text-xl sm:hidden">TI</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground mr-2">
              <Clock className="h-3 w-3" />
              <span>Last update: {formatLastUpdate()}</span>
              <Badge variant="outline" className="text-xs">
                {lastUpdate.toLocaleTimeString()}
              </Badge>
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Search className="h-4 w-4" />
            </Button>
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t overflow-x-auto">
        <div className="flex items-center gap-1 px-2 py-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-[10px]">{item.name.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
