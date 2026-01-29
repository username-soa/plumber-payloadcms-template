import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import {
	TypographyH2,
	TypographyH3,
	TypographyMuted,
} from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

export function MeetTheTeam() {
	const { team } = SITE_CONFIG.aboutUs;

	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-12">
					<div className="flex items-center justify-center gap-2 text-primary font-medium mb-4">
						<span className="uppercase tracking-wider text-sm">Our Team</span>
					</div>
					<TypographyH2 className="text-3xl md:text-4xl font-bold border-none tracking-tight leading-tight mb-4">
						Meet Your{" "}
						<span className="text-primary">Water City Plumbing Experts</span>
					</TypographyH2>
					<TypographyMuted className="text-base">
						Our licensed, background-checked professionals bring decades of
						combined experience to every job. We're not just plumbers – we're
						your neighbors.
					</TypographyMuted>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{team.map((member) => (
						<div
							key={member.name}
							className="bg-background rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow"
						>
							{/* Image */}
							<div className="relative aspect-square">
								<Image
									src={member.image}
									alt={`${member.name} - ${member.role} at ${SITE_CONFIG.brand.name}`}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
								/>
							</div>

							{/* Content */}
							<div className="p-6 space-y-4">
								<div>
									<TypographyH3 className="text-xl font-bold">
										{member.name}
									</TypographyH3>
									<p className="text-primary font-medium">{member.role}</p>
								</div>

								<TypographyMuted className="text-sm">
									{member.bio}
								</TypographyMuted>

								{/* Certifications */}
								<div className="flex flex-wrap gap-2">
									{member.certifications.map((cert) => (
										<Badge key={cert} variant="secondary" className="text-xs">
											{cert}
										</Badge>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
