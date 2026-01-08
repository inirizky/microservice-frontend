import Navbar from "@/components/navbar";
import ShortLinkForm from "@/components/shortlink-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center w-full">
      <Navbar />
      <Card className=" w-2xl border-primary/50 shadow-primary shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create New Short Link</span>
          </CardTitle>
          <CardDescription>Enter a long URL to create a shortened version with analytics tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <ShortLinkForm fromHomepage={true} />
        </CardContent>
      </Card>
    </div>
  );
}
