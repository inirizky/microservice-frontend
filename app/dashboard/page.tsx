'use client'
import { SectionCards } from "@/components/section-cards"

import data from "./data.json"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Calendar, Copy, ExternalLink, Link2, Plus } from "lucide-react"
import ShortLinkForm from "@/components/shortlink-form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { SiteHeader } from "@/components/site-header"
import { links } from "@/lib/api/axios"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { DeleteLinkDialog } from "@/components/delete-alert"
import EditLinkDialog from "@/components/edit-dialog"
import { Links } from "@/types/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useRequireAuth } from "@/lib/session"

export default function Page() {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedLink, setSelectedLink] = useState<Links | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FE_URL}/${text}`)
  }


  const { isLoading, error, data } = useQuery({
    queryKey: ['links'],
    queryFn: async () => (await links.get('/links')).data.data,
    refetchOnWindowFocus: false, // ga refetch tiap window focus
  });


  function handleEditDialog() {
    setShowEditDialog(!showEditDialog)
  }

  // const auth = useRequireAuth(); // otomatis redirect kalau belum login

  // if (!auth.isReady || !auth.isLoggedIn) return <div>Loading...</div>;

  return (
    <>
      <SiteHeader title="Dashboard" />
      <main className="@container/main flex flex-1 flex-col gap-2">

        <div className="flex flex-col gap-4 md:gap-6 px-4 lg:px-3">
          <SectionCards data={data} isLoading={isLoading} />


          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Create New Short Link </span>
              </CardTitle>
              <CardDescription>Enter a long URL to create a shortened version with analytics tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ShortLinkForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Your Links</span>
              </CardTitle>
              <CardDescription>Manage and track the performance of your shortened links</CardDescription>
            </CardHeader>
            <CardContent>
              {!isLoading ? <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow >

                      <TableHead>Original URL</TableHead>
                      <TableHead>Short Link</TableHead>
                      <TableHead>Created</TableHead>
                      {/* <TableHead>Recent Activity</TableHead> */}

                    </TableRow>
                  </TableHeader>


                  <TableBody className="">

                    {data?.map((link: any) => (
                      <TableRow key={link.id}>

                        <TableCell>
                          <div className="max-w-xs truncate" title={link.url}>
                            {link.url}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Link target="_blank" href={`/${link.slug}`} >
                              <Badge variant={'secondary'} className=" px-2 py-1 rounded-md text-sm">{link.slug}</Badge>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(link.slug)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center space-x-1 text-sm text-accent-foreground">
                            <Calendar className="h-4 w-4" />
                            <p>{new Date(link.createdAt).toLocaleString("id-ID")}</p>

                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <IconDotsVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>

                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => {
                                setSelectedLink(link)
                                setShowEditDialog(true)

                              }}>
                                <IconPencil className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedLink(link)
                                  setShowDeleteDialog(true)
                                }}
                              >
                                <IconTrash className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        {/*  */}
                      </TableRow>
                    ))}

                  </TableBody>
                </Table>
              </div> : (
                <Skeleton className="h-24 w-full" />
              )}
              {data?.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Link2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No links created yet. Create your first short link above!</p>
                </div>
              )}
            </CardContent>
          </Card >

          {selectedLink &&
            <>
              <EditLinkDialog
                link={selectedLink}
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
              />
              <DeleteLinkDialog
                linkId={selectedLink?.id}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
              />
            </>
          }
        </div >

      </main >

    </>

  )
}
