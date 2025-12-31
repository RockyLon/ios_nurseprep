


// import { Glassfy } from "capacitor-plugin-glassfy";
// import { Dialog, LocalStorage, Loading } from 'quasar'

// const premium = LocalStorage.getItem('premium') === true;


// export default async ({ app }) => {
//   const isDebugMode = false; // Your potential debug control
//   const hasInitializedKey = 'glassfyInitialized'; // For tracking past initialization

//   if (!premium ) {
//     Loading.show({
//       message: `Gathering exam resources… Hold on.`
//     });
//     // Neither premium, nor previously initialized
//     try {


//       await Glassfy.initialize({
//         apiKey: '16173837ecbe49a3baa51d202ea049fd',
//         watcherMode: false,
//       });

//       // Only fetch offerings on non-premium start
//       const offerings = await Glassfy.offerings();


//       const offeringsJSON = JSON.stringify(offerings.all);
//       localStorage.setItem('offerings', offeringsJSON);
//       LocalStorage.set('premium', false)
//       LocalStorage.set(hasInitializedKey, true);

//       Loading.hide()


//     } catch (e) {
//       Loading.hide()
//       if (e.message && e.message.includes('restorePurchases')) { // Hypothetical example
//         // Handle scenario where no previous purchases might exist
//       } else {
//         // Handle other potential Glassfy initialization issues
//       }
//     }
//   }
// }
