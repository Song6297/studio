import { Scale } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Scale className="h-6 w-6 text-primary" />
      <span className="font-headline text-xl font-bold text-primary">
        My Legal Firm
      </span>
    </div>
  );
}
