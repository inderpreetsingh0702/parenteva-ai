"use client";
export const dynamic = "force-dynamic";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
const [leads, setLeads] = useState<any[]>([]);

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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Parenteva Leads Dashboard
      </h1>

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