import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NavHeader from "@/components/NavHeader";
import { Figtree } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/Footer";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "COOP Advance",
  description: "The NFVCB Cooperative society loan advance app.",
};

export default async function RootLayout({ children }) {
    const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  return (
    <html
      lang='en'
      className='light'
      style={{ colorScheme: "light" }}
      suppressHydrationWarning>
      <body className={figtree.className}>
        <Providers>
          <NavHeader session={session} />
          <main> {children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
