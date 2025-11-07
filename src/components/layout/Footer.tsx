
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image src="/logo.webp" alt="CuscoFest Logo" width={24} height={24} className="h-6 w-6" />
            <span className="font-bold font-headline text-lg">CuscoFest</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CuscoFest. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
             <Link href="#" className="text-muted-foreground hover:text-primary">Facebook</Link>
             <Link href="#" className="text-muted-foreground hover:text-primary">Instagram</Link>
             <Link href="#" className="text-muted-foreground hover:text-primary">Twitter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
