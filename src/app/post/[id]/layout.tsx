export default function PostLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center p-4 sm:p-24">
      {children}
    </div>
  );
}
