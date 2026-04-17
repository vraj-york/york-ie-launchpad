import { Loader2, Send } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { INVITE_USER_FLOW_CONTENT } from "@/const";
import type { RoleCategoryOption, UserDirectoryFilterOption } from "@/types";

const emailOk = (value: string) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

type InviteUserDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	companyOptions: UserDirectoryFilterOption[];
	roleCategories: RoleCategoryOption[];
	optionsLoading?: boolean;
	onInviteSent: () => void;
};

export function InviteUserDialog({
	open,
	onOpenChange,
	companyOptions,
	roleCategories,
	optionsLoading = false,
	onInviteSent,
}: InviteUserDialogProps) {
	const C = INVITE_USER_FLOW_CONTENT;
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [companyId, setCompanyId] = useState<string>("");
	const [categoryId, setCategoryId] = useState<string>("");
	const [workPhone, setWorkPhone] = useState("");
	const [sending, setSending] = useState(false);

	const resetForm = useCallback(() => {
		setEmail("");
		setFirstName("");
		setLastName("");
		setCompanyId("");
		setCategoryId("");
		setWorkPhone("");
	}, []);

	useEffect(() => {
		if (!open) {
			resetForm();
			setSending(false);
		}
	}, [open, resetForm]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const fn = firstName.trim();
		const ln = lastName.trim();
		if (!fn || !ln) {
			toast.error(C.validationName);
			return;
		}
		if (!emailOk(email)) {
			toast.error(C.validationEmail);
			return;
		}
		if (!companyId) {
			toast.error(C.validationCompany);
			return;
		}
		if (!categoryId) {
			toast.error(C.validationCategory);
			return;
		}

		setSending(true);
		try {
			// Placeholder until a user-invite API is wired; simulates network latency.
			await new Promise((r) => setTimeout(r, 450));
			toast.success(C.successToast);
			onInviteSent();
			onOpenChange(false);
		} catch {
			toast.error(C.errorToast);
		} finally {
			setSending(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md gap-0 p-0 sm:max-w-lg">
				<DialogHeader className="border-b border-border px-6 py-5">
					<DialogTitle>{C.dialogTitle}</DialogTitle>
					<DialogDescription>{C.dialogDescription}</DialogDescription>
				</DialogHeader>
				<form onSubmit={(e) => void handleSubmit(e)} className="px-6 py-5">
					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="flex flex-col gap-2 sm:col-span-2">
								<Label htmlFor="invite-email">{C.emailLabel}</Label>
								<Input
									id="invite-email"
									type="email"
									autoComplete="email"
									placeholder={C.emailPlaceholder}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={sending}
									required
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="invite-first">{C.firstNameLabel}</Label>
								<Input
									id="invite-first"
									autoComplete="given-name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									disabled={sending}
									required
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="invite-last">{C.lastNameLabel}</Label>
								<Input
									id="invite-last"
									autoComplete="family-name"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									disabled={sending}
									required
								/>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="invite-company">{C.companyLabel}</Label>
							<Select
								value={companyId || undefined}
								onValueChange={setCompanyId}
								disabled={sending || optionsLoading}
							>
								<SelectTrigger
									id="invite-company"
									className="h-9 w-full"
									aria-label={C.companyLabel}
								>
									<SelectValue placeholder={C.companyPlaceholder} />
								</SelectTrigger>
								<SelectContent>
									{companyOptions.map((c) => (
										<SelectItem key={c.id} value={c.id}>
											{c.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="invite-category">{C.roleCategoryLabel}</Label>
							<Select
								value={categoryId || undefined}
								onValueChange={setCategoryId}
								disabled={sending || optionsLoading}
							>
								<SelectTrigger
									id="invite-category"
									className="h-9 w-full"
									aria-label={C.roleCategoryLabel}
								>
									<SelectValue placeholder={C.roleCategoryPlaceholder} />
								</SelectTrigger>
								<SelectContent>
									{roleCategories.map((cat) => (
										<SelectItem key={cat.id} value={cat.id}>
											{cat.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="invite-phone">{C.workPhoneLabel}</Label>
							<Input
								id="invite-phone"
								type="tel"
								autoComplete="tel"
								placeholder={C.workPhonePlaceholder}
								value={workPhone}
								onChange={(e) => setWorkPhone(e.target.value)}
								disabled={sending}
							/>
						</div>
					</div>

					<DialogFooter className="mt-6 gap-2 sm:gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={sending}
						>
							{C.cancelButton}
						</Button>
						<Button type="submit" disabled={sending || optionsLoading}>
							{sending ? (
								<Loader2 className="size-4 animate-spin" aria-hidden />
							) : (
								<Send className="size-4" aria-hidden />
							)}
							{sending ? C.sendingButton : C.sendInviteButton}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
