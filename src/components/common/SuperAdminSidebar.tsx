import type { ComponentType } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  Wallet,
  ClipboardList,
  Landmark,
  Cpu,
  HeartPulse,
  ShieldCheck,
  ScrollText,
  Wrench,
  FileBarChart,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: number;
};

type NavGroup = { title: string; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Main",
    items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Administration",
    items: [
      { id: "corp-dir", label: "Corporation Directory", icon: Building2 },
      { id: "user-dir", label: "User Directory", icon: Users },
    ],
  },
  {
    title: "Users & Access",
    items: [{ id: "platform-users", label: "Platform Users", icon: UserCog }],
  },
  {
    title: "Finance",
    items: [
      { id: "billing", label: "Billing Overview", icon: Wallet },
      { id: "licenses", label: "License Management", icon: ClipboardList },
    ],
  },
  {
    title: "Assessments",
    items: [{ id: "question-bank", label: "Question Bank", icon: Landmark }],
  },
  {
    title: "BSPU",
    items: [
      { id: "bspu-overview", label: "BSPU Overview", icon: Cpu },
      { id: "system-health", label: "System Health", icon: HeartPulse },
      { id: "security", label: "Security Baselines", icon: ShieldCheck },
      { id: "audit", label: "Audit Logs", icon: ScrollText },
      { id: "maintenance", label: "Maintenance", icon: Wrench },
      { id: "reports", label: "Reports", icon: FileBarChart },
    ],
  },
  {
    title: "System",
    items: [
      { id: "notifications", label: "Notifications", icon: Bell, badge: 1 },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

interface SuperAdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeItemId?: string;
  onItemClick?: (id: string) => void;
  className?: string;
}

export function SuperAdminSidebar({
  isCollapsed,
  onToggle,
  activeItemId = "corp-dir",
  onItemClick,
  className,
}: SuperAdminSidebarProps) {
  return (
    <div
      className={cn(
        "relative flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex h-[72px] shrink-0 flex-col justify-center gap-1 border-b border-sidebar-border px-4 pt-3 pb-3">
        {!isCollapsed ? (
          <>
            <div className="flex h-2 w-12 items-center rounded-xs bg-sidebar-primary" aria-hidden />
            <p className="text-muted-foreground text-[11px] leading-tight">
              powered by BSPBlueprint
            </p>
          </>
        ) : (
          <div className="mx-auto size-2 rounded-xs bg-sidebar-primary" aria-hidden />
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="absolute -right-3 top-[26px] z-10 size-6 rounded-full border border-border bg-background shadow-sm hover:bg-muted"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="size-3" />
        ) : (
          <ChevronLeft className="size-3" />
        )}
      </Button>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-4 p-4 pb-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              {!isCollapsed && (
                <p className="text-muted-foreground px-3 text-xs font-medium tracking-wide">
                  {group.title}
                </p>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = item.id === activeItemId;
                return (
                  <Button
                    key={item.id}
                    type="button"
                    variant="ghost"
                    className={cn(
                      "h-9 w-full justify-start gap-3 px-3",
                      isCollapsed && "justify-center px-2",
                      active
                        ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                    onClick={() => onItemClick?.(item.id)}
                  >
                    <Icon className={cn("size-4 shrink-0", isCollapsed && "size-5")} />
                    {!isCollapsed && (
                      <span className="flex min-w-0 flex-1 items-center justify-between gap-2 truncate text-left text-sm font-normal">
                        <span className="truncate">{item.label}</span>
                        {item.badge != null && (
                          <Badge
                            variant="secondary"
                            className="h-5 min-w-5 border-transparent bg-destructive px-1.5 text-destructive-foreground"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
