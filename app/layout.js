
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
  
  return (
    <html
      lang='en'
      className='light'
      style={{ colorScheme: "light" }}
      suppressHydrationWarning>
      <body className={figtree.className}>
        <Providers>
          <NavHeader />
          <main> {children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
