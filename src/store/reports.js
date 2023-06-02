/** Action Type Constants: */
export const LOAD_REPORTS = "reports/LOAD_REPORTS";
export const RECEIVE_REPORT = "reports/RECEIVE_REPORT";
export const UPDATE_REPORT = "reports/UPDATE_REPORT";
export const REMOVE_REPORT = "reports/REMOVE_REPORT";

/**  Action Creators: */
export const loadReports = (reports) => ({
  type: LOAD_REPORTS,
  reports,
});

export const receiveReport = (report) => ({
  type: RECEIVE_REPORT,
  report,
});

export const editReport = (report) => ({
  type: UPDATE_REPORT,
  report,
});

export const removeReport = (reportId) => ({
  type: REMOVE_REPORT,
  reportId,
});

/** Thunk Action Creators: */

// Your code here

//phase 1
export const getAllReports = () => async (dispatch) => {
  const res = await fetch("/api/reports");

  if (res.ok) {
    const reports = await res.json();
    dispatch(loadReports(reports));
  }
};

//phase 2
export const deleteReport = (reportId) => async (dispatch) => {
  const res = await fetch(`/api/reports/${reportId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeReport(reportId));
  } else {
    const errorData = await res.json();
    console.log(errorData);
    return errorData;
  }
};

//phase 3
export const getReport = (reportId) => async (dispatch) => {
  const res = await fetch(`/api/reports/${reportId}`);

  if (res.ok) {
    const report = await res.json();
    dispatch(receiveReport(report));
  }
};

//phase 4
export const createReport = (report) => async (dispatch) => {
  const res = await fetch("/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });

  if (res.ok) {
    const reportData = await res.json();
    dispatch(receiveReport(reportData));
    return reportData;
  } else {
    const errors = await res.json();
    console.log(errors);
    return errors;
  }
};

//phase 5
export const updateReport = (report) => async (dispatch) => {
  const res = await fetch(`/api/reports/${report.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });

  if (res.ok) {
    const reportData = await res.json();
    dispatch(editReport(reportData));
    return reportData;
  } else {
    const errors = await res.json();
    console.log(errors);
    return errors;
  }
};

/** The reports reducer is complete and does not need to be modified */
const reportsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REPORTS:
      const reportsState = {};
      action.reports.forEach((report) => {
        reportsState[report.id] = report;
      });
      return reportsState;
    case RECEIVE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case UPDATE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case REMOVE_REPORT:
      const newState = { ...state };
      delete newState[action.reportId];
      return newState;
    default:
      return state;
  }
};

export default reportsReducer;
