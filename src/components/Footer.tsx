'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border)] bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-right">
            <p className="text-sm text-[var(--muted)]">
              © {currentYear} Rugs & Co. כל הזכויות שמורות.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs text-[var(--muted)]">
              פותח על ידי:{' '}
              <a
                href="mailto:palmedic@gmail.com"
                className="hover:text-[var(--accent)] transition-colors"
              >
                Guy Shalev
              </a>
              {' '}- La Casa Libre
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
