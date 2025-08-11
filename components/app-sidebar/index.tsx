"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

// utils
import { appLinks } from "@/utils/routes";

// components
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import UserCombobox from "../header/user-combobox";
import NavButton from "./nav-button";

// icons
import Image from "next/image";

// assets
import logo from "@/public/images/fintrack_logo_02_no_bg.png";
import ModeToggle from "../mode-toggle";
import NavMenu from "./nav-menu";
// hooks

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const createQueryParamsUrl = (href: string, urlParams: object) => {
    const params = new URLSearchParams({ ...urlParams });
    return `${href}?${params.toString()}`
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4 flex-row">
        <Link className="flex gap-2 cursor-pointer" href={"/"}>
          <div className="size-5">
            <Image
              className="w-full object-cover"
              height={200}
              width={200}
              src={logo}
              alt=""
            />
          </div>
          <h1 className="font-bold text-xl text-primary">Fintrack</h1>
        </Link>
        <ModeToggle btnClassName="ml-auto" />
      </SidebarHeader>
      <Separator />
      <SidebarContent className="px-4 py-6">
        {appLinks.map(({ label, href, icon, urlParams, children }, index) => {
          if (children) {
            return (
              <NavMenu key={index} triggerLabel={label} links={children} icon={icon} />
            )
          }

          const path = urlParams ? createQueryParamsUrl(href, urlParams) : href

          return (
            <NavButton key={index} path={path} iconStr={icon} label={label} />
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <UserCombobox />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
