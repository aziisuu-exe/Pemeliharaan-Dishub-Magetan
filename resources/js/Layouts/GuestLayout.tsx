import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-4 sm:p-6">
            <div className="w-full max-w-md border border-slate-200 bg-white p-6 rounded-md">
                {children}
            </div>
        </div>
    );
}