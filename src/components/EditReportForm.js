import { useParams } from 'react-router-dom';

import ReportForm from './ReportForm';

const EditReportForm = () => {
  const { reportId } = useParams();
  const report = {};

  if (!report) return(<></>);

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    Object.keys(report).length > 1 && (
      <>
        <ReportForm
          report={report}
          formType="Update Report"
        />
      </>
    )
  );
};

export default EditReportForm;