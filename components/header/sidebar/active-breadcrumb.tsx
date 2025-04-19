import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

interface ActiveRoute {
  label: string,
  href: string,
  pathname: string
}


export default function ActiveBreadcrumb({ href, label, pathname }: ActiveRoute) {
  const isHomePage = pathname === '/'

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {isHomePage && (
          <>
            <BreadcrumbItem className="hidden md:block">
              Gerenciamento
            </BreadcrumbItem>
          </>
        )}

        {!isHomePage && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">
                Gerenciamento
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{label}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}