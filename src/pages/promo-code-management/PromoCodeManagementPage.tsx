import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PromoCodeManagementContent } from "@/components/promo-code-management";
import { Button } from "@/components/ui/button";
import { PROMO_CODE_MANAGEMENT_PAGE_CONTENT, ROUTES } from "@/const";
import { AppLayout } from "@/layout";

export function PromoCodeManagementPage() {
	const breadcrumbs = [
		{
			label: PROMO_CODE_MANAGEMENT_PAGE_CONTENT.breadcrumbsTitle,
			path: ROUTES.finance.promoCodes,
		},
	];

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<h1 className="text-heading-4 font-semibold text-text-foreground">
						{PROMO_CODE_MANAGEMENT_PAGE_CONTENT.title}
					</h1>
					<p className="text-small text-text-secondary">
						{PROMO_CODE_MANAGEMENT_PAGE_CONTENT.subtitle}
					</p>
				</div>
				<Button
					type="button"
					className="h-9 shrink-0 gap-1.5 rounded-lg px-4"
					onClick={() => toast.message(PROMO_CODE_MANAGEMENT_PAGE_CONTENT.addButton)}
				>
					<Plus className="size-4 shrink-0" aria-hidden />
					{PROMO_CODE_MANAGEMENT_PAGE_CONTENT.addButton}
				</Button>
			</div>
			<PromoCodeManagementContent />
		</AppLayout>
	);
}
