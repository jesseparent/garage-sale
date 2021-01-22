
exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
// this will need to be fixed.
// if upload doesnt work on heroku check here
? 'https://react-image-upload.surge.sh'
: 'http://localhost:3000'