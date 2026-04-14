import { Eye, MoreVertical, Pencil } from "lucide-react";
import { BSPBadge } from "@/components";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	PROMO_MANAGEMENT_UI,
	PROMO_ROW_ACTIONS,
	PROMO_STATUS_LABELS,
	PROMO_CODE_TABLE_LABELS,
} from "@/const";
import { cn } from "@/lib/utils";
import type {
	ColumnDef,
	PromoCodeColumnSelection,
	PromoCodeManagementRow,
	PromoCodeRowActions,
} from "@/types";
import { formatDateShort } from "@/utils";

const planBadgePill =
	"inline-flex h-[16px] w-[140px] max-w-[140px] shrink-0 items-center justify-center overflow-hidden rounded-lg px-1.5 text-xs font-medium leading-none";

function planBadgeClass(label: string): string {
	const l = label.toLowerCase();
	if (l.includes("monthly")) {
		return "bg-[color:var(--bspBlue50)] text-[color:var(--bspBlueBase)]";
	}
	if (l.includes("annual")) {
		return "bg-[color:var(--bspGreen50)] text-[color:var(--bspGreenBase)]";
	}
	if (l.includes("assessment")) {
		return "bg-[color:var(--bspYellow50)] text-[color:var(--bspYellow700)]";
	}
	return "bg-brand-gray-bg text-brand-gray-text";
}

function PromoStatusBadge({ row }: { row: PromoCodeManagementRow }) {
	const type =
		row.status === "active"
			? "active"
			: row.status === "disabled"
				? "promo_disabled"
				: "promo_expired";
	const label = PROMO_STATUS_LABELS[row.status];
	return <BSPBadge type={type}>{label}</BSPBadge>;
}

function PlanBadge({ row }: { row: PromoCodeManagementRow }) {
	if (!row.planLabel?.trim()) {
		return (
			<span className="text-muted-foreground">
				{PROMO_MANAGEMENT_UI.emptyCell}
			</span>
		);
	}
	return (
		<span
			className={cn(planBadgePill, planBadgeClass(row.planLabel), "truncate")}
			title={row.planLabel}
		>
			{row.planLabel}
		</span>
	);
}

export function getPromoCodeManagementColumns(
	selection?: PromoCodeColumnSelection,
	actions?: PromoCodeRowActions,
): ColumnDef<PromoCodeManagementRow>[] {
	const allSelected =
		selection !== undefined &&
		selection.pageRowIds.length > 0 &&
		selection.pageRowIds.every((id) => selection.selectedIds.has(id));
	const someSelected =
		selection?.pageRowIds.some((id) => selection.selectedIds.has(id)) &&
		!allSelected;

	return [
		{
			id: "select",
			header: "",
			minWidth: "4rem",
			headerClassName: "w-16 max-w-16 px-2",
			renderHeader:
				selection !== undefined
					? () => (
							<div className="flex items-center justify-center">
								<Checkbox
									checked={
										allSelected ? true : someSelected ? "indeterminate" : false
									}
									onCheckedChange={(v) => selection.onToggleAll(v === true)}
									aria-label="Select all promo codes on this page"
								/>
							</div>
						)
					: undefined,
			cell: (row) =>
				selection ? (
					<div className="flex items-center justify-center">
						<Checkbox
							checked={selection.selectedIds.has(row.id)}
							onCheckedChange={(v) => selection.onToggleRow(row.id, v === true)}
							aria-label={`Select promo code ${row.code}`}
						/>
					</div>
				) : null,
		},
		{
			id: "code",
			header: PROMO_CODE_TABLE_LABELS.code,
			accessorKey: "code",
			sortable: true,
			minWidth: "160px",
		},
		{
			id: "status",
			header: PROMO_CODE_TABLE_LABELS.status,
			accessorKey: "status",
			sortable: true,
			minWidth: "140px",
			cell: (row) => <PromoStatusBadge row={row} />,
		},
		{
			id: "discountPercent",
			header: PROMO_CODE_TABLE_LABELS.discount,
			accessorKey: "discountPercent",
			sortable: true,
			minWidth: "120px",
			cell: (row) => `${row.discountPercent}%`,
		},
		{
			id: "planLabel",
			header: PROMO_CODE_TABLE_LABELS.plan,
			accessorKey: "planLabel",
			sortable: true,
			minWidth: "220px",
			cell: (row) => <PlanBadge row={row} />,
		},
		{
			id: "usage",
			header: PROMO_CODE_TABLE_LABELS.usageLimit,
			sortable: true,
			minWidth: "130px",
			cell: (row) => `${row.usageUsed}/${row.usageLimit}`,
		},
		{
			id: "expiryDate",
			header: PROMO_CODE_TABLE_LABELS.expiryDate,
			accessorKey: "expiryDate",
			sortable: true,
			minWidth: "140px",
			cell: (row) => formatDateShort(row.expiryDate),
		},
		...(actions
			? [
					{
						id: "actions",
						header: PROMO_CODE_TABLE_LABELS.actions,
						minWidth: "92px",
						cell: (row: PromoCodeManagementRow) => (
							<div className="flex gap-1">
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									className="text-muted-foreground hover:text-foreground"
									aria-label={`${PROMO_ROW_ACTIONS.viewAriaLabel} ${row.code}`}
									onClick={() => actions.onView(row)}
								>
									<Eye className="size-4" aria-hidden />
								</Button>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											type="button"
											variant="ghost"
											size="icon-sm"
											className="text-muted-foreground hover:text-foreground"
											aria-label={`${PROMO_ROW_ACTIONS.moreActionsAriaLabel} ${row.code}`}
										>
											<MoreVertical className="size-4" aria-hidden />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="min-w-40 border-border/60 shadow-md"
									>
										<DropdownMenuItem onSelect={() => actions.onEdit(row)}>
											<Pencil className="size-4" aria-hidden />
											{PROMO_ROW_ACTIONS.menuEdit}
										</DropdownMenuItem>
										{row.status !== "disabled" ? (
											<DropdownMenuItem onSelect={() => actions.onDisable(row)}>
												{PROMO_ROW_ACTIONS.menuDisable}
											</DropdownMenuItem>
										) : null}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						),
					},
				]
			: []),
	];
}
