export default function userDetailsListReducer(state, action) {
  switch (action.type) {
    case "changeRatingNewListItem": {
      console.log(`changeRatingNewListItem`);
      console.log(action.rate);
      console.log(action.identifier);
      return {
        // add new state: in this case updated object
        ...state,
        [action.identifier]: {
          ...state[action.identifier],
          level: action.rate,
        },
      };
      break;
    }
  }
}
