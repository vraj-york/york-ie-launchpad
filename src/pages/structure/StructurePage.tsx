import { Card, CardContent } from "@/components/ui/card";
import { ROUTES, STRUCTURE_PAGE_CONTENT } from "@/const";
import { AppLayout } from "@/layout";
import { cn } from "@/lib/utils";

function PlaceholderBlock({
	className,
	label,
	tall,
}: {
	className?: string;
	label?: string;
	tall?: boolean;
}) {
	return (
		<div
			className={cn(
				"rounded-xl border border-border/80 bg-linear-to-br from-muted/40 via-background to-muted/30 shadow-sm",
				tall ? "min-h-[220px] md:min-h-[280px]" : "min-h-[88px]",
				className,
			)}
		>
			{label ? (
				<div className="flex h-full items-center justify-center p-4">
					<span className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
						{label}
					</span>
				</div>
			) : null}
		</div>
	);
}

const avatarGradients = [
	"from-sky-500/90 to-blue-600",
	"from-violet-500/90 to-purple-600",
	"from-emerald-500/90 to-teal-600",
	"from-amber-500/90 to-orange-600",
] as const;

export function StructurePage() {
	const breadcrumbs = [
		{
			label: STRUCTURE_PAGE_CONTENT.breadcrumbsTitle,
			path: ROUTES.structure.root,
		},
	];

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="mx-auto max-w-6xl space-y-8">
				<div>
					<h1 className="text-heading-4 font-semibold text-text-foreground">
						{STRUCTURE_PAGE_CONTENT.title}
					</h1>
					<p className="mt-1 text-small text-text-secondary">
						{STRUCTURE_PAGE_CONTENT.subtitle}
					</p>
				</div>

				{/* Row 1 — four KPI cards */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{STRUCTURE_PAGE_CONTENT.statLabels.map((label) => (
						<Card
							key={label}
							className="border-border/80 shadow-md shadow-black/5"
						>
							<CardContent className="p-5">
								<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
									{label}
								</p>
								<p className="mt-2 text-2xl font-semibold tabular-nums text-text-foreground">
									—
								</p>
								<div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
									<div className="h-full w-2/3 rounded-full bg-primary/70" />
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Row 2 — two wide highlights */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{STRUCTURE_PAGE_CONTENT.highlightTitles.map((title) => (
						<Card
							key={title}
							className="overflow-hidden border-border/80 shadow-md shadow-black/5"
						>
							<CardContent className="p-0">
								<div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
									<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
										••
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-sm font-semibold text-text-foreground">
											{title}
										</p>
										<p className="mt-1 text-xs text-muted-foreground">
											Placeholder for alerts, summaries, or featured metrics.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Row 3 — two large main panels */}
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					{STRUCTURE_PAGE_CONTENT.mainPanelTitles.map((title) => (
						<Card
							key={title}
							className="border-border/80 shadow-md shadow-black/5"
						>
							<CardContent className="flex flex-col gap-4 p-6">
								<div className="flex items-center justify-between gap-2">
									<h2 className="text-sm font-semibold text-text-foreground">
										{title}
									</h2>
									<span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground uppercase">
										Chart
									</span>
								</div>
								<PlaceholderBlock tall label="Chart / table area" />
							</CardContent>
						</Card>
					))}
				</div>

				{/* Row 4 — three variable-width widgets */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
					<div className="md:col-span-4">
						<Card className="h-full border-border/80 shadow-md shadow-black/5">
							<CardContent className="p-5">
								<h2 className="text-sm font-semibold text-text-foreground">
									{STRUCTURE_PAGE_CONTENT.widgetTitles[0]}
								</h2>
								<PlaceholderBlock className="mt-4 min-h-[140px]" />
							</CardContent>
						</Card>
					</div>
					<div className="md:col-span-4">
						<Card className="h-full border-border/80 shadow-md shadow-black/5">
							<CardContent className="p-5">
								<h2 className="text-sm font-semibold text-text-foreground">
									{STRUCTURE_PAGE_CONTENT.widgetTitles[1]}
								</h2>
								<PlaceholderBlock className="mt-4 min-h-[140px]" />
							</CardContent>
						</Card>
					</div>
					<div className="md:col-span-4">
						<Card className="h-full border-border/80 shadow-md shadow-black/5">
							<CardContent className="p-5">
								<h2 className="text-sm font-semibold text-text-foreground">
									{STRUCTURE_PAGE_CONTENT.widgetTitles[2]}
								</h2>
								<PlaceholderBlock className="mt-4 min-h-[140px]" />
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Row 5 — circular avatars */}
				<Card className="border-border/80 shadow-md shadow-black/5">
					<CardContent className="flex flex-wrap items-center justify-center gap-8 py-10 sm:justify-between sm:gap-6">
						{STRUCTURE_PAGE_CONTENT.avatarLabels.map((label, i) => (
							<div key={label} className="flex flex-col items-center gap-2">
								<div
									className={cn(
										"flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br text-sm font-bold text-white shadow-lg ring-4 ring-background",
										avatarGradients[i],
									)}
									aria-hidden
								>
									{label.slice(0, 1)}
								</div>
								<span className="text-xs font-medium text-muted-foreground">
									{label}
								</span>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
