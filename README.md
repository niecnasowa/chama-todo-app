Instructions for this assignment: [https://github.com/chamatheapp/chama-frontend-assignment](https://github.com/chamatheapp/chama-frontend-assignment)

### Must have
- [x] Assign priority to a TO-DO and sort them by **highest to lowest priority**;
- [x] Set a due time. Add real-time visual and auditive hints to the TO-DO item that indicate that the due time is near and has passed;
- [x] Nice usability;
- [x] Nice stylesheet and a nice layout out of it;
- [x] Work on Chrome.

### Nice to have
- [x] Sign-in/Sign-out functionality using [Firebase Auth](https://firebase.google.com/docs/auth/);
- [x] Use **[Firebase Realtime Database](https://firebase.google.com/docs/database/)** linked to **Redux** to keep all the TO-DO's;
- [?] Optimistic response when dealing with firebase;
- [x] Host your working app on the *[Firebase Hosting environment](https://firebase.google.com/docs/hosting/)*;
- [x] Unit tests;
- [x] Aceptance tests;

### To start app
#### 1. clone repository
#### 2. `npm i`
#### 3. `npm start`

### Notes
#### Four categories of To-Do with different colors: before (before now), veryClose (today), close (3 days), normal (more than 3 days)
#### I created one example test with jest in: src/components/Item/Item.test.js, to run tests 'npm run test'
#### Also created example of acceptance test with cypress, you can check it in /cypress folder, to run tests:
##### 1. run server 'npm run start'
##### 2. run tests 'npm run cypress'
