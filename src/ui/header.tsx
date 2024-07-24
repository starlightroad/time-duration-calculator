import Text from '@/src/ui/core/text';
import Link from '@/src/ui/core/link';

function Logo() {
  return <Text className="text-sm text-gray-600">Time Duration Calculator</Text>;
}

export default function Header() {
  return (
    <header className="flex h-12 items-center justify-between rounded-xl border border-gray-100 px-3">
      <Link href="/">
        <Logo />
      </Link>
      <Link
        href="https://github.com"
        target="_blank"
        className="flex h-8 items-center rounded-lg bg-indigo-600 px-3 text-sm text-white"
      >
        <Text>GitHub</Text>
      </Link>
    </header>
  );
}
