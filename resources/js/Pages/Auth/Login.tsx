import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { DishubLogo } from '@/Components/ui/DishubLogo';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';


export default function Login({ status, canResetPassword }: { status?: string; canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />

            <div className="mb-6 flex flex-col items-center text-center">
                <DishubLogo className="w-14 h-14 mb-2" />
                <h1 className="text-lg font-bold text-[#141b46] tracking-tight">SiPrana Dishub Magetan</h1>
                <p className="text-xs text-slate-500">Sistem Inventaris & Pemeliharaan Sarpras</p>
            </div>

            {status && <div className="mb-4 text-xs font-medium text-emerald-600">{status}</div>}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-md border-slate-300 focus:border-[#141b46] focus:ring-[#141b46]"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-md border-slate-300 focus:border-[#141b46] focus:ring-[#141b46]"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center text-slate-600">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2">Ingat saya</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-slate-500 hover:text-[#141b46] underline"
                        >
                            Lupa kata sandi?
                        </Link>
                    )}
                </div>

                <div>
                    <PrimaryButton className="w-full justify-center bg-[#182156] hover:bg-[#101740] rounded-md py-2.5 font-semibold text-white" disabled={processing}>
                        Masuk ke Sistem
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}