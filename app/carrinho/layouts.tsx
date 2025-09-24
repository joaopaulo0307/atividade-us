// app/checkout/layout.tsx
import React from "react";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
        <div className="flex items-start justify-center p-4 min-h-screen">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}