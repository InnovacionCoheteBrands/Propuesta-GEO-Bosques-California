// Minimal type declarations for Deno runtime specifically for this Edge Function
// This ensures that the local IDE's TypeScript server does not throw 'Cannot find name Deno'
// errors even if the official Deno VS Code extension is not installed or configured.

declare namespace Deno {
    export function serve(handler: (req: Request) => Response | Promise<Response>): void;
    export const env: {
        get(key: string): string | undefined;
    };
}
