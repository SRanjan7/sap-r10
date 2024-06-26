import { Tooltip } from "antd";
import React from "react";

import jsonData from "../assets/simulation.json";
const TooltipBar = (props) => {
  //   const curr_week = jsonData[parseInt(props.week) - 1].curr_week;
  const curr_week = 21;
  //   const onMouseEnterEvent = () => {
  //     dispatch(
  //       getServiceDOSTooltipData({
  //         material: props.material,
  //         location_id: props.location_id,
  //         week: props.week,
  //         month: props.month,
  //       })
  //     );
  //   };

  return (
    <Tooltip
      onMouseEnter={() => {
        // /onMouseEnterEvent();
      }}
      trigger={"hover"}
      title={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "6px 4px 6px 4px",
            gap: "5px",
            borderRadius: "2px",
            height: "201px",
            width: "220px",
            fontWeight: "400",
            fontsize: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",

              width: "210px",
              height: "20px",
              alignSelf: "stretch",
              fontSize: "12px",
              fontWeight: "400",
              fontStyle: "normal",
              color: "#FFFFFF",
            }}
          >
            {props.title}
            <div style={{ marginLeft: "auto" }}>{`week:${curr_week}`}</div>
          </div>

          <div
            style={{
              width: "210px",
              height: "0px",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              alignItems: "stretch",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0px",
              gap: "10px",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Indep.Req:"}</div>
            {/* <div>{jsonData.indep_Req}</div> */}
            <div>{241}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0px",
              gap: "10px",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Dep.Req:"}</div>
            {/* <div>{dosTooltipData.dep_Req}</div> */}
            <div>{501}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0px",
              gap: "10px",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Plan_Avail:"}</div>
            {/* <div>{dosTooltipData.plan_Avail}</div> */}
            <div>{0}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0px",
              gap: "10px",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Inv_Movement:"}</div>
            {/* <div>{dosTooltipData.inv_Movement}</div> */}
            <div>{21}</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0px",
              gap: "10px",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Inventory:"}</div>
            {/* <div>{dosTooltipData.inventory}</div> */}
            <div>{40}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0px",
              gap: "10px",
              width: "210px",
              height: "20px",
            }}
          >
            <div>{"Inventory_Days:"}</div>
            {/* <div>{dosTooltipData.inventory_Days}</div> */}
            <div>{85}</div>
          </div>

          {/* <div
            style={{
              width: '210px',
              height: '0px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              alignSelf: 'stretch',
            }}
          />
          <div style={{display: 'flex'}}>
            {
              'Note: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
          </div>
          <div>{'Date: 21 May 2023'}</div>
          <div>{'By: John Constantine'}</div> */}
        </div>
      }
    >
      <div>{props.children}</div>
    </Tooltip>
  );
};

export default React.memo(TooltipBar);
