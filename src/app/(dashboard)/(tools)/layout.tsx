export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen">
      <div className="h-[calc(100%-3rem)]">{children}</div>
    </section>
  );
}
