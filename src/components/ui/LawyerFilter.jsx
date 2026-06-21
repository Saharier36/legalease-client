"use client";

import React, { useState, useEffect } from "react";
import { Button, SearchField } from "@heroui/react";
import { useTheme } from "next-themes";
import {
  FaGavel,
  FaBriefcase,
  FaUsers,
  FaLightbulb,
  FaShieldAlt,
  FaHome,
  FaPassport,
  FaFileInvoiceDollar,
  FaUserTie,
  FaBalanceScale,
  FaUniversity,
  FaHeartbeat,
  FaUndo,
  FaChevronDown,
} from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const STATIC_CATEGORIES = [
  { id: "cat_criminal", name: "Criminal Defense", icon: FaGavel },
  { id: "cat_corporate", name: "Corporate & Business", icon: FaBriefcase },
  { id: "cat_family", name: "Family & Divorce", icon: FaUsers },
  { id: "cat_ip", name: "Intellectual Property", icon: FaLightbulb },
  { id: "cat_cyber", name: "Cyber & IT Law", icon: FaShieldAlt },
  { id: "cat_property", name: "Real Estate & Property", icon: FaHome },
  { id: "cat_immigration", name: "Immigration Law", icon: FaPassport },
  { id: "cat_tax", name: "Tax Law", icon: FaFileInvoiceDollar },
  { id: "cat_employment", name: "Employment Law", icon: FaUserTie },
  { id: "cat_civil", name: "Civil Litigation", icon: FaBalanceScale },
  { id: "cat_banking", name: "Banking & Finance Law", icon: FaUniversity },
  {
    id: "cat_injury",
    name: "Personal Injury & Medical Law",
    icon: FaHeartbeat,
  },
];

const SORT_OPTIONS = [
  { id: "lowToHigh", name: "Hourly price: Low to High" },
  { id: "highToLow", name: "Hourly price: High to Low" },
];

export default function LawyerFilter({ onFilterChange, onReset, filters }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".custom-dropdown-container")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategory = STATIC_CATEGORIES.find(
    (cat) => cat.name === filters.specialization,
  );
  const selectedSort = SORT_OPTIONS.find(
    (option) => option.id === filters.sort,
  );
  const hasActiveFilters = Boolean(
    filters.search || filters.specialization || filters.sort,
  );
  const isLightTheme = resolvedTheme === "light";
  const dropdownTriggerClass = isLightTheme
    ? "bg-white border-zinc-300 text-zinc-500 hover:border-zinc-400"
    : "bg-white/10 border-white/20 text-slate-400 hover:border-white/40";
  const dropdownPanelClass = isLightTheme
    ? "border-zinc-200 bg-white"
    : "border-zinc-800 bg-zinc-950";
  const dropdownMutedTextClass = isLightTheme
    ? "text-zinc-500"
    : "text-slate-400";
  const dropdownOptionTextClass = isLightTheme
    ? "text-zinc-700"
    : "text-zinc-300";
  const dropdownSecondaryTextClass = isLightTheme
    ? "text-zinc-500"
    : "text-zinc-400";
  const dropdownActiveTextClass = isLightTheme
    ? "text-lime-700"
    : "text-[#A3F367]";
  const dropdownHoverClass = isLightTheme
    ? "hover:bg-zinc-100"
    : "hover:bg-white/10";

  return (
    <div className="mb-6 grid w-full grid-cols-1 items-center gap-3 md:grid-cols-12">
      <div className="md:col-span-5">
        <SearchField
          value={filters.search}
          onChange={(val) => onFilterChange("search", val)}
          aria-label="Search lawyers"
        >
          <SearchField.Group className="bg-white dark:bg-white/10 border border-zinc-300 dark:border-white/20 px-3 h-9 flex items-center gap-2 focus-within:border-[#A3F367] focus-within:ring-1 focus-within:ring-[#A3F367] transition-all rounded-none">
            <FaMagnifyingGlass className="text-zinc-500 dark:text-slate-300 shrink-0 text-sm" />
            <SearchField.Input
              placeholder="Search lawyers by name..."
              className="bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-slate-400 focus:outline-none w-full"
            />
            {filters.search && (
              <SearchField.ClearButton className="text-zinc-500 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white text-xs" />
            )}
          </SearchField.Group>
        </SearchField>
      </div>

     
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-1.5 md:contents">
        <div className="md:col-span-3 relative min-w-0 custom-dropdown-container">
          <div
            onClick={() =>
              setOpenDropdown(openDropdown === "spec" ? null : "spec")
            }
            className={`flex h-9 w-full cursor-pointer select-none items-center justify-between border px-2 sm:px-4 text-[11px] sm:text-sm transition-all rounded-none ${dropdownTriggerClass}`}
          >
            <div className="flex-1 overflow-hidden">
              {selectedCategory ? (
                <span
                  className={`flex min-w-0 items-center gap-1 sm:gap-2 ${
                    isLightTheme ? "text-zinc-900" : "text-white"
                  }`}
                >
                  <selectedCategory.icon className="shrink-0 text-xs sm:text-sm text-[#A3F367]" />
                  <span className="truncate text-[11px] sm:text-sm font-medium">
                    {selectedCategory.name}
                  </span>
                </span>
              ) : (
                <span className={dropdownMutedTextClass}>Specialization</span>
              )}
            </div>
            <FaChevronDown
              className={`shrink-0 text-xs ml-2 ${dropdownMutedTextClass}`}
            />
          </div>

          {openDropdown === "spec" && (
            <div
              className={`absolute left-0 top-full mt-1 w-[min(70vw,16rem)] md:w-full max-h-72 overflow-y-auto border shadow-2xl rounded-none z-50 ${dropdownPanelClass}`}
            >
              <div className="p-1 flex flex-col gap-0.5">
                <div
                  onClick={() => {
                    onFilterChange("specialization", "");
                    setOpenDropdown(null);
                  }}
                  className={`cursor-pointer px-3 py-2.5 text-sm transition-colors rounded-none ${dropdownSecondaryTextClass} ${dropdownHoverClass}`}
                >
                  All Specializations (Show All)
                </div>

                {STATIC_CATEGORIES.map((cat) => (
                  <div
                    key={cat.name}
                    onClick={() => {
                      onFilterChange("specialization", cat.name);
                      setOpenDropdown(null);
                    }}
                    className={`cursor-pointer px-3 py-2.5 text-sm transition-colors rounded-none flex items-center gap-2 ${dropdownHoverClass} ${
                      filters.specialization === cat.name
                        ? `${dropdownActiveTextClass} bg-[#A3F367]/10`
                        : dropdownOptionTextClass
                    }`}
                  >
                    <cat.icon
                      className={`shrink-0 text-xs ${dropdownActiveTextClass}`}
                    />
                    <span className="truncate">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-3 relative min-w-0 custom-dropdown-container">
          <div
            onClick={() =>
              setOpenDropdown(openDropdown === "sort" ? null : "sort")
            }
            className={`flex h-9 w-full cursor-pointer select-none items-center justify-between border px-2 sm:px-4 text-[11px] sm:text-sm transition-all rounded-none ${dropdownTriggerClass}`}
          >
            <span
              className={`min-w-0 flex-1 truncate text-[11px] sm:text-sm ${
                selectedSort
                  ? `${isLightTheme ? "text-zinc-900" : "text-white"} font-medium`
                  : dropdownMutedTextClass
              }`}
            >
              {selectedSort?.name || "Hourly price"}
            </span>
            <FaChevronDown
              className={`shrink-0 text-xs ml-1 sm:ml-2 ${dropdownMutedTextClass}`}
            />
          </div>

          {openDropdown === "sort" && (
            <div
              className={`absolute right-0 md:left-0 md:right-auto top-full mt-1 w-[min(70vw,16rem)] md:w-full max-h-72 overflow-y-auto border shadow-2xl rounded-none z-50 ${dropdownPanelClass}`}
            >
              <div className="p-1 flex flex-col gap-0.5">
                <div
                  onClick={() => {
                    onFilterChange("sort", "");
                    setOpenDropdown(null);
                  }}
                  className={`cursor-pointer px-3 py-2.5 text-sm transition-colors rounded-none ${dropdownHoverClass} ${
                    !filters.sort
                      ? `${dropdownActiveTextClass} bg-[#A3F367]/10`
                      : dropdownSecondaryTextClass
                  }`}
                >
                  Default Sorting (Reset)
                </div>

                {SORT_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => {
                      onFilterChange("sort", option.id);
                      setOpenDropdown(null);
                    }}
                    className={`cursor-pointer px-3 py-2.5 text-sm transition-colors rounded-none font-medium ${dropdownHoverClass} ${
                      filters.sort === option.id
                        ? `${dropdownActiveTextClass} bg-[#A3F367]/10`
                        : dropdownOptionTextClass
                    }`}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          type="button"
          title="Reset filters"
          isDisabled={!hasActiveFilters}
          onPress={onReset}
          className="flex h-9 w-9 md:w-full items-center justify-center bg-white dark:bg-white/10 border border-zinc-300 dark:border-white/20 text-zinc-600 dark:text-slate-300 transition-all hover:border-[#A3F367] hover:bg-[#A3F367]/15 disabled:cursor-not-allowed disabled:opacity-30 rounded-none md:col-span-1"
        >
          <FaUndo className="text-xs" />
        </Button>
      </div>
    </div>
  );
}
