export const SITE_CONFIG = {
	brand: {
		name: "FlowMasters",
		description:
			"Professional plumbing services for residential and commercial properties. We are dedicated to making every space clean, efficient, and welcoming.",
	},

	// Email Configuration
	email: {
		// 'mailto' | 'nodemailer'
		provider: "nodemailer" as "mailto" | "nodemailer",
		// Email to receive inquiries (used for both modes)
		to: "info@flowmasters.com",
		// SMTP Configuration (only used if provider is 'nodemailer')
		// For privacy, these should really be pulled from env vars in the server action,
		// but this config communicates "User Preference".
	},

	// ============================================================================
	// SEO CONFIGURATION
	// Update these values for each business location
	// ============================================================================
	seo: {
		// Site URL (no trailing slash)
		siteUrl: "https://flowmasters.com.au",

		// Core Business Identity
		businessType: "Plumber" as const, // Schema.org type
		priceRange: "$$",
		foundingDate: "2005-01-01", // ISO date format (YYYY-MM-DD)

		// Primary Business Location
		location: {
			country: "Australia",
			countryCode: "AU",
			state: "New South Wales",
			stateCode: "NSW",
			city: "Parramatta", // Primary city/suburb
			postalCode: "2150",
			streetAddress: "123 Main Street",
			// Phone in international format
			phone: "+61 2 1234 5678",
			phoneDisplay: "(02) 1234 5678", // Display format
		},

		// Geographic Coordinates (for Google Maps integration)
		// Get these from Google Maps: right-click on location > "What's here?"
		coordinates: {
			latitude: "-33.8151",
			longitude: "151.0034",
		},

		// Service Areas - suburbs/cities you service
		// These appear in LocalBusiness.areaServed schema
		serviceAreas: [
			{ name: "Parramatta", type: "Suburb" as const },
			{ name: "Westmead", type: "Suburb" as const },
			{ name: "Harris Park", type: "Suburb" as const },
			{ name: "Granville", type: "Suburb" as const },
			{ name: "Merrylands", type: "Suburb" as const },
			{ name: "Rosehill", type: "Suburb" as const },
			{ name: "Northmead", type: "Suburb" as const },
			{ name: "North Parramatta", type: "Suburb" as const },
			{ name: "Toongabbie", type: "Suburb" as const },
			{ name: "Winston Hills", type: "Suburb" as const },
		],

		// Google Business Profile Integration
		googleBusinessProfile: {
			enabled: true,
			// Get Place ID from: https://developers.google.com/maps/documentation/places/web-service/place-id
			placeId: "", // e.g., "ChIJN1t_tDeuEmsRUsoyG83frY4"
			// Get Maps URL from your Google Business Profile
			mapsUrl: "", // e.g., "https://maps.google.com/?cid=12345678901234567890"
		},

		// Priority Services (slugs) - these get highlighted in schema
		// Use service slugs from the services array below
		priorityServices: ["emergency-service", "leak-detection", "drain-cleaning"],

		// Emergency Service Configuration
		// Set to the slug of your 24/7 emergency service for special schema markup
		emergencyServiceSlug: "emergency-service",

		// Review Configuration
		reviews: {
			// "hardcoded" = manual updates | "google-api" = fetch from Google (requires setup)
			source: "hardcoded" as const,

			// Aggregate rating (update periodically based on actual reviews)
			aggregate: {
				ratingValue: 4.9,
				reviewCount: 500,
				bestRating: 5,
				worstRating: 1,
			},

			// Featured reviews for display on website
			// Copy real reviews from Google Business Profile
			featured: [
				{
					author: "Sarah M.",
					rating: 5,
					text: "FlowMasters fixed our burst pipe within an hour of calling. Professional, clean, and reasonably priced. Highly recommend!",
					date: "2026-01-10",
					platform: "Google" as const,
				},
				{
					author: "Michael T.",
					rating: 5,
					text: "Best plumber in Parramatta! They installed our new hot water system and did an amazing job. Very knowledgeable team.",
					date: "2026-01-05",
					platform: "Google" as const,
				},
				{
					author: "Lisa K.",
					rating: 5,
					text: "Called them for a blocked drain emergency. They arrived quickly and solved the problem. Fair pricing with no hidden costs.",
					date: "2025-12-28",
					platform: "Google" as const,
				},
			],
		},

		// Schema.org identifiers (usually don't need to change)
		schemaIds: {
			organization: "#organization",
			website: "#website",
		},
	},

	socials: [
		{
			platform: "facebook",
			label: "Facebook",
			href: "https://facebook.com/FlowMasters",
		},
		{
			platform: "linkedin",
			label: "LinkedIn",
			href: "https://linkedin.com/company/FlowMasters",
		},
		{
			platform: "instagram",
			label: "Instagram",
			href: "https://instagram.com/FlowMasters",
		},
		{
			platform: "twitter",
			label: "Twitter",
			href: "https://twitter.com/FlowMasters",
		},
	],
	services: [
		{
			title: "Leak Detection",
			slug: "leak-detection",
			description:
				"Advanced technology to pinpoint and repair hidden leaks before they cause damage.",
			longDescription:
				"Our state-of-the-art leak detection services use acoustic listening devices, thermal imaging, and video inspection to locate hidden leaks behind walls, under floors, and in your main water line. Early detection saves you thousands in potential water damage and mold remediation costs.",
			icon: "Search",
			metaTitle: "Professional Leak Detection Services | FlowMasters",
			metaDescription:
				"Expert electronic leak detection services. We find hidden water leaks without destruction. Fast, accurate, and affordable leak detection.",
			benefits: [
				"Non-invasive detection methods",
				"Prevents costly structural damage",
				"Lowers unexplained high water bills",
				"Pinpoint accuracy for minimal repair intrusion",
			],
			subServices: [
				{
					title: "Acoustic Leak Detection",
					description:
						"Using advanced sound equipment to locate leaks by detecting the noise of escaping water.",
					icon: "Ear",
				},
				{
					title: "Thermal Imaging",
					description:
						"Infrared cameras reveal temperature differences caused by hidden moisture.",
					icon: "Thermometer",
				},
				{
					title: "Video Pipe Inspection",
					description:
						"Fiber-optic cameras inspect inside pipes to find cracks and damage.",
					icon: "Video",
				},
				{
					title: "Slab Leak Detection",
					description:
						"Specialized equipment to find leaks under concrete foundations.",
					icon: "Layers",
				},
			],
			stats: [
				{ value: "500+", label: "Leaks Found This Year" },
				{ value: "98%", label: "Detection Accuracy" },
				{ value: "2hr", label: "Average Response Time" },
				{ value: "$5K+", label: "Avg. Customer Savings" },
			],
			process: [
				{
					title: "Initial Assessment",
					description:
						"We discuss your concerns and review your water bills for anomalies.",
					icon: "ClipboardList",
				},
				{
					title: "Technology Scan",
					description:
						"Using acoustic and thermal tools, we scan your property for hidden leaks.",
					icon: "Scan",
				},
				{
					title: "Pinpoint & Report",
					description:
						"We mark the exact leak location and provide a detailed repair plan.",
					icon: "MapPin",
				},
			],
			faqs: [
				{
					question: "How do you find hidden leaks?",
					answer:
						"We use a combination of acoustic listening equipment, thermal imaging cameras, and moisture meters to detect leaks without breaking into walls or floors.",
				},
				{
					question: "Does leak detection cause damage?",
					answer:
						"Our methods are non-invasive. We pinpoint the exact location of the leak so that repair access is kept to the absolute minimum necessary.",
				},
			],
		},
		{
			title: "Water Heaters",
			slug: "water-heaters",
			description:
				"Installation and repair of tankless and traditional water heating systems.",
			longDescription:
				"Whether you need a new high-efficiency tankless system or a repair for your traditional tank water heater, our experts ensure you have reliable hot water. We service all major brands and provide same-day replacement options.",
			icon: "Flame",
			metaTitle: "Water Heater Repair & Installation | FlowMasters",
			metaDescription:
				"Expert water heater installation and repair services. Tankless and traditional systems. Same-day service available for hot water emergencies.",
			benefits: [
				"Energy-efficient tankless upgrades",
				"Same-day emergency replacement",
				"Expertise in all major brands",
				"Extended warranty options available",
			],
			process: [
				{
					title: "Consultation",
					description:
						"We verify your needs and help you choose the right unit.",
					icon: "ClipboardList",
				},
				{
					title: "Installation",
					description:
						"Professional removal of old unit and safe installation of the new one.",
					icon: "Wrench",
				},
				{
					title: "Testing",
					description:
						"We verify hot water flow and safety controls before leaving.",
					icon: "CheckCircle",
				},
			],
			faqs: [
				{
					question: "Should I switch to a tankless water heater?",
					answer:
						"Tankless heaters offer endless hot water and lower energy bills, but have a higher upfront cost. We can help you calculate the ROI based on your household usage.",
				},
				{
					question: "How long do water heaters last?",
					answer:
						"Traditional tank heaters typically last 8-12 years, while tankless systems can last 20+ years with proper maintenance.",
				},
			],
		},
		{
			title: "Drain Cleaning",
			slug: "drain-cleaning",
			description:
				"Professional unclogging services to restore proper flow to your plumbing.",
			longDescription:
				"Stop struggling with slow drains and recurring clogs. Our hydro-jetting and professional snaking services clear even the toughest blockages, including tree roots and grease buildup, restoring your pipes to like-new flow capacity.",
			icon: "Droplets",
			metaTitle: "Professional Drain Cleaning & Hydro Jetting | FlowMasters",
			metaDescription:
				"Fast and effective drain cleaning services. Hydro-jetting and rooter service to clear clogged drains, main lines, and sewer backups.",
			benefits: [
				"Hydro-jetting technology",
				"Removes stubborn grease and roots",
				"Video camera inspection included",
				"Preventative maintenance plans",
			],
			process: [
				{
					title: "Inspection",
					description:
						"Camera inspection to locate the blockage and check pipe condition.",
					icon: "Scan",
				},
				{
					title: "Hydro-Jetting",
					description:
						"High-pressure water streams clear roots and grease buildup.",
					icon: "Droplets",
				},
				{
					title: "Verification",
					description: "Final camera pass to ensure the line is 100% clear.",
					icon: "CheckCircle",
				},
			],
			faqs: [
				{
					question: "Is hydro-jetting safe for my pipes?",
					answer:
						"Yes, when performed by professionals. It's the most effective way to clean pipes thoroughly without using harsh chemicals.",
				},
				{
					question: "Why does my drain keep clogging?",
					answer:
						"Recurring clogs often indicate a deeper issue like tree roots, a belly in the pipe, or significant grease buildup that simple plunging can't fix.",
				},
			],
		},
		{
			title: "Pipe Repair",
			slug: "pipe-repair",
			description:
				"Complete pipe repair and replacement services for all pipe materials.",
			longDescription:
				"From fixing pinhole leaks in copper pipes to whole-house PEX repiping, our licensed plumbers handle all piping materials. We ensure durable, code-compliant repairs that stand the test of time.",
			icon: "Wrench",
			metaTitle: "Pipe Repair & Repiping Services | FlowMasters",
			metaDescription:
				"Expert pipe repair and whole-house repiping. We fix copper, PEX, galvanized, and PVC pipes. Licensed and insured plumbing professionals.",
			benefits: [
				"Whole-house repiping specialists",
				"Fixes low water pressure",
				"Lead pipe replacement",
				"Quiet, durable PEX options",
			],
			process: [
				{
					title: "Assessment",
					description:
						"We identify leak sources and evaluate pipe material condition.",
					icon: "Search",
				},
				{
					title: "Repair/Replace",
					description:
						"Precision repair or complete section replacement as needed.",
					icon: "Wrench",
				},
				{
					title: "Pressure Test",
					description: "System testing to guarantee leak-free performance.",
					icon: "Gauge",
				},
			],
			faqs: [
				{
					question: "How do I know if I need to repipe my house?",
					answer:
						"Signs include frequent leaks, rusty colored water, low water pressure, or if your home was built before 1970 and still has galvanized steel pipes.",
				},
				{
					question: "How long does repiping take?",
					answer:
						"A typical whole-house repipe takes 2-5 days depending on the size of the home, but you will have running water at the end of each day.",
				},
			],
		},
		{
			title: "Emergency Service",
			slug: "emergency-service",
			description:
				"24/7 rapid response for critical plumbing issues that can't wait.",
			longDescription:
				"Plumbing disasters don't wait for business hours. Our emergency response team visits your property 24/7 to handle burst pipes, overflowing toilets, and major leaks. We arrive fully stocked to stop the damage immediately.",
			icon: "Siren",
			// SEO: Emergency service flags for special schema markup
			isEmergency: true,
			availability: "24/7",
			metaTitle: "24/7 Emergency Plumber | FlowMasters",
			metaDescription:
				"Rapid response emergency plumbing services available 24/7. Burst pipes, sewer backups, and major leaks handled immediately by expert plumbers.",
			benefits: [
				"24/7/365 Availability",
				"Rapid response time",
				"Fully stocked trucks",
				"No overtime charges for nights/weekends",
			],
			process: [
				{
					title: "Rapid Dispatch",
					description:
						"Our nearest available unit is routed to you immediately.",
					icon: "Siren",
				},
				{
					title: "Immediate Action",
					description:
						"We quickly isolate the issue to stop damage and restore safety.",
					icon: "Zap",
				},
				{
					title: "Follow-Up",
					description:
						"Permanent repair options provided once the emergency is stabilized.",
					icon: "ClipboardCheck",
				},
			],
			faqs: [
				{
					question: "What is considered a plumbing emergency?",
					answer:
						"Any issue causing water damage (burst pipe), loss of all water service, or a health hazard (sewage backup) is an emergency.",
				},
				{
					question: "Do you charge extra for after-hours?",
					answer:
						"We offer transparent flat-rate pricing. We will provide you with a quote before beginning any emergency work so there are no surprises.",
				},
			],
		},
		{
			title: "Bathroom Remodel",
			slug: "bathroom-remodel",
			description:
				"Full-service plumbing updates for your modern bathroom renovation.",
			longDescription:
				"Transform your bathroom into a spa-like retreat. We handle all plumbing aspects of your remodel, including moving drain lines, installing luxury showers, soaking tubs, and modern efficient fixtures.",
			icon: "Bath",
			metaTitle: "Bathroom Plumbing Remodel & Renovation | FlowMasters",
			metaDescription:
				"Expert bathroom plumbing remodeling. Showers, tubs, sinks, and toilet installation. We work with your contractor to create your dream bathroom.",
			benefits: [
				"Luxury fixture installation",
				"Custom shower systems",
				"Code-compliant re-routing",
				"Accessibility upgrades (ADA)",
			],
			process: [
				{
					title: "Design Consult",
					description:
						"We work with you to plan the perfect layout and fixture selection.",
					icon: "PencilRuler",
				},
				{
					title: "Rough-In",
					description:
						"Routing all new water and drain lines to the correct locations.",
					icon: "Hammer",
				},
				{
					title: "Finish",
					description:
						"Installing fixtures and testing for a perfect, polised look.",
					icon: "Sparkles",
				},
			],
			faqs: [
				{
					question: "Can you move my toilet or shower location?",
					answer:
						"Yes, we can relocate plumbing fixtures to accommodate your new layout, though this involves more extensive work to move drain and vent lines.",
				},
				{
					question: "Do you supply the fixtures?",
					answer:
						"We can supply high-quality professional-grade fixtures, or we are happy to install fixtures that you have purchased yourself.",
				},
			],
		},
		{
			title: "Sewer Line Services",
			slug: "sewer-line-services",
			description:
				"Trenchless repair, replacement, and cleaning for your main sewer line.",
			longDescription:
				"Sewer line issues can be messy and disruptive. We use advanced camera inspection and trenchless technology to repair or replace your sewer lines with minimal excavation, preserving your landscaping and driveway.",
			icon: "Route",
			metaTitle: "Sewer Line Repair & Replacement | FlowMasters",
			metaDescription:
				"Expert sewer line repair and replacement services. Trenchless technology, camera inspections, and rooter service for main sewer lines.",
			benefits: [
				"Trenchless non-invasive repair",
				"Video camera inspection",
				"Prevents sewage backups",
				"Long-lasting pipe relining",
			],
			process: [
				{
					title: "Camera Inspect",
					description:
						"We visualize the damage to choose the best repair method.",
					icon: "Video",
				},
				{
					title: "Trenchless Fix",
					description: "Relining or bursting pipe with minimal to no digging.",
					icon: "ArrowRightLeft",
				},
				{
					title: "Final Check",
					description:
						"Ensuring proper flow and grade with a post-work inspection.",
					icon: "CheckCircle",
				},
			],
			faqs: [
				{
					question: "How do I know if my sewer line is broken?",
					answer:
						"Common signs include multiple slow drains, foul odors in the yard, soggy patches of grass, or gurgling sounds from your toilet.",
				},
				{
					question: "What is trenchless sewer repair?",
					answer:
						"It's a method where we repair your pipe from the inside out using a epoxy liner, requiring only one or two small access holes instead of digging a trench.",
				},
			],
		},
		{
			title: "Water Filtration",
			slug: "water-filtration",
			description:
				"Whole-home filtration and water softeners for pure, healthy water.",
			longDescription:
				"Enjoy bottled-quality water from every tap. We install and service reverse osmosis systems, water softeners, and whole-house carbon filters to remove hardness, chlorine, and contaminants from your water supply.",
			icon: "Droplets",
			metaTitle: "Water Softener & Filtration Installation | FlowMasters",
			metaDescription:
				"Professional water filtration system installation. Water softeners, reverse osmosis, and whole-house filters for clean, strictly healthy water.",
			benefits: [
				"Protect appliances from scale",
				"Healthier drinking water",
				"Softer skin and hair",
				"Remove chlorine taste/odor",
			],
			process: [
				{
					title: "Water Testing",
					description:
						"We analyze your water's hardness and contaminant levels.",
					icon: "Beaker",
				},
				{
					title: "System Select",
					description:
						"Recommending the best filter or softener for your specific water.",
					icon: "Filter",
				},
				{
					title: "Installation",
					description: "Clean integration with your main water line.",
					icon: "Wrench",
				},
			],
			faqs: [
				{
					question: "Do I need a water softener?",
					answer:
						"If you have hard water (white scale buildup on faucets, dry skin, spots on dishes), a water softener protects your plumbing and improves your quality of life.",
				},
				{
					question: "What does a whole-house filter remove?",
					answer:
						"Depending on the filter, it can remove chlorine, sediment, rust, pesticides, and other dissolved solids that affect taste and health.",
				},
			],
		},
		{
			title: "Gas Line Services",
			slug: "gas-line-services",
			description:
				"Safe, licensed gas line installation and repair for appliances.",
			longDescription:
				"Gas work requires certified professionals. We safely install gas lines for new appliances, fire pits, and grills, and provide rapid leak detection and repair services to keep your home safe.",
			icon: "Flame",
			metaTitle: "Gas Line Installation & Repair | FlowMasters",
			metaDescription:
				"Licensed gas plumbers for line installation and repair. Safety inspections, leak detection, and hookups for stoves, dryers, and outdoor grills.",
			benefits: [
				"Licensed gas fitters",
				"Safety leak testing",
				"Outdoor grill hookups",
				"Permitting included",
			],
			process: [
				{
					title: "Safety Check",
					description:
						"Shutting off gas and verifying the system before starting.",
					icon: "ShieldCheck",
				},
				{
					title: "Installation",
					description:
						"Running new lines using appropriately integrated materials.",
					icon: "Construction",
				},
				{
					title: "Leak Testing",
					description: "Rigorous pressure testing to ensure 100% safety.",
					icon: "Gauge",
				},
			],
			faqs: [
				{
					question: "Can plumbers work on gas lines?",
					answer:
						"Yes, licensed plumbers are the primary trade certified to install and repair residential gas piping safely.",
				},
				{
					question: "What should I do if I smell gas?",
					answer:
						"Evacuate the house immediately and call 911 or your utility company. Do not turn light switches on or off. Call us only after the area is safe.",
				},
			],
		},
		{
			title: "Commercial Plumbing",
			slug: "commercial-plumbing",
			description:
				"Reliable plumbing solutions for businesses, restaurants, and offices.",
			longDescription:
				"From grease trap maintenance for restaurants to backflow testing for office buildings, our commercial division handles the unique needs of business properties. We offer priority scheduling to minimize operational downtime.",
			icon: "Building2",
			metaTitle: "Commercial Plumbing Services | FlowMasters",
			metaDescription:
				"Expert commercial plumbing for businesses. Grease traps, backflow testing, industrial water heaters, and priority emergency service.",
			benefits: [
				"Priority business account",
				"After-hours service",
				"Backflow certification",
				"Grease trap maintenance",
			],
			process: [
				{
					title: "Site Survey",
					description:
						"Understanding your facility's layout and specific requirements.",
					icon: "Map",
				},
				{
					title: "Scheduled Work",
					description:
						"Executing repairs during off-hours to minimize disruption.",
					icon: "Clock",
				},
				{
					title: "Compliance",
					description:
						"Providing all necessary documentation and certifications.",
					icon: "FileCheck",
				},
			],
			faqs: [
				{
					question: "Do you offer maintenance contracts?",
					answer:
						"Yes, we offer preventative maintenance plans tailored to your specific industry to prevent costly emergency shutdowns.",
				},
				{
					question: "Are you insured for commercial work?",
					answer:
						"Absolutely. We carry comprehensive liability and workers' compensation insurance required for all commercial and industrial projects.",
				},
			],
		},
		{
			title: "Toilet Repair",
			slug: "toilet-repair",
			description: "Fast fix for running, leaking, or clogged toilets.",
			longDescription:
				"A running or clogged toilet is a nuisance and a waste of water. We repair all toilet makes and models, fix flange leaks, and install water-saving modern toilets to upgrade your bathroom.",
			icon: "Wrench",
			metaTitle: "Toilet Repair & Installation Services | FlowMasters",
			metaDescription:
				"Professional toilet repair and installation. We fix running, leaking, and clogged toilets. High-efficiency toilet upgrades available.",
			benefits: [
				"Stop running water waste",
				"Fix wobbling toilets",
				"Clog removal",
				"Water-saving upgrades",
			],
			process: [
				{
					title: "Diagnosis",
					description:
						"Identifying if it's a fill valve, flapper, or clog issue.",
					icon: "Stethoscope",
				},
				{
					title: "Repair/Replace",
					description: "Fixing the specific part or installing a new unit.",
					icon: "Wrench",
				},
				{
					title: "Flow Test",
					description: "Verifying powerful flush and proper tank refill.",
					icon: "Droplet",
				},
			],
			faqs: [
				{
					question: "Why is my toilet running?",
					answer:
						"It's usually a worn-out flapper valve or a fill valve issue. It wastes hundreds of gallons a day but is a quick, inexpensive fix.",
				},
				{
					question: "Can you unclog a toilet my plunger can't?",
					answer:
						"Yes, we use professional toilet augers that can reach further and remove obstructions without scratching the porcelain.",
				},
			],
		},
		{
			title: "Kitchen Plumbing",
			slug: "kitchen-plumbing",
			description: "Faucets, sinks, garbage disposals, and dishwasher lines.",
			longDescription:
				"The kitchen is the heart of the home. We handle all kitchen plumbing needs including faucet upgrades, garbage disposal repair, ice maker lines, and sink installations.",
			icon: "Utensils",
			metaTitle: "Kitchen Plumbing Services | FlowMasters",
			metaDescription:
				"Expert kitchen plumbing repairs. Garbage disposal installation, faucet repair, sink installation, and dishwasher hookups.",
			benefits: [
				"Garbage disposal repair",
				"Faucet upgrades",
				"Ice maker lines",
				"Dishwasher installation",
			],
			process: [
				{
					title: "Assessment",
					description:
						"Checking under-sink connection points and supply lines.",
					icon: "Eye",
				},
				{
					title: "Installation",
					description: "Connecting your new fixture or appliance securely.",
					icon: "Wrench",
				},
				{
					title: "Quality Check",
					description: "Ensuring zero leaks and smooth operation.",
					icon: "ThumbsUp",
				},
			],
			faqs: [
				{
					question: "Can you fix a jammed garbage disposal?",
					answer:
						"Yes, often we can unjam or reset it. If the motor is burned out, we carry replacements on our truck for immediate installation.",
				},
				{
					question: "Do you install customer-supplied faucets?",
					answer:
						"Yes, we are happy to professionally install any faucet you have purchased.",
				},
			],
		},
	],
	navLinks: [
		{ label: "About Us", href: "/about" },
		{ label: "Our Services", href: "/services" },
		{ label: "Case Studies", href: "/case-studies" },
		{ label: "Contact", href: "/contact" },
		{ label: "Blog", href: "/blog" },
	],
	contact: {
		phone: "+1 (555) 123-4567",
		email: "info@flowmasters.com",
		address: "123 Plumber Ave, Water City",
	},
	workingHours: [
		{ day: "Mon-Fri", time: "08:00 AM - 07:00 PM" },
		{ day: "Saturday", time: "09:00 AM - 06:00 PM" },
		{ day: "Sunday", time: "Closed" },
	],
	process: [
		{
			title: "Schedule",
			description: "Book online or call us. We offer same-day appointments.",
			icon: "Calendar",
			image: "/images/about/about-expert.png",
			label: "BOOKING + CONTACT",
		},
		{
			title: "Diagnosis",
			description:
				"Our expert arrives, inspects the issue, and gives a clear quote.",
			icon: "Search",
			image: "/images/about/about-trust.png",
			label: "INSPECTION + QUOTE",
		},
		{
			title: "Repair",
			description:
				"We fix it right the first time and clean up after ourselves.",
			icon: "Wrench",
			image: "/images/about/about-team.png",
			label: "EXECUTION + REPAIR",
		},
	],
	aboutUs: {
		companyStory: {
			foundedYear: 2005,
			headline: "Your Trusted Water City Plumbers Since 2005",
			subheadline:
				"Family-owned and locally operated, serving our community with integrity",
			story: `FlowMasters was founded in 2005 by master plumber James Mitchell right here in Water City. What started as a one-man operation working out of a single truck has grown into a trusted team of 25+ licensed professionals serving the entire metropolitan area.

Our founder's vision was simple: provide honest, reliable plumbing services that treat every customer like family. Nearly two decades later, that commitment remains at the heart of everything we do.

As a locally-owned business, we understand the unique plumbing challenges our Water City neighbors face – from the older pipes in Downtown District to the modern systems in Riverside Heights. We're not just plumbers; we're your neighbors, invested in the community we serve.`,
			milestones: [
				{ year: 2005, event: "Founded in Water City by James Mitchell" },
				{
					year: 2010,
					event: "Expanded to 10 technicians, added commercial services",
				},
				{ year: 2015, event: "Opened second location in North Valley" },
				{ year: 2020, event: "Launched 24/7 emergency response team" },
				{ year: 2024, event: "Celebrating 10,000+ satisfied customers" },
			],
			timeline: {
				title: "Our Journey",
			},
		},
		serviceAreas: [
			"Water City",
			"Downtown District",
			"Riverside Heights",
			"North Valley",
			"Oakwood Estates",
			"Sunset Park",
			"Harbor View",
			"Industrial Zone",
			"Lakeside Community",
			"West End",
			"Maple Grove",
			"Cedar Hills",
		],
		team: [
			{
				name: "James Mitchell",
				role: "Founder & Master Plumber",
				bio: "With 30+ years in the trade, James founded FlowMasters to bring honest, quality plumbing to Water City. Licensed Master Plumber with expertise in commercial and residential systems.",
				certifications: [
					"Master Plumber License #MP-12345",
					"Backflow Prevention Certified",
				],
				image: "/images/team/avatar-mark.jpg",
			},
			{
				name: "Sarah Chen",
				role: "Operations Manager",
				bio: "Sarah ensures every job runs smoothly, from scheduling to follow-up. A Water City native, she brings 15 years of customer service excellence to our team.",
				certifications: [
					"OSHA Safety Certified",
					"Customer Service Excellence",
				],
				image: "/images/team/avatar-kathryn.jpg",
			},
			{
				name: "Marcus Thompson",
				role: "Lead Technician",
				bio: "Marcus leads our emergency response team with 12 years of field experience. Specializes in leak detection and water heater systems.",
				certifications: [
					"Journeyman Plumber License #JP-67890",
					"Gas Line Certified",
				],
				image: "/images/team/avatar-jerome.jpg",
			},
		],
		trustStats: [
			{ value: "20+", label: "Years of Experience" },
			{ value: "10,000+", label: "Happy Customers" },
			{ value: "25+", label: "Licensed Technicians" },
			{ value: "24/7", label: "Emergency Service" },
			{ value: "100%", label: "Satisfaction Guaranteed" },
			{ value: "< 60 min", label: "Average Response Time" },
		],
		certifications: [
			{
				name: "Licensed & Insured",
				description: "State Licensed Plumbing Contractor #PL-98765",
				icon: "ShieldCheck",
			},
			{
				name: "BBB Accredited",
				description: "A+ Rating with Better Business Bureau",
				icon: "Award",
			},
			{
				name: "Chamber of Commerce",
				description: "Proud Member of Water City Chamber",
				icon: "Building2",
			},
			{
				name: "Bonded",
				description: "$2 Million Liability Coverage",
				icon: "Lock",
			},
			{
				name: "Master Plumber Certified",
				description: "All technicians state-certified",
				icon: "BadgeCheck",
			},
			{
				name: "Green Plumbing Certified",
				description: "Eco-friendly practices endorsed",
				icon: "Leaf",
			},
		],
		values: [
			{
				title: "Integrity First",
				description:
					"Honest pricing with no hidden fees. We explain the problem and options before any work begins.",
				icon: "Heart",
			},
			{
				title: "Quality Craftsmanship",
				description:
					"We do it right the first time. All work backed by our satisfaction guarantee.",
				icon: "Star",
			},
			{
				title: "Community Focused",
				description:
					"Locally owned, locally operated. We support Water City schools and charities.",
				icon: "Users",
			},
			{
				title: "Always Available",
				description:
					"Plumbing emergencies don't wait. Neither do we. 24/7/365 service.",
				icon: "Clock",
			},
		],
	},
	footer: {
		cta: {
			headline: "Join Thousands of Happy Clients and Book Today",
			subheadline:
				"Reliable, efficient, and professional plumbing services are just a click away.",
			primaryButtonText: "Book Service Now",
			secondaryButtonText: "Call",
		},
	},
	legal: {
		// IMPORTANT: Buyers must customize these values and have legal pages reviewed by a qualified Australian lawyer
		businessDetails: {
			registeredName: "FlowMasters Plumbing Pty Ltd", // Replace with registered business name
			abn: "XX XXX XXX XXX", // Replace with actual ABN
			acn: "", // Optional: Australian Company Number if applicable
			tradingAs: "FlowMasters", // Trading name if different
			licenseNumber: "XXXXXX", // State plumbing license number
			licenseState: "NSW", // State where licensed (NSW, VIC, QLD, SA, WA, TAS, NT, ACT)
		},
		contact: {
			privacyOfficer: "James Mitchell", // Person responsible for privacy matters
			privacyEmail: "privacy@flowmasters.com",
			complaintsEmail: "complaints@flowmasters.com",
		},
		jurisdiction: {
			state: "New South Wales", // State for legal jurisdiction
			stateShort: "NSW",
		},
		policies: {
			dataRetentionYears: 7, // How long customer records are kept
			warrantyPeriodMonths: 12, // Standard workmanship warranty
			cancellationNoticeHours: 24, // Required notice for appointment cancellation
			depositPercentage: 0, // Deposit required (0 if none)
			paymentTermsDays: 7, // Days to pay invoice after completion
		},
		lastUpdated: "January 2026", // Update when policies change
	},
};
