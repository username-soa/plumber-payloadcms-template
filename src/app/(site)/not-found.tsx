"use client";

import Marquee from "@/components/ui/marquee";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wrench, Home } from "lucide-react";

export default function NotFound() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background relative overflow-hidden selection:bg-primary/20">
			{/* Background Pattern */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
					backgroundSize: "40px 40px",
				}}
			/>

			{/* Marquee Background - Increased opacity */}
			<div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full opacity-[0.08] pointer-events-none select-none overflow-hidden">
				<Marquee className="[--duration:20s]" repeat={4}>
					<span className="font-bebas font-semibold text-[12rem] sm:text-[15rem] leading-none mx-8 whitespace-nowrap">
						404 NOT FOUND
					</span>
				</Marquee>
			</div>

			{/* Main Content - True center */}
			<div
				className={`relative z-10 flex flex-col items-center max-w-2xl mx-auto px-4 transition-all duration-700 ease-out ${
					mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}
			>
				{/* Error Code Badge */}
				<div
					className={`flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium transition-all duration-700 delay-200 ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
					}`}
				>
					<span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
					Error 404
				</div>

				<h1
					className={`text-4xl sm:text-6xl font-black tracking-tight text-foreground text-center mb-4 transition-all duration-700 delay-300 ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
					}`}
				>
					Flow Interrupted
				</h1>

				<p
					className={`text-lg sm:text-xl text-muted-foreground text-center mb-8 max-w-[500px] leading-relaxed transition-all duration-700 delay-400 ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
					}`}
				>
					Looks like we've sprung a leak! The page you're looking for has
					flushed away or doesn't exist.
				</p>

				{/* CTA Buttons */}
				<div
					className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all duration-700 delay-600 ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
					}`}
				>
					<Button
						asChild
						size="lg"
						className="h-12 px-8 text-lg font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1 rounded-full group"
					>
						<Link href="/" className="flex items-center gap-2">
							<Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
							Return Home
						</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="h-12 px-8 text-lg rounded-full hover:bg-muted/50 group"
					>
						<Link href="/services" className="flex items-center gap-2">
							<Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform" />
							View Services
						</Link>
					</Button>
				</div>
			</div>

			{/* Custom animations */}
			<style jsx>{`
				@keyframes drip-1 {
					0%,
					100% {
						opacity: 0;
						transform: translateY(0);
					}
					10% {
						opacity: 1;
					}
					90% {
						opacity: 0.5;
					}
					100% {
						opacity: 0;
						transform: translateY(30px);
					}
				}
				@keyframes drip-2 {
					0%,
					100% {
						opacity: 0;
						transform: translateY(0);
					}
					10% {
						opacity: 1;
					}
					90% {
						opacity: 0.5;
					}
					100% {
						opacity: 0;
						transform: translateY(25px);
					}
				}
				@keyframes wiggle {
					0%,
					100% {
						transform: rotate(45deg);
					}
					25% {
						transform: rotate(50deg);
					}
					75% {
						transform: rotate(40deg);
					}
				}
				.animate-drip-1 {
					animation: drip-1 2s ease-in-out infinite;
				}
				.animate-drip-2 {
					animation: drip-2 2.5s ease-in-out infinite 0.5s;
				}
				.animate-wiggle {
					animation: wiggle 3s ease-in-out infinite;
				}
			`}</style>
		</div>
	);
}
