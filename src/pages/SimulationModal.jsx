import { Button, Input, Modal, Segmented, Table } from "antd";
import KeysFrame from "pages/ServiceRiskReport/components/KeysFrame";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { AiOutlineReload, AiOutlineSetting } from "react-icons/ai";
import useSimulationColumns from "./useSimulationColumns";

const SimulationDataContext = React.createContext({});

export { SimulationDataContext };
export const SimulationDataProvider = ({ fetchSavedData, action }) => {
  const [dynamicData, setDynamicData] = React.useState({});

  return (
    <SimulationDataContext.Provider value={{ dynamicData, setDynamicData }}>
      <SimulationModal fetchSavedData={fetchSavedData} action={action} />
    </SimulationDataContext.Provider>
  );
};
const { TextArea } = Input;

const SimulationModal = ({ fetchSavedData, action }) => {
  const [visible, setVisible] = React.useState(false);
  const [simulationName, setSimulationName] = React.useState("");
  const [simulationDesc, setSimulationDesc] = React.useState("");
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [saveModalVisible, setSaveModalVisible] = React.useState(false);
  const [projectionCols, projectionData, scrollWidth, loading, save, reset] =
    useSimulationColumns();
  //console.log('projectionCols,projectionData', projectionCols, projectionData);
  const saveSimulationFun = React.useCallback(
    async ({ simulationName, simulationDesc }) => {
      setSaveLoading(true);
      await save({
        simulationName: simulationName,
        simulationDesc: simulationDesc,
      });
      setSimulationName("");
      setSimulationDesc("");
      reset();
      setSaveLoading(false);
      setSaveModalVisible(false);
      setTimeout(() => {
        setVisible(false);
      }, 1);
      fetchSavedData();
    },
    [fetchSavedData, save]
  );
  const cancelFun = () => {
    reset();
    setVisible(false);
  };
  /*  React.useEffect(() => {
    if (action === true) {
        setVisible(true);
    }
  }, [action]); */

  // selection cell

  const tableRef = useRef(null);
  const [totalSum, setTotalSum] = useState(0);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCoord, setStartCoord] = useState({ x: 0, y: 0 });
  const [currentCoord, setCurrentCoord] = useState({ x: 0, y: 0 });
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
  const handleMouseDown = useCallback((event) => {
    console.debug("handle mouse down");
    setIsSelecting(true);
    setStartCoord({ x: event.pageX, y: event.pageY });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
    setTotalSum(0);

    if (
      !!startCoord.x &&
      !!currentCoord.x &&
      !!startCoord.y &&
      !!currentCoord.y
    ) {
      setSelectionBounds({
        x1: Math.min(startCoord.x, currentCoord.x),
        y1: Math.min(startCoord.y, currentCoord.y),
        x2: Math.max(startCoord.x, currentCoord.x),
        y2: Math.max(startCoord.y, currentCoord.y),
      });
    }
  }, [currentCoord, startCoord]);

  const handleMouseMove = useCallback((event) => {
    setCurrentCoord({ x: event.pageX, y: event.pageY });
  }, []);

  return (
    <>
      <Modal
        centered
        open={visible}
        footer={null}
        closeIcon={null}
        closable={false}
        width={1300}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <div
          style={{
            // margin: '24px 0px 24px 0px',
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontWeight: "500",
              fontSize: "20px",
            }}
          >
            Simulation
          </span>
          {/* <Segmented
            options={['Week', 'Month']}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '2px',
              background: 'rgba(0, 0, 0, 0.06)',
              borderRadius: '2px',
              fontWeight: '400',
              fontSize: '14px',
            }}
          /> */}
        </div>
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="servicerisk-simulationmodal"
        >
          {/* <span style={{}}> Selection Sum: {totalSum}</span> */}
          <Table
            // ref={tableRef}
            style={{
              width: "100%",
            }}
            scroll={{
              x: scrollWidth,
            }}
            indentSize={0}
            loading={loading}
            columns={projectionCols}
            size="large"
            dataSource={projectionData}
            pagination={false}
          />
          {/* {isSelecting && (
            <div
              style={{
                position: 'fixed',
                top: Math.min(startCoord.y ?? 0, currentCoord.y ?? 0),
                left: Math.min(startCoord.x ?? 0, currentCoord.x ?? 0),
                outline: '1px solid blue',
                backgroundColor: '#33333320',
                height: Math.abs((currentCoord.y ?? 0) - (startCoord.y ?? 0)),
                width: Math.abs((currentCoord.x ?? 0) - (startCoord.x ?? 0)),
              }}
            />
          )} */}
          <KeysFrame style={{ marginTop: 20 }} showKeys={false} />
        </div>
        <div
          style={{
            width: "100%",
            marginBottom: 24,
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            gap: 20,
          }}
        >
          <AiOutlineReload onClick={reset} style={{ fontSize: 30 }} />
          <Button
            type="text"
            onClick={() => {
              reset();
              cancelFun();
            }}
            style={{ marginRight: 10 }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setSaveModalVisible(true);
            }}
            style={{ background: "#1890FF" }}
          >
            Save Simulation
          </Button>
        </div>
        <Modal
          centered
          width={300}
          height={266}
          open={saveModalVisible}
          footer={null}
          closeIcon={null}
          closable={false}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                fontStyle: "normal",
                fontSize: "16px",
                color: "#000",
              }}
            >
              Save simulation
            </div>
            <div style={{ width: "100%" }}>
              <Input
                placeholder="Type name here"
                onChange={(e) => setSimulationName(e.target.value)}
                maxLength={40}
                autoFocus={true}
                disabled={saveLoading}
                value={simulationName}
              />
            </div>
            <div style={{ width: "100%" }}>
              <TextArea
                value={simulationDesc}
                placeholder="Enter description here"
                onChange={(e) => setSimulationDesc(e.target.value)}
                maxLength={200}
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                disabled={saveLoading}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                type="text"
                onClick={() => {
                  console.log("Clicked!");
                  setSimulationName("");
                  setSimulationDesc("");
                  setSaveModalVisible(false);
                }}
                style={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.85)" }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  saveSimulationFun({
                    simulationName: simulationName.trim(),
                    simulationDesc: simulationDesc.trim(),
                  })
                }
                style={{ background: "#1890FF", fontSize: "14px" }}
                disabled={
                  simulationName.trim().length === 0 ||
                  simulationDesc.trim().length === 0
                }
                loading={saveLoading}
              >
                Save
              </Button>
            </div>
          </div>
        </Modal>
      </Modal>
      <Button
        type="default"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
        onClick={() => setVisible(true)}
      >
        <AiOutlineSetting />
        Run simulation
      </Button>
    </>
  );
};

export default SimulationDataProvider;
