import { SignOutButton } from "@/features/auth/components/SignOutButton";
import MenuList from "./MenuList";

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
    <nav className="bg-primary-lighter flex h-full w-64 flex-col justify-between border-r border-gray-100 p-6 pt-20">
      <MenuList menuItems={menuItems} />
      <SignOutButton />
    </nav>
  );
}
