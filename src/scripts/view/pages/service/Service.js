import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment-jalaali";
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  message,
  List,
  Rate,
  Avatar,
  Pagination,
} from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { add_reserve } from "../../../core/actions/reserves";
import { get_comments } from "../../../core/actions/comment";
import {
  uploadFile,
  setFileUploadLoadStatus,
} from "../../../core/actions/file";
import {
  get_service,
  edit_service,
  setServiceLoadStatus,
} from "../../../core/actions/service";
import { miladiTojalaaliDataParser } from "../../../core/utils/helpers";
import EditServiceForm from "./EditServiceForm";

const ServicePage = ({ dispatch, match, auth, service, comment }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [firstOfWeek, setFirstOfWeek] = useState(
    moment().startOf("week").add(-1, "days")
  );
  const [endOfWeek, setEndOfWeek] = useState(
    moment().startOf("week").add(5, "days")
  );
  const [reserveStep, setReserveStep] = useState(1);
  const [showAddReserveModal, setShowAddReserveModal] = useState(false);
  const [selectedReserveData, setSelectedReserveData] = useState(undefined);
  useEffect(() => {
    dispatch(
      get_service(match.params.serviceID, firstOfWeek.format("YYYY-MM-DD"))
    );
    dispatch(get_comments(match.params.serviceID, 1));
    // dispatch(get_reserves(parseInt(match.params.serviceID), auth.token));
    return () => {
      dispatch(setServiceLoadStatus("idle"));
    };
  }, []);

  const reserveSuccessCallback = () => {
    message.success("رزرو با موفقیت انجام شد.");
    setShowAddReserveModal(false);
    setReserveStep(1);
    setSelectedReserveData(undefined);
  };
  const reservFailureCallback = () => {
    message.error("مشکلی در رزرو پیش آمد.");
    setShowAddReserveModal(false);
    setReserveStep(1);
    setSelectedReserveData(undefined);
  };
  const handleEditService = ({
    name,
    description,
    address,
    price,
    cancellationRange,
  }) => {
    dispatch(
      edit_service(
        {
          id: service.serviceDetail.service.id,
          name,
          description,
          address,
          price,
          cancellationRange,
          walletId: service.serviceDetail.service.wallet_id,
        },
        auth.user.id
      )
    );
  };
  const handleAddReserveClick = (reserve, userId) => {
    setShowAddReserveModal(true);
    setSelectedReserveData({ reserve, userId });
  };
  const handleAddReserveSubmit = () => {
    const { reserve, userId } = selectedReserveData;
    if (service.serviceDetail.service.fee == 0) {
      dispatch(
        add_reserve(
          reserve,
          userId,
          firstOfWeek.format("YYYY-MM-DD"),
          reserveSuccessCallback,
          reservFailureCallback
        )
      );
    } else if (reserveStep === 1) {
      setReserveStep(2);
    } else if (reserveStep === 2) {
      dispatch(
        add_reserve(
          reserve,
          userId,
          firstOfWeek.format("YYYY-MM-DD"),
          reserveSuccessCallback,
          reservFailureCallback
        )
      );
    }
  };

  const day = (date, sanses) => (
    <div style={{ marginTop: "1em" }}>
      {sanses.map((time, index) => (
        <Button
          style={{ width: "100%", marginBottom: ".5em" }}
          key={index}
          variant="outlined"
          color="primary"
          onClick={() => {
            handleAddReserveClick(
              {
                description: "",
                sans_id: time.sans.id,
                date: date.format("YYYY-MM-DD"),
                service_id: service.serviceDetail.service.id,
              },
              auth.user === null ? null : auth.user.id
            );
          }}
          disabled={time.is_reserved}
        >
          {`${time.sans.startTime.substring(
            0,
            5
          )} - ${time.sans.endTime.substring(0, 5)}`}
        </Button>
      ))}
    </div>
  );
  return (
    <div>
      <br />
      {service.serviceLoadStatus === "loaded" && (
        <div style={{ padding: "1em" }}>
          <Modal
            title="رزرو سانس"
            visible={showAddReserveModal}
            closable={false}
            okText="بله"
            cancelText="خیر"
            onOk={() => {
              handleAddReserveSubmit();
            }}
            onCancel={() => {
              setShowAddReserveModal(false);
              setReserveStep(1);
              setSelectedReserveData(undefined);
            }}
            open={showAddReserveModal}
            onClose={() => setShowAddReserveModal(false)}
          >
            {auth.user === null ? (
              <p>لطفا ابتدا وارد حساب کاربری خود شوید.</p>
            ) : (
              <React.Fragment>
                {reserveStep === 1 && (
                  <p>آیا از رزرو این سانس اطمینان دارید؟</p>
                )}
                {reserveStep === 2 && (
                  <p>
                    مبلغ {service.serviceDetail.service.fee} تومان پرداخت شود؟
                  </p>
                )}
              </React.Fragment>
            )}
          </Modal>
          <Row justify="center">
            <Col span={8}>
              <Card>
                <Card.Meta
                  title={service.serviceDetail.service.name}
                  description={service.serviceDetail.service.description}
                />
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "2em" }}>
            <Card>
              <Row justify="space-between">
                <Row>
                  <Button
                    onClick={() => {
                      const lastWeekStart = moment(firstOfWeek).add(-7, "days");
                      const lastWeekEnd = moment(endOfWeek).add(-7, "days");
                      setFirstOfWeek(lastWeekStart);
                      setEndOfWeek(lastWeekEnd);
                      dispatch(
                        get_service(
                          match.params.serviceID,
                          lastWeekStart.format("YYYY-MM-DD")
                        )
                      );
                    }}
                  >
                    هفته‌ی قبل
                  </Button>
                </Row>
                <Row>
                  {miladiTojalaaliDataParser(
                    firstOfWeek.format("YYYY/MM/DD"),
                    true
                  )}{" "}
                  -{" "}
                  {miladiTojalaaliDataParser(
                    endOfWeek.format("YYYY/MM/DD"),
                    true
                  )}
                </Row>
                <Row>
                  <Button
                    onClick={() => {
                      const nextWeekStart = moment(firstOfWeek).add(7, "days");
                      const nextWeekEnd = moment(endOfWeek).add(7, "days");
                      setFirstOfWeek(nextWeekStart);
                      setEndOfWeek(nextWeekEnd);
                      dispatch(
                        get_service(
                          match.params.serviceID,
                          nextWeekStart.format("YYYY-MM-DD")
                        )
                      );
                    }}
                  >
                    هفته‌ی بعد
                  </Button>
                </Row>
              </Row>
              <Row justify="space-around" style={{ marginTop: "2em" }}>
                <Col span={3} style={{ textAlign: "center" }}>
                  شنبه
                  {day(moment(firstOfWeek), service.serviceDetail.sanses[0])}
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  یکشنبه
                  {day(
                    moment(firstOfWeek).add(1, "days"),
                    service.serviceDetail.sanses[1]
                  )}
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  دوشنبه
                  {day(
                    moment(firstOfWeek).add(2, "days"),
                    service.serviceDetail.sanses[2]
                  )}
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  سه‌شنبه
                  {day(
                    moment(firstOfWeek).add(3, "days"),
                    service.serviceDetail.sanses[3]
                  )}
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  چهارشنبه
                  {day(
                    moment(firstOfWeek).add(4, "days"),
                    service.serviceDetail.sanses[4]
                  )}
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  پنجشنبه
                  {day(
                    moment(firstOfWeek).add(5, "days"),
                    service.serviceDetail.sanses[5]
                  )}
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  جمعه
                  {day(
                    moment(firstOfWeek).add(6, "days"),
                    service.serviceDetail.sanses[6]
                  )}
                </Col>
              </Row>
            </Card>
          </Row>
        </div>
      )}
      {comment.commentsLoadStatus === "loaded" && (
        <div style={{ padding: "1em" }}>
          <h2>نظرات</h2>
          <List
            dataSource={comment.comments}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.description}</a>}
                  description={item.email}
                />
                <div>
                  <Rate disabled value={item.rating} />
                </div>
              </List.Item>
            )}
          ></List>
        </div>
      )}
    </div>
  );
};

const mapStataToProps = (state) => ({
  service: state.service,
  reserve: state.reserve,
  comment: state.comment,
});

export default connect(mapStataToProps)(withRouter(ServicePage));
