// A file that contains different type of generators

module.exports = {
    // Generate random string based on length
    randString: function (length) {
        let random_string           = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            random_string += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return random_string;
    },
};

