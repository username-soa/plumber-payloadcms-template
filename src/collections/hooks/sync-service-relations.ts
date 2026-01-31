import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from "payload";
import type { Service } from "@/payload-types";

// Prevent infinite loops by flagging updates triggered by this hook
const SYNC_CONTEXT_KEY = "triggerSync";

export const syncServiceRelations: CollectionAfterChangeHook<Service> = async ({
	doc,
	previousDoc,
	req,
	context,
	operation,
}) => {
	// 1. Skip if this update was triggered by our own sync hook
	if (context[SYNC_CONTEXT_KEY] === false) {
		return doc;
	}

	const { payload } = req;
	// Use a context that prevents recursion for all subsequent updates
	const syncContext = { [SYNC_CONTEXT_KEY]: false };

	// ==============================================================================
	// SCENARIO A: Sub-Services Changed (Sync DOWN to Children)
	// ==============================================================================
	if (operation === "create" || operation === "update") {
		const newSubServices = (doc.subServices || []).map((s) =>
			typeof s === "object" ? s.id : s,
		);
		const oldSubServices = (previousDoc?.subServices || []).map((s) =>
			typeof s === "object" ? s.id : s,
		);

		// 1. Identify Added Children -> Set their Parent to THIS doc
		const addedChildren = newSubServices.filter(
			(id) => !oldSubServices.includes(id),
		);
		if (addedChildren.length > 0) {
			await Promise.all(
				addedChildren.map(async (childId) => {
					// We need to fetch the child first to ensure we don't overwrite other unrelated fields if we were doing a full update,
					// but here we are doing a patch. Payload local API 'update' merges by default.
					// However, we want to be safe.
					// Check if child exists first? Payload update throws if not found?
					try {
						await payload.update({
							collection: "services",
							id: childId,
							data: {
								parentService: doc.id,
							},
							req,
							context: syncContext,
						});
					} catch (error) {
						console.error(
							`Error syncing parent for added child service ${childId}:`,
							error,
						);
					}
				}),
			);
		}

		// 2. Identify Removed Children -> Set their Parent to NULL (but only if it's still THIS doc)
		const removedChildren = oldSubServices.filter(
			(id) => !newSubServices.includes(id),
		);
		if (removedChildren.length > 0) {
			await Promise.all(
				removedChildren.map(async (childId) => {
					try {
						const child = await payload.findByID({
							collection: "services",
							id: childId,
							req,
							depth: 0,
						});
						// Only if the parent is currently THIS doc, we remove it.
						// If the user already re-assigned it to another parent, we shouldn't touch it.
						const childParentId =
							typeof child.parentService === "object"
								? child.parentService?.id
								: child.parentService;

						if (childParentId === doc.id) {
							await payload.update({
								collection: "services",
								id: childId,
								data: {
									parentService: null,
								},
								req,
								context: syncContext,
							});
						}
					} catch (error) {
						console.error(
							`Error removing parent for removed child service ${childId}:`,
							error,
						);
					}
				}),
			);
		}
	}

	// ==============================================================================
	// SCENARIO B: Parent Service Changed (Sync UP to Parent)
	// ==============================================================================
	const newParentId =
		typeof doc.parentService === "object"
			? doc.parentService?.id
			: doc.parentService;
	const oldParentId =
		typeof previousDoc?.parentService === "object"
			? previousDoc?.parentService?.id
			: previousDoc?.parentService;

	if (newParentId !== oldParentId) {
		// 1. Old Parent: Remove THIS doc from its subServices
		if (oldParentId) {
			try {
				const oldParent = await payload.findByID({
					collection: "services",
					id: oldParentId,
					req,
					depth: 0,
				});

				const oldParentSubs = (oldParent.subServices || []).map((s) =>
					typeof s === "object" ? s.id : s,
				);

				if (oldParentSubs.includes(doc.id)) {
					await payload.update({
						collection: "services",
						id: oldParentId,
						data: {
							subServices: oldParentSubs.filter((id) => id !== doc.id),
						},
						req,
						context: syncContext,
					});
				}
			} catch (error) {
				console.error(
					`Error cleaning up old parent ${oldParentId} for service ${doc.id}:`,
					error,
				);
			}
		}

		// 2. New Parent: Add THIS doc to its subServices
		if (newParentId) {
			try {
				const newParent = await payload.findByID({
					collection: "services",
					id: newParentId,
					req,
					depth: 0,
				});

				const newParentSubs = (newParent.subServices || []).map((s) =>
					typeof s === "object" ? s.id : s,
				);

				if (!newParentSubs.includes(doc.id)) {
					await payload.update({
						collection: "services",
						id: newParentId,
						data: {
							subServices: [...newParentSubs, doc.id],
						},
						req,
						context: syncContext,
					});
				}
			} catch (error) {
				console.error(
					`Error adding to new parent ${newParentId} for service ${doc.id}:`,
					error,
				);
			}
		}
	}

	return doc;
};

export const cleanupServiceRelations: CollectionAfterDeleteHook<
	Service
> = async ({ doc, req }) => {
	const { payload } = req;
	const syncContext = { [SYNC_CONTEXT_KEY]: false };

	// 1. If deleted service was a Parent -> Orphan its children
	if (doc.subServices && doc.subServices.length > 0) {
		const childrenIds = doc.subServices.map((s) =>
			typeof s === "object" ? s.id : s,
		);
		await Promise.all(
			childrenIds.map(async (childId) => {
				try {
					await payload.update({
						collection: "services",
						id: childId,
						data: {
							parentService: null,
						},
						req,
						context: syncContext,
					});
				} catch (error) {
					console.error(
						`Error orphaning child ${childId} after parent ${doc.id} deletion:`,
						error,
					);
				}
			}),
		);
	}

	// 2. If deleted service had a Parent -> Remove from that Parent's list
	if (doc.parentService) {
		const parentId =
			typeof doc.parentService === "object"
				? doc.parentService.id
				: doc.parentService;
		try {
			const parent = await payload.findByID({
				collection: "services",
				id: parentId,
				req,
				depth: 0,
			});

			const parentSubs = (parent.subServices || []).map((s) =>
				typeof s === "object" ? s.id : s,
			);

			if (parentSubs.includes(doc.id)) {
				await payload.update({
					collection: "services",
					id: parentId,
					data: {
						subServices: parentSubs.filter((id) => id !== doc.id),
					},
					req,
					context: syncContext,
				});
			}
		} catch (error) {
			console.error(
				`Error removing deleted child ${doc.id} from parent ${parentId}:`,
				error,
			);
		}
	}
};
