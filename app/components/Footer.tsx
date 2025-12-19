"use client";

import Link from "next/link";

const links = [
	{ label: "Features", href: "/features" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "Security", href: "/contact" },
	{ label: "Support", href: "/contact" },
];

export default function Footer() {
	return (
		<footer className="border-t border-white/10 bg-[#050812] px-6 py-10 text-white lg:px-16 xl:px-24">
			<div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
				<div className="space-y-2">
					<div className="text-xl font-semibold">SafePad</div>
					<p className="max-w-md text-sm text-white/60">
						Modern password and secrets management that keeps your team fast, your data sealed, and your auditors happy.
					</p>
				</div>

				<div className="flex flex-wrap gap-4 text-sm font-medium text-white/70">
					{links.map((item) => (
						<Link key={item.label} href={item.href} className="rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-white">
							{item.label}
						</Link>
					))}
				</div>
			</div>

			<div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/50">
				© {new Date().getFullYear()} SafePad. Built for teams that ship securely.
			</div>
		</footer>
	);
}
