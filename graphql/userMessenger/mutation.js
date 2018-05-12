/**
 * Created by corentin on 02/05/2018.
 */
module.exports = {
  createUserMessenger: (PSID, firstName, lastName, gender, locale, timezone) => {
    return `mutation createUserMessenger($PSID: ID!, $firstName: String, $lastName: String, $gender: String, $locale: String, $timezone: Int){
        createUserMessenger(PSID: $PSID,firstName: $firstName, lastName: $lastName,gender: $gender, locale: $locale, timezone: $timezone) {
          PSID,
          firstName,
          lastName,
        }
      }
    `
  }
};