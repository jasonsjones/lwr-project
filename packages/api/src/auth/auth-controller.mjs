export async function loginLocal(req, res) {
    const user = req.user;
    if (user) {
        return res.json({
            success: true,
            accessToken: '<jwt goes here>',
            user
        });
    }

    return res.json({
        success: false,
        accessToken: null,
        user: null
    });
}
