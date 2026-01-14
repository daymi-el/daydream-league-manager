import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body
            className={`antialiased overflow-y-auto overflow-x-hidden`}
        >
        <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem={true}
            disableTransitionOnChange={true}
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
