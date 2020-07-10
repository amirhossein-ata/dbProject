import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Card, Divider, message } from "antd";
import {
  get_business,
  setBusinessDetailLoadStatus,
} from "../../../core/actions/business";
import { add_ticket } from "../../../core/actions/ticket";
import Services from "./Services";
import AddTicketForm from "../ticket/AddTicketForm";

const BusinessDetails = ({ dispatch, business, match, auth }) => {
  useEffect(() => {
    dispatch(get_business(match.params.businessID));

    return () => {
      dispatch(setBusinessDetailLoadStatus("idle"));
    };
  }, []);

  const onAddTicketSuccess = () => {
    message.success("تیکت با موفقیت ثبت شد.");
  };
  const onAddTicketFailure = () => {
    message.error("مشکلی در ثبت تیکت به وجود آمد.");
  };
  const onAddTicket = (ticket) => {
    dispatch(
      add_ticket(
        ticket.text,
        ticket.file,
        auth.user.id,
        match.params.businessID,
        onAddTicketSuccess,
        onAddTicketFailure
      )
    );
  };
  const { businessDetail, getBusinessDetailStatus } = business;
  return (
    <div style={{ padding: "1em" }}>
      <br />
      {getBusinessDetailStatus === "loaded" && (
        <div>
          <Row container justify="center">
            <Col item lg={10}>
              <Card>
                <Card.Meta
                  title={businessDetail.business.name}
                  description={businessDetail.business.description}
                />
              </Card>
            </Col>
          </Row>
          <Services
            services={businessDetail.services}
            dispatch={dispatch}
            auth={auth}
            businessID={parseInt(match.params.businessID, 10)}
          />
          <Divider />

          <Row
            style={{ marginTop: "4em", marginBottom: "4em" }}
            justify="center"
          >
            <Col span={12}>
              <Card title="فرم ایجاد تیکت">
                <AddTicketForm handleSubmit={onAddTicket} />
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  business: state.business,
});

export default connect(mapStateToProps)(withRouter(BusinessDetails));
