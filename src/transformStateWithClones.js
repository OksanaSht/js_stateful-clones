'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const arrayActions = [];

  for (const element of actions) {
    if (element.type === 'addProperties') {
      Object.assign(newState, { ...element.extraData });
      arrayActions.push({ ...newState });
    }

    if (element.type === 'removeProperties') {
      for (const key of element.keysToRemove) {
        delete newState[key];
      }
      arrayActions.push({ ...newState });
    }

    if (element.type === 'clear') {
      for (const k in newState) {
        delete newState[k];
      }
      arrayActions.push({ ...newState });
    }
  }

  return arrayActions;
}

module.exports = transformStateWithClones;
