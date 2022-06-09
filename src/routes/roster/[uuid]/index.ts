export async function get({ params }: { params: { uuid: string } }) {
	const { uuid } = params;

	if (!uuid) {
		return {
			status: 400,
			body: { errors: ['id is required'] }
		};
	}

	return {
		headers: { Location: `/roster/${uuid}/overview` },
		status: 302
	};
}
