import "./globals.css";

export const metadata = {
  title: "Johina",
  description: "Prototype ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
