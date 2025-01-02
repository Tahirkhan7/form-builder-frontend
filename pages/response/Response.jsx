import { useParams } from "react-router-dom";
import HeaderDashboard from "../../components/HeaderDashboard";
import { Piechart } from "../../components/Piechart";
import styles from "./Response.module.css";
import { useEffect, useState } from "react";
import { getFormResponses } from "../../services/response";

export default function Response() {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [formQuestions, setFormQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (formId) {
          const result = await getFormResponses(formId);
          if (result.status === 200) {
            setResponses(result.data.responses || []);

            const firstResponseQuestions = result.data.responses[0].response.map(item => item.question);
            if(firstResponseQuestions.length > 0)
            setFormQuestions(firstResponseQuestions);
          }
        }
      } catch (error) {
        console.error("Failed to fetch form responses:", error);
      }
    };
    fetchData();
  }, [formId]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleString("en-US", options);
  };

  return (
    <>
      <HeaderDashboard />
      <div className={styles.container}>
        {responses.length > 0 ? (<> <div className={styles.responses}>
          <div className={styles.analytics}>
            <div className={styles.analyticsNumbers}>
              <span>
                Views <br />{responses.length}
              </span>
              <span>
                Starts <br />{responses.length}
              </span>
            </div>

            <div className={styles.analyticsTable}>
              <table className={styles.responseTable}>
                <thead className={styles.responseTableThead}>
                  <tr>
                    <th></th>
                    <th className={styles.submitted}>
                      <img src="/images/date_white.png" alt="" /> Submission Date
                    </th>
                    {formQuestions.length > 0 &&
                      formQuestions.map((question, index) => (
                        <th key={index}>{question}</th>
                      ))}
                  </tr>
                </thead>
                <tbody className={styles.responseTableTbody}>
                  {responses.length > 0 ? (
                    responses.map((response, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{formatDate(response.submittedAt)}</td>
                          {response.response.map((resp, i) => {
                            return (
                              <td key={i}>
                                {resp.answer }
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={formQuestions.length + 2}>No responses found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>


          </div>
        </div>
        <Piechart /></>) :(<h2 className={styles.noResponse}>No Response yet collected</h2>)}
        
      </div>
    </>
  );
}
