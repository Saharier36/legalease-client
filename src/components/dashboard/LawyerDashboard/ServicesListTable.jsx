"use client";

import { useEffect, useState } from "react";
import { Table, Card, Avatar } from "@heroui/react";
import { getMyLawyerServices } from "@/services/actions";
import EditServiceModal from "./EditServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";

export default function ServicesListTable({
  initialServices = [],
  lawyerId,
  refreshKey = 0,
}) {
  const [services, setServices] = useState(initialServices);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    setServices(initialServices);
  }, [initialServices]);

  useEffect(() => {
    if (!lawyerId) return;

    let cancelled = false;

    getMyLawyerServices(lawyerId)
      .then((result) => {
        if (!cancelled) setServices(result);
      })
      .catch((err) => console.error("Error fetching services:", err));

    return () => {
      cancelled = true;
    };
  }, [lawyerId, refreshKey, refreshTick]);

  return (
    <Card className="bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-none p-4 md:p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-bold">
          Your Published Legal Services ({services.length})
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">
          These listings appear live in your public Browse and Details views.
        </p>
      </div>

      <Table className="w-full border-none rounded-none shadow-none p-0 m-0 bg-transparent">
        <Table.ScrollContainer className="border border-zinc-200 dark:border-zinc-800 rounded-none bg-transparent">
          <Table.Content
            aria-label="Legal Services Table"
            className="bg-transparent"
          >
            <Table.Header>
              <Table.Column
                isRowHeader
                className="bg-zinc-100/60 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 font-bold rounded-none"
              >
                Service Details
              </Table.Column>
              <Table.Column className="bg-zinc-100/60 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 font-bold rounded-none">
                Specialization
              </Table.Column>
              <Table.Column className="bg-zinc-100/60 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 font-bold rounded-none">
                Hourly Fee
              </Table.Column>
              <Table.Column className="bg-zinc-100/60 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 font-bold rounded-none">
                Status
              </Table.Column>
              <Table.Column className="bg-zinc-100/60 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 font-bold rounded-none text-right">
                Actions
              </Table.Column>
            </Table.Header>
            <Table.Body emptyContent={"No legal services published yet."}>
              {services.map((service) => (
                <Table.Row
                  key={service._id?.$oid || service._id}
                  className="border-b border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-100/20 dark:hover:bg-zinc-900/20 transition-colors"
                >
                  <Table.Cell className="py-4 px-4 flex items-center gap-3 max-w-sm rounded-none">
                    <Avatar className="w-10 h-10 rounded-full shrink-0 border border-zinc-200 dark:border-zinc-800">
                      <Avatar.Image
                        src={service.image}
                        alt={service.name}
                        className="object-cover"
                      />
                      <Avatar.Fallback
                        name={service.name}
                        className="bg-zinc-200 dark:bg-zinc-800 text-xs"
                      />
                    </Avatar>
                    <div className="truncate">
                      <p className="font-bold truncate">{service.name}</p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-1 mt-0.5">
                        {service.bio}
                      </p>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="font-medium rounded-none whitespace-nowrap">
                    {service.specialization}
                  </Table.Cell>

                  <Table.Cell className="font-mono font-bold rounded-none whitespace-nowrap">
                    ${service.fee?.toLocaleString()}
                  </Table.Cell>

                  <Table.Cell className="rounded-none">
                    <span
                      className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border ${
                        service.status === "Available"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-danger/10 text-danger border-danger/20"
                      }`}
                    >
                      {service.status}
                    </span>
                  </Table.Cell>

                  <Table.Cell className="text-right rounded-none">
                    <div className="flex items-center justify-end gap-2">
                      <EditServiceModal
                        service={service}
                        onRefresh={() => setRefreshTick((t) => t + 1)}
                      />

                      <DeleteServiceModal
                        service={service}
                        onRefresh={() => setRefreshTick((t) => t + 1)}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer />
      </Table>
    </Card>
  );
}
