import { supabase } from "@/lib/supabase";
import PosClient from "./PosClient";

export const dynamic = 'force-dynamic';

export default async function PosPage() {
  // Fetch master data for the POS
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .order("name", { ascending: true });

  const { data: members } = await supabase
    .from("members")
    .select("id, name")
    .order("name", { ascending: true });

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Point of Sale</h1>
        <p className="text-gray-500 mt-1">Process new transactions and sell packages</p>
      </div>

      <PosClient 
        packages={packages || []} 
        members={members || []} 
      />
    </>
  );
}
