"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

import { SITE_CONFIG } from "@/lib/site-config";

// Define validation schema
const contactFormSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	phone: z.string().min(10, "Phone number must be at least 10 digits"),
	email: z.string().email("Invalid email address"),
	service: z.string().min(1, "Please select a service"),
	urgency: z.string().min(1, "Please select an urgency level"),
	propertyType: z.string().min(1, "Please select a property type"),
	contactTime: z.string().min(1, "Please select a contact time"),
	message: z.string().optional(),
	// Validate file attachment (optional, max 5MB, images/pdf only)
	// Validate file attachment (optional, max 10MB total, images/video/pdf only)
	attachment: z
		.union([
			z.instanceof(File),
			z.array(z.instanceof(File)),
			z.undefined(),
			z.null(),
		])
		.optional()
		.transform((val) => {
			if (val instanceof File) return [val];
			if (Array.isArray(val)) return val;
			return [];
		})
		.refine(
			(files) => {
				const totalSize = files.reduce((acc, file) => acc + file.size, 0);
				return totalSize <= 10 * 1024 * 1024;
			},
			{
				message: "Total attachment size must be less than 10MB",
			},
		)
		.refine(
			(files) =>
				files.every((file) =>
					[
						"image/jpeg",
						"image/png",
						"image/webp",
						"application/pdf",
						"video/mp4",
						"video/quicktime",
						"video/webm",
					].some((type) => file.type.startsWith(type.split("/")[0])),
				),
			{
				message: "Only Images, Videos, and PDF formats are supported",
			},
		),
});

export type ContactFormState = {
	success: boolean;
	message: string;
	errors?: {
		[K in keyof z.infer<typeof contactFormSchema>]?: string[];
	};
};

export async function submitContactForm(
	_prevState: ContactFormState,
	formData: FormData,
): Promise<ContactFormState> {
	// Validate form data
	const validatedFields = contactFormSchema.safeParse({
		name: formData.get("name"),
		phone: formData.get("phone"),
		email: formData.get("email"),
		service: formData.get("service"),
		urgency: formData.get("urgency"),
		propertyType: formData.get("propertyType"),
		contactTime: formData.get("contactTime"),
		message: formData.get("message"),

		attachment: formData.getAll("attachment"), // Get all files
	});

	// Return early if validation fails
	if (!validatedFields.success) {
		return {
			success: false,
			message: "Invalid form data. Please check the errors.",
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const {
		name,
		phone,
		email,
		service,
		urgency,
		propertyType,
		contactTime,
		message,
		attachment,
	} = validatedFields.data;

	// Check if configured for Nodemailer
	if (SITE_CONFIG.email.provider !== "nodemailer") {
		return {
			success: false,
			message: "Server sending is not enabled in configuration.",
		};
	}

	try {
		// Create Nodemailer transporter
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT) || 587,
			secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		// Verify connection config
		await transporter.verify();

		// Construct HTML email
		// Construct HTML email with modern styling
		const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead from Website</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
    
    <!-- Header -->
    <div style="background-color: #0f172a; padding: 32px 24px; text-align: center; border-bottom: 4px solid #0284c7;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">${SITE_CONFIG.brand.name}</h1>
      <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">New Service Inquiry</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 40px 32px;">
      
      <!-- Key Info Card -->
      <div style="text-align: center; margin-bottom: 40px;">
        <p style="color: #64748b; font-size: 13px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">Service Requested</p>
        <h2 style="color: #0284c7; font-size: 32px; margin: 0; font-weight: 800; line-height: 1.2;">${service}</h2>
        
        <div style="margin-top: 16px;">
          <span style="display: inline-block; padding: 8px 16px; background-color: ${urgency.toLowerCase() === "emergency" ? "#fef2f2" : "#f0f9ff"}; border: 1px solid ${urgency.toLowerCase() === "emergency" ? "#fca5a5" : "#bae6fd"}; border-radius: 9999px; color: ${urgency.toLowerCase() === "emergency" ? "#dc2626" : "#0284c7"}; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
            ${urgency} Priority
          </span>
        </div>
      </div>

      <!-- Customer Details -->
      <h3 style="color: #0f172a; font-size: 18px; font-weight: 700; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px;">Customer Details</h3>
      <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
        <tr>
          <td style="padding: 12px 0; color: #64748b; font-weight: 500; width: 140px; border-bottom: 1px solid #f1f5f9;">Name</td>
          <td style="padding: 12px 0; color: #0f172a; font-weight: 600; border-bottom: 1px solid #f1f5f9; font-size: 16px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Phone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none; font-weight: 600; font-size: 16px;">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none; font-weight: 600; font-size: 16px;">${email}</a></td>
        </tr>
         <tr>
          <td style="padding: 12px 0; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Property Type</td>
          <td style="padding: 12px 0; color: #0f172a; font-weight: 600; border-bottom: 1px solid #f1f5f9; font-size: 16px;">${propertyType}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #64748b; font-weight: 500;">Preferred Time</td>
          <td style="padding: 12px 0; color: #0f172a; font-weight: 600; font-size: 16px;">${contactTime}</td>
        </tr>
      </table>

      <!-- Message Section -->
      <h3 style="color: #0f172a; font-size: 18px; font-weight: 700; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 40px; margin-bottom: 20px;">Additional Message</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; color: #334155; line-height: 1.6; font-size: 16px;">
        ${message ? message.replace(/\n/g, "<br>") : "<em style='color: #94a3b8;'>No additional message provided.</em>"}
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #64748b; font-size: 13px; margin: 0; line-height: 1.5;">
        This email was sent via the <strong>${SITE_CONFIG.brand.name}</strong> website contact form.<br>
        Please do not reply directly to this automated email if the sender's email address is not in the "Reply-To" field.
      </p>
      <p style="color: #cbd5e1; font-size: 12px; margin: 24px 0 0;">
        &copy; ${new Date().getFullYear()} ${SITE_CONFIG.brand.name}. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
    `;

		// Prepare attachments if present
		const attachments = [];
		if (attachment && attachment.length > 0) {
			for (const file of attachment) {
				if (file.size > 0 && file.name !== "undefined") {
					const buffer = Buffer.from(await file.arrayBuffer());
					attachments.push({
						filename: file.name,
						content: buffer,
					});
				}
			}
		}

		// Send email
		await transporter.sendMail({
			from: `"${SITE_CONFIG.brand.name} Website" <${process.env.SMTP_USER}>`, // Sender address
			to: SITE_CONFIG.email.to, // Receiver address from config
			replyTo: email,
			subject: `New Lead: ${service} - ${name} (${urgency})`,
			html: htmlContent,
			text: `New Lead From ${name}\nService: ${service}\nUrgency: ${urgency}\nPhone: ${phone}\nMessage: ${message}`,
			attachments: attachments,
		});

		return {
			success: true,
			message: "Thank you! Your message has been sent successfully.",
		};
	} catch (error) {
		console.error("Email sending failed:", error);
		return {
			success: false,
			message:
				"Failed to send email. Please try again or call us directly. (Check server logs for details)",
		};
	}
}
