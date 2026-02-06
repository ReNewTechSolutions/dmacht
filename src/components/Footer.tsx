import { contact } from "@/content/contact";

export default function Footer() {
  const telHref = `tel:+1${contact.phone.replace(/\D/g, "")}`;
  const mailHref = `mailto:${contact.email}`;

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-4 text-sm text-white/55">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} dmacht. By solving it.</p>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-white" href={mailHref}>{contact.email}</a>
            <a className="hover:text-white" href={telHref}>{contact.phone}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}