import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SuperAdminSidebar } from "@/components/common/SuperAdminSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  PanelLeft,
  Pencil,
} from "lucide-react";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <div className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
        <span className="text-muted-foreground text-sm leading-normal">{label}</span>
        <span className="text-foreground text-sm font-medium leading-normal">{value}</span>
      </div>
      <Separator />
    </>
  );
}

export function CorporationProfileOverviewPage() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="bg-background text-foreground flex min-h-screen">
      <SuperAdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
        activeItemId="corp-dir"
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="border-border flex h-14 shrink-0 items-center justify-between border-b px-6">
          <Breadcrumb>
            <BreadcrumbList className="text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/corporations" className="text-muted-foreground">
                    Corporation Directory
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-normal">Acme Corporation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" size="icon" className="size-9 rounded-md" aria-label="Toggle panel">
              <PanelLeft className="size-4" />
            </Button>
            <Avatar className="size-9">
              <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                SU
              </AvatarFallback>
            </Avatar>
            <Separator orientation="vertical" className="h-6" />
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-auto px-6 pb-8 pt-6">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-muted-foreground h-8 w-fit gap-1 px-0 hover:bg-transparent"
                  onClick={() => navigate("/")}
                >
                  <ChevronLeft className="size-4" />
                  Back
                </Button>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <h1 className="text-foreground text-2xl font-semibold leading-tight tracking-tight">
                    Acme Corporation
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-border bg-muted/50 text-foreground font-normal"
                    >
                      CORP-001
                    </Badge>
                    <Badge className="border-transparent bg-primary text-primary-foreground font-normal">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                <Button type="button" variant="outline" className="gap-2">
                  <Pencil className="size-4" />
                  Edit
                </Button>
                <Button type="button" variant="secondary">
                  Suspend
                </Button>
                <Button type="button" variant="destructive">
                  Close Corporation
                </Button>
              </div>
            </div>

            <Tabs defaultValue="basic" className="w-full gap-6">
              <TabsList className="bg-muted text-muted-foreground h-auto w-full flex-wrap justify-start gap-1 rounded-xl p-1 sm:w-fit">
                <TabsTrigger value="basic" className="rounded-lg px-3 py-2">
                  Basic Info.
                </TabsTrigger>
                <TabsTrigger value="contacts" className="rounded-lg px-3 py-2">
                  Key Contacts
                </TabsTrigger>
                <TabsTrigger value="plan" className="rounded-lg px-3 py-2">
                  Plan & Seats
                </TabsTrigger>
                <TabsTrigger value="config1" className="rounded-lg px-3 py-2">
                  Configuration
                </TabsTrigger>
                <TabsTrigger value="config2" className="rounded-lg px-3 py-2">
                  Configuration
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card className="gap-0 py-6 shadow-none">
                    <CardHeader className="border-border gap-1 border-b px-6 pb-4 pt-0">
                      <CardTitle className="text-base font-semibold">Corporation Basics</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-0 px-6 pt-0 pb-0">
                      <DetailRow label="Corporation Legal Name" value="Acme Corporation" />
                      <DetailRow label="DBA Name" value="Acme Inc." />
                      <DetailRow label="Corporate Phone No." value="+1 (555) 123-4567" />
                      <DetailRow label="Region (Data Residency)" value="North America" />
                      <DetailRow label="Industry" value="Technology SaaS" />
                      <DetailRow label="Website URL" value="www.acmecroporation.com" />
                      <DetailRow label="Address" value="3B 742 Evergreen St, Plano, TX 75024, USA" />
                      <DetailRow label="Time Zone" value="EST (Eastern Time)" />
                      <div className="flex flex-col gap-1 py-3">
                        <span className="text-muted-foreground text-sm leading-normal">Created On</span>
                        <span className="text-foreground text-sm font-medium leading-normal">01-15-2025</span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col gap-6">
                    <Card className="gap-0 py-6 shadow-none">
                      <CardHeader className="border-border gap-1 border-b px-6 pb-4 pt-0">
                        <CardTitle className="text-base font-semibold">Executive Sponsor</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-0 px-6 pt-0 pb-0">
                        <DetailRow label="Name" value="Mike Davis" />
                        <DetailRow label="Role" value="CEO" />
                        <DetailRow label="Email" value="mike_davis@email.com" />
                        <DetailRow label="Work Phone No." value="+1 (555) 987-6543" />
                        <div className="flex flex-col gap-1 py-3">
                          <span className="text-muted-foreground text-sm leading-normal">Cell Phone No.</span>
                          <span className="text-foreground text-sm font-medium leading-normal">
                            +1 (555) 987-2399
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="gap-0 py-6 shadow-none">
                      <CardHeader className="border-border gap-1 border-b px-6 pb-4 pt-0">
                        <CardTitle className="text-base font-semibold">Key Contacts</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-0 px-6 pt-0 pb-0">
                        <DetailRow label="Primary Corporate Admin" value="Nolan Thrust" />
                        <DetailRow label="Billing/ Finance Contact" value="Luther Creed" />
                        <div className="flex flex-col gap-1 py-3">
                          <span className="text-muted-foreground text-sm leading-normal">
                            Legal/ Compliance Contact
                          </span>
                          <span className="text-foreground text-sm font-medium leading-normal">
                            Layla Hussain
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contacts">
                <p className="text-muted-foreground text-sm">Key contacts content would appear here.</p>
              </TabsContent>
              <TabsContent value="plan">
                <p className="text-muted-foreground text-sm">Plan &amp; seats content would appear here.</p>
              </TabsContent>
              <TabsContent value="config1">
                <p className="text-muted-foreground text-sm">Configuration content would appear here.</p>
              </TabsContent>
              <TabsContent value="config2">
                <p className="text-muted-foreground text-sm">Configuration content would appear here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
