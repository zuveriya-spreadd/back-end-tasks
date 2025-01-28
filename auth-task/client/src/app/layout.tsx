import "../app/globals.css";
import AppRoutes from "./page";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-100">
        <AppRoutes />
        {children}
      </body>
    </html>
  );
}