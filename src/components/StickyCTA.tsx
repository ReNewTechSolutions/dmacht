type Props = {
    email: string;
    phone: string;
  };
  
  export default function StickyCTA({ email, phone }: Props) {
    const telHref = `tel:+1${phone.replace(/\D/g, "")}`;
    const mailHref = `mailto:${email}`;
  
    return (
      <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
        <div className="mx-auto max-w-6xl px-3 pb-3">
          <div className="glass rounded-2xl p-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={telHref}
                className="rounded-xl bg-white/10 px-3 py-3 text-center text-sm font-semibold text-white ring-1 ring-white/15"
              >
                Call/Text
              </a>
              <a
                href={mailHref}
                className="rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 px-3 py-3 text-center text-sm font-semibold text-black"
              >
                Email
              </a>
            </div>
  
            <div className="mt-2 text-center text-[11px] text-white/60">
              Kansas City service • {phone} • {email}
            </div>
          </div>
        </div>
      </div>
    );
  }