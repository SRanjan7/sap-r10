import React, { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Input, Spin, Table } from "antd";
import jsonData from "../assets/simulation.json";
import { DeploymentUnitOutlined } from "@ant-design/icons";

function RunSim({ selectedStock }) {
  const [filteredData, setFilteredData] = useState([]);
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(jsonData);

  const handleInputChange = (value, record, dataIndex) => {
    const newData = [...data];
    const recordIndex = newData.findIndex((item) => item.key === record.key);

    if (recordIndex > -1) {
      for (let i = recordIndex; i < newData.length; i++) {
        newData[i][dataIndex] =
          parseFloat(newData[i][dataIndex] || 0) + parseFloat(value || 0);
      }
      setData(newData);
    }
  };

  const EditableCell = ({ title, editable, children, ...restProps }) => {
    return (
      <td {...restProps}>
        {editable ? (
          <Input
            onChange={(e) =>
              handleInputChange(
                e.target.value,
                restProps.record,
                restProps.dataIndex
              )
            }
            defaultValue={children}
          />
        ) : (
          children
        )}
      </td>
    );
  };
  useEffect(() => {
    if (selectedStock) {
      const filtered = jsonData.filter(
        (item) =>
          item.avilablestock == selectedStock.avilablestock &&
          item.totalinv == selectedStock.totalinv
      );
      setFilteredData(filtered);
    }
  }, [selectedStock]);

  //   const data = jsonData;
  const colorMapping = {
    1: "#C51E38",
    2: "#F37820",
    3: "#F5AC25",
    4: "#A0EFBA",
    5: "#1C75BC",
    6: "#888B8D",
  };
  const getBackgroundColor = (ccValue) => {
    return colorMapping[ccValue] || "transparent";
  };

  const columns = [
    {
      key: "display",
      title: "",
      dataIndex: "display",
      fixed: "left",
      width: 200,
      font: 10,
      className: "no-border-column",

      render: (text, record) => ({
        children: text,
        props: {
          style: {
            border: "0px 0px",
          },
        },
      }),
    },

    {
      key: "w1",
      title: "Initial",
      dataIndex: "w1",
      width: 90,
      render: (text, record) => ({
        children: text,
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w1_cc),
          },
        },
      }),
    },
    {
      key: "w2",
      title: "Jun 12",
      dataIndex: "w2",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w2_cc),
          },
        },
      }),
    },
    {
      key: "w3",
      title: "Jun 17",
      dataIndex: "w3",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w3_cc),
          },
        },
      }),
    },
    {
      key: "w4",
      title: "Jun 24",
      dataIndex: "w4",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w4_cc),
          },
        },
      }),
    },
    {
      key: "w5",
      title: "Jul 01",
      dataIndex: "w5",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w5_cc),
          },
        },
      }),
    },
    {
      key: "w6",
      title: "Jul 08",
      dataIndex: "w6",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w6_cc),
          },
        },
      }),
    },
    {
      key: "w7",
      title: "Jul 15",
      dataIndex: "w7",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w7_cc),
          },
        },
      }),
    },
    {
      key: "w8",
      title: "Jul 22",
      dataIndex: "w8",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w8_cc),
          },
        },
      }),
    },
    {
      key: "w9",
      title: "Jul 29",
      dataIndex: "w9",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w9_cc),
          },
        },
      }),
    },
    {
      key: "w10",
      title: "Aug 05",
      dataIndex: "w10",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w10_cc),
          },
        },
      }),
    },
    {
      key: "w11",
      title: "Aug 12",
      dataIndex: "w11",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w11_cc),
          },
        },
      }),
    },
    {
      key: "w12",
      title: "Aug 19",
      dataIndex: "w12",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w12_cc),
          },
        },
      }),
    },
    {
      key: "w13",
      title: "Aug 26",
      dataIndex: "w13",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w13_cc),
          },
        },
      }),
    },
    {
      key: "w14",
      title: "Sep 02",
      dataIndex: "w14",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w14_cc),
          },
        },
      }),
    },
    {
      key: "w15",
      title: "Sep 09",
      dataIndex: "w15",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w15_cc),
          },
        },
      }),
    },
    {
      key: "w16",
      title: "Sep 16",
      dataIndex: "w16",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w16_cc),
          },
        },
      }),
    },
    {
      key: "w17",
      title: "Sep 23",
      dataIndex: "w17",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w17_cc),
          },
        },
      }),
    },
    {
      key: "w18",
      title: "Sep 30",
      dataIndex: "w18",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w18_cc),
          },
        },
      }),
    },
    {
      key: "w19",
      title: "Oct 07",
      dataIndex: "w19",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w19_cc),
          },
        },
      }),
    },
    {
      key: "w20",
      title: "Oct 14",
      dataIndex: "w20",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w20_cc),
          },
        },
      }),
    },
    {
      key: "w21",
      title: "Oct 21",
      dataIndex: "w21",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w21_cc),
          },
        },
      }),
    },
    {
      key: "w22",
      title: "Oct 28",
      dataIndex: "w22",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w22_cc),
          },
        },
      }),
    },
    {
      key: "w23",
      title: "Nov 04",
      dataIndex: "w23",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w23_cc),
          },
        },
      }),
    },
    {
      key: "w24",
      title: "Nov 11",
      dataIndex: "w24",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w24_cc),
          },
        },
      }),
    },
    {
      key: "w25",
      title: "Nov 18",
      dataIndex: "w25",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w25_cc),
          },
        },
      }),
    },
    {
      key: "w26",
      title: "Nov 25",
      dataIndex: "w26",
      width: 90,
      render: (text, record) => ({
        children: (
          <Input
            defaultValue={text}
            onChange={(e) => handleInputChange(e.target.value, record, "w1")}
          />
        ),
        props: {
          style: {
            textAlign: "center",
            background: getBackgroundColor(record.w26_cc),
          },
        },
      }),
    },
  ].map((col) => {
    if (col.key.startsWith("w")) {
      return {
        ...col,
        render: (text, record) => ({
          children:
            record.display !== "Days of Supply" ? (
              <Input
                defaultValue={text}
                onChange={(e) =>
                  handleInputChange(e.target.value, record, col.key)
                }
                style={{
                  border:
                    record.display === "Days of Supply"
                      ? "none"
                      : "1px solid #d9d9d9",
                }}
              />
            ) : (
              text
            ),
          props: {
            style: {
              textAlign: "center",
              background: getBackgroundColor(record[`${col.key}_cc`]),
            },
          },
        }),
      };
    }
    return col;
  });

  return (
    <div className="h-[640px] ">
      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: 490 }}
        pagination={false}
        bordered
      />

      <div className={"keys-frame "} style={{ marginTop: "20px" }}>
        <div className="keys-label">Keys:</div>
        <div className="keys-container">
          <div className="keys-group">
            <div className="keys-item">
              {/* <Checkbox /> */}
              <div className="keys-color keys-color-1" />
              <div className="keys-text">Inv. Equal or Below 0</div>
            </div>
            <div className="keys-item">
              {/* <Checkbox /> */}
              <div className="keys-color keys-color-2" />
              <div className="keys-text">Inv. Between 0 - Minimum</div>
            </div>
            <div className="keys-item">
              {/* <Checkbox /> */}
              <div className="keys-color keys-color-3" />
              <div className="keys-text">Inv. Between Min - Target</div>
              {/*  */}
            </div>
            <div className="keys-item">
              {/* <Checkbox /> */}
              <div className="keys-color keys-color-4" />
              <div className="keys-text">Inv. Between Target - Max</div>
            </div>
            <div className="keys-item">
              {/* <Checkbox /> */}
              <div className="keys-color keys-color-5" />
              <div className="keys-text">Inv. Above Maximum</div>
            </div>{" "}
            <div className="keys-item">
              {/* <Checkbox /> */}
              <div className="keys-color keys-color-6" />
              <div className="keys-text">Equal to 0 and No Target Inv.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RunSim;
