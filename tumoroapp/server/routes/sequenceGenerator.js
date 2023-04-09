var Sequence = require('../models/sequence-model');

var maxPlacesId;
var maxUsersId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .exec()
    .then(function(sequence) {
      if (!sequence) {
        throw new Error('No sequence found');
      }
      sequenceId = sequence._id;
      maxPlacesId = sequence.maxPlacesId;
      maxUsersId = sequence.maxUsersId;
    })
    .catch(function(err) {
      console.log(err);
      throw err;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'places':
      maxPlacesId++;
      updateObject = {maxPlacesId: maxPlacesId};
      nextId = maxPlacesId;
      break;
    case 'users':
      maxUsersId++;
      updateObject = {maxUsersId: maxUsersId};
      nextId = maxUsersId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
    .exec()
    .catch(function(err) {
      console.log(err);
      throw err;
    });

  return nextId;
};

module.exports = new SequenceGenerator();


// var Sequence = require('../models/sequence-model');

// var maxDocumentId;
// var maxMessageId;
// var maxContactId;
// var sequenceId = null;

// // function SequenceGenerator() {

// //   Sequence.findOne()
// //     .exec(function(err, sequence) {
// //       if (err) {
// //         return res.status(500).json({
// //           title: 'An error occurred',
// //           error: err
// //         });
// //       }

// //       sequenceId = sequence._id;
// //       maxDocumentId = sequence.maxDocumentId;
// //       maxMessageId = sequence.maxMessageId;
// //       maxContactId = sequence.maxContactId;
// //     });
// // }

// function SequenceGenerator() {
//   Sequence.findOne()
//     .exec()
//     .then(function(sequence) {
//       sequenceId = sequence._id;
//       maxDocumentId = sequence.maxDocumentId;
//       maxMessageId = sequence.maxMessageId;
//       maxContactId = sequence.maxContactId;
//     })
//     .catch(function(err) {
//       return res.status(500).json({
//         title: 'An error occurred',
//         error: err
//       });
//     });
// }

// SequenceGenerator.prototype.nextId = function(collectionType) {

//   var updateObject = {};
//   var nextId;

//   switch (collectionType) {
//     case 'documents':
//       maxDocumentId++;
//       updateObject = {maxDocumentId: maxDocumentId};
//       nextId = maxDocumentId;
//       break;
//     case 'messages':
//       maxMessageId++;
//       updateObject = {maxMessageId: maxMessageId};
//       nextId = maxMessageId;
//       break;
//     case 'contacts':
//       maxContactId++;
//       updateObject = {maxContactId: maxContactId};
//       nextId = maxContactId;
//       break;
//     default:
//       return -1;
//   }

//   Sequence.update({_id: sequenceId}, {$set: updateObject},
//     function(err) {
//       if (err) {
//         console.log("nextId error = " + err);
//         return null
//       }
//     });

//   return nextId;
// }

// module.exports = new SequenceGenerator();
