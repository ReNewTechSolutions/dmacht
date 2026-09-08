import { permanentRedirect } from "next/navigation";

export default function MaintenanceRedirect() {
  permanentRedirect("/repair-service#maintenance");
}
