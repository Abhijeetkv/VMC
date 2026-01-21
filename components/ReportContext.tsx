import React, { createContext, useContext, useState } from "react";

export type Report = {
  id: string;
  title: string;
  description: string;
  ward: string;        
  type: string;        
  location: string;
  aiConfidence: number;
  status: "pending" | "in-progress" | "completed";
  image: string;
  createdAt: string;
};


type ReportContextType = {
  reports: Report[];
  addReport: (report: Report) => void;
};

const ReportContext = createContext<ReportContextType | null>(null);

export function ReportProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);

  const addReport = (report: Report) => {
    setReports(prev => [report, ...prev]);
  };

  return (
    <ReportContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error("useReports must be used inside ReportProvider");
  return ctx;
}
