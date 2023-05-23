import * as httpRequest from '~/Utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type: type,
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
