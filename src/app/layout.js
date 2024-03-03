import { Source_Sans_3 } from "next/font/google";
import Provider from "@/components/themes/ThemeProvider";
import Header from "@/components/layout/Header";
import "./globals.css";
import ToastContainerWrapper from "@/components/shared/ToastContainerWrapper";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
});
export const metadata = {
  title: "MyThoughts",
  description: "A personal diary of your thoughts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sourceSans.className}>
      <body className="min-h-screen bg-white dark:bg-gray-900">
        <Provider>
          <main className="p-7">
            <Header />
            {children}
          </main>
        </Provider>
        <ToastContainerWrapper />
      </body>
    </html>
  );
}
