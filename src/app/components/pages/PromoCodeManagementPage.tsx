import { useMemo, useState } from 'react';
import {
  ArrowUpDown,
  Bell,
  ChevronDown,
  ChevronUp,
  Eye,
  Moon,
  MoreVertical,
  Plus,
  Search,
} from 'lucide-react';
import { PROMO_CODE_ROWS, type PromoCodeRow } from '../../data/promoCodesData';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const STATUS_BADGE: Record<
  PromoCodeRow['status'],
  { className: string }
> = {
  Active: {
    className:
      'border-transparent bg-[#F0FDF4] text-[#15803D] hover:bg-[#F0FDF4]',
  },
  Disabled: {
    className:
      'border-transparent bg-[#F3E8FF] text-[#6B21A8] hover:bg-[#F3E8FF]',
  },
  Expired: {
    className:
      'border-transparent bg-[#FEF2F2] text-[#B91C1C] hover:bg-[#FEF2F2]',
  },
};

const PLAN_BADGE: Record<
  PromoCodeRow['plan'],
  { className: string }
> = {
  'BSPBlueprint (Monthly)': {
    className: 'bg-[#EFF6FF] text-[#1D4ED8] border-0',
  },
  'BSP Assessment (Individual)': {
    className: 'bg-[#FFFBEB] text-[#B45309] border-0',
  },
  'BSP Assessment (Annual)': {
    className: 'bg-[#ECFDF5] text-[#047857] border-0',
  },
};

const sortableColumns = [
  { key: 'code', label: 'Promo Code' },
  { key: 'status', label: 'Status' },
  { key: 'discount', label: 'Discount' },
  { key: 'plan', label: 'Plan' },
  { key: 'usage', label: 'Usage Limit' },
  { key: 'expiry', label: 'Expiry Date' },
] as const;

export default function PromoCodeManagementPage() {
  const [rows] = useState(PROMO_CODE_ROWS);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const sortedRows = useMemo(() => {
    if (!sortCol) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      let cmp = 0;
      switch (sortCol) {
        case 'code':
          cmp = a.code.localeCompare(b.code);
          break;
        case 'status':
          cmp = a.status.localeCompare(b.status);
          break;
        case 'discount':
          cmp = a.discountPct - b.discountPct;
          break;
        case 'plan':
          cmp = a.plan.localeCompare(b.plan);
          break;
        case 'usage':
          cmp = a.usageCurrent / a.usageMax - b.usageCurrent / b.usageMax;
          break;
        case 'expiry':
          cmp = a.expiry.localeCompare(b.expiry);
          break;
        default:
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [rows, sortCol, sortDir]);

  const allSelected =
    sortedRows.length > 0 && sortedRows.every((r) => selected[r.id]);
  const someSelected = sortedRows.some((r) => selected[r.id]) && !allSelected;

  const toggleAll = (checked: boolean) => {
    const next: Record<string, boolean> = {};
    if (checked) sortedRows.forEach((r) => { next[r.id] = true; });
    setSelected(next);
  };

  const handleSort = (key: string) => {
    if (sortCol === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortCol(key);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortCol !== col)
      return <ArrowUpDown className="ml-1 size-3 text-muted-foreground/60" />;
    return sortDir === 'asc' ? (
      <ChevronUp className="ml-1 size-3 text-muted-foreground" />
    ) : (
      <ChevronDown className="ml-1 size-3 text-muted-foreground" />
    );
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-muted/60">
      {/* Top app bar */}
      <div className="flex h-[52px] flex-shrink-0 items-center gap-3 border-b border-border bg-card px-6">
        <h1 className="text-[15px] font-semibold text-foreground">
          Promo Code Management
        </h1>
        <div className="ml-auto flex items-center gap-1">
          <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
            <Moon className="size-[18px]" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="size-[18px]" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar className="size-8">
            <AvatarFallback className="bg-[#2563EB] text-xs font-medium text-white">
              AD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-semibold tracking-tight text-foreground">
                Promo Code Management
              </h2>
              <p className="mt-1 max-w-[540px] text-[13px] text-muted-foreground">
                Create, track, and manage promo codes across overall system.
              </p>
            </div>
            <Button
              type="button"
              className="h-9 gap-1.5 rounded-md bg-[#2563EB] px-4 text-[13px] font-medium text-white hover:bg-[#1D4ED8]"
            >
              <Plus className="size-4" />
              Add New Promo Code
            </Button>
          </div>

          <Card className="gap-0 overflow-hidden rounded-xl border border-border py-0 shadow-sm">
            <CardContent className="space-y-0 p-0">
              <div className="flex flex-wrap items-center gap-3 border-b border-border bg-card px-5 py-4">
                <div className="relative min-w-[200px] flex-1 max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search here..."
                    className="h-9 border-border bg-input-background pl-9 text-[13px] placeholder:text-muted-foreground"
                  />
                </div>
                <div className="ml-auto flex flex-wrap items-center gap-2">
                  <Select defaultValue="all-status">
                    <SelectTrigger className="h-9 w-[140px] border-border text-[13px]">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-status">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-plans">
                    <SelectTrigger className="h-9 w-[130px] border-border text-[13px]">
                      <SelectValue placeholder="All Plans" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-plans">All Plans</SelectItem>
                      <SelectItem value="monthly">BSPBlueprint (Monthly)</SelectItem>
                      <SelectItem value="individual">BSP Assessment (Individual)</SelectItem>
                      <SelectItem value="annual">BSP Assessment (Annual)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-time">
                    <SelectTrigger className="h-9 w-[120px] border-border text-[13px]">
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-time">All Time</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table className="text-[13px]">
                <TableHeader>
                  <TableRow className="border-b border-border bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-10 pl-5">
                      <Checkbox
                        checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                        onCheckedChange={(v) => toggleAll(v === true)}
                        aria-label="Select all"
                      />
                    </TableHead>
                    {sortableColumns.map(({ key, label }) => (
                      <TableHead
                        key={key}
                        className="cursor-pointer select-none text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                        onClick={() => handleSort(key)}
                      >
                        <span className="inline-flex items-center">
                          {label}
                          <SortIcon col={key} />
                        </span>
                      </TableHead>
                    ))}
                    <TableHead className="w-[100px] pr-5 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-b border-border bg-card hover:bg-muted/30"
                    >
                      <TableCell className="pl-5">
                        <Checkbox
                          checked={!!selected[row.id]}
                          onCheckedChange={(v) =>
                            setSelected((s) => ({
                              ...s,
                              [row.id]: v === true,
                            }))
                          }
                          aria-label={`Select ${row.code}`}
                        />
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">
                        {row.code}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${STATUS_BADGE[row.status].className}`}
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground">
                        {row.discountPct}%
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-medium ${PLAN_BADGE[row.plan].className}`}
                        >
                          {row.plan}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.usageCurrent}/{row.usageMax}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.expiry}
                      </TableCell>
                      <TableCell className="pr-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground"
                          >
                            <Eye className="size-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground"
                              >
                                <MoreVertical className="size-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem variant="destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-5 py-3">
                <p className="text-[12px] text-muted-foreground">
                  Showing {rows.length} of {rows.length} results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 text-[12px] text-muted-foreground"
                    disabled
                  >
                    <span className="text-xs">&lt;</span>
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 min-w-8 px-2 text-[12px] font-medium"
                  >
                    1
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 text-[12px] text-muted-foreground"
                    disabled
                  >
                    Next
                    <span className="text-xs">&gt;</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
