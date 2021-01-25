const hide_password = (users, req, res, next) => {

    users.map(a_user => {
        delete (a_user.password);//remove password field on each user, to not show it in json result
    });

    res.json(users);
}

module.exports = hide_password;