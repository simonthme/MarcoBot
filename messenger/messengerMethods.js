/**
 * Created by corentin on 02/05/2018.
 */
const apiMessenger = require('../helpers/apiMessenger');
<<<<<<< HEAD
const GraphqlRequest = require('../helpers/apiGraphql');
=======
const ApiGraphql = require('../helpers/apiGraphql');
>>>>>>> 6211e0d032da1af454ac7e5b79065d5f7e59dabc
const mutationAccountMessenger = require('../graphql/accountMessenger/mutation');
const mutationUser = require('../graphql/user/mutation');
const config = require('../config');
module.exports = {
  createUser: (senderId) => {
    return new Promise((resolve, reject) => {
      apiMessenger.receiveProfileFacebook(senderId)
        .then((res) => {
          if (res.data) {
            const userToSave = {
              firstName: res.data.first_name,
              lastName: res.data.last_name,
              timezone: res.data.timezone,
              gender: res.data.gender,
              locale: res.data.locale,
              profilePic: res.data.profile_pic,
              PSID: senderId
            };
            // const mutationCreateAccount = mutationAccountMessenger.createAccountMessenger(userToSave.PSID,
            //   userToSave.locale, userToSave.timezone);
            const mutationCreateAccount = mutationAccountMessenger.createAccountMessenger();
            const mutationCreateUser = mutationUser.createUser();
<<<<<<< HEAD
            const graphqlRequest = new GraphqlRequest(config.category[config.indexCategory].apiGraphQlUrl, config.accessTokenMarcoApi);
            graphqlRequest.sendMutation(mutationCreateAccount, userToSave)
=======
            const apiGraphql = new ApiGraphql();
            apiGraphql.sendMutation(mutationCreateAccount, userToSave)
>>>>>>> 6211e0d032da1af454ac7e5b79065d5f7e59dabc
              .then(accountSaved => {
                if (accountSaved) {
                  console.log(accountSaved);
                  userToSave.accountmessengers_id = accountSaved.createAccountMessenger.id;
                    apiGraphql.sendMutation(mutationCreateUser, userToSave)
                    .then(userSaved=> {
                      return resolve(userSaved);
                    })
                    .catch(err => console.log(err));
                }

              })
              .catch(err =>  reject(err));
          }
        })
        .catch(err => reject(err));
    });
  },
};