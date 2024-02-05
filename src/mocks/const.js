const SortType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

// const Filters = [
//   {
//     type: 'EVERYTHING',
//     count: 0
//   },
//   {
//     type: 'FUTURE',
//     count: 0
//   },
//   {
//     type: 'PRESENT',
//     count: 0
//   },
//   {
//     type: 'PAST',
//     count: 0
//   },
// ];

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST',
};

export { SortType, UserAction, UpdateType, FilterType };
