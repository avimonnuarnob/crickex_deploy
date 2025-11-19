import type { RECORD, RECORDS } from "@/routes/betting-records";
import classNames from "classnames";
import React from "react";
import { FaCalendarAlt, FaChevronRight, FaFilter } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

interface TransactionRecordsTableProps {
  transactions: RECORDS;
  onFilterClick: () => void;
  onRowClick: (transaction: RECORD) => void;
  filterPeriod?: { type: string; value: string | string[] | undefined }[];
  clearFilters: () => void;
}

const BetRecordsTable: React.FC<TransactionRecordsTableProps> = ({
  transactions,
  onFilterClick,
  onRowClick,
  filterPeriod,
  clearFilters,
}) => {
  const filterByDate = (transaction: RECORD) => {
    const filter = filterPeriod?.find((filter) => filter.type === "date");
    if (!filter) {
      return true;
    }

    if (!filter.value) {
      return true;
    }

    if (filter.value === "Today") {
      return (
        transaction.created_at.split("T")[0] ===
        new Date().toISOString().split("T")[0]
      );
    } else if (filter.value === "Yesterday") {
      return (
        transaction.created_at.split("T")[0] ===
        new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .split("T")[0]
      );
    } else if (filter.value === "Last 7 days") {
      return (
        transaction.created_at.split("T")[0] >=
        new Date(new Date().setDate(new Date().getDate() - 7))
          .toISOString()
          .split("T")[0]
      );
    }
  };

  const filterByStatus = (transaction: RECORD) => {
    const filter = filterPeriod?.find((filter) => filter.type === "status");
    if (!filter) {
      return true;
    }

    if (!filter.value) {
      return true;
    }

    return filter.value.includes(transaction.status);
  };

  const filteredTransactions = filterPeriod
    ? transactions.filter(filterByDate).filter(filterByStatus)
    : transactions;

  // Group transactions by date
  // const filteredTransactions = filterPeriod
  //   ? transactions.filter((transaction) => {
  //       return filterPeriod?.every((filter) => {
  //         if (filter.type === "date") {
  //           if (filter.value === "Today") {
  //             return (
  //               transaction.created_at.split("T")[0] ===
  //               new Date().toISOString().split("T")[0]
  //             );
  //           } else if (filter.value === "Yesterday") {
  //             return (
  //               transaction.created_at.split("T")[0] ===
  //               new Date(new Date().setDate(new Date().getDate() - 1))
  //                 .toISOString()
  //                 .split("T")[0]
  //             );
  //           } else if (filter.value === "Last 7 days") {
  //             return (
  //               transaction.created_at.split("T")[0] >=
  //               new Date(new Date().setDate(new Date().getDate() - 7))
  //                 .toISOString()
  //                 .split("T")[0]
  //             );
  //           }
  //           return true;
  //         }
  //         if (filter.type === "status" && filter.value?.length) {
  //         }
  //         return true;
  //       });
  //     })
  //   : transactions;
  const groupedTransactions = filteredTransactions.reduce(
    (groups, transaction) => {
      const date = transaction.created_at.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {} as Record<string, RECORDS>
  );

  const filters = filterPeriod?.flatMap((filter) => filter.value);

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden">
      {/* Filter bar */}
      <div className="bg-white flex justify-between items-center h-12.5 border-b border-t border-[#eeeeee] overflow-hidden">
        <div className="flex gap-2.5 flex-1 px-2.5 py-2 overflow-x-scroll [&::-webkit-scrollbar]:h-1.25 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded relative">
          {filters?.map(
            (filter) =>
              filter && (
                <span className="bg-green-500 text-white px-2.5 py-0.25 rounded text-xs whitespace-nowrap">
                  {filter}
                </span>
              )
          )}

          {filters && filters.filter(Boolean).length > 0 && (
            <button
              onClick={clearFilters}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bottom-0"
            >
              <GiCancel className="text-gray-8" />
            </button>
          )}
        </div>

        <button
          className="text-gray-700 px-2.5 h-full cursor-pointer border-l border-l-[#eeeeee]"
          onClick={onFilterClick}
        >
          <FaFilter size={20} />
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-4 bg-blue-200 text-gray-800 font-medium px-2.5 whitespace-nowrap truncate text-ellipsis">
        <div className="my-0.75 p-1.25 text-center border-r border-r-white border-dotted text-xs">
          Platform
        </div>
        <div className="my-0.75 p-1.25 text-center border-r border-r-white border-dotted text-xs">
          Game Type
        </div>
        <div className="my-0.75 p-1.25 text-center border-r border-r-white border-dotted text-xs">
          Turnover
        </div>
        <div className="my-0.75 p-1.25 text-center text-xs">Profit/Loss</div>
      </div>

      {/* Table body */}
      <div className="overflow-y-auto text-xs">
        {Object.keys(groupedTransactions)
          .sort((a, b) => {
            return new Date(b).getTime() - new Date(a).getTime();
          })
          .map((date) => (
            <React.Fragment key={date}>
              {/* Date header */}
              <div className="grid grid-cols-4 bg-gray-100 px-2.5 py-1.75">
                <div className="flex items-center col-span-2">
                  <FaCalendarAlt className="text-gray-500 mr-2 size-3.75" />
                  <span className="text-gray-500">{date}</span>
                </div>
                <div className="col-span-2 flex justify-end items-center">
                  <span className="border text-gray-700 px-0.75 mx-1.75 rounded">
                    +
                    {
                      groupedTransactions[date][0].created_at
                        .split("T")[1]
                        .split("+")[1]
                    }
                  </span>
                </div>
              </div>

              {/* Transactions for this date */}
              {groupedTransactions[date].map((transaction) => (
                <div
                  key={transaction.id}
                  className={`grid grid-cols-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer items-center ${
                    groupedTransactions[date].indexOf(transaction) % 2 === 1
                      ? "bg-gray-50"
                      : ""
                  }`}
                  onClick={() => onRowClick(transaction)}
                >
                  <div className="p-3 text-center">
                    {transaction.provider_title}
                  </div>
                  <div className="p-3 text-center font-medium">
                    {transaction.game}
                  </div>
                  <div className="p-3 flex justify-center">
                    {Number(transaction.bet_amount).toFixed(2)}
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <span
                      className={classNames(
                        `px-1.25 py-0.75 rounded text-xs w-full text-center`,
                        {
                          "text-green-500 bg-green-200":
                            transaction.status === "won" ||
                            transaction.status === "refund" ||
                            transaction.status === "rollbacked",
                          "text-orange-500 bg-orange-200":
                            transaction.status === "reject" ||
                            transaction.status === "cancelled",
                          "text-red-500 bg-red-200":
                            transaction.status === "lose" ||
                            transaction.status === "lost",
                          "text-yellow-500 bg-yellow-200":
                            transaction.status === "placed",
                        }
                      )}
                    >
                      {Number(transaction.win_amount).toFixed(2)}
                    </span>
                    <FaChevronRight className="text-gray-400" />
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}

        {filteredTransactions.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No transactions found
          </div>
        )}

        {/* Pagination indicator */}
        {filteredTransactions.length > 0 && (
          <div className="p-3 text-center text-gray-500 text-sm border-t border-gray-200">
            — end of page —
          </div>
        )}
      </div>
    </div>
  );
};

export default BetRecordsTable;
