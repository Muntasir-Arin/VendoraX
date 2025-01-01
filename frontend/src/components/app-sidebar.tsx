import { ShoppingBag, Home, PackageSearch, Scan, LogOut, CircleDollarSign } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { handleLogout } from "@/lib/apollo-client";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon : Scan
  },
  
  {
    title: "My Products",
    url: "/dashboard/myproduct",
    icon: PackageSearch,
  },
  {
    title: "Purchase History",
    url: "/dashboard/purchasehistory",
    icon: ShoppingBag,
  },
  {
    title: "Lent/Sold",
    url: "/dashboard/lentsoldhistory",
    icon: CircleDollarSign,
  },

]

export function AppSidebar() {
  const navigate = useNavigate();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>VendoraX</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-orange-500 hover:text-black">
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-orange-500 hover:text-black">
                  <a onClick={() => {
                        handleLogout();
                        toast.success('Logged out successfully');
                        navigate('/');

                    }} >
                    <LogOut />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
