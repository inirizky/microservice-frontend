'use client'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { links } from "@/lib/api/axios"


export function DeleteLinkDialog({
	linkId,
	open,
	onOpenChange
}: {
	linkId: number,
	open: boolean
	onOpenChange: (open: boolean) => void
}) {

	const router = useRouter()
	const queryClient = useQueryClient()
	const { mutate: deleteLink } = useMutation({
		mutationFn: () => {
			return links.delete(`/links/${linkId}`)
		},
		onSuccess: async (data) => {
			toast.success(data.data.message)

			queryClient.invalidateQueries({ queryKey: ['links'] });

			onOpenChange(false)
		},
	})
	const handleDelete = async () => {

		// await deleteSupplier(supplier.id)
		deleteLink()

	}
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange} >

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle >Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete from your
						links and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button variant={'destructive'} onClick={() => handleDelete()}>Delete</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
