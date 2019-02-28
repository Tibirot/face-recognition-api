const dbUsers = 'users';
const dbLogin = 'login';

const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*').from(dbUsers).where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(404).json('User not found');
            }
        })
        .catch(err => res.status(400).json('error getting user'));
}

module.exports = {
    handleProfileGet: handleProfileGet
};