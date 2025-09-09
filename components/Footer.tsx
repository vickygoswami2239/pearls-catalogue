export default function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container py-6 text-sm flex flex-wrap gap-2 items-center justify-between">
        <p>© {new Date().getFullYear()} Sstringz Exim Pvt. Ltd.</p>
        <p className="text-gray-500">LG-24, South Point Mall, Gurgaon • +91-7550456456</p>
      </div>
    </footer>
  );
}
