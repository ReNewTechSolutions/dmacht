import { permanentRedirect } from "next/navigation";

export default function IndustriesRedirect() {
  permanentRedirect("/about#industries");
}
