export type Review = {
	id: string;
	authorName: string;
	authorImage: string;
	rating: number;
	relativeTime: string;
	text: string;
	role: string;
	title: string;
};

const STATIC_REVIEWS: Review[] = [
	{
		id: "1",
		authorName: "Jerome Bell",
		role: "Homeowner",
		authorImage: "/images/team/avatar-jerome.jpg",
		rating: 5,
		relativeTime: "2 weeks ago",
		title: "Quick and Reliable Service",
		text: "I recently had an emergency plumbing issue, and this plumber provided quick and reliable service. They arrived promptly, identified the issue, and resolved it efficiently. I highly recommend this plumber.",
	},
	{
		id: "2",
		authorName: "Kathryn Murphy",
		role: "CEO, Logic",
		authorImage: "/images/team/avatar-kathryn.jpg",
		rating: 5,
		relativeTime: "1 month ago",
		title: "Best In Town Man",
		text: "I recently had an emergency plumbing issue, and this plumber provided quick and reliable service. They arrived promptly, identified the issue, and resolved it efficiently. I highly recommend this plumber.",
	},
	{
		id: "3",
		authorName: "Mark Johnson",
		role: "Homeowner",
		authorImage: "/images/team/avatar-mark.jpg",
		rating: 5,
		relativeTime: "3 months ago",
		title: "Professional Mark",
		text: "I recently had an emergency plumbing issue, and this plumber provided quick and reliable service. They arrived promptly, identified the issue, and resolved it efficiently. I highly recommend this plumber.",
	},
	{
		id: "4",
		authorName: "Sarah Peterson",
		role: "Business Owner",
		authorImage: "/images/team/avatar-kathryn.jpg", // Reuse for demo
		rating: 5,
		relativeTime: "4 months ago",
		title: "Exceptional Quality",
		text: "From start to finish, the experience was seamless. The team was professional, clean, and incredibly knowledgeable. Will definitely use them again for all our commercial needs.",
	},
];

export const GOOGLE_RATING = 4.8;
export const TOTAL_REVIEWS = 128;

export async function fetchGoogleReviews(placeId?: string): Promise<Review[]> {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	// Logic to fetch from Google Places API would go here.
	// Example:
	// const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=API_KEY`)
	// const data = await res.json()
	// return mapGoogleReviewsToDomain(data.result.reviews)

	return STATIC_REVIEWS;
}
