import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Card, Divider } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { miladiTojalaaliDataParser } from "../../../core/utils/helpers";
import {
  get_business,
  edit_business,
  get_business_dashboard,
} from "../../../core/actions/business";
import { get_tickets } from "../../../core/actions/ticket";
import {
  uploadFile,
  setFileUploadLoadStatus,
} from "../../../core/actions/file";
import Services from "./Services";
import Ticket from "../ticket/Ticket";
import EditBusinessForm from "./EditBusinessForm";

const BusinessPanel = ({ dispatch, business, ticket, match, auth }) => {
  const [editOpen, setEditOpen] = useState(false);
  const { businessDetail, getBusinessDetailStatus } = business;
  useEffect(() => {
    const businessID = match.params.businessID.slice(
      3,
      match.params.businessID.length
    );
    dispatch(get_business(businessID));
    dispatch(get_business_dashboard(businessID));
    dispatch(get_tickets(businessID, auth.user.id));
  }, []);

  const handleEditBusiness = ({
    name,
    description,
    address,
    phoneNumber,
    category,
  }) => {
    dispatch(
      edit_business(
        {
          id: business.businessDetail.business.id,
          name,
          description,
          address,
          phoneNumber,
          category,
        },
        auth.user.id
      )
    );
  };
  const handleUploadFile = (file) => {
    dispatch(uploadFile(file, businessDetail.business.id, "business"));
  };
  const handleEditSubmit = (data, type) => {
    if (type === "upload") {
      handleUploadFile(data);
    } else {
      handleEditBusiness(data);
    }
  };
  const cardStyle = { marginBottom: "1em", textAlign: "center" };
  return (
    <div style={{ padding: "1em" }}>
      <br />
      {getBusinessDetailStatus === "loaded" && (
        <div>
          <EditBusinessForm
            open={editOpen}
            setOpen={setEditOpen}
            onSubmit={handleEditSubmit}
            nameValue={businessDetail.business.name}
            descriptionValue={businessDetail.business.description}
            addressValue={businessDetail.business.address}
            phoneNumberValue={businessDetail.business.phone_number}
            categoryValue={businessDetail.business.category_id}
          />
          <Row justify="center" style={{ marginBottom: "2em" }}>
            <Col lg={10}>
              <Card
                actions={[
                  <SettingOutlined
                    key="setting"
                    onClick={() => setEditOpen(true)}
                  />,
                ]}
              >
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
            employers={businessDetail.employers}
            businessID={match.params.businessID}
            isBusinessPanel={true}
          />
          <Divider />
          {business.getBusinessDashboardStatus === "loaded" && (
            <React.Fragment>
              <h2 style={{ marginBottom: "1em" }}>لیست رزرو‌های کسب و کار</h2>
              <Row gutter={24} style={{ marginBottom: "2em" }}>
                {business.allReservations.map((reserve, index) => (
                  <Col span={8} key={index}>
                    <Card style={cardStyle}>
                      <Card.Meta
                        title={reserve.serviceName}
                        description={miladiTojalaaliDataParser(
                          reserve.createdAt
                        )}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
              <h2 style={{ marginBottom: "1em" }}>لیست مشتریان کسب و کار</h2>
              <Row gutter={24} style={{ marginBottom: "2em" }}>
                {business.customers.map((customer, index) => (
                  <Col span={8} key={index}>
                    <Card style={cardStyle}>
                      <Card.Meta
                        title={`${customer.firstname} ${customer.lastname}`}
                      />
                      <br></br>
                      <div>ایمیل: {customer.Email}</div>
                      <div>شماره تلفن: {customer.phone_number}</div>
                    </Card>
                  </Col>
                ))}
              </Row>
              <h2 style={{ marginBottom: "1em" }}>آمار‌های کسب و کار</h2>
              <Row gutter={24} style={{ marginBottom: "2em" }}>
                <Col span={8}>
                  <Card style={cardStyle}>
                    <div>افرایش درصد رزرو روزانه</div>
                    <div>{business.increaseReservePercentageForDay}</div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={cardStyle}>
                    <div>افرایش درصد رزرو ماهانه</div>
                    <div>{business.increaseReservePercentageForMonth}</div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={cardStyle}>
                    <div>افرایش درصد رزرو هفتگی</div>
                    <div>{business.increaseReservePercentageForWeek}</div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={cardStyle}>
                    <div>تعداد رزرو این ماه</div>
                    <div>{business.numberOfReserveInCurrentMonth}</div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={cardStyle}>
                    <div>تعداد رزرو این هفته</div>
                    <div>{business.numberOfReserveInCurrentWeek}</div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={cardStyle}>
                    <div>تعداد رزرو این روز</div>
                    <div>{business.numberOfReserveInDay}</div>
                  </Card>
                </Col>
              </Row>
            </React.Fragment>
          )}
          <Ticket ticket={ticket} dispatch={dispatch} userId={auth.user.id} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  business: state.business,
  ticket: state.ticket,
});

export default connect(mapStateToProps)(withRouter(BusinessPanel));
