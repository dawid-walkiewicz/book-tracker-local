import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import { IoReorderThreeOutline } from "react-icons/io5"
import { HiXMark } from "react-icons/hi2"
import { GiSpellBook } from "react-icons/gi"
import { SiGithub } from "react-icons/si"
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2"

import { useTheme } from "@/hooks/useTheme"

import { navigation } from "@/App"
import { Link, useLocation } from "react-router-dom"

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <button
      className="size-10 p-2 text-primary hover:text-amber-500 dark:hover:text-amber-400"
      onClick={() => toggleDarkMode()}
    >
      {isDarkMode ? (
        <HiMiniMoon className="size-full" />
      ) : (
        <HiMiniSun className="size-full" />
      )}
    </button>
  )
}

export const Navbar = () => {
  const location = useLocation()

  return (
    <Disclosure as="nav" className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-primary hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <IoReorderThreeOutline className="block size-7 group-data-[open]:hidden" />
              <HiXMark className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          {/* Desktop and mobile navigation (flex with logo, app name and links) */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Leftmost, logo and app title */}
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <GiSpellBook className="size-8 text-primary" />
              </Link>
              <Link to="/">
                <h1 className="ml-2 text-lg font-bold text-primary">
                  Reading List
                </h1>
              </Link>
            </div>

            {/* Navigation links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={
                      location.pathname === item.href ? "page" : undefined
                    }
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-slate-300 text-primary dark:bg-slate-800"
                        : "text-primary hover:bg-slate-300 dark:hover:bg-slate-800",
                      "rounded-md px-3 py-2 text-sm font-medium",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Rightmost, theme toggle and GitHub link */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ThemeToggle />

            <a
              href="https://www.github.com/Ninja00Shadow"
              target="_blank"
              className="size-10 p-2 text-primary hover:text-[#4078c0] dark:hover:text-[#4078c0]"
            >
              <SiGithub className="h-full w-full" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile navigation (pannel opened by button) */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              aria-current={
                location.pathname === item.href ? "page" : undefined
              } // Sprawdza, czy bieżąca ścieżka odpowiada href
              className={classNames(
                location.pathname === item.href
                  ? "bg-gray-400 text-primary"
                  : "text-primary hover:bg-gray-400 dark:hover:bg-gray-200",
                "block rounded-md px-3 py-2 text-base font-medium",
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
