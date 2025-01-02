import { PieChart } from "react-minimal-pie-chart";
import styles from "./Piechart.module.css";

export const Piechart = () => {
  return (
    <>
      <div className={styles.container}>
        <PieChart
          data={[
            { title: "Progress", value: 0, color: "#909090" },
            { title: "Complete", value: 100, color: "#3B82F6" },
          ]}
          lineWidth={25}
          startAngle={15}
          radius={42}
          background="#000000"
          style={{ height: "200px", width: "220px" }}
        />
        <div className={styles.piechartText}>
          <p>Completed<br />
          30</p>
        </div>
        <div className={styles.piechartSpan}>
          <span>
            Completion Rate <br />100%
          </span>
        </div>
      </div>
    </>
  );
};
