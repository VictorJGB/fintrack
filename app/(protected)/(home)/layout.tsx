
// components
import Header from "@/components/header";

type Props = {
  children: React.ReactNode;
}

export default function HomeLayout({
  children,
}: Readonly<Props>) {
  return (
    <div className="flex flex-col h-screen w-full">
      {/* header */}
      <Header />
      {/* main content */}
      <main className="size-full">
        {children}
      </main>
    </div>
  )
}