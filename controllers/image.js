const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'f1e5fe9ad89d4c1980f08d2861627943'
});
   
const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
    .catch(err => res.status(400).json('unable to work with API'))
}

const dbUsers = 'users';
const dbLogin = 'login';

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db(dbUsers).where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
};