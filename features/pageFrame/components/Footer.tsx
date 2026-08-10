export default function Footer() {
  return (
    <footer className="bg-primary-darkest text-foreground-light flex h-32 w-full flex-col items-center justify-between px-8 py-8 shadow-md">
      <span>Privacy Policy | Terms and conditions | About Knytkalas.net</span>
      <span>© {new Date().getFullYear()} Knytkalas.net</span>
    </footer>
  );
}
