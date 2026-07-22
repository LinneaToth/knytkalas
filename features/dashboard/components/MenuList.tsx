"use client";
import React from "react";
import { Calendar, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  menuItems: {
    label: string;
    icon: string;
    href: string;
  }[];
};

export default function MenuList({ menuItems }: Props) {
  const pathname = usePathname();

  return (
    <ul className="space-y-2">
      {menuItems.map((item, index: number) => {
        const isActive =
          pathname === item.href ||
          (pathname.includes(item.href) &&
            pathname.includes("/event") &&
            !pathname.includes("create"));

        const iconComponent = (() => {
          switch (item.icon) {
            case "calendar":
              return Calendar;
            case "plusCircle":
              return PlusCircle;
            case "settings":
              return Settings;
            default:
              return Calendar;
          }
        })();

        return (
          <li key={index}>
            <Link
              href={item.href || "#"}
              className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-left font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {React.createElement(iconComponent, {
                className: `h-5 w-5 ${isActive ? "text-blue-500" : "text-gray-400"}`,
              })}

              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
