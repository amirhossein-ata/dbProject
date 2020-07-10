import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  getBusinessesStatus: "idle",
  getBusinessDetailStatus: "idle",
  businesses: [],
  businessDetail: undefined,
  getBusinessDashboardStatus: "idle",
  allReservations: [],
  customers: [],
  increaseReservePercentageForDay: undefined,
  increaseReservePercentageForMonth: undefined,
  increaseReservePercentageForWeek: undefined,
  numberOfReserveInCurrentMonth: undefined,
  numberOfReserveInCurrentWeek: undefined,
  numberOfReserveInDay: undefined,
  popularService: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BUSINESS_REQUEST:
      return immutable(state, {
        getBusinessesStatus: { $set: "running" },
      });

    case ActionTypes.ADD_BUSINESS_SUCCESS:
      return immutable(state, {
        getBusinessesStatus: { $set: "loaded" },
        businesses: { $push: [action.payload.business] },
      });

    case ActionTypes.GET_BUSINESSES_REQUEST:
      return immutable(state, {
        getBusinessesStatus: { $set: "running" },
      });

    case ActionTypes.GET_BUSINESSES_SUCCESS:
      return immutable(state, {
        getBusinessesStatus: { $set: "loaded" },
        businesses: { $set: action.payload },
      });

    case ActionTypes.GET_BUSINESS_REQUEST:
      return immutable(state, {
        getBusinessDetailStatus: { $set: "running" },
      });

    case ActionTypes.GET_BUSINESS_SUCCESS:
      return immutable(state, {
        getBusinessDetailStatus: { $set: "loaded" },
        businessDetail: { $set: action.payload },
      });

    case ActionTypes.SET_BUSINESS_DETAIL_LOAD_STATUS:
      return immutable(state, {
        getBusinessDetailStatus: { $set: action.payload.status },
      });

    case ActionTypes.SET_BUSINESSES_LOAD_STATUS:
      return immutable(state, {
        getBusinessesStatus: { $set: action.payload.status },
      });
    case ActionTypes.EDIT_BUSINESS_SUCCESS:
      return immutable(state, {
        businessDetail: {
          business: { $set: action.payload.business },
          pictures: { $set: action.payload.pictures },
        },
      });
    case ActionTypes.GET_BUSINESS_DASHBOARD_REQUEST:
      return immutable(state, {
        getBusinessDashboardStatus: { $set: "running" },
      });
    case ActionTypes.GET_BUSINESS_DASHBOARD_SUCCESS:
      return immutable(state, {
        getBusinessDashboardStatus: { $set: "loaded" },
        allReservations: { $set: action.payload.allReservations },
        customers: { $set: action.payload.customers },
        increaseReservePercentageForDay: {
          $set: action.payload.increaseReservePercentageForDay,
        },
        increaseReservePercentageForMonth: {
          $set: action.payload.increaseReservePercentageForMonth,
        },
        increaseReservePercentageForWeek: {
          $set: action.payload.increaseReservePercentageForWeek,
        },
        numberOfReserveInCurrentMonth: {
          $set: action.payload.numberOfReserveInCurrentMonth,
        },
        numberOfReserveInCurrentWeek: {
          $set: action.payload.numberOfReserveInCurrentWeek,
        },
        numberOfReserveInDay: { $set: action.payload.numberOfReserveInDay },
        popularService: { $set: action.payload.popularService },
      });
    default:
      return state;
  }
};
