import type { ComponentType } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import {
  BarChart2,
  BookOpen,
  Building2,
  CreditCard,
  FileText,
  Hexagon,
  LayoutDashboard,
  Library,
  LineChart,
  Mail,
  PanelLeft,
  Settings,
  Shield,
  Tag,
  UserCircle,
  Users,
  Wallet,
} from 'lucide-react';

type NavLeaf =
  | { type: 'link'; label: string; path: string; icon: ComponentType<{ size?: number; className?: string }> }
  | { type: 'button'; label: string; icon: ComponentType<{ size?: number; className?: string }> };

type NavGroup = { title: string; items: NavLeaf[] };

const navGroups: NavGroup[] = [
  {
    title: 'Main',
    items: [{ type: 'link', label: 'Dashboard', path: '/projects', icon: LayoutDashboard }],
  },
  {
    title: 'Administration',
    items: [
      { type: 'button', label: 'Corporation Directory', icon: Building2 },
      { type: 'button', label: 'Company Directory', icon: Building2 },
    ],
  },
  {
    title: 'Users & Access',
    items: [
      { type: 'button', label: 'User Directory', icon: Users },
      { type: 'button', label: 'Roles & Permissions', icon: Shield },
      { type: 'button', label: 'Coaches', icon: UserCircle },
    ],
  },
  {
    title: 'Finance',
    items: [
      { type: 'button', label: 'Plans & Pricing', icon: CreditCard },
      { type: 'button', label: 'Billing Management', icon: Wallet },
      { type: 'button', label: 'Invoice Management', icon: FileText },
      { type: 'link', label: 'Promo Code Management', path: '/promo-codes', icon: Tag },
    ],
  },
  {
    title: 'Assessments',
    items: [
      { type: 'button', label: 'Invite Management', icon: Mail },
      { type: 'button', label: 'Introduction & Instructions', icon: BookOpen },
      { type: 'button', label: 'Question Bank', icon: Library },
      { type: 'button', label: 'Assessment Results', icon: BarChart2 },
    ],
  },
  {
    title: 'Insights',
    items: [{ type: 'button', label: 'Reports', icon: LineChart }],
  },
];

function Avatar({
  initials,
  color,
  size = 'sm',
}: {
  initials: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-7 h-7 text-[11px]',
    lg: 'w-8 h-8 text-[12px]',
  };
  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full font-semibold text-white`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

export { Avatar };

function NavRow({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] transition-colors ${
        active
          ? 'bg-[#2563EB] font-medium text-white'
          : 'font-normal text-sidebar-foreground hover:bg-sidebar-accent'
      }`}
    >
      {children}
    </div>
  );
}

export default function Layout() {
  const location = useLocation();

  return (
    <div
      className="flex h-screen overflow-hidden bg-background"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex h-[52px] shrink-0 items-center justify-between border-b border-sidebar-border px-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]">
              <Hexagon className="size-4 text-white" strokeWidth={2} />
            </div>
            <span className="truncate text-[13px] font-semibold leading-tight text-foreground">
              BSPBlueprint
            </span>
          </div>
          <button
            type="button"
            className="rounded p-1.5 text-muted-foreground hover:bg-sidebar-accent"
            aria-label="Collapse sidebar"
          >
            <PanelLeft size={16} />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
          {navGroups.map((group) => (
            <div key={group.title} className="mb-4">
              <div className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  if (item.type === 'link') {
                    const isActive =
                      location.pathname === item.path ||
                      location.pathname.startsWith(`${item.path}/`) ||
                      (item.path === '/projects' && location.pathname === '/');
                    return (
                      <NavLink
                        key={item.path + item.label}
                        to={item.path}
                        className="block"
                        end={item.path !== '/projects'}
                      >
                        <NavRow active={isActive}>
                          <Icon size={15} className={isActive ? 'text-white' : 'text-muted-foreground'} />
                          <span className="flex-1 truncate">{item.label}</span>
                        </NavRow>
                      </NavLink>
                    );
                  }
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className="w-full text-left"
                    >
                      <NavRow active={false}>
                        <Icon size={15} className="text-muted-foreground" />
                        <span className="flex-1 truncate">{item.label}</span>
                      </NavRow>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-sidebar-border p-3">
          <button
            type="button"
            className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-sidebar-accent"
          >
            <Avatar initials="SK" color="#3B82F6" size="md" />
            <div className="min-w-0 flex-1 text-left">
              <div className="truncate text-[12px] font-medium text-foreground">
                Sarah Kim
              </div>
              <div className="truncate text-[11px] text-muted-foreground">
                sarah.kim@firmname.com
              </div>
            </div>
            <Settings size={13} className="shrink-0 text-muted-foreground" />
          </button>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
