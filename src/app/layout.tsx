// app/layout.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { Poppins } from "next/font/google";

// Load Google Font Poppins
const poppins = Poppins({
  weight: ["400", "700"], // Specify the weights you want to use
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
