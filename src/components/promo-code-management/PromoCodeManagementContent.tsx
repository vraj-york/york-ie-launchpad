import { Download, Search, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { DataTable, WhiteBox } from "@/components";
import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	DATA_TABLE_CONFIG,
	PROMO_BULK_ACTIONS,
	PROMO_CODE_MANAGEMENT_PAGE_CONTENT,
	PROMO_CODE_TABLE_LABELS,
	PROMO_MANAGEMENT_UI,
	PROMO_STATUS_LABELS,
} from "@/const";
import { getPromoCodeManagementColumns } from "@/tables";
import type { PromoCodeManagementRow } from "@/types";
import { formatDateShort } from "@/utils";
import { PromoCodeManagementFiltersGroup } from "./PromoCodeManagementFiltersGroup";

const PAGE_SIZE = DATA_TABLE_CONFIG.defaultPageSize;

/** Matches Figma default: four rows pre-selected. */
const PROMO_INITIAL_SELECTED_IDS = [
	"promo-2",
	"promo-3",
	"promo-5",
	"promo-6",
] as const;

function createdGteFromTimePeriodId(id: string): number | undefined {
	if (!id || id === "all") return undefined;
	const now = Math.floor(Date.now() / 1000);
	const day = 86400;
	switch (id) {
		case "1h":
			return now - 3600;
		case "7d":
			return now - 7 * day;
		case "30d":
			return now - 30 * day;
		case "3m":
			return now - 90 * day;
		case "6m":
			return now - 180 * day;
		case "1y":
			return now - 365 * day;
		default:
			return undefined;
	}
}

function statusLabelForRow(row: PromoCodeManagementRow): string {
	return PROMO_STATUS_LABELS[row.status];
}

function escapeCsvField(value: string): string {
	if (/[",\n]/.test(value)) {
		return `"${value.replace(/"/g, '""')}"`;
	}
	return value;
}

function downloadPromoCodesCsv(rows: PromoCodeManagementRow[]) {
	const headers = [
		PROMO_CODE_TABLE_LABELS.code,
		PROMO_CODE_TABLE_LABELS.status,
		PROMO_CODE_TABLE_LABELS.discount,
		PROMO_CODE_TABLE_LABELS.plan,
		PROMO_CODE_TABLE_LABELS.usageLimit,
		PROMO_CODE_TABLE_LABELS.expiryDate,
	];
	const lines = [
		headers.map(escapeCsvField).join(","),
		...rows.map((r) =>
			[
				escapeCsvField(r.code),
				escapeCsvField(statusLabelForRow(r)),
				escapeCsvField(String(r.discountPercent)),
				escapeCsvField(r.planLabel),
				escapeCsvField(`${r.usageUsed}/${r.usageLimit}`),
				escapeCsvField(formatDateShort(r.expiryDate)),
			].join(","),
		),
	];
	const blob = new Blob([lines.join("\n")], {
		type: "text/csv;charset=utf-8;",
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "promo-codes.csv";
	a.click();
	URL.revokeObjectURL(url);
}

const PROMO_DEMO_ROWS: PromoCodeManagementRow[] = [
	{
		id: "promo-1",
		code: "BSP100OFF",
		status: "active",
		discountPercent: 100,
		planLabel: "BSPBlueprint (Monthly)",
		planKey: "blueprint_monthly",
		usageUsed: 99,
		usageLimit: 100,
		expiryDate: "2026-01-15",
		createdAt: "2025-08-12T10:00:00.000Z",
	},
	{
		id: "promo-2",
		code: "WELCOME10",
		status: "active",
		discountPercent: 10,
		planLabel: "BSP Assessment (Individual)",
		planKey: "assessment_individual",
		usageUsed: 12,
		usageLimit: 500,
		expiryDate: "2026-08-01",
		createdAt: "2025-09-01T09:00:00.000Z",
	},
	{
		id: "promo-3",
		code: "SAVE20",
		status: "disabled",
		discountPercent: 20,
		planLabel: "BSPBlueprint (Monthly)",
		planKey: "blueprint_monthly",
		usageUsed: 44,
		usageLimit: 100,
		expiryDate: "2026-03-20",
		createdAt: "2025-04-10T11:00:00.000Z",
	},
	{
		id: "promo-4",
		code: "OLDCODE",
		status: "expired",
		discountPercent: 15,
		planLabel: "BSP Assessment (Annual)",
		planKey: "assessment_annual",
		usageUsed: 200,
		usageLimit: 200,
		expiryDate: "2025-03-15",
		createdAt: "2024-06-01T12:00:00.000Z",
	},
	{
		id: "promo-5",
		code: "FLASH50",
		status: "expired",
		discountPercent: 50,
		planLabel: "BSP Assessment (Individual)",
		planKey: "assessment_individual",
		usageUsed: 10,
		usageLimit: 50,
		expiryDate: "2025-11-01",
		createdAt: "2025-01-15T08:00:00.000Z",
	},
	{
		id: "promo-6",
		code: "TRIAL7",
		status: "active",
		discountPercent: 100,
		planLabel: "BSPBlueprint (Monthly)",
		planKey: "blueprint_monthly",
		usageUsed: 3,
		usageLimit: 10,
		expiryDate: "2026-12-31",
		createdAt: "2025-10-20T14:00:00.000Z",
	},
	{
		id: "promo-7",
		code: "LASTCHANCE",
		status: "active",
		activeBadgeTone: "destructive",
		discountPercent: 25,
		planLabel: "BSP Assessment (Individual)",
		planKey: "assessment_individual",
		usageUsed: 99,
		usageLimit: 100,
		expiryDate: "2026-02-28",
		createdAt: "2025-07-07T10:00:00.000Z",
	},
	{
		id: "promo-8",
		code: "HOLD21",
		status: "disabled",
		discountPercent: 21,
		planLabel: "BSP Assessment (Annual)",
		planKey: "assessment_annual",
		usageUsed: 0,
		usageLimit: 100,
		expiryDate: "2027-01-01",
		createdAt: "2025-02-28T16:00:00.000Z",
	},
];

export function PromoCodeManagementContent() {
	const [statusFilter, setStatusFilter] = useState("all");
	const [planFilter, setPlanFilter] = useState("all");
	const [timeFilter, setTimeFilter] = useState("all");
	const [searchInput, setSearchInput] = useState("");
	const [removedIds, setRemovedIds] = useState<Set<string>>(() => new Set());
	const [selectedIds, setSelectedIds] = useState<Set<string>>(
		() => new Set(PROMO_INITIAL_SELECTED_IDS),
	);

	const timeThresholdSec = useMemo(
		() => createdGteFromTimePeriodId(timeFilter),
		[timeFilter],
	);

	const visibleSourceRows = useMemo(
		() => PROMO_DEMO_ROWS.filter((r) => !removedIds.has(r.id)),
		[removedIds],
	);

	const filteredRows = useMemo(() => {
		const q = searchInput.trim().toLowerCase();
		return visibleSourceRows.filter((row) => {
			if (statusFilter !== "all" && row.status !== statusFilter) {
				return false;
			}
			if (planFilter !== "all" && row.planKey !== planFilter) {
				return false;
			}
			if (timeThresholdSec !== undefined) {
				const createdSec = Math.floor(
					new Date(row.createdAt).getTime() / 1000,
				);
				if (createdSec < timeThresholdSec) return false;
			}
			if (q && !row.code.toLowerCase().includes(q)) {
				return false;
			}
			return true;
		});
	}, [searchInput, statusFilter, planFilter, timeThresholdSec, visibleSourceRows]);

	const pageRowIds = useMemo(
		() => filteredRows.map((r) => r.id),
		[filteredRows],
	);

	const onToggleRow = useCallback((id: string, checked: boolean) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (checked) next.add(id);
			else next.delete(id);
			return next;
		});
	}, []);

	const onToggleAll = useCallback(
		(checked: boolean) => {
			setSelectedIds((prev) => {
				const next = new Set(prev);
				if (checked) {
					for (const id of pageRowIds) next.add(id);
				} else {
					for (const id of pageRowIds) next.delete(id);
				}
				return next;
			});
		},
		[pageRowIds],
	);

	const handleBulkDelete = useCallback(() => {
		if (selectedIds.size === 0) return;
		const n = selectedIds.size;
		setRemovedIds((prev) => {
			const next = new Set(prev);
			for (const id of selectedIds) next.add(id);
			return next;
		});
		setSelectedIds(new Set());
		toast.success(
			n === 1 ? "1 promo code removed." : `${n} promo codes removed.`,
		);
	}, [selectedIds]);

	const handleExportCsv = useCallback(() => {
		const rows = filteredRows.filter((r) => selectedIds.has(r.id));
		if (rows.length === 0) return;
		downloadPromoCodesCsv(rows);
		toast.success("CSV exported.");
	}, [filteredRows, selectedIds]);

	useEffect(() => {
		setSelectedIds((prev) => {
			const next = new Set<string>();
			for (const id of prev) {
				if (pageRowIds.includes(id)) next.add(id);
			}
			return next;
		});
	}, [pageRowIds]);

	const columns = useMemo(
		() =>
			getPromoCodeManagementColumns({
				pageRowIds,
				selectedIds,
				onToggleRow,
				onToggleAll,
			}),
		[pageRowIds, selectedIds, onToggleRow, onToggleAll],
	);

	return (
		<WhiteBox>
			<div className="flex flex-col gap-6">
				<div className="flex w-full min-w-0 flex-wrap items-center gap-2.5">
					<InputGroup className="min-w-48 flex-1 rounded-lg sm:min-w-64 sm:max-w-80">
						<InputGroupAddon align="inline-start">
							<Search className="size-3.5 text-muted-foreground" aria-hidden />
						</InputGroupAddon>
						<InputGroupInput
							type="search"
							placeholder={PROMO_CODE_MANAGEMENT_PAGE_CONTENT.searchPlaceholder}
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							aria-label={PROMO_MANAGEMENT_UI.searchAriaLabel}
						/>
					</InputGroup>
					{selectedIds.size > 0 ? (
						<div className="ml-auto flex min-w-0 max-w-full flex-wrap items-center justify-end gap-3 sm:gap-4">
							<p className="text-sm whitespace-nowrap text-text-secondary">
								{PROMO_BULK_ACTIONS.itemsSelected(selectedIds.size)}
							</p>
							<div className="flex flex-wrap items-center gap-2">
								<Button
									type="button"
									variant="outline"
									size="sm"
									className="h-9 gap-1.5 rounded-lg border-destructive text-destructive hover:bg-destructive/10"
									onClick={handleBulkDelete}
								>
									<Trash2 className="size-4 shrink-0" aria-hidden />
									{PROMO_BULK_ACTIONS.delete}
								</Button>
								<Button
									type="button"
									variant="outline"
									size="sm"
									className="h-9 gap-1.5 rounded-lg"
									onClick={handleExportCsv}
								>
									<Download className="size-4 shrink-0" aria-hidden />
									{PROMO_BULK_ACTIONS.exportCsv}
								</Button>
							</div>
						</div>
					) : (
						<PromoCodeManagementFiltersGroup
							className="ml-auto w-full sm:w-auto"
							statusFilter={statusFilter}
							onStatusChange={setStatusFilter}
							planFilter={planFilter}
							onPlanChange={setPlanFilter}
							timeFilter={timeFilter}
							onTimeChange={setTimeFilter}
						/>
					)}
				</div>

				<div className="min-w-0">
					<DataTable<PromoCodeManagementRow>
						data={filteredRows}
						columns={columns}
						pageSize={PAGE_SIZE}
						emptyMessage={PROMO_CODE_MANAGEMENT_PAGE_CONTENT.noData}
						fixedHeight
						paginationSummary="endTotal"
						initialSort={{
							column: "code",
							direction: "asc",
						}}
					/>
				</div>
			</div>
		</WhiteBox>
	);
}
