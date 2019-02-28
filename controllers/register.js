
const dbUsers = 'Back-end.users';
const dbLogin = 'Back-end.login';

const handleRegister = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,
        })
        .into(dbLogin)
        .returning('email')
        .then(loginEmail => {
            return trx(dbUsers)
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
        .catch(err => res.status(400).json('Unable to join. Please try again!')); 
}

module.exports = {
    handleRegister: handleRegister
};