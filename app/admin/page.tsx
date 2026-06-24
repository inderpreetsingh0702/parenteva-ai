"use client";
export const dynamic = "force-dynamic";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";


const ADMIN_PASSWORD = "parenteva123";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const [password, setPassword] = useState("");
const [authenticated, setAuthenticated] = useState(false);
const [leads, setLeads] = useState<any[]>([]);
const totalLeads = leads.length;

const careerLeads = leads.filter(
  (lead) => lead.concern === "Career Confusion"
).length;

const academicLeads = leads.filter(
  (lead) => lead.concern === "Academic Performance"
).length;

const confidenceLeads = leads.filter(
  (lead) => lead.concern === "Confidence Issues"
).length;

const studyAbroadLeads = leads.filter(
  (lead) => lead.concern === "Study Abroad"
).length;

useEffect(() => {
  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("id", { ascending: false });

    setLeads(data || []);
  };

  fetchLeads();
}, []);
const exportCSV = () => {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Age",
    "Concern",
    "Outcome",
    "Recommendation",
  ];

  const rows = leads.map((lead) => [
    lead.parent_name,
    lead.email,
    lead.phone,
    lead.child_age,
    lead.concern,
    lead.outcome,
    lead.recommendation,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "parenteva-leads.csv";
  link.click();
};

if (!authenticated) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg border w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Admin Login
        </h2>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full mb-4"
        />

        <button
          onClick={() => {
            if (password === ADMIN_PASSWORD) {
              setAuthenticated(true);
            } else {
              alert("Incorrect password");
            }
          }}
          className="bg-black text-white px-4 py-2 rounded-lg w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}
  return (
    
    <div className="p-8">
      <div className="grid grid-cols-3 gap-4 mb-6">
  <div className="border rounded-xl p-4">
    <p className="text-sm text-gray-500">Total Leads</p>
    <p className="text-3xl font-bold">{totalLeads}</p>
  </div>

  <div className="border rounded-xl p-4">
    <p className="text-sm text-gray-500">Career Leads</p>
    <p className="text-3xl font-bold">{careerLeads}</p>
  </div>

  <div className="border rounded-xl p-4">
    <p className="text-sm text-gray-500">Study Abroad Leads</p>
    <p className="text-3xl font-bold">{studyAbroadLeads}</p>
  </div>
</div>
<div className="border rounded-xl p-4">
  <p className="text-sm text-gray-500">Academic Leads</p>
  <p className="text-3xl font-bold">{academicLeads}</p>
</div>

<div className="border rounded-xl p-4">
  <p className="text-sm text-gray-500">Confidence Leads</p>
  <p className="text-3xl font-bold">{confidenceLeads}</p>
</div>
      <h1 className="text-3xl font-bold mb-6">
        Parenteva Leads Dashboard
      </h1>
      <button
  onClick={exportCSV}
  className="mb-4 bg-black text-white px-4 py-2 rounded-lg"
>
  Export Leads CSV
</button>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Concern</th>
              <th className="p-3 border">Outcome</th>
              <th className="p-3 border">Recommendation</th>
              <th className="p-3 border">Created</th>
            </tr>
          </thead>

          <tbody>
            {leads?.map((lead) => (
              <tr key={lead.id}>
                <td className="p-3 border">{lead.parent_name}</td>
                <td className="p-3 border">{lead.email}</td>
                <td className="p-3 border">{lead.phone}</td>
                <td className="p-3 border">{lead.child_age}</td>
                <td className="p-3 border">{lead.concern}</td>
                <td className="p-3 border">{lead.outcome}</td>
                <td className="p-3 border">{lead.recommendation}</td>
                <td className="p-3 border">
  {new Date(lead.created_at).toLocaleString()}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}