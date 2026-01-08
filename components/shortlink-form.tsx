"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { links } from "@/lib/api/axios"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Links } from "@/types/link"

export const createShortLinkSchema = z.object({
  slug: z.string().optional(),
  url: z.string().url("URL not valid"),

});

export default function ShortLinkForm({
  data,
  onOpenChange,
  fromHomepage = false
}: {
  data?: Links,
  onOpenChange?: (open: boolean) => void,
  fromHomepage?: boolean
}) {
  const isEditMode = !!data;
  const submitButtonText = isEditMode ? "Update Link" : "Create New Link";
  const [customSlug, setCustomSlug] = useState(false)
  const { isLoggedIn } = useAuth()
  const form = useForm({
    resolver: zodResolver(createShortLinkSchema),
    defaultValues: {
      url: data?.url || "",
      slug: data?.slug || "",

    }
  })

  const linkId = data?.id


  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof createShortLinkSchema>) => {
      return links.post(`/links/new`, data)
    },
    onSuccess: async () => {
      toast.success("Link created successfully")
      queryClient.invalidateQueries({ queryKey: ['links'] });
      form.reset()
      if (fromHomepage) {
        router.replace('/dashboard')
      }
      onOpenChange?.(false)
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create link")
    }
  })
  const { mutate: edit } = useMutation({
    mutationFn: (data: z.infer<typeof createShortLinkSchema>) => {
      return links.put(`/links/${linkId}`, data)
    },
    onSuccess: async (data) => {
      toast.success(data.data.message)

      queryClient.invalidateQueries({ queryKey: ['links'] });
      form.reset()
      onOpenChange?.(false)
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update link")
    }
  })



  const router = useRouter()
  const onSubmit = (data: z.infer<typeof createShortLinkSchema>) => {
    if (!isLoggedIn) {
      router.replace('/auth/login')
      return
    }

    if (isEditMode) {
      edit(data)
    } else {
      mutate(data)
    }

  }

  const { isDirty, isSubmitting } = form.formState;


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between gap-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{isEditMode ? "Original Link" : "Paste your link here"}</FormLabel>
                <FormControl>
                  <Input disabled={isEditMode} placeholder="https://google.com/" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {customSlug || data ? <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Custom ShortLink</FormLabel>
                <FormControl>
                  <Input placeholder="short" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> : null}
        </div>
        <div className="flex gap-4">

          <Button
            disabled={isSubmitting || !isDirty}
            type="submit"
          >
            {isSubmitting ? "Loading..." : submitButtonText}
          </Button>
          {!data && <div className="flex items-center gap-2">
            <Label htmlFor="airplane-mode">Custom link?</Label>
            <Switch id="airplane-mode" onCheckedChange={setCustomSlug} defaultChecked={customSlug} />
          </div>}
        </div>
      </form>
    </Form>
  )
}