import type { Transaction } from "@/routes/transaction-records";
import React from "react";
import { FaCalendarAlt, FaChevronRight, FaFilter } from "react-icons/fa";

interface TransactionRecordsTableProps {
  transactions: Transaction[];
  onFilterClick: () => void;
  onRowClick: (transaction: Transaction) => void;
  filterPeriod?: (string | undefined)[];
}

const TransactionRecordsTable: React.FC<TransactionRecordsTableProps> = ({
  transactions,
  onFilterClick,
  onRowClick,
  filterPeriod,
}) => {
  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.created_at.split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden">
      {/* Filter bar */}
      <div className="bg-white flex justify-between items-center h-12.5 border-b border-t border-[#eeeeee] overflow-hidden">
        <div className="flex gap-2.5 flex-1 px-2.5 py-2 overflow-x-scroll [&::-webkit-scrollbar]:h-1.25 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded">
          {filterPeriod?.map(
            (filter) =>
              filter && (
                <span className="bg-green-500 text-white px-2.5 py-0.25 rounded text-xs whitespace-nowrap">
                  {filter}
                </span>
              )
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
          Type
        </div>
        <div className="my-0.75 p-1.25 text-center border-r border-r-white border-dotted text-xs">
          Amount
        </div>
        <div className="my-0.75 p-1.25 text-center border-r border-r-white border-dotted text-xs">
          Status
        </div>
        <div className="my-0.75 p-1.25 text-center text-xs">Txn Date</div>
      </div>

      {/* Table body */}
      <div className="overflow-y-auto max-h-[400px] text-xs">
        {Object.keys(groupedTransactions).map((date) => (
          <React.Fragment key={date}>
            {/* Date header */}
            <div className="grid grid-cols-4 bg-gray-100 px-2.5 py-1.75">
              <div className="flex items-center col-span-2">
                <FaCalendarAlt className="text-gray-500 mr-2 size-3.75" />
                <span className="text-gray-500">{date}</span>
              </div>
              <div className="col-span-2 flex justify-end items-center">
                <span className="border text-gray-700 px-0.75 mx-1.75 rounded text-[10px]">
                  {/* {transaction.created_at.split("T")[1].split("+")[0]} */}
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
                  {transaction.transaction_purpose}
                </div>
                <div className="p-3 text-center font-medium">
                  {transaction.amount.toLocaleString()}
                </div>
                <div className="p-3 flex justify-center">
                  {/* <span
                    className={`px-1.25 py-0.75 rounded text-xs w-full text-center ${
                      transaction.status === "Processing"
                        ? "bg-yellow-400 text-yellow-800"
                        : transaction.status === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {transaction.status === "Failed"
                      ? "Fail"
                      : transaction.status}
                  </span> */}
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span>{transaction.created_at.split("T")[1]}</span>
                  <FaChevronRight className="text-gray-400" />
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}

        {transactions.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No transactions found
          </div>
        )}

        {/* Pagination indicator */}
        {transactions.length > 0 && (
          <div className="p-3 text-center text-gray-500 text-sm border-t border-gray-200">
            — end of page —
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionRecordsTable;
