import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Body Axis™ Dashboard",
  description: "Visualizing movement integrity and platform growth monitoring across the Body Axis ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased h-screen overflow-hidden bg-[#02050f] text-slate-100 flex font-sans">
        {/* Glowing Background Radial Highlights */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
