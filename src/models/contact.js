const {fetch,fetchOne} = require("../utils/pg")

const addcontact = 'insert into notifs(notif_message,user_id)values($1, $2)';
const getcon = 'SELECT u.user_username, u.user_id, u.user_role, n.notif_message, n.notif_created_at from notifs as n INNER JOIN users as u ON n.user_id = u.user_id WHERE  u.user_id = n.user_id'

const contactadd = (message, id) =>fetchOne(addcontact, message, id)
const getcontact = () =>fetch(getcon)


module.exports = {contactadd, getcontact}