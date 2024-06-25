import { message, Tooltip, Popover, Radio, Input, Button } from "antd";
import axios from "components/services/lib/axios";
import getDateMonth from "components/utility/getDateMonth";
import { getDaySupplyBGColor } from "components/utility/getDaySupplyBGColor";
import { AuthContext } from "context/ContextProvider";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SimulationDataContext } from "./SimulationModal";
import { CloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useRef } from "react";
import Cell from "../SelectedTableCell/cell";
import forcastData from "../assets/forcastData.json";
const changableCols = [
  "dep_req_qty",
  "indep_req_qty",
  "plan_avail_qty",
  "inv_movement_qty",
  "tot_inv_Unusable",
];

// cur_week_inv_qty =  prev_week_inventory_qty - dep_req_qty - indep_req_qty + plan_avail_qty + inv_movement_qty
// count sum till sum<inventory_quantity,count*7

const useSimulationColumns = () => {
  const { dynamicData, setDynamicData } = React.useContext(
    SimulationDataContext
  );
  const { auth } = React.useContext(AuthContext);
  const { forcastData } = forcastData;
  console.log("forcastData: ", forcastData);
  useEffect(() => {
    let weeks = Object.keys(dynamicData?.inventory_qty || {});
    // week keys /w\d+/
    weeks = weeks.filter((e) => e.match(/^w\d+$/));
    let isTextBoxEmpty = false;
    for (const key in dynamicData) {
      for (const prop in dynamicData[key]) {
        if (dynamicData[key][prop] === "") {
          isTextBoxEmpty = true;
        }
      }
    }
    if (isTextBoxEmpty === false) {
      setDynamicData((prevState) => {
        let newDynamicData = { ...prevState };
        // array of 14
        let preForcastData = Array.from(Array(26)).map((_, e) => {
          let week = `w${e + 1}`;
          return {
            dep_req_qty: newDynamicData?.["dep_req_qty"]?.[week],
            indep_req_qty: newDynamicData?.["indep_req_qty"]?.[week],
            week,
          };
        });
        let postForcastData = [
          ...preForcastData,
          ...forcastData.map((e) => ({
            dep_req_qty: parseFloat(e["dep_req_qty"]),
            indep_req_qty: parseFloat(e["indep_req_qty"]),
            week: "w" + parseInt(e["bucket_week"]),
          })),
        ];

        weeks.forEach((week) => {
          if (week == "w1") return;
          let prevWeek = `w${parseInt(week.slice(1)) - 1}`;
          newDynamicData = {
            ...newDynamicData,
            inventory_qty: {
              ...newDynamicData["inventory_qty"],
              [week]: isNaN(
                parseFloat(
                  Math.round(
                    newDynamicData?.inventory_qty[prevWeek] -
                      newDynamicData?.dep_req_qty[week] -
                      newDynamicData?.indep_req_qty[week] -
                      newDynamicData?.tot_inv_Unusable[week] +
                      newDynamicData?.plan_avail_qty[week] +
                      newDynamicData?.inv_movement_qty[week]
                  )
                )
              )
                ? 0
                : parseFloat(
                    Math.round(
                      newDynamicData?.inventory_qty[prevWeek] -
                        newDynamicData?.dep_req_qty[week] -
                        newDynamicData?.indep_req_qty[week] -
                        newDynamicData?.tot_inv_Unusable[week] +
                        newDynamicData?.plan_avail_qty[week] +
                        newDynamicData?.inv_movement_qty[week]
                    )
                  ),
            },
            // days_of_supply: {
            //   ...newDynamicData['days_of_supply'],
            //   [week]:
            //     isNaN(
            //       parseFloat(
            //         parseFloat(
            //           newDynamicData?.inventory_qty[prevWeek] -
            //             newDynamicData?.dep_req_qty[week] -
            //             newDynamicData?.indep_req_qty[week] +
            //             newDynamicData?.plan_avail_qty[week] +
            //             newDynamicData?.inv_movement_qty[week],
            //         ) / newDynamicData?.days_of_supply[week + '_rt'],
            //       ).toFixed(0),
            //     ) ||
            //     !isFinite(
            //       parseFloat(
            //         parseFloat(
            //           newDynamicData?.inventory_qty[prevWeek] -
            //             newDynamicData?.dep_req_qty[week] -
            //             newDynamicData?.indep_req_qty[week] +
            //             newDynamicData?.plan_avail_qty[week] +
            //             newDynamicData?.inv_movement_qty[week],
            //         ) / newDynamicData?.days_of_supply[week + '_rt'],
            //       ).toFixed(0),
            //     )
            //       ? 0
            //       : parseFloat(
            //           parseFloat(
            //             newDynamicData?.inventory_qty[prevWeek] -
            //               newDynamicData?.dep_req_qty[week] -
            //               newDynamicData?.indep_req_qty[week] +
            //               newDynamicData?.plan_avail_qty[week] +
            //               newDynamicData?.inv_movement_qty[week],
            //           ) / newDynamicData?.days_of_supply[week + '_rt'],
            //         ).toFixed(0),
            // },
          };
          // let dosLogic = postForcastData?.slice(parseInt(week.slice(1))).reduce(
          //   (acc, cur, ind, arr) => {
          //     if (
          //       acc.sum +
          //         (arr[ind]['indep_req_qty'] + arr[ind]['dep_req_qty']) >=
          //         newDynamicData['inventory_qty'][week] ||
          //       acc.exceded
          //     ) {
          //       // let conditionBreaker = true;
          //       let acum = {};

          //       acum = {
          //         ...acc,
          //         exceded: true,
          //         lastWeek: acc.lastWeek == null ? cur.week : acc.lastWeek,
          //         arr,
          //       };
          //       if (
          //         acum.sum < newDynamicData['inventory_qty'][week] &&
          //         acum.sum +
          //           arr[ind]['indep_req_qty'] +
          //           arr[ind]['dep_req_qty'] ==
          //           newDynamicData['inventory_qty'][week]
          //       ) {
          //         //bug fix

          //         // acum = {
          //         //   ...acc,
          //         //   sum:
          //         //     acum.sum +
          //         //     arr[ind]['indep_req_qty'] +
          //         //     arr[ind]['dep_req_qty'],
          //         //   count: acum.count + 1,
          //         //   arr,
          //         // };
          //         acum = {
          //           ...acc,
          //           sum: acum.sum,
          //           count: acum.count,
          //           arr,
          //         };
          //       }
          //       return acum;
          //     }
          //     let x = {
          //       sum:
          //         acc.sum + arr[ind]['indep_req_qty'] + arr[ind]['dep_req_qty'],
          //       count: acc.count + 1,
          //     };
          //     // console.log(x);
          //     return {...acc, ...x};
          //   },
          //   {
          //     sum: 0,
          //     count: 0,
          //     lastWeek: null,
          //     exceded: false,
          //   },
          // );

          function calculateDOS(postForcastData) {
            const dosLogic = {
              sum: 0,
              count: 0,
              lastWeek: null,
            };

            const inventoryQty = newDynamicData["inventory_qty"][week];

            for (let i = 0; i < postForcastData.length; i++) {
              const currValue = postForcastData[i];
              const currSum =
                dosLogic.sum +
                currValue["indep_req_qty"] +
                currValue["dep_req_qty"];

              if (currSum > inventoryQty) {
                dosLogic.lastWeek = currValue.week;
                break;
              }

              if (currSum === inventoryQty) {
                dosLogic.lastWeek = currValue.week;
                dosLogic.sum = currSum;
                dosLogic.count += 1;
                break;
              }

              dosLogic.sum = currSum;
              dosLogic.count += 1;
            }

            return dosLogic;
          }

          const dosLogic = calculateDOS(
            postForcastData?.slice(parseInt(week.slice(1)))
          );

          // let dosLogic =
          // console.log('dosLogic', dosLogic, week);

          let diffInv = newDynamicData["inventory_qty"][week] - dosLogic.sum;
          let rawCountDays =
            diffInv /
            (postForcastData[parseInt(dosLogic?.lastWeek?.slice(1) - 1)]
              ?.indep_req_qty +
              postForcastData[parseInt(dosLogic?.lastWeek?.slice(1) - 1)]
                ?.dep_req_qty);

          // rawCountDays = isNaN(rawCountDays) ? 0 : rawCountDays;
          // console.log(
          //   `dosLogic.lastweek = ${parseInt(dosLogic?.lastWeek?.slice(1))}`,
          // );
          // console.log(
          //   `${diffInv} / ${
          //     postForcastData[parseInt(dosLogic?.lastWeek?.slice(1) - 1)]
          //       ?.indep_req_qty
          //   } = ${
          //     diffInv /
          //     postForcastData[parseInt(dosLogic?.lastWeek?.slice(1) - 1)]
          //       ?.indep_req_qty
          //   }`,
          // );
          let countDays = 0;
          // console.log(newDynamicData);
          // console.log(
          //   week,
          //   'w' + parseInt(week.slice(1) - 1),
          //   newDynamicData['indep_req_qty'][
          //     'w' + (parseInt(week.slice(1)) + 1)
          //   ] +
          //     newDynamicData['dep_req_qty'][
          //       'w' + (parseInt(week.slice(1)) + 1)
          //     ],
          //   newDynamicData['inventory_qty'][week],
          // );
          // if (
          //   newDynamicData['indep_req_qty'][
          //     'w' + (parseInt(week.slice(1)) + 1)
          //   ] +
          //     newDynamicData['dep_req_qty'][
          //       'w' + (parseInt(week.slice(1)) + 1)
          //     ] ===
          //   newDynamicData['inventory_qty'][week]
          // ) {
          //   countDays = rawCountDays * 7;
          // } else {
          countDays = rawCountDays * 5;
          // }
          let dos = Math.round(dosLogic.count * 7 + countDays);
          dos = isNaN(dos) ? 0 : dos;
          dos = isFinite(dos) ? dos : 0;
          dos = dos < 0 ? 0 : dos;
          dos = dosLogic.count > 103 ? "730+" : dos;
          // console log all calculations above to debug with tag and which calculation
          // console.log(
          //   'dos',
          //   dos,
          //   dosLogic.count,
          //   dosLogic.lastWeek,
          //   dosLogic.sum,
          //   diffInv,
          //   rawCountDays,
          //   countDays,
          // );
          newDynamicData = {
            ...newDynamicData,
            days_of_supply: {
              ...newDynamicData["days_of_supply"],
              [week]: dos,
            },
          };
        });
        return newDynamicData;
      });
    }
  }, [...changableCols.map((e) => dynamicData[e])]);

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleString("en-US", options);
  };

  const DisplayBox = useMemo(
    () =>
      ({ text, record }) => {
        const { dynamicData, setDynamicData } = React.useContext(
          SimulationDataContext
        );

        return (
          <input
            type="number"
            disabled
            value={dynamicData[record[0]][record[1]]}
          />
        );
      },
    []
  );
  const DaysOfSupply = useMemo(
    () =>
      ({ text, record, week }) => {
        const { dynamicData, setDynamicData } = React.useContext(
          SimulationDataContext
        );
        // if dynamicData[record.vmi][week] <= 0 getDaySupplyBGColor(1)
        // if it is > 0 and <= min_coverage_time getDaySupplyBGColor(2)
        // if it is > min_coverage_time and <= target_coverage_time getDaySupplyBGColor(3)
        // if it is > target_coverage_time and <= max_coverage_time getDaySupplyBGColor(4)
        // if it is > max_coverage_time getDaySupplyBGColor(5)
        let bgColor = getDaySupplyBGColor(1);
        if (
          dynamicData[record.vmi][week] > 0 &&
          dynamicData[record.vmi][week] <= record["min_coverage_time"]
        ) {
          bgColor = getDaySupplyBGColor(2);
        }
        if (
          dynamicData[record.vmi][week] > record["min_coverage_time"] &&
          dynamicData[record.vmi][week] <= record["target_coverage_time"]
        ) {
          bgColor = getDaySupplyBGColor(3);
        }
        if (
          dynamicData[record.vmi][week] > record["target_coverage_time"] &&
          dynamicData[record.vmi][week] <= record["max_coverage_time"]
        ) {
          bgColor = getDaySupplyBGColor(4);
        }
        if (
          dynamicData[record.vmi][week] > record["max_coverage_time"] ||
          dynamicData[record.vmi][week] == "730+"
        ) {
          bgColor = getDaySupplyBGColor(5);
        }
        if (
          dynamicData[record.vmi][week] == 0 &&
          record["target_coverage_time"] == 0
        ) {
          bgColor = getDaySupplyBGColor(6);
        }

        return (
          <div
            className="srs-dos-container"
            style={{
              background: bgColor,
              color: bgColor == "#A0EFBA" ? "#000" : "#fff",
            }}
          >
            <span className="days-of-supply">
              {dynamicData[record.vmi][week]}
            </span>
          </div>
        );
      },
    []
  );

  const InputBox = useMemo(
    () =>
      ({ text, record, projectionData }) => {
        const { dynamicData, setDynamicData } = React.useContext(
          SimulationDataContext
        );
        const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
        //const [inputValue, setInputValue] = React.useState('');

        const getStyle = () => {
          if (record[0] == "indep_req_qty") {
            if (
              dynamicData[record[0]][record[1]] !=
                projectionData[0][record[1]] &&
              dynamicData[record[0]][record[1]] !== ""
            ) {
              return {
                borderColor: "#BF6FFF",
                borderStyle: "solid",
              };
            } else {
              return null;
            }
          } else if (record[0] == "dep_req_qty") {
            if (
              dynamicData[record[0]][record[1]] !=
                projectionData[1][record[1]] &&
              dynamicData[record[0]][record[1]] !== ""
            ) {
              return { borderColor: "#BF6FFF", borderStyle: "solid" };
            } else {
              return null;
            }
          } else if (record[0] == "tot_inv_Unusable") {
            if (
              dynamicData[record[0]][record[1]] !=
                projectionData[2][record[1]] &&
              dynamicData[record[0]][record[1]] !== ""
            ) {
              return { borderColor: "#BF6FFF", borderStyle: "solid" };
            } else {
              return null;
            }
          } else if (record[0] == "plan_avail_qty") {
            if (
              dynamicData[record[0]][record[1]] !=
                projectionData[3][record[1]] &&
              dynamicData[record[0]][record[1]] !== ""
            ) {
              return { borderColor: "#BF6FFF", borderStyle: "solid" };
            } else {
              return null;
            }
          } else if (record[0] == "inv_movement_qty") {
            if (
              dynamicData[record[0]][record[1]] !=
                projectionData[4][record[1]] &&
              dynamicData[record[0]][record[1]] !== ""
            ) {
              return { borderColor: "#BF6FFF", borderStyle: "solid" };
            } else {
              return null;
            }
          } else {
            return null;
          }
        };
        const ToolTipContainer = ({ dynamicData, projectionData }) => {
          const percentage =
            projectionData != 0
              ? (
                  ((dynamicData - projectionData) / projectionData) *
                  100
                ).toFixed()
              : 100;
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "rgba(0, 0, 0, 0.60)",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "22px",
                }}
              >
                {`${formatDate(new Date())}:`} &nbsp;
              </div>
              <div
                style={{
                  color: "#000",
                  fontSize: "12px",
                  fontWeight: 400,
                  fontStyle: "normal",
                  lineHeight: "22px",
                  textDecorationLine: "line-through",
                }}
              >
                {`${projectionData}`}
              </div>
              <div
                style={{
                  color: "#000",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "22px",
                }}
              >
                &nbsp;
                {"->"}
                &nbsp;
              </div>
              <div
                style={{
                  color: "#000",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "22px",
                }}
              >
                {`${dynamicData}`}
                &nbsp;
                {"("}
                {percentage > 0 ? `+${percentage}` : `${percentage}`}
                {"%)"}
                &nbsp;
              </div>
            </div>
          );
        };

        const getToolTipTitle = useMemo(() => () => {
          if (record[0] == "indep_req_qty") {
            if (
              dynamicData[record[0]][record[1]] != projectionData[0][record[1]]
            ) {
              return (
                <ToolTipContainer
                  dynamicData={dynamicData[record[0]][record[1]]}
                  projectionData={projectionData[0][record[1]]}
                />
              );
            } else {
              return null;
            }
          } else if (record[0] == "dep_req_qty") {
            if (
              dynamicData[record[0]][record[1]] != projectionData[1][record[1]]
            ) {
              return (
                <ToolTipContainer
                  dynamicData={dynamicData[record[0]][record[1]]}
                  projectionData={projectionData[1][record[1]]}
                />
              );
            } else {
              return null;
            }
          } else if (record[0] == "tot_inv_Unusable") {
            if (
              dynamicData[record[0]][record[1]] != projectionData[2][record[1]]
            ) {
              return (
                <ToolTipContainer
                  dynamicData={dynamicData[record[0]][record[1]]}
                  projectionData={projectionData[2][record[1]]}
                />
              );
            } else {
              return null;
            }
          } else if (record[0] == "plan_avail_qty") {
            if (
              dynamicData[record[0]][record[1]] != projectionData[3][record[1]]
            ) {
              return (
                <ToolTipContainer
                  dynamicData={dynamicData[record[0]][record[1]]}
                  projectionData={projectionData[3][record[1]]}
                />
              );
            } else {
              return null;
            }
          } else if (record[0] == "inv_movement_qty") {
            if (
              dynamicData[record[0]][record[1]] != projectionData[4][record[1]]
            ) {
              return (
                <ToolTipContainer
                  dynamicData={dynamicData[record[0]][record[1]]}
                  projectionData={projectionData[4][record[1]]}
                />
              );
            } else {
              return null;
            }
          } else {
            return null;
          }
        });
        const getToolTitleOverlayStyle = useMemo(() => () => {
          // log record[0] and record[1] to debug
          // log dynamicData[record[0]][record[1]] and projectionData[0][record[1]] to debug
          if (record[0] == "indep_req_qty") {
            if (
              dynamicData[record[0]][record[1]] !=
                projectionData[0][record[1]] &&
              dynamicData[record[0]][record[1]] !== ""
            ) {
              return { visibility: "visible" };
            } else {
              return { visibility: "hidden" };
            }
          } else if (record[0] == "dep_req_qty") {
            if (
              dynamicData[record[0]][record[1]] !=
                projectionData[1][record[1]] &&
              dynamicData[record[0]][record[1]] !== ""
            ) {
              return { visibility: "visible" };
            } else {
              return { visibility: "hidden" };
            }
          } else if (record[0] == "tot_inv_Unusable") {
            if (
              dynamicData[record[0]][record[1]] !=
                projectionData[2][record[1]] &&
              dynamicData[record[0]][record[1]] !== ""
            ) {
              return { visibility: "visible" };
            } else {
              return { visibility: "hidden" };
            }
          } else if (record[0] == "plan_avail_qty") {
            if (
              dynamicData[record[0]][record[1]] !=
                projectionData[3][record[1]] &&
              dynamicData[record[0]][record[1]] !== ""
            ) {
              return { visibility: "visible" };
            } else {
              return { visibility: "hidden" };
            }
          } else if (record[0] == "inv_movement_qty") {
            if (
              dynamicData[record[0]][record[1]] !=
                projectionData[4][record[1]] &&
              dynamicData[record[0]][record[1]] !== ""
            ) {
              return { visibility: "visible" };
            } else {
              return { visibility: "hidden" };
            }
          } else {
            return { visibility: "hidden" };
          }
        });
        const PopOverContentContainer = useMemo(
          () => (props) => {
            const [fieldsToUpdate, setInputValueState] = React.useState("");
            const [inputValue, setValue] = React.useState("");
            const [percentageValue, setPercentageValue] = React.useState("");
            const [radioValue, setRadioValue] = React.useState("absolute");

            const popoverRef = useRef();

            useEffect(() => {
              const handleClickOutside = (event) => {
                if (
                  popoverRef.current &&
                  !popoverRef.current.contains(event.target)
                ) {
                  setIsPopoverOpen(false);
                }
              };
              const handleEscapeKey = (event) => {
                if (event.key === "Escape") {
                  setIsPopoverOpen(false);
                }
              };

              document.addEventListener("click", handleClickOutside);
              document.addEventListener("keydown", handleEscapeKey);

              return () => {
                document.removeEventListener("click", handleClickOutside);
                document.removeEventListener("keydown", handleEscapeKey);
              };
            }, []);

            const handleSubmit = () => {
              if (
                (inputValue !== "" || percentageValue !== "") &&
                fieldsToUpdate !== ""
              ) {
                setDynamicData((prevState) => {
                  const updatedData = { ...prevState };
                  const startWeekNum = parseInt(props.record[1].slice(1), 10);

                  for (
                    let index = startWeekNum;
                    index < parseInt(startWeekNum) + parseInt(fieldsToUpdate);
                    index++
                  ) {
                    const weekKey = `w${index}`;
                    if (radioValue === "percentage") {
                      // Calculate percentage logic
                      const percentage = 1 + parseInt(percentageValue) / 100;

                      updatedData[props.record[0]] = {
                        ...updatedData[props.record[0]],
                        [weekKey]: Math.round(
                          percentage *
                            parseInt(prevState[props.record[0]][weekKey])
                        ),

                        [`${weekKey}_date_tt`]:
                          prevState[props.record[0]][weekKey] !== percentage
                            ? formatDate(new Date())
                            : "0",
                      };
                    } else {
                      const inputValueFloat = parseInt(inputValue);
                      // Absolute value logic
                      updatedData[props.record[0]] = {
                        ...updatedData[props.record[0]],
                        [weekKey]:
                          inputValueFloat +
                          parseInt(prevState[props.record[0]][weekKey]),
                        [`${weekKey}_date_tt`]:
                          prevState[props.record[0]][weekKey] !==
                          inputValueFloat
                            ? formatDate(new Date())
                            : "0",
                      };
                    }
                  }
                  return updatedData;
                });

                setIsPopoverOpen(false);
              }
            };

            const hide = () => {
              setIsPopoverOpen(false);
            };

            return (
              <Popover
                // onKeyDown={(event) => {
                //   if (event.key == 'Escape') {
                //     setIsPopoverOpen(false);
                //   }
                // }}
                content={
                  <div
                    ref={popoverRef}
                    style={{
                      width: "300px",
                      height: "180px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "50px",
                          marginBottom: "10px",
                        }}
                      >
                        <span>Adding below value to weeks</span>
                        <div>
                          {/* 1st input */}
                          <Input
                            style={{ width: "70px" }}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (String(inputValue).match(/^\+?[0-9]*$/)) {
                                setInputValueState(inputValue);
                              }
                            }}
                            value={fieldsToUpdate}
                            rules={[
                              {
                                required: true,
                                message: "Please input the value!",
                              },
                            ]}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr auto",
                          gap: "6px",
                          marginBottom: "10px",
                        }}
                      >
                        <div>
                          <Radio
                            onChange={(e) => setRadioValue(e.target.value)}
                            checked={radioValue === "absolute"}
                            value="absolute"
                          />
                        </div>
                        <div>
                          <span>Absolute Value</span>
                        </div>
                        <div>
                          {/* 2nd input */}
                          <Input
                            onPressEnter={handleSubmit}
                            style={{ width: "70px" }}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (String(inputValue).match(/^[+-]?\d*$/)) {
                                setValue(e.target.value);
                              }
                            }}
                            value={inputValue}
                            disabled={radioValue === "percentage"}
                          />
                        </div>
                        <div>
                          <Radio
                            onChange={(e) => setRadioValue(e.target.value)}
                            checked={radioValue === "percentage"}
                            value="percentage"
                          />
                        </div>
                        <div>
                          <span>Percentage</span>
                        </div>
                        <div>
                          {/* 3rd input */}
                          <Input
                            onPressEnter={handleSubmit}
                            style={{ width: "70px" }}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (String(inputValue).match(/^[+-]?\d*$/)) {
                                setPercentageValue(e.target.value);
                              }
                            }}
                            value={percentageValue}
                            disabled={radioValue === "absolute"}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "10px",
                      }}
                    >
                      <Button
                        onClick={hide}
                        style={{ color: "#D3494E", border: "none" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        // onBlur={(e) => {
                        //   setIsPopoverOpen(false);
                        // }}
                        type="primary"
                        disabled={fieldsToUpdate === ""}
                      >
                        Enter
                      </Button>
                    </div>
                  </div>
                }
                open={isPopoverOpen}
                onBlur={(e) => {
                  setIsPopoverOpen(false);
                }}
              >
                {props.children}
              </Popover>
            );
          },
          [isPopoverOpen, setDynamicData]
        );
        const onExcelPasteFun = () => {
          setTimeout(async () => {
            let clipboardData;
            clipboardData = await navigator.clipboard.readText();
            let pastedDataArray = clipboardData.trim().split("\t");
            pastedDataArray = pastedDataArray.flatMap((item) =>
              item.split(/(\r\n)/)
            );
            let indexNum = +record[1].match(/\d+/g);
            let recordPos = record[0];
            pastedDataArray.forEach((element, index) => {
              if (element.includes("\r\n")) {
                if (recordPos == "indep_req_qty") {
                  recordPos = "dep_req_qty";
                  indexNum = +record[1].match(/\d+/g);
                } else if (recordPos == "dep_req_qty") {
                  recordPos = "tot_inv_Unusable";
                  indexNum = +record[1].match(/\d+/g);
                } else if (recordPos == "tot_inv_Unusable") {
                  recordPos = "plan_avail_qty";
                  indexNum = +record[1].match(/\d+/g);
                } else if (recordPos == "plan_avail_qty") {
                  recordPos = "inv_movement_qty";
                  indexNum = +record[1].match(/\d+/g);
                } else if (recordPos == "inv_movement_qty") {
                  indexNum = +record[1].match(/\d+/g);
                }
              }
              if (
                !isNaN(parseFloat(element)) &&
                isFinite(element) &&
                element != "\r\n" &&
                indexNum <= 14
              ) {
                dynamicData[recordPos]["w" + indexNum] = parseFloat(element);
              }
              if (element != "\r\n" && indexNum < 14) indexNum = indexNum + 1;
            });
            setDynamicData(dynamicData);
          }, 0);
        };
        return (
          <PopOverContentContainer record={record}>
            <Tooltip
              title={getToolTipTitle}
              color={"#BF6FFF"}
              overlayStyle={getToolTitleOverlayStyle()}
            >
              <input
                type="number"
                maxLength={8}
                disabled={record[1] == "w1" || record[0] == "inventory_qty"}
                value={dynamicData[record[0]][record[1]]}
                onFocus={(e) => {
                  if (e.target.value == 0) {
                    e.target.value = "";
                    setDynamicData((prevState) => {
                      return {
                        ...prevState,
                        [record[0]]: {
                          ...prevState[record[0]],
                          [record[1]]: "",
                          [record[1] + "_date_tt"]:
                            prevState[record[0]][record[1]] != e.target.value
                              ? formatDate(new Date())
                              : "0",
                        },
                      };
                    });
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value == "") {
                    setDynamicData((prevState) => {
                      return {
                        ...prevState,
                        [record[0]]: {
                          ...prevState[record[0]],
                          [record[1]]: 0,
                          [record[1] + "_date_tt"]:
                            prevState[record[0]][record[1]] != e.target.value
                              ? formatDate(new Date())
                              : "0",
                        },
                      };
                    });
                  } else if (e.target.value.startsWith("0")) {
                    e.target.value = e.target.value.replace(/^0+/, "");
                  }
                }}
                onChange={(e) => {
                  if (e.target.value.length <= 8) {
                    // let value = parseFloat(
                    //   e.target.value == '' ? 0 : e.target.value,
                    // );
                    let value =
                      e.target.value == "" ? "" : parseFloat(e.target.value);
                    setDynamicData((prevState) => {
                      return {
                        ...prevState,
                        [record[0]]: {
                          ...prevState[record[0]],
                          [record[1]]: value,
                          [record[1] + "_date_tt"]:
                            prevState[record[0]][record[1]] != value
                              ? formatDate(new Date())
                              : "0",
                        },
                      };
                    });
                  }
                }}
                style={getStyle()}
                onPaste={(e) => {
                  // e.preventDefault();
                  onExcelPasteFun();
                }}
                onDoubleClick={(e) => {
                  if (e.target.value == "") {
                    setDynamicData((prevState) => {
                      return {
                        ...prevState,
                        [record[0]]: {
                          ...prevState[record[0]],
                          [record[1]]: 0,
                          [record[1] + "_date_tt"]:
                            prevState[record[0]][record[1]] != e.target.value
                              ? formatDate(new Date())
                              : "0",
                        },
                      };
                    });
                  }
                  setIsPopoverOpen(true);
                }}
              />
            </Tooltip>
          </PopOverContentContainer>
        );
      },
    []
  );
  const saveSimulationData = async ({ simulationName, simulationDesc }) => {
    const [projId, locId] = simId.split(",");
    let dynamicDataArray = [];
    dynamicDataArray.push(dynamicData);
    await axios
      .post("/simulationsave", {
        material: projId,
        location_id: locId,
        simname: simulationName,
        desc: simulationDesc,
        data: dynamicDataArray,
        user:
          auth?.tokenData?.givenName +
          " " +
          auth?.tokenData?.displayName.split(",")[0],
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const { simId } = useParams();
  const {
    columns: serviceRiskColumns,
    data,
    columnData,
    // loading,
  } = useSelector((state) => state.srCols);
  const [loading, setLoading] = React.useState(true);
  const [projectionData, setProjectionData] = React.useState([]);

  const resetDynamicData = () => {
    var dynamicData = {};
    projectionData.forEach((e) => {
      dynamicData[e.vmi] = {};
      // for each key in e which has /w\d+/ as key
      Object.keys(e).forEach((key) => {
        if (key.match(/w\d+/)) {
          dynamicData[e.vmi][key] = parseFloat(e[key]);
        }
      });
    });
    setDynamicData(dynamicData);
  };

  useEffect(() => {
    const [projId, locId] = simId.split(",");
    setLoading(true);
    axios
      .post("/getsimprojection", {
        material: projId,
        location_id: locId,
      })
      .then((data) => {
        const children = data?.data?.filter((e) =>
          Object.keys(e).includes("Other")
        )[0];
        let projData = data?.data
          ?.filter((e) => Object.keys(e).includes("vmi"))
          .map((e) => {
            if (e.vmi == "Other") {
              return {
                ...e,
                children: [...children.Other],
              };
            }
            return {
              ...e,
            };
          });
        var dynamicData = {};
        projData.forEach((e) => {
          dynamicData[e.vmi] = {};
          // for each key in e which has /w\d+/ as key
          Object.keys(e).forEach((key) => {
            if (key.match(/w\d+/)) {
              dynamicData[e.vmi][key] = parseFloat(e[key]);
            }
          });
        });
        setDynamicData(dynamicData);

        setProjectionData(projData);
      })
      .catch((err) => {
        console.log(err);
        message.error("Error while fetching simulation projection data");
        setProjectionData([]);
      });
  }, [simId]);

  // selected cell

  const [totalSum, setTotalSum] = useState(0);
  const [selectionBounds, setSelectionBounds] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });
  const selectionArea = useMemo(
    () => ({
      x1: selectionBounds.x1,
      y1: selectionBounds.y1,
      x2: selectionBounds.x2,
      y2: selectionBounds.y2,
    }),
    [selectionBounds]
  );
  const [projectionCols, scrollWidth] = useMemo(() => {
    let projectionCols = [];
    let scrollWidth = 0;
    const addCol = (
      title,
      dataIndex,
      width,
      render,
      onHeaderCell = (props) => {
        return {
          style: {
            backgroundColor: "#00000000",
            border: "1px solid #f0f0f0",
            color: "#000000",
            fontWeight: "500",
            textAlign: "center",
          },
        };
      },
      fixed = false
    ) => {
      projectionCols.push({
        title,
        dataIndex,
        width,
        render,
        onHeaderCell,
        fixed,
      });
      scrollWidth += width;
    };
    setLoading(false);
    addCol(
      "",
      "vmi",
      200,
      (text, record) => {
        return {
          children:
            record.display == "New unusable" ? (
              <span>
                {record.display}{" "}
                <Tooltip title="This represent the first week when the a product will become unusable, and total inventory will be reduced">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            ) : (
              record.display
            ),

          props: {
            style: {
              border: "none",
              borderRight: "1px solid #f0f0f0",
              display: "flex",
              justifyContent: "start",
              gap: "10px",
              flexDirection: "row-reverse",
            },
          },
        };
      },
      (props) => {
        return {
          style: {
            border: "none",
            backgroundColor: "#fff",
            borderRight: "1px solid #f0f0f0",
          },
        };
      },
      "left"
    );

    columnData.map((i, index) =>
      addCol(
        i.value == "Initial" ? "Initial" : getDateMonth(i.value),
        i.Week,
        100,
        (text, record) => {
          // if(Object.keys(record).) {
          let clr_code = record[i.Week + "_cc"] ? record[i.Week + "_cc"] : "";
          let render = changableCols.includes(record.vmi) ? (
            <div className="srs-input-container">
              <InputBox
                text={text}
                record={[record.vmi, i.Week]}
                projectionData={projectionData}
              />
            </div>
          ) : undefined;
          render =
            record.vmi == "inventory_qty" ? (
              <div className="srs-input-container">
                <DisplayBox
                  text={text}
                  dynamicData={dynamicData}
                  record={[record.vmi, i.Week]}
                />
              </div>
            ) : (
              render
            );
          render =
            record.vmi == "days_of_supply" ? (
              <DaysOfSupply text={text} record={record} week={i.Week} />
            ) : (
              render
            );
          return {
            children: (
              <Cell
                value={render ? render : Number(text)}
                index={index}
                selectionArea={selectionArea}
                setTotalSum={setTotalSum}
              />
            ),
            props: {
              style: {
                // width: '20px',
                height: "100%",
                padding: "2px",
                borderRight: "1px solid #f0f0f0",
                color: clr_code != "" ? "#ffffff" : "#000000",
                fontWeight: "500",
                textAlign: "center",
              },
            },
          };
        }
      )
    );

    return [projectionCols, scrollWidth];
  }, [columnData, dynamicData, projectionData]);
  return [
    projectionCols,
    projectionData,
    scrollWidth,
    loading,
    saveSimulationData,
    resetDynamicData,
  ];
};

export default useSimulationColumns;
