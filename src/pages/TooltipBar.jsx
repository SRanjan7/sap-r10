import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import simdata from "../assets/simulation.json";

const TooltipBar = (props) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (props) {
      const filtered = simdata.filter(
        (item) =>
          item.avilablestock == props.avilablestock &&
          item.totalinv == props.totalinv
      );
      setFilteredData(filtered);
    }
  }, [props]);

  const getTooltipData = (week) => {
    const indepReq = filteredData.find((item) => item.vmi == "indep_req_qty");
    const depReq = filteredData.find((item) => item.vmi == "dep_req_qty");
    const dos = filteredData.find((item) => item.vmi == "days_of_supply");
    const planAval = filteredData.find((item) => item.vmi == "plan_avail_qty");
    const invMov = filteredData.find((item) => item.vmi == "inv_movement_qty");
    const totalInv = filteredData.find((item) => item.vmi == "inventory_qty");

    return {
      indep_req_qty: indepReq ? indepReq[`w${week}`] : "N/A",
      dep_req_qty: depReq ? depReq[`w${week}`] : "N/A",
      days_of_supply: dos ? dos[`w${week}`] : "N/A",
      plan_avail_qty: planAval ? planAval[`w${week}`] : "N/A",
      inv_movement_qty: invMov ? invMov[`w${week}`] : "N/A",
      inventory_qty: totalInv ? totalInv[`w${week}`] : "N/A",
    };
  };

  const week = props.week; // use the week prop
  const tooltipData = getTooltipData(week);

  return (
    <Tooltip
      onMouseEnter={() => {
        // onMouseEnterEvent();
      }}
      trigger={"hover"}
      title={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "6px 4px",
            gap: "5px",
            borderRadius: "2px",
            height: "201px",
            width: "220px",
            fontWeight: "400",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "210px",
              height: "20px",
              fontSize: "12px",
              fontWeight: "400",
              color: "#FFFFFF",
            }}
          >
            {props.title}
            <div style={{ marginLeft: "auto" }}>{`week:${week}`}</div>
          </div>

          <div
            style={{
              width: "210px",
              height: "0px",
              border: "1px solid rgba(255, 255, 255, 0.4)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Indep.Req:"}</div>
            <div>{tooltipData.indep_req_qty}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Dep.Req:"}</div>
            <div>{tooltipData.dep_req_qty}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Plan_Avail:"}</div>
            <div>{tooltipData.plan_avail_qty}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Inv_Movement:"}</div>
            <div>{tooltipData.inv_movement_qty}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Inventory:"}</div>
            <div>{tooltipData.inventory_qty}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Inventory_Days:"}</div>
            <div>{tooltipData.days_of_supply}</div>
          </div>
        </div>
      }
    >
      <div>{props.children}</div>
    </Tooltip>
  );
};

export default React.memo(TooltipBar);
