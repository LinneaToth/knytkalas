import { SignOutButton } from "@/features/auth/components/SignOutButton";
import MenuList from "./MenuList";
import Logo from "@/features/pageFrame/components/Logo";

export default function DashboardMenu() {
  const menuItems = [
    { label: "Events", icon: "calendar", href: "/dashboard/events" },
    {
      label: "Personal settings",
      icon: "settings",
      href: "/dashboard/profile",
    },
    {
      label: "Create event",
      icon: "plusCircle",
      href: "/dashboard/events/create",
    },
  ];

  return (
    <nav className="bg-primary flex h-full w-64 flex-col justify-between border-r border-gray-100 p-6">
      <div className="flex flex-col gap-20">
        <Logo />
        <MenuList menuItems={menuItems} />
      </div>
      <SignOutButton />
    </nav>
  );
}
