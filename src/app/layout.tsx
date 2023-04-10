import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

export const metadata = {
  title: "Kueue",
  description: "Karaoke Queue App",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
