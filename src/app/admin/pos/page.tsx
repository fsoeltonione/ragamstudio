import { supabase } from "@/lib/supabase";
import { POSClient } from "@/components/pos/POSClient";

export const dynamic = 'force-dynamic';

export default async function PointOfSalePage() {
  const [
    { data: products },
    { data: shops },
    { data: paymentMethods },
    { data: members }
  ] = await Promise.all([
    supabase.from("shop_products").select("*").eq("is_active", true).order("name"),
    supabase.from("shops").select("id, name").eq("is_active", true),
    supabase.from("payment_methods").select("id, name"),
    supabase.from("members").select("id, name")
  ]);

  return (
    <div className="-m-4 sm:-m-6 lg:-m-8 h-[calc(100vh-64px)]">
      {/* 
        We use negative margins to break out of AppLayout's padding 
        so the POS feels like a full-screen application.
      */}
      <div className="h-full p-4 sm:p-6 lg:p-8 bg-gray-100">
        <POSClient 
          products={products || []} 
          shops={shops || []} 
          paymentMethods={paymentMethods || []} 
          members={members || []} 
        />
      </div>
    </div>
  );
}
