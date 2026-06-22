"use client";

import LawyerCard from "@/components/ui/LawyerCard";
import LawyerCardSkeletonGrid from "@/components/ui/LawyerCardSkeleton";
import LawyerFilter from "@/components/ui/LawyerFilter";
import { getLawyers } from "@/services/lawyers/lawyerQueries";
import React, { useEffect, useState, Suspense } from "react";
import { BiSpreadsheet } from "react-icons/bi";
import { Pagination } from "@heroui/react";
import { useSearchParams } from "next/navigation";

function LawyersContent() {
  const searchParams = useSearchParams();

  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const lawyersPerPage = 12;

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    specialization: "",
    sort: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      specialization: "",
      sort: "",
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchLawyersData = async () => {
      try {
        setLoading(true);
        const data = await getLawyers(filters);

        if (data && !data.error) {
          setLawyers(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading lawyers:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchLawyersData();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [filters]);

  const indexOfLastLawyer = currentPage * lawyersPerPage;
  const indexOfFirstLawyer = indexOfLastLawyer - lawyersPerPage;
  const currentLawyers = lawyers.slice(indexOfFirstLawyer, indexOfLastLawyer);
  const totalPages = Math.ceil(lawyers.length / lawyersPerPage);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#A3F367] text-xs font-black tracking-widest uppercase mb-1">
              <BiSpreadsheet size={14} />
              <span>Directory</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
              Browse Lawyers
            </h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium max-w-xs">
            Explore, analyze, and connect with top-tier legal professionals
            across digital compliance and assets.
          </p>
        </div>

        <LawyerFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {!loading && error && (
          <div className="text-center py-12 border border-dashed border-red-500/30 bg-red-500/5 rounded-none">
            <p className="text-sm font-bold text-red-500 uppercase tracking-wider">
              Failed to load legal experts
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Please check your server connection or try again later.
            </p>
          </div>
        )}

        {loading ? (
          <LawyerCardSkeletonGrid />
        ) : !error && lawyers.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-none bg-zinc-100/50 dark:bg-zinc-900/10">
            <p className="text-sm font-black text-zinc-400 uppercase tracking-widest">
              No Lawyers Match Your Search
            </p>
          </div>
        ) : (
          !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentLawyers.map((lawyer, index) => (
                  <LawyerCard key={lawyer._id} lawyer={lawyer} index={index} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex w-full items-center justify-center">
                  <Pagination className="mx-auto flex justify-center">
                    <Pagination.Content className="mx-auto flex flex-wrap items-center justify-center gap-2">
                      <Pagination.Item>
                        <Pagination.Previous
                          isDisabled={currentPage === 1}
                          onPress={() => setCurrentPage((p) => p - 1)}
                          className="rounded-none bg-white/5 border border-white/10 hover:border-[#A3F367] hover:text-[#A3F367] transition-all data-[disabled=true]:opacity-30 data-[disabled=true]:cursor-not-allowed text-zinc-400 flex items-center justify-center px-3"
                        >
                          <Pagination.PreviousIcon />
                          <span className="hidden sm:inline ml-1">
                            Previous
                          </span>
                        </Pagination.Previous>
                      </Pagination.Item>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (p) => (
                          <Pagination.Item key={p}>
                            <Pagination.Link
                              isActive={p === currentPage}
                              onPress={() => setCurrentPage(p)}
                              className={`rounded-none transition-all border flex items-center justify-center w-9 h-9 ${
                                p === currentPage
                                  ? "bg-[#A3F367]/10 text-[#A3F367] border-[#A3F367]"
                                  : "bg-white/5 text-zinc-400 border-white/10 hover:border-[#A3F367] hover:text-[#A3F367]"
                              }`}
                            >
                              {p}
                            </Pagination.Link>
                          </Pagination.Item>
                        ),
                      )}

                      <Pagination.Item>
                        <Pagination.Next
                          isDisabled={currentPage === totalPages}
                          onPress={() => setCurrentPage((p) => p + 1)}
                          className="rounded-none bg-white/5 border border-white/10 hover:border-[#A3F367] hover:text-[#A3F367] transition-all data-[disabled=true]:opacity-30 data-[disabled=true]:cursor-not-allowed text-zinc-400 flex items-center justify-center px-3"
                        >
                          <span className="hidden sm:inline mr-1">Next</span>
                          <Pagination.NextIcon />
                        </Pagination.Next>
                      </Pagination.Item>
                    </Pagination.Content>
                  </Pagination>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}

export default function AllLawyers() {
  return (
    <Suspense>
      <LawyersContent />
    </Suspense>
  );
}
