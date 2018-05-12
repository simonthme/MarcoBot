/**
 * Created by corentin on 02/05/2018.
 */
module.exports = {
  queryPSID: (PSID) => {
    return `{
      userMessenger(PSID: ${PSID}) {
          id,
          idUser,
          PSID,
          firstName,
          lastName,
          timezone,
          createAt,
          gender,
          deleted,
          locale
        }
    }`
  }
};