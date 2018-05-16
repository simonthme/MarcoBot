/**
 * Created by corentin on 02/05/2018.
 */
module.exports = {
  createAccountMessenger: (PSID, locale, timezone) => {
    return `mutation createAccountMessenger($PSID: ID!, $locale: String, $timezone: Int){
        createAccountMessenger(PSID: $PSID, locale: $locale, timezone: $timezone) {
          PSID,
          id
        }
      }
    `
  }
};

