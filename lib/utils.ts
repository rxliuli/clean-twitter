// Compatibility shim for the shadcn `utils` alias declared in components.json.
// Current `components/ui/*` files import `cn` from the `cn` package directly;
// this keeps older-style `shadcn add` output (which imports `@/lib/utils`) working.
export { cn } from 'cn'
