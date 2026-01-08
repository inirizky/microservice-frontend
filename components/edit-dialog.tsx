
import { Links } from "@/types/link"
import ShortLinkForm from "./shortlink-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

export default function EditLinkDialog({
	link,
	open,
	onOpenChange
}: {
	link: Links
	open: boolean
	onOpenChange: (open: boolean) => void
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="">
				<DialogHeader>
					<DialogTitle>Edit Link</DialogTitle>
					<DialogDescription>
						Update the link details below.
					</DialogDescription>
				</DialogHeader>
				<ShortLinkForm data={link} onOpenChange={onOpenChange} />
			</DialogContent>
		</Dialog>
	)
}