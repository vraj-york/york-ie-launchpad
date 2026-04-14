import { Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { DataTable, WhiteBox } from "@/components";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	DATA_TABLE_CONFIG,
	PROMO_CODE_MANAGEMENT_PAGE_CONTENT,
	PROMO_MANAGEMENT_UI,
} from "@/const";
import { getPromoCodeManagementColumns } from "@/tables";
import type { PromoCodeManagementRow } from "@/types";
import { PromoCodeManagementFiltersGroup } from "./PromoCodeManagementFiltersGroup";

const PAGE_SIZE = DATA_TABLE_CONFIG.defaultPageSize;

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
		code: "BSP50OFF2026",
		status: "disabled",
		discountPercent: 10,
		planLabel: "BSP Assessment (Individual)",
		planKey: "assessment_individual",
		usageUsed: 45,
		usageLimit: 100,
		expiryDate: "2026-06-30",
		createdAt: "2025-11-01T09:30:00.000Z",
	},
	{
		id: "promo-3",
		code: "SUMMER26",
		status: "active",
		discountPercent: 25,
		planLabel: "BSPBlueprint (Monthly)",
		planKey: "blueprint_monthly",
		usageUsed: 120,
		usageLimit: 150,
		expiryDate: "2026-09-01",
		createdAt: "2025-05-20T14:15:00.000Z",
	},
	{
		id: "promo-4",
		code: "LAUNCH100",
		status: "expired",
		discountPercent: 100,
		planLabel: "BSP Assessment (Individual)",
		planKey: "assessment_individual",
		usageUsed: 10,
		usageLimit: 10,
		expiryDate: "2025-03-15",
		createdAt: "2024-12-01T11:00:00.000Z",
	},
	{
		id: "promo-5",
		code: "TEAM50",
		status: "active",
		discountPercent: 50,
		planLabel: "BSP Assessment (Annual)",
		planKey: "assessment_annual",
		usageUsed: 3,
		usageLimit: 200,
		expiryDate: "2026-12-31",
		createdAt: "2025-09-03T16:45:00.000Z",
	},
	{
		id: "promo-6",
		code: "BSPFREETRIAL",
		status: "active",
		discountPercent: 100,
		planLabel: "BSPBlueprint (Monthly)",
		planKey: "blueprint_monthly",
		usageUsed: 5,
		usageLimit: 5,
		expiryDate: "2026-11-30",
		createdAt: "2025-10-10T08:00:00.000Z",
	},
	{
		id: "promo-7",
		code: "BETA20",
		status: "disabled",
		discountPercent: 20,
		planLabel: "BSP Assessment (Annual)",
		planKey: "assessment_annual",
		usageUsed: 88,
		usageLimit: 100,
		expiryDate: "2027-01-01",
		createdAt: "2025-03-22T13:20:00.000Z",
	},
	{
		id: "promo-8",
		code: "NEWYEAR15",
		status: "active",
		discountPercent: 15,
		planLabel: "BSP Assessment (Individual)",
		planKey: "assessment_individual",
		usageUsed: 200,
		usageLimit: 200,
		expiryDate: "2026-05-20",
		createdAt: "2025-01-05T12:00:00.000Z",
	},
];

export function PromoCodeManagementContent() {
	const [statusFilter, setStatusFilter] = useState("all");
	const [planFilter, setPlanFilter] = useState("all");
	const [timeFilter, setTimeFilter] = useState("all");
	const [searchInput, setSearchInput] = useState("");
	const [selectedIds, setSelectedIds] = useState<Set<string>>(
		() => new Set(),
	);

	const timeThresholdSec = useMemo(
		() => createdGteFromTimePeriodId(timeFilter),
		[timeFilter],
	);

	const filteredRows = useMemo(() => {
		const q = searchInput.trim().toLowerCase();
		return PROMO_DEMO_ROWS.filter((row) => {
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
	}, [searchInput, statusFilter, planFilter, timeThresholdSec]);

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

	const handleView = useCallback((row: PromoCodeManagementRow) => {
		toast.message(`Promo code: ${row.code}`);
	}, []);

	const handleEdit = useCallback((row: PromoCodeManagementRow) => {
		toast.message(`Edit: ${row.code}`);
	}, []);

	const handleDisable = useCallback((row: PromoCodeManagementRow) => {
		toast.message(`Disable: ${row.code}`);
	}, []);

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
			getPromoCodeManagementColumns(
				{
					pageRowIds,
					selectedIds,
					onToggleRow,
					onToggleAll,
				},
				{
					onView: handleView,
					onEdit: handleEdit,
					onDisable: handleDisable,
				},
			),
		[
			pageRowIds,
			selectedIds,
			onToggleRow,
			onToggleAll,
			handleView,
			handleEdit,
			handleDisable,
		],
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
					<PromoCodeManagementFiltersGroup
						className="ml-auto w-full sm:w-auto"
						statusFilter={statusFilter}
						onStatusChange={setStatusFilter}
						planFilter={planFilter}
						onPlanChange={setPlanFilter}
						timeFilter={timeFilter}
						onTimeChange={setTimeFilter}
					/>
				</div>

				<div className="min-w-0">
					<DataTable<PromoCodeManagementRow>
						data={filteredRows}
						columns={columns}
						pageSize={PAGE_SIZE}
						emptyMessage={PROMO_CODE_MANAGEMENT_PAGE_CONTENT.noData}
						fixedHeight
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
