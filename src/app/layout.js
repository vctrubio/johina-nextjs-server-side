import "./globals.css";
import Navbar from '../components/Navbar';

export const metadata = {
  title: "Johina",
  description: "Prototype ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
