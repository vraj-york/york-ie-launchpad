import type { ReactNode } from "react";
import { ROUTES, TEST_UI_PAGE_CONTENT } from "@/const";
import { AppLayout } from "@/layout";
import { cn } from "@/lib/utils";

function PlaceholderBlock({
	className,
	children,
}: {
	className?: string;
	children?: ReactNode;
}) {
	return (
		<div
			className={cn(
				"rounded-lg border border-border bg-muted/40 min-h-[4.5rem] flex items-center justify-center text-xs font-medium text-muted-foreground",
				className,
			)}
		>
			{children}
		</div>
	);
}

export function TestUiPage() {
	const breadcrumbs = [
		{ label: TEST_UI_PAGE_CONTENT.title, path: ROUTES.testUi.root },
	];

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="mb-6">
				<h1 className="text-heading-4 font-semibold text-text-foreground">
					{TEST_UI_PAGE_CONTENT.title}
				</h1>
				<p className="text-small text-text-secondary mt-1">
					{TEST_UI_PAGE_CONTENT.subtitle}
				</p>
			</div>

			<div className="flex flex-col gap-4 max-w-6xl">
				{/* Row 1: four thin KPI-style bars */}
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
					{[1, 2, 3, 4].map((i) => (
						<PlaceholderBlock key={i} className="min-h-10" />
					))}
				</div>

				{/* Row 2: two half-width blocks */}
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
					<PlaceholderBlock className="min-h-[7rem]" />
					<PlaceholderBlock className="min-h-[7rem]" />
				</div>

				{/* Row 3: two large main panels */}
				<div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
					<PlaceholderBlock className="min-h-[14rem]" />
					<PlaceholderBlock className="min-h-[14rem]" />
				</div>

				{/* Row 4: narrow | wider | wider */}
				<div className="grid grid-cols-1 gap-3 md:grid-cols-12">
					<PlaceholderBlock className="min-h-[6rem] md:col-span-3" />
					<PlaceholderBlock className="min-h-[6rem] md:col-span-4" />
					<PlaceholderBlock className="min-h-[6rem] md:col-span-5" />
				</div>

				{/* Row 5: four circles */}
				<div className="flex flex-wrap items-center justify-center gap-6 py-2 sm:justify-between sm:gap-4">
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className="size-14 shrink-0 rounded-full border-2 border-dashed border-border bg-muted/30"
							aria-hidden
						/>
					))}
				</div>
			</div>
		</AppLayout>
	);
}
