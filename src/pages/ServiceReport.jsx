import React, { useEffect, useState } from "react";
import { Button, Checkbox, Spin, Table } from "antd";
import jsonData from "../assets/datasource.json";
import { DeploymentUnitOutlined } from "@ant-design/icons";

function ServiceReport() {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const formatDataForTable = (data) => {
    return data.map((item) => ({
      key: item.id,
      createdAt: new Date(parseInt(item.createdAt)).toLocaleDateString(),
      updatedAt: new Date(parseInt(item.updatedAt)).toLocaleDateString(),
      createdBy: item.createdBy,
      updatedBy: item.updatedBy,
      vmi: item.vmi,
      product_id: item.product_id,
      location_id: item.location_id,
      prod_desc: item.prod_desc,
      ctry: item.ctry,
      panda_code: item.panda_code,
      gmc: item.gmc,
      brand: item.brand,
      plant: item.plant,
      mmtd_sales: item.mmtd_sales,
      target_inv: item.target_inv,
      min_inv: item.min_inv,
      max_inv: item.max_inv,
      inv_movement_qty: item.inv_movement_qty,
      inventory_qty: item.inventory_qty,
      wrostcase_d: item.wrostcase_d,
      wrostcase_v: item.wrostcase_v,
      wrostcase_c: item.wrostcase_c,
      Inv_delay: item.Inv_delay,
      avilablestock: item.avilablestock,
      totalinv: item.totalinv,
      exprec: item.exprec,
      comm_flag: item.comm_flag,
      mrp_controller: item.mrp_controller,
      w1: item.w1,
      w2: item.w2,
      w3: item.w3,
      w4: item.w4,
      w5: item.w5,
      w6: item.w6,
      w7: item.w7,
      w8: item.w8,
      w9: item.w9,
      w10: item.w10,
      w1_cc: item.w1_cc,
      w2_cc: item.w2_cc,
      w3_cc: item.w3_cc,
      w4_cc: item.w4_cc,
      w5_cc: item.w5_cc,
      w6_cc: item.w6_cc,
      w7_cc: item.w7_cc,
      w8_cc: item.w8_cc,
      w9_cc: item.w9_cc,
      w10_cc: item.w10_cc,
      w11: item.w11,
      w12: item.w12,
      w13: item.w13,
      w14: item.w14,
      w11_cc: item.w11_cc,
      w12_cc: item.w12_cc,
      w13_cc: item.w13_cc,
      w14_cc: item.w14_cc,
      w15: item.w15,
      w16: item.w16,
      w17: item.w17,
      w18: item.w18,
      w19: item.w19,
      w20: item.w20,
      w15_cc: item.w15_cc,
      w16_cc: item.w16_cc,
      w17_cc: item.w17_cc,
      w18_cc: item.w18_cc,
      w19_cc: item.w19_cc,
      w20_cc: item.w20_cc,
      w21: item.w21,
      w22: item.w22,
      w23: item.w23,
      w24: item.w24,
      w25: item.w25,
      w26: item.w26,
      w21_cc: item.w21_cc,
      w22_cc: item.w22_cc,
      w23_cc: item.w23_cc,
      w24_cc: item.w24_cc,
      w25_cc: item.w25_cc,
      w26_cc: item.w26_cc,
      est_rec: item.est_rec,
      mmtd_day: item.mmtd_day,
      commflag: item.commflag,
      comment: item.comment,
      commentdt: item.commentdt,
      commentby: item.commentby,
      simflag: item.simflag,
      lastupdate: item.lastupdate,
      Inv_delay_cc: item.Inv_delay_cc,
      Inv_delay_count: item.Inv_delay_count,
      Shipper_Qty: item.Shipper_Qty,
      Pallet_Qty: item.Pallet_Qty,
      fromlocation: item.fromlocation,
      // Add more fields as needed
    }));
  };

  const data = jsonData;
  const formattedData = formatDataForTable(data);
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
      key: "prod_desc",
      title: "Description",
      dataIndex: "prod_desc",
      fixed: "left",
      width: 200,
    },
    {
      key: "product_id",
      title: "Product ID",
      dataIndex: "product_id",
      width: 132,
    },
    {
      key: "w1",
      title: "Initial",
      dataIndex: "w1",
      width: 68,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w1_cc) },
        },
      }),
    },
    {
      key: "w2",
      title: "Jun 12",
      dataIndex: "w2",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w2_cc) },
        },
      }),
    },
    {
      key: "w3",
      title: "Jun 17",
      dataIndex: "w3",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w3_cc) },
        },
      }),
    },
    {
      key: "w4",
      title: "Jun 24",
      dataIndex: "w4",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w4_cc) },
        },
      }),
    },
    {
      key: "w5",
      title: "Jul 01",
      dataIndex: "w5",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w5_cc) },
        },
      }),
    },
    {
      key: "w6",
      title: "Jul 08",
      dataIndex: "w6",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w6_cc) },
        },
      }),
    },
    {
      key: "w7",
      title: "Jul 15",
      dataIndex: "w7",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w7_cc) },
        },
      }),
    },
    {
      key: "w8",
      title: "Jul 22",
      dataIndex: "w8",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w8_cc) },
        },
      }),
    },
    {
      key: "w9",
      title: "Jul 29",
      dataIndex: "w9",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w9_cc) },
        },
      }),
    },
    {
      key: "w10",
      title: "Aug 05",
      dataIndex: "w10",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w10_cc) },
        },
      }),
    },
    {
      key: "w11",
      title: "Aug 12",
      dataIndex: "w11",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w11_cc) },
        },
      }),
    },
    {
      key: "w12",
      title: "Aug 19",
      dataIndex: "w12",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w12_cc) },
        },
      }),
    },
    {
      key: "w13",
      title: "Aug 26",
      dataIndex: "w13",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w13_cc) },
        },
      }),
    },
    {
      key: "w14",
      title: "Sep 02",
      dataIndex: "w14",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w14_cc) },
        },
      }),
    },
    {
      key: "w15",
      title: "Sep 09",
      dataIndex: "w15",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w15_cc) },
        },
      }),
    },
    {
      key: "w16",
      title: "Sep 16",
      dataIndex: "w16",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w16_cc) },
        },
      }),
    },
    {
      key: "w17",
      title: "Sep 23",
      dataIndex: "w17",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w17_cc) },
        },
      }),
    },
    {
      key: "w18",
      title: "Sep 30",
      dataIndex: "w18",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w18_cc) },
        },
      }),
    },
    {
      key: "w19",
      title: "Oct 07",
      dataIndex: "w19",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w19_cc) },
        },
      }),
    },
    {
      key: "w20",
      title: "Oct 14",
      dataIndex: "w20",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w20_cc) },
        },
      }),
    },
    {
      key: "w21",
      title: "Oct 21",
      dataIndex: "w21",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w21_cc) },
        },
      }),
    },
    {
      key: "w22",
      title: "Oct 28",
      dataIndex: "w22",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w22_cc) },
        },
      }),
    },
    {
      key: "w23",
      title: "Nov 04",
      dataIndex: "w23",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w23_cc) },
        },
      }),
    },
    {
      key: "w24",
      title: "Nov 11",
      dataIndex: "w24",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w24_cc) },
        },
      }),
    },
    {
      key: "w25",
      title: "Nov 18",
      dataIndex: "w25",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w25_cc) },
        },
      }),
    },
    {
      key: "w26",
      title: "Nov 25",
      dataIndex: "w26",
      width: 60,
      render: (text, record) => ({
        children: text,
        props: {
          style: { background: getBackgroundColor(record.w26_cc) },
        },
      }),
    },
    { key: "market", title: "Market", dataIndex: "ctry", width: 120 },
    {
      key: "panda_code",
      title: "PandaA Code",
      dataIndex: "panda_code",
      width: 140,
    },
    { key: "gmc", title: "GMC", dataIndex: "gmc", width: 120 },
    { key: "brand", title: "Brand", dataIndex: "brand", width: 120 },
    { key: "mfg_plant", title: "MFG Plant", dataIndex: "plant", width: 120 },
    {
      key: "mrp_controller",
      title: "MRP controller",
      dataIndex: "mrp_controller",
      width: 120,
    },
    {
      key: "Shipper_qty",
      title: "Shipper Qty",
      dataIndex: "Shipper_Qty",
      width: 120,
    },
    {
      key: "Pallet_qty",
      title: "Pallet Qty",
      dataIndex: "Pallet_Qty",
      width: 120,
    },
    {
      key: "from_location",
      title: "From Location",
      dataIndex: "fromlocation",
      width: 120,
    },
    {
      key: "target_inv",
      title: "Target Inv. (d)",
      dataIndex: "target_inv",
      width: 120,
    },
    { key: "min_inv", title: "Min Inv. (d)", dataIndex: "min_inv", width: 120 },
    { key: "max_inv", title: "Max Inv. (d)", dataIndex: "max_inv", width: 120 },
    {
      key: "inv_movement_qty",
      title: "Tot. Inv. Movement",
      dataIndex: "inv_movement_qty",
      width: 130,
    },
    {
      key: "curr_stock",
      title: "Current Week DOS",
      dataIndex: "inventory_qty",
      width: 120,
    },
    {
      key: "worst_case",
      title: "Worst Case",
      dataIndex: "wrostcase_d",
      width: 120,
    },
    { key: "dc_risk", title: "DC Risk", dataIndex: "wrostcase_v", width: 130 },
    {
      key: "inv_movement_delay",
      title: "Inv. Movement Delay",
      dataIndex: "Inv_delay",
      width: 128,
      fixed: "right",
    },
    {
      key: "mmtd_sales",
      title: "MTD sales. (d)",
      dataIndex: "mmtd_sales",
      width: 120,
      fixed: "right",
    },
    {
      key: "action",
      title: "Action",
      dataIndex: "comment",
      width: 120,
      fixed: "right",
      render: () => (
        <Button>
          <DeploymentUnitOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div className="ServiceReport">
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 550 }}
        pagination={false}
      />

      <div className={"keys-frame "} style={{ marginTop: "20px" }}>
        <div className="keys-label">Keys:</div>
        <div className="keys-container">
          <div className="keys-group">
            <div className="keys-item">
              <Checkbox />
              <div className="keys-color keys-color-1" />
              <div className="keys-text">Inv. Equal or Below 0</div>
            </div>
            <div className="keys-item">
              <Checkbox />
              <div className="keys-color keys-color-2" />
              <div className="keys-text">Inv. Between 0 - Minimum</div>
            </div>
            <div className="keys-item">
              <Checkbox />
              <div className="keys-color keys-color-3" />
              <div className="keys-text">Inv. Between Min - Target</div>
              {/*  */}
            </div>
            <div className="keys-item">
              <Checkbox />
              <div className="keys-color keys-color-4" />
              <div className="keys-text">Inv. Between Target - Max</div>
            </div>
            <div className="keys-item">
              <Checkbox />
              <div className="keys-color keys-color-5" />
              <div className="keys-text">Inv. Above Maximum</div>
            </div>{" "}
            <div className="keys-item">
              <Checkbox />
              <div className="keys-color keys-color-6" />
              <div className="keys-text">Equal to 0 and No Target Inv.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceReport;
