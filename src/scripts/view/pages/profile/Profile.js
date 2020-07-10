import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Card, Button, Divider, message, Table } from "antd";

import { get_profile_info } from "../../../core/actions/profile";
import { add_business } from "../../../core/actions/business";
import { add_comment } from "../../../core/actions/comment";
import { get_transactions } from "../../../core/actions/wallet";
import {
  miladiTojalaaliDataParser,
  dateParser,
} from "../../../core/utils/helpers";
import AddBusinessForm from "../business/AddBusinessForm";
import AddCommentForm from "./AddCommentForm";

const ProfilePage = ({ dispatch, auth, profile, wallet }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const [selectedReserve, setSelectedReserve] = useState(undefined);
  useEffect(() => {
    dispatch(get_profile_info(auth.user.id));
    dispatch(get_transactions(auth.user.id));
  }, []);
  const handleAddBusiness = (business) => {
    dispatch(add_business(business, auth.user.id));
  };
  const addCommentSuccess = () => {
    message.success("نظر با موفقیت ثبت شد.");
  };
  const addCommentFailure = () => {
    message.error("مشکلی در ثبت نظر پیش آمد.");
  };
  const handleAddComment = (text, point) => {
    dispatch(
      add_comment(
        point,
        text,
        selectedReserve.id,
        auth.user.id,
        addCommentSuccess,
        addCommentFailure
      )
    );
  };
  const tableColumns = [
    {
      title: "ردیف",
      dataIndex: "column",
      key: "column",
    },
    {
      title: "نوع تراکنش",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "مقدار",
      dataIndex: "amount",
      key: "amount",
      className: "table-header",
    },
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
      className: "table-header",
    },
  ];
  const getTableData = (list) =>
    list.map((item, index) => ({
      key: index,
      column: index + 1,
      type: "رزرو",
      amount: item.amount,
      date: miladiTojalaaliDataParser(item.paidAt),
    }));
  return (
    <div>
      <AddBusinessForm
        onSubmit={handleAddBusiness}
        open={openAddModal}
        setOpen={setOpenAddModal}
      />
      <AddCommentForm
        onSubmit={handleAddComment}
        open={showAddCommentModal}
        setOpen={setShowAddCommentModal}
      />
      {profile.state === "loaded" && (
        <React.Fragment>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2em",
            }}
          >
            <Card
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://www.w3schools.com/howto/img_avatar.png"
                />
              }
            >
              <p>
                نام:‌ {profile.user.first_name} {profile.user.last_name}
              </p>
              <p>ایمیل: {profile.user.email}</p>
              <p>موبایل: {profile.user.phone_number}</p>
            </Card>
          </div>
          <div style={{ margin: "2em" }}>
            <h3 style={{ fontWeight: "bold" }}>لیست رزروها</h3>
            <Row gutter={24}>
              {profile.reserves.map((reserve, index) => (
                <Col style={{ marginBottom: "1em" }} span={4} key={index}>
                  <Card>
                    <Card.Meta
                      title={reserve.serviceName}
                      description={miladiTojalaaliDataParser(
                        reserve.reserve.createdAt
                      )}
                    />
                    <Button
                      onClick={() => {
                        setSelectedReserve(reserve.reserve);
                        setShowAddCommentModal(true);
                      }}
                      type="primary"
                      style={{ marginTop: "2em" }}
                    >
                      ثبت نظر
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <Divider />
          <div style={{ margin: "2em" }}>
            <Row justify="space-between">
              <Col>
                <h3 style={{ fontWeight: "bold" }}>لیست کسب و کار‌ها</h3>
              </Col>
              <Col>
                <Button type="primary" onClick={() => setOpenAddModal(true)}>
                  اضافه کردن کسب و کار
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }} gutter={24}>
              {profile.businesses.map((business, index) => (
                <Col span={8} key={index} style={{ marginBottom: "1em" }}>
                  <Card>
                    <Card.Meta
                      title={business.name}
                      description={business.description}
                    />
                    <Link to={`/business-panel/‍‍‍${business.id}`}>
                      <Button type="primary" style={{ marginTop: "2em" }}>
                        رفتن به صفحه مدیریت کسب و کار
                      </Button>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <Divider />
          <div style={{ margin: "2em" }}>
            <Row justify="space-between">
              <Col>
                <h3 style={{ fontWeight: "bold" }}>تراکنش‌ها</h3>
              </Col>
            </Row>
            {wallet.getTransactionsStatus === "loaded" && (
              <Row style={{ marginTop: "2em" }} gutter={24} justify="center">
                <Col span={20}>
                  {wallet.transactions.length > 0 && (
                    <Table
                      style={{ width: "100%" }}
                      columns={tableColumns}
                      dataSource={getTableData(wallet.transactions)}
                    />
                  )}
                </Col>
              </Row>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStataToProps = (state) => ({
  profile: state.profile,
  wallet: state.wallet,
});

export default connect(mapStataToProps)(withRouter(ProfilePage));
