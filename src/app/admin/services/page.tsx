import AdminServicesClient from "./ui";
import { supabaseServer } from "@/lib/supabase/server";

export default async function AdminServicesPage() {
  const supabase = await supabaseServer();

  const { data: items } = await supabase
    .from("service_catalog_items")
    .select("*")
    .order("category_key", { ascending: true })
    .order("sort_order", { ascending: true });

  return <AdminServicesClient initialItems={items ?? []} />;
}