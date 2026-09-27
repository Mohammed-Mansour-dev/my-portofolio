import localFont from "next/font/local";
import "./globals.css";


export const metadata = {
  title: "Mohammed-Mansour",
  description: "fullStack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
